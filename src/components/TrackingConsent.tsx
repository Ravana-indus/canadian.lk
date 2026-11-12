import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { applyConsent, trackEvent, trackPage } from '../lib/analytics';
import { CONSENT_EVENT, CONSENT_KEY, NO_CONSENT, readConsent, saveConsent, type Consent } from '../lib/consent';

export default function TrackingConsent() {
    const { pathname } = useLocation();
    const [consent, setConsent] = useState(readConsent);
    const [open, setOpen] = useState(() => readConsent() === null);
    const [choices, setChoices] = useState(() => readConsent() || NO_CONSENT);

    useEffect(() => {
        const update = (event: Event) => setConsent((event as CustomEvent<Consent>).detail);
        const sync = (event: StorageEvent) => { if (event.key === CONSENT_KEY || event.key === null) setConsent(readConsent()); };
        window.addEventListener(CONSENT_EVENT, update);
        window.addEventListener('storage', sync);
        return () => { window.removeEventListener(CONSENT_EVENT, update); window.removeEventListener('storage', sync); };
    }, []);

    useEffect(() => {
        applyConsent(consent || NO_CONSENT);
        trackPage(pathname);
    }, [consent, pathname]);

    useEffect(() => {
        const click = (event: MouseEvent) => {
            const link = event.target instanceof Element ? event.target.closest('a') : null;
            if (link && ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(new URL(link.href).hostname)) trackEvent('whatsapp_clicked');
        };
        document.addEventListener('click', click);
        return () => document.removeEventListener('click', click);
    }, []);

    const save = (next: Consent) => { setChoices(next); saveConsent(next); setOpen(false); };
    return <>
        <button type="button" onClick={() => { setChoices(consent || NO_CONSENT); setOpen(true); }} className="fixed bottom-3 left-3 z-40 rounded-full border border-gray-300 bg-white px-3 py-2 text-xs text-primary shadow-sm">Cookie settings</button>
        {open && <section aria-label="Cookie preferences" className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-5 shadow-xl">
            <div className="mx-auto max-w-5xl">
                <h2 className="text-lg font-semibold text-primary">Your privacy choices</h2>
                <p className="mt-2 text-sm text-secondary">With your permission, PostHog measures page visits and application activity. Meta and TikTok help us measure advertising. We do not send your application answers or documents to PostHog or Meta. You can change your choices here anytime.</p>
                <div className="my-4 flex flex-wrap gap-6 text-sm">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={choices.analytics} onChange={e => setChoices({ ...choices, analytics: e.target.checked })} />Analytics (PostHog)</label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={choices.marketing} onChange={e => setChoices({ ...choices, marketing: e.target.checked })} />Advertising (Meta and TikTok)</label>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={() => save(NO_CONSENT)} className="rounded border border-primary px-4 py-2 text-sm text-primary">Reject optional</button>
                    <button type="button" onClick={() => save(choices)} className="rounded border border-primary px-4 py-2 text-sm text-primary">Save choices</button>
                    <button type="button" onClick={() => save({ analytics: true, marketing: true })} className="rounded bg-primary px-4 py-2 text-sm text-white">Accept all</button>
                </div>
            </div>
        </section>}
    </>;
}
