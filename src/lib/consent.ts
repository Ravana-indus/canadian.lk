export type Consent = { analytics: boolean; marketing: boolean };
export const CONSENT_KEY = 'canadian.lk.consent.v1';
export const CONSENT_EVENT = 'canadian:consent';
export const NO_CONSENT: Consent = { analytics: false, marketing: false };

export function readConsent(): Consent | null {
    try {
        const value = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
        return typeof value?.analytics === 'boolean' && typeof value?.marketing === 'boolean'
            ? { analytics: value.analytics, marketing: value.marketing } : null;
    } catch { return null; }
}

export function saveConsent(consent: Consent) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(consent)); } catch { /* Still apply for this visit. */ }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
}
