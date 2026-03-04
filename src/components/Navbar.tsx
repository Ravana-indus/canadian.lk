import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import MapleLeaf from './ui/MapleLeaf';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Programs', path: '/programs' },
        { name: 'Flight Plan', path: '/flight-plan' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <Link to="/" className="text-2xl font-serif font-bold text-primary flex items-center">
                    <MapleLeaf className="w-6 h-6 mr-2 text-primary" /> Canadian.lk
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium transition-colors hover:text-cta ${location.pathname === link.path ? 'text-cta font-semibold' : 'text-secondary'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/apply" className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-secondary transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer">
                        Apply Now
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button className="md:hidden text-primary cursor-pointer p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 py-4 px-4 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block py-2 text-base font-medium ${location.pathname === link.path ? 'text-cta font-semibold' : 'text-secondary'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/apply" onClick={() => setMobileMenuOpen(false)} className="bg-primary text-white px-6 py-3 rounded-lg font-medium text-center shadow-md">
                        Apply Now
                    </Link>
                </div>
            )}
        </header>
    );
}
