import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import MapleLeaf from './ui/MapleLeaf';

export default function Footer() {
    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/" className="text-2xl font-serif font-bold text-white mb-6 flex items-center">
                            <MapleLeaf className="w-6 h-6 mr-3 text-white" /> Canadian.lk
                        </Link>
                        <p className="text-gray-300 mb-6 font-sans text-sm leading-relaxed">
                            Their journey beyond borders begins with us. We bridge the gap between Sri Lankan talent and Canadian educational opportunities.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-serif font-semibold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-gray-300 hover:text-cta transition-colors text-sm flex items-center group"><ArrowRight size={14} className="mr-2 text-cta opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> About Us</Link></li>
                            <li><Link to="/services" className="text-gray-300 hover:text-cta transition-colors text-sm flex items-center group"><ArrowRight size={14} className="mr-2 text-cta opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Our Services</Link></li>
                            <li><Link to="/programs" className="text-gray-300 hover:text-cta transition-colors text-sm flex items-center group"><ArrowRight size={14} className="mr-2 text-cta opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> In-Demand Programs</Link></li>
                            <li><Link to="/flight-plan" className="text-gray-300 hover:text-cta transition-colors text-sm flex items-center group"><ArrowRight size={14} className="mr-2 text-cta opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> The Flight Plan</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-serif font-semibold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Services</h4>
                        <ul className="space-y-3">
                            <li className="text-gray-300 text-sm">University Admissions</li>
                            <li className="text-gray-300 text-sm">Student Loans up to $65k</li>
                            <li className="text-gray-300 text-sm">Visa & Immigration</li>
                            <li className="text-gray-300 text-sm">PGWP Alignment</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-serif font-semibold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin size={18} className="text-cta mr-3 mt-1 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">Dehiwala/Colombo<br />Sri Lanka</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={18} className="text-cta mr-3 flex-shrink-0" />
                                <a href="https://wa.me/94751132642" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">+94 75 113 2642</a>
                            </li>
                            <li className="flex items-center">
                                <Mail size={18} className="text-cta mr-3 flex-shrink-0" />
                                <a href="mailto:info@canadian.lk" className="text-gray-300 hover:text-white transition-colors text-sm">info@canadian.lk</a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Canadian.lk. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
