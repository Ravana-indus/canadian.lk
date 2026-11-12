import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { trackMeta } from '../lib/meta';
import TrackingConsent from '../components/TrackingConsent';
import { readConsent } from '../lib/consent';

export default function RootLayout() {
    const location = useLocation();
    const lastPath = useRef(location.pathname);

    // Count contact-link clicks only when advertising consent is active.
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const href = (e.target as Element).closest?.('a')?.getAttribute('href') || '';
            if (/^(tel:|mailto:|sms:)|wa\.me|whatsapp/i.test(href)) trackMeta('Contact');
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    useEffect(() => {
        if (lastPath.current === location.pathname) return;
        lastPath.current = location.pathname;
        // Track page view on route change
        if (readConsent()?.marketing && window.ttq) {
            window.ttq.page();
        }
    }, [location.pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            <TrackingConsent />
        </div>
    );
}
