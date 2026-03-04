import { useState } from 'react';
import { Calculator, Info, CalendarDays, RefreshCw } from 'lucide-react';

export default function LoanCalculator() {
    const [programDuration, setProgramDuration] = useState<1 | 2>(1);

    // Constants based on given data
    const CAD_TO_LKR_RATE = 215; // Estimated exchange rate for estimation
    const BASE_TUITION_1YR = 19370.78;
    const BASE_UPFRONT_1YR = 4800.00;
    const BASE_MONTHLY_1YR = 409.64;
    const INTEREST_RATE = 11.95;
    const LOAN_TERM_MONTHS = 48;

    // Derived values
    const totalTuition = BASE_TUITION_1YR * programDuration;
    const upfrontPayment = BASE_UPFRONT_1YR * programDuration;
    const monthlyPayment = BASE_MONTHLY_1YR * programDuration;

    const formatCAD = (amount: number) => {
        return new Intl.NumberFormat('en-CA', {
            style: 'currency',
            currency: 'CAD',
            maximumFractionDigits: 0,
        }).format(amount).replace('CA$', 'C$');
    };

    const formatLKR = (amountCAD: number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            maximumFractionDigits: 0,
        }).format(amountCAD * CAD_TO_LKR_RATE).replace('LKR', 'Rs.');
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-full max-w-2xl mx-auto my-12">
            {/* Header */}
            <div className="bg-primary px-6 py-5 text-white flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Calculator size={24} className="text-cta" />
                    <h3 className="font-serif font-bold text-xl">Educational Loan Estimator</h3>
                </div>
                <div className="text-sm text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                    Est. Rate: 1 CAD ≈ {CAD_TO_LKR_RATE} LKR
                </div>
            </div>

            <div className="p-6 md:p-8">
                {/* Toggle */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                    <p className="font-medium text-secondary">Select Program Duration:</p>
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        <button
                            onClick={() => setProgramDuration(1)}
                            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${programDuration === 1 ? 'bg-white shadow-sm text-primary border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}
                        >
                            1-Year Program
                        </button>
                        <button
                            onClick={() => setProgramDuration(2)}
                            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${programDuration === 2 ? 'bg-white shadow-sm text-primary border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}
                        >
                            2-Year Program
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Est Total Tuition / Loan Amount */}
                    <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Est. Tuition (Loan Amount)</p>
                            <Info size={14} className="text-primary/50" />
                        </div>
                        <p className="text-3xl font-serif font-bold text-primary mb-1">{formatCAD(totalTuition)}</p>
                        <p className="text-sm font-medium text-gray-500">~ {formatLKR(totalTuition)}</p>
                        <p className="text-xs text-secondary mt-3 opacity-80 leading-relaxed">
                            Sent directly to the Canadian institution.
                        </p>
                    </div>

                    {/* Loan Details */}
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex flex-col justify-center space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-200/60 pb-3">
                            <span className="text-sm text-gray-500 font-medium">Interest Rate (Fixed APR)</span>
                            <span className="text-sm font-bold text-primary">{INTEREST_RATE}%</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200/60 pb-3">
                            <span className="text-sm text-gray-500 font-medium">Prepayment Penalty</span>
                            <span className="text-sm font-bold text-primary">No</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 font-medium">Payment Term</span>
                            <span className="text-sm font-bold text-primary">{LOAN_TERM_MONTHS} Months</span>
                        </div>
                    </div>
                </div>

                {/* What you need to pay row */}
                <div className="relative border-t border-gray-100 pt-8 mt-4">
                    <h4 className="absolute -top-3 left-6 bg-white px-3 font-bold text-primary text-sm flex items-center tracking-tight">
                        What you need to pay
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Upfront */}
                        <div className="relative">
                            <div className="flex items-center space-x-2 mb-2">
                                <RefreshCw size={16} className="text-cta" />
                                <p className="font-bold text-gray-800">Upfront Collateral</p>
                            </div>
                            <p className="text-4xl font-serif font-bold text-primary mb-1">{formatCAD(upfrontPayment)}</p>
                            <p className="text-sm font-medium text-gray-500 mb-3">~ {formatLKR(upfrontPayment)}</p>
                            <p className="text-xs text-secondary leading-relaxed">Required after loan approval to secure your funding layout.</p>
                        </div>

                        {/* Monthly */}
                        <div className="relative">
                            <div className="flex items-center space-x-2 mb-2">
                                <CalendarDays size={16} className="text-cta" />
                                <p className="font-bold text-gray-800">Monthly Repayment</p>
                            </div>
                            <div className="flex items-baseline space-x-2 mb-1">
                                <p className="text-4xl font-serif font-bold text-primary">{formatCAD(monthlyPayment)}</p>
                                <span className="text-sm text-gray-500 font-medium">/mo</span>
                            </div>
                            <p className="text-sm font-medium text-gray-500 mb-3">~ {formatLKR(monthlyPayment)} /mo</p>
                            <p className="text-xs text-secondary leading-relaxed">Repayment calculated over the standard {LOAN_TERM_MONTHS}-month term schedule.</p>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 bg-gray-50 p-4 rounded-lg flex items-start space-x-3 border border-gray-100">
                    <Info size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-500 leading-relaxed">
                        <strong>Payment Terms:</strong> Upfront required collateral may increase depending on your final partner bank loan approval term and financial profile. As a result, the monthly payment may decrease. All LKR values are approximations based on current estimated exchange rates and are subject to market fluctuations.
                    </p>
                </div>
            </div>
        </div>
    );
}
