import { readConsent } from './consent';
// Meta Pixel (browser) + Conversions API (server, via Supabase edge function `meta-capi`).
// Each event goes to both with one event_id so Meta deduplicates them.
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '2008747400528081';  // Meta Pixel / Dataset ID (same as supabase/functions/meta-capi)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

type MetaEvent = 'ViewContent' | 'Contact' | 'Lead' | 'SubmitApplication';

const cookie = (name: string) => document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1];

export function trackMeta(event: MetaEvent) {
    if (!PIXEL_ID || !readConsent()?.marketing) return;
    const eventId = crypto.randomUUID();
    window.fbq?.('trackSingle', PIXEL_ID, event, {}, { eventID: eventId });

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
            url: location.origin + location.pathname,
            user_agent: navigator.userAgent,
            fbp: cookie('_fbp'),
            fbc: cookie('_fbc') || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined),
        }),
    }).catch(err => console.error('Meta CAPI network error:', err));
}
