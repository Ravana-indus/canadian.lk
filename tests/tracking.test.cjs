const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function setup() {
    const events = [];
    const scripts = [];
    let config;
    let initializations = 0;
    const client = {
        init: (_token, options) => { config = options; initializations++; },
        capture: (name, properties) => events.push({ name, properties }),
        opt_out_capturing() {}, opt_in_capturing() {},
    };
    const exports = {};
    const context = {
        exports, URL,
        location: { origin: 'https://www.canadian.lk', pathname: '/apply', search: '?email=private@example.com' },
        window: {},
        document: { createElement: () => ({}), head: { appendChild: el => scripts.push(el) } },
        require: name => name === './meta' ? { trackMeta: event => context.window.fbq?.('trackSingle', '123456', event) } : name === 'posthog-js' ? { default: client } : { NO_CONSENT: { analytics: false, marketing: false } },
    };
    const source = fs.readFileSync('src/lib/analytics.ts', 'utf8').replaceAll('import.meta.env', JSON.stringify({
        VITE_POSTHOG_TOKEN: 'phc_test', VITE_POSTHOG_HOST: 'https://us.i.posthog.com', VITE_META_PIXEL_ID: '123456',
    }));
    vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, context);
    return { api: exports, context, events, scripts, config: () => config, initializations: () => initializations };
}
const flush = () => new Promise(resolve => setImmediate(resolve));

test('Meta browser and server events require consent and share a deduplication ID', () => {
    let allowed = false;
    const browser = [], requests = [];
    const context = {
        exports: {}, URLSearchParams,
        require: () => ({ readConsent: () => ({ marketing: allowed }) }),
        window: { fbq: (...args) => browser.push(args) },
        crypto: { randomUUID: () => 'unique-event' },
        document: { cookie: '' }, navigator: { userAgent: 'test' },
        location: { origin: 'https://www.canadian.lk', pathname: '/apply', search: '?email=private', href: 'https://www.canadian.lk/apply?email=private' },
        fetch: (url, options) => { requests.push({ url, body: JSON.parse(options.body) }); return Promise.resolve({}); },
    };
    const source = fs.readFileSync('src/lib/meta.ts', 'utf8').replaceAll('import.meta.env', JSON.stringify({
        VITE_META_PIXEL_ID: '123456', VITE_SUPABASE_URL: 'https://test.example', VITE_SUPABASE_ANON_KEY: 'public-test',
    }));
    vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, context);
    context.exports.trackMeta('Lead');
    assert.equal(browser.length, 0); assert.equal(requests.length, 0);
    allowed = true;
    context.exports.trackMeta('Lead');
    assert.equal(browser.length, 1); assert.equal(requests.length, 1);
    assert.equal(browser[0][4].eventID, requests[0].body.event_id);
    assert.equal(requests[0].body.url, 'https://www.canadian.lk/apply');
    assert.equal(requests[0].body.email, undefined);
    allowed = false;
    context.exports.trackMeta('Lead');
    assert.equal(requests.length, 1);
});

test('no consent means no SDK, pageviews, or conversion events', async () => {
    const s = setup();
    s.api.trackPage('/apply'); s.api.trackEvent('application_submitted');
    await flush();
    assert.equal(s.scripts.length, 0); assert.equal(s.initializations(), 0); assert.equal(s.events.length, 0);
});

test('StrictMode repeats initialize once and pageviews deduplicate; navigation still counts', async () => {
    const s = setup();
    s.api.applyConsent({ analytics: true, marketing: true });
    s.api.trackPage('/apply'); s.api.trackPage('/apply');
    await flush();
    assert.equal(s.initializations(), 1); assert.equal(s.scripts.length, 1);
    assert.equal(s.events.length, 1);
    assert.equal(s.context.window.fbq.queue.filter(e => e[2] === 'PageView').length, 1);
    s.context.location.pathname = '/about'; s.api.trackPage('/about'); await flush();
    s.context.location.pathname = '/apply'; s.api.trackPage('/apply'); await flush();
    assert.equal(s.events.length, 3);
});

test('analytics and advertising permissions are independent; Lead is explicit', async () => {
    const s = setup();
    s.api.applyConsent({ analytics: true, marketing: false });
    s.api.trackEvent('application_started'); await flush();
    assert.equal(s.events[0].name, 'application_started'); assert.equal(s.scripts.length, 0);
    s.api.applyConsent({ analytics: false, marketing: true });
    s.api.trackEvent('application_submitted'); await flush();
    assert.equal(s.events.length, 1);
    assert.equal(s.context.window.fbq.queue.filter(e => e[2] === 'Lead').length, 1);
});

test('revocation drops pending events and prevents subsequent events', async () => {
    const s = setup();
    s.api.applyConsent({ analytics: true, marketing: true });
    s.api.trackPage('/apply');
    s.api.applyConsent({ analytics: false, marketing: false });
    s.api.trackEvent('application_submitted'); await flush();
    assert.equal(s.events.length, 0);
    assert.equal(s.context.window.fbq.queue.filter(e => e[2] === 'Lead').length, 0);
});

test('PostHog disables form capture/replay and strips URL queries and fragments', async () => {
    const s = setup();
    s.api.applyConsent({ analytics: true, marketing: false }); s.api.trackPage('/apply'); await flush();
    const config = s.config();
    assert.equal(config.autocapture, false); assert.equal(config.disable_session_recording, true);
    assert.equal(s.events[0].properties.$current_url, 'https://www.canadian.lk/apply');
    const event = config.before_send({ properties: { $current_url: 'https://www.canadian.lk/apply?email=private#secret', $referrer: 'https://example.com/?secret=yes' } });
    assert.equal(event.properties.$current_url, 'https://www.canadian.lk/apply');
    assert.equal(event.properties.$referrer, 'https://example.com/');
});
