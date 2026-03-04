import { Shield, Building, Award, Users, CheckCircle2 } from 'lucide-react';
import MapleLeaf from '../components/ui/MapleLeaf';

export default function About() {
    return (
        <div className="w-full">
            {/* Page Header */}
            <section className="pt-40 pb-20 bg-background text-center px-4 relative overflow-hidden">
                <MapleLeaf className="absolute top-0 right-0 w-64 h-64 text-primary/10 z-0 transform translate-x-1/2 -translate-y-1/2" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 flex items-center justify-center">
                        About <span className="text-cta italic ml-2 mr-2">Canadian.lk</span> <MapleLeaf className="w-10 h-10 ml-2 text-primary" />
                    </h1>
                    <p className="text-xl text-secondary font-sans max-w-2xl mx-auto">
                        We are Sri Lanka's leading educational facilitator, acting as your central hub connecting you to verified Canadian university admissions partners and student and financial advisors.
                    </p>
                </div>
            </section>

            {/* Our Mission */}
            <section className="py-24 bg-white relative overflow-hidden z-10 -mt-8 rounded-t-3xl">
                <MapleLeaf className="absolute -top-20 -right-20 w-96 h-96 text-gray-50 z-0 transform -rotate-12" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6 flex items-center">Our Mission <MapleLeaf className="w-8 h-8 ml-3 text-primary" /></h2>
                            <div className="w-20 h-1 bg-cta mb-8"></div>
                            <p className="text-secondary text-lg leading-relaxed mb-6">
                                For years, talented Sri Lankan students have been held back from world-class Canadian education by two massive hurdles: the lack of immediate upfront funding and the overwhelming complexity of the visa process.
                            </p>
                            <p className="text-secondary text-lg leading-relaxed">
                                Canadian.lk exists to aggregate these solutions into one seamless platform. By connecting you with expert university matching and facilitating a CAD $65,000 student loan program through our financial partners, we remove the friction from your pathway to success.
                            </p>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 rounded-2xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1503756234508-e32369269deb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                alt="Toronto Skyline Canada"
                                className="relative z-10 rounded-2xl shadow-xl object-cover h-[400px] w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Trust Us */}
            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Why Trust Us</h2>
                        <p className="text-secondary text-lg max-w-2xl mx-auto">You are making one of the biggest investments of your life. You need the safest hands.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-6">
                                <Building size={32} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-primary mb-4">Verified Partnerships</h3>
                            <p className="text-secondary leading-relaxed mb-6">
                                Our network works directly with top-tier Canadian colleges and universities, ensuring swift offer letters and programs perfectly aligned with PGWP (Post-Graduation Work Permit) eligibility.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-sm text-primary font-medium"><CheckCircle2 size={16} className="text-cta mr-2" /> Guaranteed acceptance pathways</li>
                                <li className="flex items-center text-sm text-primary font-medium"><CheckCircle2 size={16} className="text-cta mr-2" /> In-demand course selections</li>
                            </ul>
                        </div>

                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform md:-translate-y-4 border-t-4 border-t-cta relative">
                            <div className="absolute top-0 right-0 bg-cta text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">EXCLUSIVE</div>
                            <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-6">
                                <Shield size={32} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-primary mb-4">Transparent Facilitation</h3>
                            <p className="text-secondary leading-relaxed mb-6">
                                We connect you to financial institutions that provide access to up to CAD $65,000 to cover tuition and living expenses, utilizing unique salary-based repayment models.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-sm text-primary font-medium"><CheckCircle2 size={16} className="text-cta mr-2" /> No hidden processing fees</li>
                                <li className="flex items-center text-sm text-primary font-medium"><CheckCircle2 size={16} className="text-cta mr-2" /> Fixed manageable interest rates</li>
                            </ul>
                        </div>

                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-6">
                                <Award size={32} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-primary mb-4">RCIC Partner Network</h3>
                            <p className="text-secondary leading-relaxed mb-6">
                                Your study permit application is handled directly by our affiliated network of Regulated Canadian Immigration Consultants (RCICs) sanctioned by the Canadian government.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-sm text-primary font-medium"><CheckCircle2 size={16} className="text-cta mr-2" /> Highest industry approval rates</li>
                                <li className="flex items-center text-sm text-primary font-medium"><CheckCircle2 size={16} className="text-cta mr-2" /> Bulletproof SOP drafting</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Team */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-cta rounded-full mb-6">
                        <Users size={32} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-primary mb-6">Supported By Experts</h2>
                    <p className="text-secondary text-lg max-w-3xl mx-auto leading-relaxed mb-12">
                        Behind Canadian.lk is an integrated network of former international students, seasoned financial advisors, and licensed immigration partners who collaborate to guide students to Canada.
                    </p>
                    <p className="text-sm text-gray-400 italic">Individual consultant profiles are provided during your confidential 1-on-1 consultation session.</p>
                </div>
            </section>
        </div>
    );
}
