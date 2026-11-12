// Copies an accepted Apply-form submission into MigrationPortal (same public-leads
// endpoint and HMAC signing as german.lk's /api/migration-lead), branded Canadian.lk / Canada.
import { createHmac } from 'node:crypto';

const PUBLIC_LEADS_URL = 'https://fawfslpqudgkagyqcbwb.supabase.co/functions/v1/public-leads';
const ORIGIN = 'https://www.canadian.lk';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const json = (body: unknown, status = 200) => Response.json(body, { status });

// Trimmed string or undefined; rejects oversized values.
const str = (v: unknown, field: string, max = 500) => {
    if (v === undefined || v === null || v === '') return undefined;
    if (typeof v !== 'string' || v.trim().length > max) throw new Error(`Invalid ${field}`);
    return v.trim() || undefined;
};
const url = (v: unknown, field: string) => {
    const s = str(v, field, 2048);
    if (!s) return undefined;
    const u = new URL(s);
    if (u.protocol !== 'https:') throw new Error(`Invalid ${field}`);
    return u.toString();
};

export async function POST(request: Request) {
    const formId = process.env.MIGRATION_PORTAL_FORM_ID;
    const secret = process.env.MIGRATION_PORTAL_FORM_SECRET;
    if (!formId || !secret) return json({ error: 'MigrationPortal synchronization is not configured.' }, 503);

    let submissionId: string, payload: Record<string, unknown>;
    try {
        const b = await request.json();
        submissionId = String(b?.submissionId || '');
        if (!UUID.test(submissionId)) throw new Error('Invalid submissionId');
        const firstName = str(b.firstName, 'firstName', 100);
        const lastName = str(b.lastName, 'lastName', 100);
        const email = str(b.email, 'email', 254);
        const phoneNumber = str(b.phoneNumber, 'phoneNumber', 32);
        if (!firstName || !lastName) throw new Error('Invalid name');
        if (!email && !phoneNumber) throw new Error('A contact method is required');
        const other = Array.isArray(b.otherUrls) ? b.otherUrls.slice(0, 10).map((u: unknown, i: number) => url(u, `otherUrls[${i}]`)).filter(Boolean) : [];
        const attribution: Record<string, string> = {};
        if (b.attribution && typeof b.attribution === 'object') {
            for (const [k, v] of Object.entries(b.attribution).slice(0, 15)) {
                if (typeof v === 'string' && k.length <= 100 && v.length <= 500) attribution[k] = v;
            }
        }

        payload = {
            formId,
            firstName,
            lastName,
            email,
            phoneNumber,
            preferredLanguage: str(b.preferredLanguage, 'preferredLanguage', 50),
            address: str(b.address, 'address', 1000),
            city: str(b.city, 'city', 200),
            pathway: 'student',
            education: str(b.education, 'education', 2000),
            languageLevel: str(b.languageLevel, 'languageLevel', 200),
            fundingSource: str(b.fundingSource, 'fundingSource', 500),
            notes: `[CANADIAN.LK] Brand: Canadian.lk | Country: Canada\n${str(b.notes, 'notes', 4800) || ''}`.trim(),
            qualification: {
                hasDegree: str(b.hasDegree, 'hasDegree', 100),
                hasALevelPasses: str(b.hasALevelPasses, 'hasALevelPasses', 100),
                hasRequiredGpa: str(b.hasRequiredGpa, 'hasRequiredGpa', 100),
                hasRequiredIelts: str(b.hasRequiredIelts, 'hasRequiredIelts', 100),
            },
            documents: {
                cvUrl: url(b.cvUrl, 'cvUrl'),
                transcriptUrl: url(b.transcriptUrl, 'transcriptUrl'),
                otherUrls: other.length ? other : undefined,
            },
            // Set server-side so the client can't change the brand.
            attribution: { ...attribution, brand: 'Canadian.lk', country: 'Canada', source: 'canadian.lk' },
            website: '',  // honeypot field the portal expects empty
        };
    } catch (e) {
        return json({ error: (e as Error).message }, 400);
    }

    const body = JSON.stringify(payload);
    try {
        const res = await fetch(PUBLIC_LEADS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Idempotency-Key': submissionId,
                'X-Form-Signature': createHmac('sha256', secret).update(body).digest('hex'),
                Origin: process.env.MIGRATION_PORTAL_FORM_ORIGIN || ORIGIN,
            },
            body,
            signal: AbortSignal.timeout(12_000),
        });
        const result = await res.json().catch(() => ({}));
        if (!res.ok) {
            console.error('MigrationPortal rejected lead', { status: res.status, submissionId, error: result?.error });
            return json({ error: result?.error || 'MigrationPortal did not accept the lead.' }, [400, 413, 429].includes(res.status) ? res.status : 502);
        }
        console.info('MigrationPortal lead synchronized', { submissionId, leadId: result?.leadId, replay: result?.replay });
        return json({ accepted: true, result });
    } catch (e) {
        console.error('MigrationPortal sync error', (e as Error).name);
        return json({ error: 'Unable to synchronize the lead.' }, 502);
    }
}
