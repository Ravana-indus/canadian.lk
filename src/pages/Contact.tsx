import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';
import MapleLeaf from '../components/ui/MapleLeaf';

export default function Contact() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = [
        {
            question: "Do I need collateral for the CAD $65,000 loan?",
            answer: "While standard terms depend on the partner bank's assessment of your family's financial profile, our unique salary-based repayment model often minimizes or restructures traditional collateral requirements compared to standard personal loans."
        },
        {
            question: "What are the interest rates?",
            answer: "We have negotiated student-friendly, highly competitive interest rates with top Sri Lankan commercial banks. Exact rates fluctuate slightly based on market conditions, but they remain significantly better than standard unsecured loans."
        },
        {
            question: "What happens if my visa is rejected?",
            answer: "If your study permit is rejected by the IRCC, the partner banks usually cancel the loan disbursement without heavy penalties. Any tuition fees paid to the university are fully refunded (minus a small administrative fee) as per standard Canadian educational policies."
        },
        {
            question: "Can I work part-time while studying?",
            answer: "Yes. International students in Canada can typically work up to 20 hours per week off-campus during regular academic sessions, and full-time during scheduled breaks like winter or summer holidays."
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Quick demonstration form action
        alert("Thank you! Your message has been sent. An advisor will contact you shortly.");
    };

    return (
        <div className="w-full">
            {/* Page Header */}
            <section className="pt-40 pb-20 bg-background text-center px-4 relative overflow-hidden">
                <MapleLeaf className="absolute top-0 right-0 w-64 h-64 text-primary/10 z-0 transform translate-x-1/2 -translate-y-1/2" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 flex items-center justify-center">
                        Get In <span className="text-cta italic ml-2 mr-2">Touch</span> <MapleLeaf className="w-10 h-10 ml-2 text-primary" />
                    </h1>
                    <p className="text-xl text-secondary font-sans max-w-2xl mx-auto">
                        Take the first step. Our advisors are ready to answer your questions and evaluate your profile.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-24 bg-background relative z-10 -mt-8 rounded-t-3xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* Left: Contact Info */}
                        <div className="lg:w-1/3">
                            <h2 className="text-3xl font-serif font-bold text-primary mb-8">Reach Out Directly</h2>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-cta mr-4 flex-shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">Our Office</h4>
                                        <p className="text-secondary text-sm leading-relaxed">Dehiwala/Colombo<br />Sri Lanka<br /><span className="text-gray-400 italic">(By appointment only)</span></p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-cta mr-4 flex-shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">Phone / WhatsApp</h4>
                                        <a href="https://wa.me/94751132642" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-cta transition-colors text-sm font-medium flex items-center">
                                            <MessageCircle size={16} className="mr-2 text-green-500" /> +94 75 113 2642
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-cta mr-4 flex-shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">Email Support</h4>
                                        <a href="mailto:info@canadian.lk" className="text-secondary hover:text-cta transition-colors text-sm font-medium">info@canadian.lk</a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 bg-primary p-8 rounded-2xl text-white">
                                <h4 className="font-serif font-bold text-xl mb-3">Fastest Response</h4>
                                <p className="text-sm text-gray-300 mb-6">Message us directly on WhatsApp to get immediate answers.</p>
                                <a href="https://wa.me/94751132642" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center bg-[#25D366] text-white py-3 rounded-xl font-bold hover:bg-[#1DA851] transition-colors">
                                    <MessageCircle size={20} className="mr-2" /> Message on WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="lg:w-2/3">
                            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-3xl font-serif font-bold text-primary mb-8">Send Us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">Full Name</label>
                                            <input type="text" id="name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta transition-colors" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">Phone Number</label>
                                            <input type="tel" id="phone" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta transition-colors" placeholder="+94 77 XXX XXXX" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">Email Address</label>
                                        <input type="email" id="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta transition-colors" placeholder="john@example.com" />
                                    </div>
                                    <div>
                                        <label htmlFor="interest" className="block text-sm font-medium text-primary mb-2">Primary Interest</label>
                                        <select id="interest" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta transition-colors text-secondary">
                                            <option>University Admissions</option>
                                            <option>Student Loans ($65k)</option>
                                            <option>Visa & Immigration</option>
                                            <option>General Inquiry</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">Your Message</label>
                                        <textarea id="message" rows={4} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta transition-colors resize-none" placeholder="Tell us about your educational background and goals..."></textarea>
                                    </div>
                                    <button type="submit" className="w-full flex items-center justify-center bg-primary text-white py-4 rounded-xl font-bold hover:bg-secondary transition-colors cursor-pointer">
                                        <Send size={18} className="mr-2" /> Submit Inquiry
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Frequently Asked Questions</h2>
                        <p className="text-secondary text-lg">Clear answers to help you plan your journey directly.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'border-primary bg-blue-50/30' : 'border-gray-200 bg-white hover:border-cta/50'}`}
                            >
                                <button
                                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none cursor-pointer"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span className="font-serif font-bold text-primary text-lg">{faq.question}</span>
                                    {openFaq === index ? (
                                        <ChevronUp className="text-cta flex-shrink-0 ml-4" size={24} />
                                    ) : (
                                        <ChevronDown className="text-gray-400 flex-shrink-0 ml-4 hover:text-cta transition-colors" size={24} />
                                    )}
                                </button>

                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="text-secondary leading-relaxed pt-2 border-t border-gray-200/50 mt-2">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
