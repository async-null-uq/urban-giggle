import React, { useState, useEffect } from 'react';
import { Landmark, ArrowRight, Info, CheckCircle2, RotateCcw, X } from 'lucide-react';
import { Property, PROPERTIES } from '../properties';
import { sendMortgageNotification } from '../utils/telegram';

interface LoanCalculatorProps {
  preselectedProperty: Property | null;
}

export default function LoanCalculator({ preselectedProperty }: LoanCalculatorProps) {
  // Available properties for mortgage simulation
  const [selectedPropId, setSelectedPropId] = useState(PROPERTIES[0].id);
  const [propPrice, setPropPrice] = useState(PROPERTIES[0].priceNumeric);
  const [downPayment, setDownPayment] = useState(2000000); // 20 Lakhs matching image
  const [monthlyEMI, setMonthlyEMI] = useState(80000); // 80,000 matching image
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% matching image
  const [loanFinalized, setLoanFinalized] = useState(false);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  
  // Client details for mortgage planning callback
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [validationError, setValidationError] = useState('');

  // Sync if preselected property changes externally from modal
  useEffect(() => {
    if (preselectedProperty) {
      setSelectedPropId(preselectedProperty.id);
      setPropPrice(preselectedProperty.priceNumeric);
      // Auto down payment set helper: e.g. 20% of property price
      const estimateDown = Math.round(preselectedProperty.priceNumeric * 0.20);
      setDownPayment(estimateDown);
    }
  }, [preselectedProperty]);

  // Adjust prices and default down payment when selection changes manually
  const handlePropertyChange = (propertyId: string) => {
    const found = PROPERTIES.find(p => p.id === propertyId);
    if (found) {
      setSelectedPropId(found.id);
      setPropPrice(found.priceNumeric);
      const estimateDown = Math.round(found.priceNumeric * 0.20);
      setDownPayment(estimateDown);
      
      // Auto adjust EMI to be reasonable for this price (e.g., 0.8% of loan amount)
      const loan = found.priceNumeric - estimateDown;
      const suggestedEMI = Math.round((loan * (8.5/12/100) * 1.15)); // slightly above interest
      setMonthlyEMI(Math.max(suggestedEMI, 30000));
    }
  };

  // Helper formatter for Cr / Lakhs
  const formatRupeeShort = (num: number) => {
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)} L`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };

  // Computed Loan Values
  const loanAmount = Math.max(propPrice - downPayment, 0);

  // Calculate Tenure
  let estimatedMonths = 0;
  let estimatedYears = 0;
  let remainingMonths = 0;
  let totalRepayable = 0;
  let isInvalidEMI = false;
  let minEMIRequired = 0;

  const monthlyRate = (interestRate / 12) / 100;

  if (loanAmount > 0 && monthlyRate > 0) {
    // Interest component in first month
    minEMIRequired = Math.ceil(loanAmount * monthlyRate);
    
    if (monthlyEMI <= minEMIRequired) {
      isInvalidEMI = true;
    } else {
      // EMI = P * r * (1+r)^N / ((1+r)^N - 1)
      // Solving for N: N = ln(E / (E - P*r)) / ln(1+r)
      const numerator = Math.log(monthlyEMI / (monthlyEMI - (loanAmount * monthlyRate)));
      const denominator = Math.log(1 + monthlyRate);
      estimatedMonths = Math.ceil(numerator / denominator);
      
      if (isNaN(estimatedMonths) || !isFinite(estimatedMonths)) {
        isInvalidEMI = true;
      } else {
        estimatedYears = Math.floor(estimatedMonths / 12);
        remainingMonths = estimatedMonths % 12;
        totalRepayable = estimatedMonths * monthlyEMI;
      }
    }
  }

  const handleFinalize = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isInvalidEMI) return;

    if (!clientName.trim() || !clientPhone.trim()) {
      setValidationError('Provide your name & mobile number to lock this planning sheet.');
      return;
    }
    setValidationError('');
    setLoanFinalized(true);
    setShowFinalizeModal(true);

    // Live Dispatch to Telegram bot
    await sendMortgageNotification({
      clientName: clientName,
      clientPhone: clientPhone,
      propertyName: currentProperty.name,
      propertyPrice: currentProperty.priceFormatted,
      downPayment: formatRupeeShort(downPayment),
      loanAmount: formatRupeeShort(loanAmount),
      interestRate: interestRate,
      tenureYears: estimatedYears,
      tenureMonths: remainingMonths,
      monthlyEMI: `₹${monthlyEMI.toLocaleString('en-IN')}/mo`,
      totalRepayable: formatRupeeShort(totalRepayable),
    });
  };

  const handleResetSimulator = () => {
    setLoanFinalized(false);
    setShowFinalizeModal(false);
    setClientName('');
    setClientPhone('');
    setValidationError('');
    setSelectedPropId(PROPERTIES[0].id);
    setPropPrice(PROPERTIES[0].priceNumeric);
    setDownPayment(2000000);
    setMonthlyEMI(80000);
    setInterestRate(8.5);
  };

  const currentProperty = PROPERTIES.find(p => p.id === selectedPropId) || PROPERTIES[0];

  return (
    <section id="loan-calculator" className="py-20 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Loan Calculator Body */}
        <div className="bg-[#e2f1fc] rounded-[2.5rem] p-8 sm:p-12 md:p-16 border border-sky-100 shadow-sm relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/40 rounded-full blur-3xl -mr-20 -mt-20"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-10 sm:mb-12">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-3">
                • Smart Tools
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Plan It
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-lg font-medium opacity-90 leading-relaxed">
                Estimate your home mortgage tenure and instantly lock your pre-approved pricing rates with our in-house financial officer.
              </p>
            </div>

            {loanFinalized ? (
              /* Success Locked Plan */
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-sky-100/50 shadow-md max-w-2xl mx-auto text-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-5" />
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Mortgage Proposal Locked!
                </h3>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-lg mx-auto">
                  Excellent choice. Together with our banking associates, we have pre-configured a customized loan document for <strong>{currentProperty.name}</strong>.
                </p>

                {/* Spec sheets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 bg-slate-50 p-5 rounded-2xl border border-slate-100 text-left">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">Property</span>
                    <span className="text-xs font-extrabold text-slate-900 block truncate">{currentProperty.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">Loan Amount</span>
                    <span className="text-xs font-extrabold text-[#38bdf8] block truncate">{formatRupeeShort(loanAmount)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">Repay Tenure</span>
                    <span className="text-xs font-extrabold text-slate-900 block truncate">{estimatedYears} yr {remainingMonths} mo</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">Monthly Pay</span>
                    <span className="text-xs font-extrabold text-slate-900 block truncate">₹{monthlyEMI.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={handleResetSimulator}
                    className="bg-slate-100 hover:bg-slate-100/90 text-slate-700 text-xs font-bold px-6 py-3.5 rounded-full cursor-pointer transition flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Recalculate Loan</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowFinalizeModal(true);
                    }}
                    className="bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold px-6 py-3.5 rounded-full cursor-pointer transition-all duration-200"
                  >
                    View Plan Summary
                  </button>
                </div>
              </div>
            ) : (
              /* Split Layout Builder content */
              <div className="flex flex-col lg:flex-row gap-10 items-stretch">
                
                {/* Inputs Left Block - Grid */}
                <form onSubmit={handleFinalize} className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Select Property */}
                  <div className="sm:col-span-2 bg-white rounded-2xl px-5 py-3 border border-sky-100/40 shadow-sm">
                    <label className="block text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-1 select-none">
                      Select Property
                    </label>
                    <select
                      value={selectedPropId}
                      onChange={(e) => handlePropertyChange(e.target.value)}
                      className="w-full text-sm font-bold bg-transparent text-slate-900 focus:outline-none cursor-pointer appearance-none py-1"
                    >
                      {PROPERTIES.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — {p.priceFormatted}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Property Price Displays (Disabled Input mimicking image) */}
                  <div className="bg-white rounded-2xl px-5 py-3 border border-sky-100/40 shadow-sm opacity-90 select-none">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Property Price
                    </label>
                    <div className="text-sm font-bold text-slate-800">
                      {formatRupeeShort(propPrice)}
                    </div>
                  </div>

                  {/* Down Payment (Input) */}
                  <div className="bg-white rounded-2xl px-5 py-3 border border-sky-100/40 shadow-sm">
                    <label className="block text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-1">
                      Down Payment (₹)
                    </label>
                    <input 
                      type="number" 
                      min={0}
                      max={propPrice}
                      step={50000}
                      value={downPayment}
                      onChange={(e) => setDownPayment(Math.min(Number(e.target.value), propPrice))}
                      className="w-full text-sm font-bold bg-transparent text-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Loan Amount Display (Computed read-only mimicking image) */}
                  <div className="bg-white rounded-2xl px-5 py-3 border border-sky-100/40 shadow-sm opacity-90 select-none">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Calculated Loan Amount
                    </label>
                    <div className="text-sm font-bold text-slate-800">
                      {formatRupeeShort(loanAmount)}
                    </div>
                  </div>

                  {/* Monthly EMI You Can Pay (Input) */}
                  <div className="bg-white rounded-2xl px-5 py-3 border border-sky-100/40 shadow-sm">
                    <label className="block text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-1">
                      Monthly EMI You Can Pay (₹)
                    </label>
                    <input 
                      type="number" 
                      min={10000}
                      step={1000}
                      value={monthlyEMI}
                      onChange={(e) => setMonthlyEMI(Number(e.target.value))}
                      className="w-full text-sm font-bold bg-transparent text-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Interest Rate (Input) */}
                  <div className="bg-white rounded-2xl px-5 py-3 border border-sky-100/40 shadow-sm">
                    <label className="block text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-1">
                      Interest Rate (% P.A.)
                    </label>
                    <input 
                      type="number" 
                      min={1}
                      max={25}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full text-sm font-bold bg-transparent text-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Client name input section */}
                  <div className="bg-white rounded-2xl px-5 py-3 border border-sky-100/40 shadow-sm">
                    <label className="block text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-1">
                      Your Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rachel Green"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full text-sm font-bold bg-transparent text-slate-900 focus:outline-none placeholder:text-slate-300"
                    />
                  </div>

                  {/* Client phone contact information */}
                  <div className="bg-white rounded-2xl px-5 py-3 border border-sky-100/40 shadow-sm">
                    <label className="block text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-1">
                      Mobile Number
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +91 99887 76655"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full text-sm font-bold bg-transparent text-slate-900 focus:outline-none placeholder:text-slate-300"
                    />
                  </div>
                </form>

                {/* Outputs Right Card Block */}
                <div className="lg:w-[320px] bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-sky-100 shadow-md">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-widest mb-4">
                      Estimated Tenure
                    </span>

                    {isInvalidEMI ? (
                      /* Repay Warning */
                      <div className="py-6 text-center">
                        <Landmark className="w-10 h-10 text-rose-400 mx-auto mb-3" />
                        <span className="font-extrabold text-rose-500 text-sm block leading-snug">EMI Too Small</span>
                        <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                          Your EMI must support at least interest components of <strong>₹{minEMIRequired.toLocaleString('en-IN')}/mo</strong> to pay down this loan.
                        </p>
                      </div>
                    ) : (
                      /* Standard Tenure result matches */
                      <div className="animate-fade-in">
                        <div className="flex gap-x-3 items-baseline">
                          <span className="text-5xl font-black text-slate-950 tracking-tight">
                            {estimatedYears}
                          </span>
                          <span className="text-sm font-bold text-slate-500">yr</span>
                          <span className="text-5xl font-black text-slate-950 tracking-tight ml-2">
                            {remainingMonths}
                          </span>
                          <span className="text-sm font-bold text-slate-500">mo</span>
                        </div>
                        <p className="mt-4 text-xs text-slate-400 leading-relaxed font-medium">
                          Short and long-term rental configurations matched exactly to verified prime lending guidelines.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Summary Footer */}
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    {!isInvalidEMI && (
                      <div className="mb-6 text-xs font-semibold text-slate-500">
                        {estimatedMonths} months total — ~{formatRupeeShort(totalRepayable)} repayable
                      </div>
                    )}

                    {validationError && (
                      <div className="mb-4 text-xs font-semibold text-rose-500 bg-rose-50 border border-rose-100 p-2.5 rounded-xl text-center animate-pulse">
                        {validationError}
                      </div>
                    )}

                    <button
                      onClick={handleFinalize}
                      disabled={isInvalidEMI}
                      className={`w-full text-white text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition cursor-pointer select-none ${
                        isInvalidEMI 
                          ? 'bg-slate-300 pointer-events-none' 
                          : 'bg-slate-950 hover:bg-slate-900 active:scale-98'
                      }`}
                    >
                      <span>Finalize Plan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Finalize mortgage plan popup modal */}
        {showFinalizeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 select-none">
            <div 
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setShowFinalizeModal(false)}
            />

            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-sky-100 relative z-[110] animate-scale-up">
              <button
                onClick={() => setShowFinalizeModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mx-auto mb-5 animate-bounce-short">
                  <CheckCircle2 className="w-8 h-8 text-sky-600" />
                </div>
                
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Choice &amp; Plan Sent, {clientName}!</h3>
                <p className="mt-3 text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
                  💡 <strong>An agent will contact you soon</strong> at your registered phone number (<strong>{clientPhone}</strong>). We have securely dispatched your property selection and calculated financing plan for <strong className="text-slate-700">{currentProperty.name}</strong> to our verified estate broker. 
                </p>

                {/* Detailed Sheet Summary */}
                <div className="mt-5 p-4 rounded-2xl bg-sky-50/75 border border-sky-100/60 text-left space-y-2.5 text-xs text-slate-600">
                  <div className="flex justify-between items-center pb-2 border-b border-sky-100/55">
                    <span className="font-bold text-slate-800">Client / Purchaser:</span>
                    <span className="font-semibold text-slate-900">{clientName}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-sky-100/55">
                    <span className="font-bold text-slate-800">Property Chosen:</span>
                    <span className="font-mono text-xs text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md font-bold">{currentProperty.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Down Payment Done:</span>
                    <strong className="text-slate-800">{formatRupeeShort(downPayment)}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Financing Loan:</span>
                    <strong className="text-slate-800">{formatRupeeShort(loanAmount)}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Interest rate P.A.:</span>
                    <strong className="text-slate-800">{interestRate}%</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Computed Tenure:</span>
                    <strong className="text-slate-800">{estimatedYears} years {remainingMonths} months</strong>
                  </div>
                </div>

                <p className="mt-5 text-[11px] text-slate-400 leading-normal max-w-xs mx-auto">
                  ⏳ Please <strong>hold on for a short time</strong>. A professional broker is reviewing your option &amp; planning coordinates and will contact you directly.
                </p>

                <button
                  onClick={() => setShowFinalizeModal(false)}
                  className="mt-6 w-full bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold py-3.5 px-4 rounded-xl cursor-pointer transition shadow-sm active:scale-98"
                >
                  Confirm Choice &amp; Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
