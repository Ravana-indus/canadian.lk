// Meta Pixel (browser) + Conversions API (server, via Supabase edge function `meta-capi`).
// Each event goes to both with one event_id so Meta deduplicates them.
const PIXEL_ID = '2008747400528081';  // Meta Pixel / Dataset ID (same as supabase/functions/meta-capi)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

type MetaEvent = 'ViewContent' | 'Contact' | 'Lead' | 'SubmitApplication';
type UserData = { email?: string; phone?: string; first_name?: string; last_name?: string; city?: string };

const w = window as any;

export function initMetaPixel() {
    if (!PIXEL_ID || w.fbq) return;
    // Standard Meta base code, minus the auto PageView (RootLayout sends it per route).
    const n: any = (w.fbq = function (...args: unknown[]) {
        n.callMethod ? n.callMethod(...args) : n.queue.push(args);
    });
    w._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(s);
    w.fbq('init', PIXEL_ID);
}

const cookie = (name: string) => document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1];

export function trackMeta(event: MetaEvent, user: UserData = {}) {
    if (!PIXEL_ID) return;
    const eventId = crypto.randomUUID();
    w.fbq?.('track', event, {}, { eventID: eventId });

    if (!supabaseUrl || !supabaseKey) return;
    // fbc from the click id when the _fbc cookie isn't set yet (first landing).
    const fbclid = new URLSearchParams(location.search).get('fbclid');
    fetch(`${supabaseUrl}/functions/v1/meta-capi`, {
        method: 'POST',
        keepalive: true,  // survives navigation on tel:/mailto:/WhatsApp clicks
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${supabaseKey}` },
        body: JSON.stringify({
            event,
            event_id: eventId,
            url: location.href,
            user_agent: navigator.userAgent,
            fbp: cookie('_fbp'),
            fbc: cookie('_fbc') || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined),
            ...user,
        }),
    }).catch(err => console.error('Meta CAPI network error:', err));
}
