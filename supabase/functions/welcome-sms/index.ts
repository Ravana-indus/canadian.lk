import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SMS_CREDENTIALS = {
    username: 'pathu122',
    password: 'Thesmspass1!',
    login_url: 'https://e-sms.dialog.lk/api/v1/login',
    sms_url: 'https://e-sms.dialog.lk/api/v2/sms'
};

const MESSAGES = {
    'German.lk': "Welcome to German.lk, You will be contacted by our representative soon, if you need urgent assistance please call 0112 581 181",
    'Canadian.lk': "Welcome to Canadian.lk! Your Canada journey begins here. A consultant will reach out shortly. For urgent help, call 0112 581 181",
    'riftUni.com': "Welcome to RiftUni.com! Your PTE/IELTS journey begins here. A consultant will reach out shortly. For urgent help, call 0112 581 181"
};

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function formatSriLankanNumber(number: string) {
    if (!number) return null;
    let cleanNumber = number.toString().replace(/\D/g, '');
    if (cleanNumber.startsWith('0094')) cleanNumber = '0' + cleanNumber.slice(4);
    else if (cleanNumber.startsWith('94')) cleanNumber = '0' + cleanNumber.slice(2);
    if (cleanNumber.length === 9 && /^[7]/.test(cleanNumber)) {
        cleanNumber = '0' + cleanNumber;
    }
    return cleanNumber.length === 10 ? cleanNumber : null;
}

function isValidSriLankanNumber(number: string) {
    if (!number || number.length !== 10) return false;
    const validPrefixes = ['070', '071', '072', '074', '075', '076', '077', '078'];
    return validPrefixes.some(prefix => number.startsWith(prefix));
}

Deno.serve(async (req: Request) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const payload = await req.json();
        const { mobile_number, source, message } = payload;

        console.log(`SMS requested for: ${mobile_number} from source: ${source || 'Unknown'}`);

        if (!mobile_number) {
            return new Response(JSON.stringify({ error: "No mobile_number provided" }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            });
        }

        const formattedNumber = formatSriLankanNumber(mobile_number);
        console.log("Formatted number:", formattedNumber);

        if (!formattedNumber || !isValidSriLankanNumber(formattedNumber)) {
            console.log("Invalid Sri Lankan number, skipping SMS.");
            return new Response(JSON.stringify({ success: true, message: "Not a valid Sri Lankan number. Skipped SMS." }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            });
        }

        // 1. Get Access Token
        console.log("Authenticating with Dialog API...");
        const loginResponse = await fetch(SMS_CREDENTIALS.login_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: SMS_CREDENTIALS.username,
                password: SMS_CREDENTIALS.password
            })
        });

        const loginData = await loginResponse.json();
        
        if (!loginResponse.ok || loginData.status !== 'success' || !loginData.token) {
            const errorMsg = loginData.comment || `Authentication failed (Status: ${loginResponse.status})`;
            console.error("Authentication failed:", errorMsg);
            throw new Error(errorMsg);
        }

        const token = loginData.token;

        // Determine message based on source or custom message
        const welcomeMessage = message || MESSAGES[source as keyof typeof MESSAGES] || MESSAGES['German.lk'];
        console.log(`Using message for: ${source || 'Default (German.lk)'}`);

        // 2. Send SMS
        console.log("Sending SMS to:", formattedNumber);
        const smsResponse = await fetch(SMS_CREDENTIALS.sms_url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                msisdn: [{ mobile: formattedNumber }],
                message: welcomeMessage,
                transaction_id: String(Date.now()),
                payment_method: 0
            })
        });

        if (!smsResponse.ok) {
            const errorText = await smsResponse.text();
            console.error("SMS HTTP error:", smsResponse.status, errorText);
            throw new Error(`SMS HTTP error! status: ${smsResponse.status}`);
        }

        const smsData = await smsResponse.json();
        
        if (smsData.status !== 'success') {
            const errorMsg = smsData.comment || `SMS sending failed (Status: ${smsData.status})`;
            console.error("SMS sending failed:", errorMsg);
            throw new Error(errorMsg);
        }

        console.log("SMS sent successfully!");
        return new Response(JSON.stringify({ success: true, message: "Welcome SMS sent successfully." }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
        });

    } catch (error: any) {
        console.error("Caught error in SMS function:", error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
        });
    }
});