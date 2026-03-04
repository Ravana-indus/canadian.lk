import { Link } from 'react-router-dom';
import { ShieldCheck, TrendingUp, Zap, PiggyBank, GraduationCap, Briefcase, FileText, CheckCircle } from 'lucide-react';
import MapleLeaf from '../components/ui/MapleLeaf';

export default function Home() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-background">
                {/* Subtle decorative background pattern */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_100%)] z-0 mix-blend-overlay"></div>
                <MapleLeaf className="absolute -top-24 -right-24 w-96 h-96 text-primary/10 z-0 transform rotate-12" />
                <MapleLeaf className="absolute bottom-10 left-10 w-32 h-32 text-primary/10 z-0 transform -rotate-12" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary leading-tight mb-6">
                            Their journey beyond borders <span className="text-cta italic">begins with us.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-secondary mb-10 font-sans leading-relaxed max-w-2xl">
                            Turn your Canadian study dreams into reality. We connect you with verified Canadian partners to manage your admissions, facilitate student loans up to <strong className="text-primary font-bold">CAD $65,000</strong>, and provide expert visa support.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/apply" className="px-8 py-4 bg-cta text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 hover:shadow-xl transition-all duration-300 text-center flex-1 sm:flex-none">
                                Calculate My Loan Limit
                            </Link>
                            <Link to="/apply" className="px-8 py-4 bg-white border border-gray-200 text-primary font-semibold rounded-full hover:shadow-md transition-all duration-300 text-center flex-1 sm:flex-none">
                                Apply Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Canadian.lk Section */}
            <section className="py-24 bg-background relative z-10 -mt-8 rounded-t-3xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4 flex items-center justify-center">
                            Why Canadian.lk? <MapleLeaf className="w-8 h-8 ml-3 text-primary" />
                        </h2>
                        <div className="w-24 h-1 bg-cta mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                            <div className="w-14 h-14 bg-blue-50 text-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-primary mb-3">Cover Your Entire Journey</h3>
                            <p className="text-secondary text-base leading-relaxed">Access student loans up to CAD $65,000 to easily pay for both your course fees and daily living expenses in Canada.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                            <div className="w-14 h-14 bg-blue-50 text-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <TrendingUp size={28} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-primary mb-3">Future-Ready Careers</h3>
                            <p className="text-secondary text-base leading-relaxed">We connect you with degrees that directly solve Canada's current skill shortages, setting you up for long-term career success.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                            <div className="w-14 h-14 bg-blue-50 text-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <Zap size={28} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-primary mb-3">Speedy Approvals</h3>
                            <p className="text-secondary text-base leading-relaxed">Say goodbye to delays. Our optimized partner network is structured to fast-track your university offers and loan processing.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                            <div className="w-14 h-14 bg-blue-50 text-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <PiggyBank size={28} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-primary mb-3">Student-Friendly Rates</h3>
                            <p className="text-secondary text-base leading-relaxed">Enjoy highly competitive interest rates that make paying back your educational loan manageable and entirely stress-free.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Setting You Up For Success */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6 leading-tight">Setting You Up for <br /><span className="text-cta">Success in Canada</span></h2>
                            <p className="text-secondary mb-6 text-lg leading-relaxed">
                                Through our Canadian network, we focus on placing you in academic programs that the Canadian job market actively needs right now. Every recommended course is verified to ensure it meets current Post-Graduation Work Permit (PGWP) standards.
                            </p>
                            <p className="text-secondary mb-8 text-lg leading-relaxed">
                                This gives you the best possible shot at gaining valuable Canadian work experience after you graduate.
                            </p>

                            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                                <h4 className="font-bold text-primary mb-2 flex items-center"><CheckCircle size={18} className="mr-2" /> Important Note</h4>
                                <p className="text-sm text-secondary italic">
                                    While we build a strong foundation for your future, landing a job and receiving final permit approvals will always depend on your personal academic performance, your hard work, and any updates to Canadian immigration laws.
                                </p>
                            </div>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <div className="grid grid-cols-2 gap-4">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Canada.svg/1200px-Flag_of_Canada.svg.png" alt="Canadian Flag" className="rounded-2xl shadow-md w-full h-64 object-cover" />
                                <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80" alt="Canadian Campus" className="rounded-2xl shadow-md w-full h-64 object-cover mt-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Flight Plan Steps */}
            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">How It Works: Your Flight Plan</h2>
                        <p className="text-secondary text-lg max-w-2xl mx-auto">Five simple steps to take you from Sri Lanka to Canada securely and with full financial backing.</p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

                        {/* Step 1 */}
                        <div className="relative flex flex-col md:flex-row items-center mb-12 sm:mb-20">
                            <div className="flex md:hidden items-center justify-center w-12 h-12 bg-primary text-white rounded-full border-4 border-background z-10 mb-4 text-center">
                                <GraduationCap size={20} />
                            </div>
                            <div className="md:w-1/2 md:pr-12 text-center md:text-right mb-6 md:mb-0 w-full">
                                <h3 className="text-xl font-serif font-bold text-primary mb-2">1. Choose Your Path</h3>
                                <p className="text-secondary text-base leading-relaxed">Let us help you pinpoint the perfect Canadian institution and course that matches your specific career goals.</p>
                            </div>
                            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-12 h-12 bg-primary text-white rounded-full border-4 border-background z-10 text-center">
                                <GraduationCap size={20} />
                            </div>
                            <div className="md:w-1/2 md:pl-12 w-full hidden md:block"></div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex flex-col md:flex-row items-center mb-12 sm:mb-20">
                            <div className="flex md:hidden items-center justify-center w-12 h-12 bg-primary text-white rounded-full border-4 border-background z-10 mb-4 text-center">
                                <PiggyBank size={20} />
                            </div>
                            <div className="md:w-1/2 md:pr-12 w-full hidden md:block"></div>
                            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-12 h-12 bg-primary text-white rounded-full border-4 border-background z-10 text-center">
                                <PiggyBank size={20} />
                            </div>
                            <div className="md:w-1/2 md:pl-12 text-center md:text-left mt-6 md:mt-0 w-full flex flex-col items-center md:items-start">
                                <h3 className="text-xl font-serif font-bold text-primary mb-2">2. Check Your Loan Limits</h3>
                                <p className="text-secondary text-base leading-relaxed mb-3">Instantly find out how much you can borrow to fund your education.</p>
                                <Link to="/apply" className="text-cta font-medium hover:text-yellow-700 transition-colors inline-flex items-center text-base">Verify Loan Eligibility <span className="ml-1">↗</span></Link>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex flex-col md:flex-row items-center mb-12 sm:mb-20">
                            <div className="flex md:hidden items-center justify-center w-12 h-12 bg-primary text-white rounded-full border-4 border-background z-10 mb-4 text-center">
                                <FileText size={20} />
                            </div>
                            <div className="md:w-1/2 md:pr-12 text-center md:text-right mb-6 md:mb-0 w-full">
                                <h3 className="text-xl font-serif font-bold text-primary mb-2">3. Secure Your Admission</h3>
                                <p className="text-secondary text-base leading-relaxed">Hand over your academic documents, and our partner network will take care of the entire university application process to get your official offer letter.</p>
                            </div>
                            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-12 h-12 bg-primary text-white rounded-full border-4 border-background z-10 text-center">
                                <FileText size={20} />
                            </div>
                            <div className="md:w-1/2 md:pl-12 w-full hidden md:block"></div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative flex flex-col md:flex-row items-center mb-12 sm:mb-20">
                            <div className="flex md:hidden items-center justify-center w-12 h-12 bg-primary text-white rounded-full border-4 border-background z-10 mb-4 text-center">
                                <Zap size={20} />
                            </div>
                            <div className="md:w-1/2 md:pr-12 w-full hidden md:block"></div>
                            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-12 h-12 bg-primary text-white rounded-full border-4 border-background z-10 text-center">
                                <Zap size={20} />
                            </div>
                            <div className="md:w-1/2 md:pl-12 text-center md:text-left mt-6 md:mt-0 w-full items-center md:items-start flex flex-col">
                                <h3 className="text-xl font-serif font-bold text-primary mb-2">4. Finalize Your Student Loan</h3>
                                <p className="text-secondary text-base leading-relaxed">We calculate a sensible borrowing amount based on what you can realistically earn after graduating, ensuring you are never overwhelmed by debt. Submit your final details to lock in your funds.</p>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="relative flex flex-col md:flex-row items-center">
                            <div className="flex md:hidden items-center justify-center w-12 h-12 bg-primary text-white rounded-full border-4 border-background z-10 mb-4 text-center">
                                <Briefcase size={20} />
                            </div>
                            <div className="md:w-1/2 md:pr-12 text-center md:text-right mb-6 md:mb-0 w-full relative z-20">
                                <h3 className="text-xl font-serif font-bold text-primary mb-2">5. Obtain Your Study Visa</h3>
                                <p className="text-secondary text-base leading-relaxed">With your acceptance letter and loan sorted, our RCIC-regulated partners will guide you through compiling a bulletproof study permit application for the Canadian government.</p>
                            </div>
                            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-12 h-12 bg-primary text-white rounded-full border-4 border-background z-10 text-center">
                                <Briefcase size={20} />
                            </div>
                            <div className="md:w-1/2 md:pl-12 w-full hidden md:block"></div>
                        </div>

                    </div>

                    <div className="text-center mt-20">
                        <Link to="/flight-plan" className="px-8 py-4 bg-white text-primary border border-gray-200 font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-300 inline-block">
                            View Full Flight Plan Details
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
