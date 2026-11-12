import { trackMeta } from './meta';
import type { PostHog } from 'posthog-js';
import { NO_CONSENT, type Consent } from './consent';

type Pixel = {
    (...args: unknown[]): void;
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[][];
    push: Pixel;
    loaded: boolean;
    version: string;
};
declare global {
    interface Window {
        fbq?: Pixel;
        _fbq?: Pixel;
        ttq?: { page: () => void; revokeConsent: () => void; grantConsent: () => void };
    }
}

const token = import.meta.env.VITE_POSTHOG_TOKEN;
const host = import.meta.env.VITE_POSTHOG_HOST;
const pixelId = import.meta.env.VITE_META_PIXEL_ID;
let consent: Consent = NO_CONSENT;
let revision = 0;
let posthog: PostHog | undefined;
let loading: Promise<PostHog | undefined> | undefined;
let metaReady = false;
let lastPosthogPath = '';
let lastMetaPath = '';

function cleanUrl(value: unknown): string {
    if (typeof value !== 'string' || !value) return '';
    try { const url = new URL(value); return url.origin + url.pathname; } catch { return ''; }
}

async function getPosthog() {
    if (!consent.analytics || !token || !host) return;
    if (posthog) return posthog;
    if (!loading) {
        loading = import('posthog-js').then(({ default: client }) => {
            if (!consent.analytics) return;
            client.init(token, {
                api_host: host,
                autocapture: false,
                capture_pageview: false,
                capture_pageleave: false,
                capture_dead_clicks: false,
                capture_exceptions: false,
                capture_heatmaps: false,
                capture_performance: false,
                disable_session_recording: true,
                disable_surveys: true,
                advanced_disable_feature_flags: true,
                person_profiles: 'never',
                persistence: 'memory',
                save_referrer: false,
                store_google: false,
                before_send: (event) => {
                    if (!consent.analytics || !event) return null;
                    for (const key of Object.keys(event.properties)) {
                        if (/url|referrer/i.test(key)) event.properties[key] = cleanUrl(event.properties[key]);
                    }
                    return event;
                },
            });
            posthog = client;
            return client;
        }).catch(() => undefined).finally(() => { loading = undefined; });
    }
    return loading;
}

function initMeta() {
    if (metaReady || !consent.marketing || !/^\d+$/.test(pixelId || '')) return;
    if (!window.fbq) {
        const queue = function (...args: unknown[]) {
            if (queue.callMethod) queue.callMethod(...args);
            else queue.queue.push(args);
        } as Pixel;
        queue.queue = [];
        queue.push = queue;
        queue.loaded = true;
        queue.version = '2.0';
        window.fbq = window._fbq = queue;
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        document.head.appendChild(script);
    }
    window.fbq('consent', 'grant');
    window.fbq('set', 'autoConfig', false, pixelId);
    window.fbq('init', pixelId);
    metaReady = true;
}

export function applyConsent(next: Consent) {
    if (next.analytics !== consent.analytics || next.marketing !== consent.marketing) revision++;
    consent = next;
    if (!next.analytics) { posthog?.opt_out_capturing(); lastPosthogPath = ''; }
    else posthog?.opt_in_capturing({ captureEventName: false });
    if (!next.marketing) {
        window.fbq?.('consent', 'revoke');
        window.ttq?.revokeConsent();
        lastMetaPath = '';
    } else {
        initMeta();
        window.fbq?.('consent', 'grant');
        window.ttq?.grantConsent();
    }
}

export function trackPage(path: string) {
    const currentRevision = revision;
    if (consent.analytics) void getPosthog().then(client => {
        if (!client || !consent.analytics || currentRevision !== revision || location.pathname !== path || lastPosthogPath === path) return;
        lastPosthogPath = path;
        client.capture('$pageview', { $current_url: location.origin + path, $pathname: path });
    });
    if (consent.marketing && metaReady && lastMetaPath !== path) {
        lastMetaPath = path;
        window.fbq?.('trackSingle', pixelId, 'PageView');
        trackMeta('ViewContent');
    }
}

type EventName = 'application_started' | 'application_submitted' | 'whatsapp_clicked';
export function trackEvent(name: EventName) {
    const path = location.pathname;
    const currentRevision = revision;
    if (consent.analytics) void getPosthog().then(client => {
        if (client && consent.analytics && currentRevision === revision)
            client.capture(name, { $current_url: location.origin + path, $pathname: path });
    });
    if (consent.marketing && metaReady) {
        if (name === 'application_submitted') trackMeta('Lead');
        else window.fbq?.('trackSingleCustom', pixelId, name);
    }
}
