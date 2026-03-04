import { Link } from 'react-router-dom';
import { HeartPulse, Monitor, PenTool, Wrench, Truck, ArrowRight, Stamp } from 'lucide-react';
import MapleLeaf from '../components/ui/MapleLeaf';

export default function Programs() {
    const sectors = [
        {
            icon: <HeartPulse size={40} className="text-cta mb-6" />,
            title: 'Healthcare & Nursing',
            desc: 'Critical shortages across all provinces means massive demand for registered nurses, healthcare administrators, and aged care workers.',
        },
        {
            icon: <Monitor size={40} className="text-cta mb-6" />,
            title: 'Tech & IT',
            desc: 'Software engineers, cybersecurity analysts, and data scientists are highly sought after, specially in tech hubs like Toronto and Vancouver.',
        },
        {
            icon: <PenTool size={40} className="text-cta mb-6" />,
            title: 'Engineering',
            desc: 'Civil, mechanical, and electrical engineers remain on the critical skills list due to massive infrastructure expansions.',
        },
        {
            icon: <Wrench size={40} className="text-cta mb-6" />,
            title: 'Skilled Trades',
            desc: 'HVAC, heavy-duty mechanics, and industrial electricians are offering massive starting salaries and rapid paths to PR.',
        },
        {
            icon: <Truck size={40} className="text-cta mb-6" />,
            title: 'Supply Chain',
            desc: 'Logistics and supply chain management professionals are required to maintain North American trade flows.',
        }
    ];

    return (
        <div className="w-full">
            {/* Page Header */}
            <section className="pt-40 pb-20 bg-background text-center px-4 relative overflow-hidden">
                <MapleLeaf className="absolute -top-10 left-10 w-64 h-64 text-primary/10 z-0 transform -rotate-12" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 flex items-center justify-center">
                        In-Demand <span className="text-cta italic ml-2 mr-2">Programs</span> <MapleLeaf className="w-10 h-10 ml-2 text-primary" />
                    </h1>
                    <p className="text-xl text-secondary font-sans max-w-2xl mx-auto">
                        We don't just send you anywhere. We send you where the jobs are.
                    </p>
                </div>
            </section>

            {/* The Strategy */}
            <section className="py-24 bg-white relative z-10 -mt-8 rounded-t-3xl">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-serif font-bold text-primary mb-6">The Success Strategy</h2>
                    <div className="w-20 h-1 bg-cta mx-auto mb-8"></div>
                    <p className="text-secondary text-xl leading-relaxed mb-12">
                        The Canadian Immigration system heavily favors international students who possess skills the Canadian economy <strong className="text-primary border-b-2 border-cta pb-1">actually needs</strong>. Studying generic degrees with low market demand complicates your ability to find work and eventually secure Permanent Residency.
                    </p>
                    <p className="text-secondary text-lg leading-relaxed max-w-3xl mx-auto">
                        Through our Canadian network, we exclusively recommend diplomas, degrees, and post-graduate certificates in sectors facing structural labor shortages in Canada.
                    </p>
                </div>
            </section>

            {/* Top Sectors Grid */}
            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif font-bold text-primary mb-4">Top Sectors in Canada</h2>
                        <p className="text-secondary text-lg max-w-2xl mx-auto">Programs in these areas yield the highest post-graduation employment rates.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sectors.map((sector, index) => (
                            <div key={index} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                                {sector.icon}
                                <h3 className="text-xl font-serif font-bold text-primary mb-4 group-hover:text-cta transition-colors">{sector.title}</h3>
                                <p className="text-secondary leading-relaxed">{sector.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The PGWP Advantage */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 transform origin-top-right z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-primary font-bold rounded-full mb-6 border border-blue-100">
                                <Stamp size={18} className="text-cta mr-2" />
                                Crucial Information
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">The Post-Graduation <br />Work Permit (PGWP)</h2>
                            <div className="w-16 h-1 bg-cta mb-8"></div>
                            <p className="text-secondary text-lg leading-relaxed mb-6">
                                The PGWP is an open work permit that allows international graduates to work in Canada for any employer after finishing their studies. This work experience is essential for qualifying for Permanent Residency (PR).
                            </p>
                            <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden mt-8">
                                <div className="absolute -right-4 -bottom-4 opacity-10">
                                    <Stamp size={120} />
                                </div>
                                <h4 className="text-xl font-bold mb-3 relative z-10">Why our guidance matters:</h4>
                                <p className="text-gray-300 relative z-10 text-sm leading-relaxed">
                                    <strong className="text-white">Not all programs are PGWP eligible.</strong> If you accidentally enroll in a private college program that lacks PGWP eligibility, you will be forced to leave Canada immediately after graduating. We guarantee that 100% of the programs verified through our network maintain full PGWP eligibility.
                                </p>
                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Graduation employment" className="rounded-2xl shadow-xl w-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-background border-t border-gray-100 text-center px-4">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-6">Find the right program for your career</h2>
                    <Link to="/apply" className="inline-flex items-center text-primary font-medium border-b-2 border-cta pb-1 hover:text-cta transition-colors">
                        Evaluate my profile <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
