import { Rocket, MessageSquare, Handshake, CheckCircle2, GraduationCap, PlaneTakeoff, ArrowDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import MapleLeaf from '../components/ui/MapleLeaf';

export default function FlightPlan() {
    const timelineSteps = [
        {
            icon: <MessageSquare size={24} className="text-white" />,
            title: "1. Consultation & Career Matching",
            description: "We evaluate your academic history, budget, and long-term career goals in Canada. Based on this, we map out 2-3 specific degree or diploma programs that guarantee PGWP eligibility and align with high-demand sectors like Tech, Healthcare, or Trades."
        },
        {
            icon: <Handshake size={24} className="text-white" />,
            title: "2. Loan Pre-Approval",
            description: "Before applying to any university, we assess your loan eligibility with our partner commercial banks in Sri Lanka. This gives you exact clarity on how much funding (up to CAD $65,000) you can receive for tuition and living expenses."
        },
        {
            icon: <GraduationCap size={24} className="text-white" />,
            title: "3. University Acceptance",
            description: "We compile your application data which our Canadian partners review and submit to the selected institutions. Their direct partnerships usually result in faster processing times, securing your official Letter of Acceptance (LOA)."
        },
        {
            icon: <CheckCircle2 size={24} className="text-white" />,
            title: "4. Loan Finalization & Disbursement",
            description: "With your LOA in hand, our financial partners finalize your educational loan. Funds are arranged to cover your first-year tuition upfront, as well as the required Guaranteed Investment Certificate (GIC) for your living expenses."
        },
        {
            icon: <PlaneTakeoff size={24} className="text-white" />,
            title: "5. Visa Application & Pre-Departure",
            description: "Our RCIC-regulated Canadian partners draft a comprehensive Statement of Purpose and bundle your financial proof to submit a robust Study Permit application to the IRCC. Once approved, our team provides a full pre-departure briefing before you board your flight."
        }
    ];

    return (
        <div className="w-full">
            <Helmet>
                <title>The Flight Plan | Canadian.lk — Your 5-Step Journey to Canada</title>
                <meta name="description" content="Follow the Canadian.lk Flight Plan — a clear 5-step roadmap from your first consultation in Colombo to landing in Canada with your study permit." />
                <link rel="canonical" href="https://www.canadian.lk/flight-plan" />
            </Helmet>
            {/* Page Header */}
            <section className="pt-40 pb-20 bg-background text-center px-4 relative overflow-hidden">
                <MapleLeaf className="absolute -top-10 -right-10 w-96 h-96 text-primary/10 z-0 transform rotate-45" />
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--color-cta)_0%,_transparent_50%)] z-0 mix-blend-overlay"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-full mb-6 relative">
                        <Rocket size={32} className="text-cta relative z-10" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 flex items-center justify-center">
                        The Canadian.lk <span className="text-cta italic ml-2 mr-2">Flight Plan</span> <MapleLeaf className="w-10 h-10 ml-2 text-primary" />
                    </h1>
                    <p className="text-xl text-secondary font-sans max-w-2xl mx-auto">
                        Your end-to-end roadmap from the first consultation in Colombo to landing in Canada.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="py-20 bg-background text-center px-4 relative z-10 -mt-8 rounded-t-3xl">
                <div className="max-w-3xl mx-auto">
                    <p className="text-secondary text-xl leading-relaxed">
                        We don't just facilitate applications. We architect your entire migration strategy through our verified partners. The Flight Plan is our signature all-in-one package designed to eliminate stress and guarantee precision at every single step.
                    </p>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 bg-gray-100 transform -translate-x-1/2 rounded-full"></div>

                        {timelineSteps.map((step, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row items-center mb-16 sm:mb-24 last:mb-0 group">

                                {/* Left Content */}
                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:order-3 md:pl-16 md:text-left'} text-center mb-8 md:mb-0`}>
                                    <div className="md:hidden flex items-center justify-center w-16 h-16 mx-auto rounded-full border-4 border-white shadow-lg z-10 bg-primary mb-6 transition-colors duration-300">
                                        {step.icon}
                                    </div>
                                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 text-left sm:text-center md:text-inherit">
                                        <h3 className="text-2xl font-serif font-bold text-primary mb-4 text-center md:text-inherit">{step.title}</h3>
                                        <p className="text-secondary leading-relaxed text-center md:text-inherit">{step.description}</p>
                                    </div>
                                </div>

                                {/* Center Icon (Desktop) */}
                                <div className={`hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-16 h-16 rounded-full border-4 border-white shadow-lg z-10 transition-colors duration-300 bg-primary group-hover:bg-cta`}>
                                    {step.icon}
                                </div>

                                {/* Right Content (or empty spacer) */}
                                <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? 'md:order-3 md:pl-16' : 'md:pr-16'}`}></div>

                                {/* Mobile Connector */}
                                {index < timelineSteps.length - 1 && (
                                    <div className="md:hidden flex justify-center w-full mb-8">
                                        <ArrowDown size={24} className="text-gray-300" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-background text-center px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold text-primary mb-6">Initiate Your Flight Plan</h2>
                    <p className="text-secondary mb-8 text-lg">Don't wait until the next intake is full. Start Step 1 today.</p>
                    <a href="/contact" className="px-8 py-4 bg-cta text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 hover:shadow-xl transition-all duration-300 inline-block">
                        Book Your Consultation
                    </a>
                </div>
            </section>
        </div>
    );
}
