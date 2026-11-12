import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { initMetaPixel, trackMeta } from '../lib/meta';

export default function RootLayout() {
    const location = useLocation();
    const isFirstRender = useRef(true);

    // Meta: init once, then count tel:/mailto:/WhatsApp clicks as Contact.
    useEffect(() => {
        initMetaPixel();
        const onClick = (e: MouseEvent) => {
            const href = (e.target as Element).closest?.('a')?.getAttribute('href') || '';
            if (/^(tel:|mailto:|sms:)|wa\.me|whatsapp/i.test(href)) trackMeta('Contact');
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    // Meta: every route (incl. first load) is a PageView (browser) + ViewContent (browser + server).
    useEffect(() => {
        (window as any).fbq?.('track', 'PageView');
        trackMeta('ViewContent');
    }, [location.pathname]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        // Track page view on route change
        if ((window as any).ttq) {
            (window as any).ttq.page();
        }
    }, [location.pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
