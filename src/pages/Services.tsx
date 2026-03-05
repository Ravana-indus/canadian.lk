import { GraduationCap, Landmark, Plane, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MapleLeaf from '../components/ui/MapleLeaf';
import LoanCalculator from '../components/LoanCalculator';

export default function Services() {
    return (
        <div className="w-full bg-background min-h-screen">
            <Helmet>
                <title>Our Services | Canadian.lk — Admissions, Loans & Visa Support</title>
                <meta name="description" content="Explore Canadian.lk services: university admissions to top Canadian colleges, student loans up to CAD $65,000 at 11.95% APR, and comprehensive visa guidance." />
                <link rel="canonical" href="https://www.canadian.lk/services" />
            </Helmet>
            {/* Page Header */}
            <section className="pt-40 pb-20 bg-background text-center px-4 relative overflow-hidden">
                <MapleLeaf className="absolute -top-20 -right-20 w-96 h-96 text-primary/10 z-0 transform rotate-12" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 flex items-center justify-center">
                        Our Core <span className="text-cta italic ml-2 mr-2">Services</span> <MapleLeaf className="w-10 h-10 ml-2 text-primary" />
                    </h1>
                    <p className="text-xl text-secondary font-sans max-w-2xl mx-auto">
                        An integrated platform facilitating every aspect of your journey through our verified partners: Admissions, Financing, and Visas.
                    </p>
                </div>
            </section>

            {/* 1. University Admissions */}
            <section className="py-20 bg-white overflow-hidden relative z-10 -mt-8 rounded-t-3xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 order-2 lg:order-1 relative">
                            <div className="absolute inset-0 bg-blue-50 -translate-x-4 translate-y-4 rounded-2xl -z-10"></div>
                            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="University Campus" className="rounded-2xl shadow-lg w-full object-cover h-[450px]" />
                            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-xl shadow-xl flex items-center">
                                <GraduationCap size={32} className="text-cta mr-4" />
                                <div>
                                    <p className="font-bold text-xl">Top 100+</p>
                                    <p className="text-sm text-gray-300">Partner Institutions</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 order-1 lg:order-2">
                            <h2 className="text-3xl font-serif font-bold text-primary mb-4 flex items-center"><span className="text-cta text-4xl mr-4">01.</span> University Admissions</h2>
                            <div className="w-16 h-1 bg-cta mb-8"></div>
                            <p className="text-secondary text-lg leading-relaxed mb-6">
                                Our partners handle the headache of selecting and applying to Canadian institutions. We facilitate mapping your academic profile to programs that provide the highest probability of gaining a PGWP.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <CheckCircle2 size={20} className="text-cta mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-secondary"><strong>Institutional Matching:</strong> Identifying colleges with swift processing times and high visa success rates in your target province.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 size={20} className="text-cta mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-secondary"><strong>PGWP-Eligible Screening:</strong> Ensuring every recommended program automatically qualifies for the Post-Graduation Work Permit.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 size={20} className="text-cta mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-secondary"><strong>Application Packaging:</strong> Partner teams edit essays and compile documents to ensure an error-free, rapid offer letter processing.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Educational Loans */}
            <section className="py-20 bg-background overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-serif font-bold text-primary mb-4 flex items-center"><span className="text-cta text-4xl mr-4">02.</span> Student Loans</h2>
                            <div className="w-16 h-1 bg-cta mb-8"></div>
                            <h3 className="text-xl font-bold text-primary mb-4">Facilitating Funding Up To CAD $65,000</h3>
                            <p className="text-secondary text-lg leading-relaxed mb-6">
                                Most students quit their Canadian dream because they can't show immediate proof of funds. We connect you to leading Sri Lankan commercial banks at student-friendly rates to secure your education loan.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                    <h4 className="font-bold text-primary mb-2 flex items-center"><ShieldCheck size={18} className="text-cta mr-2" /> What It Covers</h4>
                                    <p className="text-sm text-secondary">Full course tuition, living expenses (GIC), and even your flight tickets to Canada.</p>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                    <h4 className="font-bold text-primary mb-2 flex items-center"><Landmark size={18} className="text-cta mr-2" /> Salary-Based Repayment</h4>
                                    <p className="text-sm text-secondary">Repayments are calculated against your projected Canadian graduate salary, ensuring debt remains manageable.</p>
                                </div>
                            </div>
                            <Link to="/apply" className="inline-flex items-center text-cta font-semibold hover:text-yellow-700 transition-colors">
                                Verify your loan eligibility now <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <LoanCalculator />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Visa & Immigration */}
            <section className="py-20 bg-white border-t border-gray-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 order-2 lg:order-1 relative">
                            <div className="absolute inset-0 bg-blue-50 -translate-x-4 translate-y-4 rounded-2xl -z-10"></div>
                            <img src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Passport and Visa" className="rounded-2xl shadow-lg w-full object-cover h-[450px]" />
                            <div className="absolute -top-6 -left-6 bg-cta text-white p-6 rounded-xl shadow-xl flex items-center">
                                <Plane size={32} className="text-primary mr-4" />
                                <div>
                                    <p className="font-bold text-xl">RCIC Partner</p>
                                    <p className="text-sm font-medium text-primary">Consultants Network</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 order-1 lg:order-2">
                            <h2 className="text-3xl font-serif font-bold text-primary mb-4 flex items-center"><span className="text-cta text-4xl mr-4">03.</span> Visa & Immigration</h2>
                            <div className="w-16 h-1 bg-cta mb-8"></div>
                            <p className="text-secondary text-lg leading-relaxed mb-6">
                                The Canadian study permit application requires clinical precision. Because our platform coordinates your loan and university offer details, our partner immigration team has immediate access to the perfect financial and academic proof needed to process the visa stage.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <CheckCircle2 size={20} className="text-cta mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-secondary"><strong>SOP Drafting Guidance:</strong> Our partners instruct you on phrasing the Statement of Purpose to explicitly prove your intent to study and your financial stability.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 size={20} className="text-cta mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-secondary"><strong>Financial Proof Bundling:</strong> Seamlessly attaching your approved CAD $65,000 loan documentation to satisfy IRCC demands.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 size={20} className="text-cta mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-secondary"><strong>Pre-Departure Briefing:</strong> What to expect at the border, how to activate your SIN, and basic integration advice.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-center px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold text-white mb-6">Ready to secure your spot?</h2>
                    <p className="text-gray-300 mb-8 font-sans text-lg">Talk to an academic advisor today and map out your personalized journey.</p>
                    <Link to="/apply" className="px-8 py-4 bg-cta text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 hover:shadow-xl transition-all duration-300 inline-block">
                        Book Your Free Consultation
                    </Link>
                </div>
            </section>
        </div>
    );
}
