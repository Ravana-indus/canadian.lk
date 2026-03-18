import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function sha256(message: string) {
    if (!message) return null;
    const msgUint8 = new TextEncoder().encode(message.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

Deno.serve(async (req: Request) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const payload = await req.json();
        const { event, email, phone, user_agent, url, event_id } = payload;

        console.log(`TikTok Event requested: ${event || 'CompleteRegistration'} (Event ID: ${event_id})`);

        const accessToken = Deno.env.get('TIKTOK_ACCESS_TOKEN');
        const pixelCode = "D6T7OHRC77U5LJB3IODG"; // From user instructions

        if (!accessToken) {
            console.error("TIKTOK_ACCESS_TOKEN is not set in Supabase secrets.");
            return new Response(JSON.stringify({ error: "Configuration Error: Access Token Missing" }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 500
            });
        }

        // 1. Hash PII Data
        const hashedEmail = await sha256(email);
        const hashedPhone = await sha256(phone);

        // 2. Extract Client IP from Headers
        const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || '';

        // 3. Build TikTok API Payload
        const tiktokPayload = {
            event_source: "web",
            event_source_id: pixelCode,
            data: [
                {
                    event: event || "CompleteRegistration",
                    event_time: Math.floor(Date.now() / 1000),
                    event_id: event_id || `rec_${Date.now()}_${Math.random().toString(36).substring(7)}`,
                    context: {
                        page: { url: url || "" },
                        user: {
                            email: hashedEmail,
                            phone: hashedPhone,
                            ip: clientIp.split(',')[0].trim(), // Take first IP if comma separated
                            user_agent: user_agent || ""
                        }
                    }
                }
            ]
        };

        const tiktokApiUrl = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

        console.log("Sending Event to TikTok...");
        const response = await fetch(tiktokApiUrl, {
            method: 'POST',
            headers: {
                'Access-Token': accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tiktokPayload)
        });

        const responseData = await response.json();

        if (!response.ok || responseData.code !== 0) {
            console.error("TikTok API error:", responseData);
            throw new Error(responseData.message || `TikTok API returned status ${response.status}`);
        }

        console.log("TikTok Event sent successfully!", responseData);
        return new Response(JSON.stringify({ success: true, message: "TikTok Event sent successfully." }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
        });

    } catch (error: any) {
        console.error("Caught error in TikTok function:", error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
        });
    }
});
