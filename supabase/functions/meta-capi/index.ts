import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Meta Conversions API relay. Browser fires the same event via fbq with the same
// event_id, so Meta deduplicates the pair.
const PIXEL_ID = "";  // TODO: Meta Pixel / Dataset ID (same value as src/lib/meta.ts)
const API_VERSION = "v23.0";
const ALLOWED_EVENTS = new Set(["ViewContent", "Contact", "Lead", "SubmitApplication"]);

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

async function sha256(value?: string) {
    const v = value?.trim().toLowerCase();
    if (!v) return undefined;
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(v));
    return [Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')];
}

// Meta wants digits only with country code; site visitors are Sri Lankan (+94).
function normalizePhone(phone?: string) {
    let p = (phone || '').replace(/\D/g, '');
    if (!p) return undefined;
    if (p.startsWith('0')) p = '94' + p.slice(1);
    else if (p.length === 9) p = '94' + p;
    return p;
}

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

    try {
        const token = Deno.env.get('META_CAPI_ACCESS_TOKEN');
        if (!token || !PIXEL_ID) return json({ error: "META_CAPI_ACCESS_TOKEN or PIXEL_ID not configured" }, 500);

        const { event, event_id, url, user_agent, fbp, fbc, email, phone, first_name, last_name, city, test_event_code } = await req.json();
        if (!ALLOWED_EVENTS.has(event)) return json({ error: `Event not allowed: ${event}` }, 400);

        const ip = (req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || '').split(',')[0].trim();

        const body: Record<string, unknown> = {
            data: [{
                event_name: event,
                event_time: Math.floor(Date.now() / 1000),
                event_id,
                event_source_url: url,
                action_source: "website",
                user_data: {
                    client_user_agent: user_agent || undefined,
                    client_ip_address: ip || undefined,
                    fbp: fbp || undefined,
                    fbc: fbc || undefined,
                    em: await sha256(email),
                    ph: await sha256(normalizePhone(phone)),
                    fn: await sha256(first_name),
                    ln: await sha256(last_name),
                    ct: await sha256(city?.replace(/\s/g, '')),
                    country: email || phone ? await sha256('lk') : undefined,  // form leads are Sri Lankan
                },
            }],
        };
        if (test_event_code) body.test_event_code = test_event_code;

        const res = await fetch(`https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok) {
            console.error("Meta CAPI error:", JSON.stringify(data));
            return json({ error: data?.error?.message || `Meta API ${res.status}` }, 502);
        }
        return json({ success: true, events_received: data.events_received });
    } catch (error) {
        console.error("meta-capi failed:", (error as Error).message);
        return json({ error: (error as Error).message }, 500);
    }
});
