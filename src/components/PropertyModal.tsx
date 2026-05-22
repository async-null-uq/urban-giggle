import React, { useState } from 'react';
import { X, Check, Mail, Phone, Calendar, ArrowRight, CheckCircle2, Youtube, Info, User, ClipboardList } from 'lucide-react';
import { Property } from '../properties';
import { sendInquiryNotification } from '../utils/telegram';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onScrollToCalculator: () => void;
}

export default function PropertyModal({ property, onClose, onScrollToCalculator }: PropertyModalProps) {
  // Inquiry Popup State
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryReason, setInquiryReason] = useState('Information'); // 'Information' | 'Visit' | 'Talking with Agent'
  const [inquirySuccess, setInquirySuccess] = useState(false);

  if (!property) return null;

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setInquirySuccess(true);

    // Call the real Telegram Bot Notification dispatch
    await sendInquiryNotification({
      name: inquiryName,
      phone: inquiryPhone,
      reason: inquiryReason,
      propertyName: property.name,
      propertyLocation: property.location,
      propertyPrice: property.priceFormatted,
    });
  };

  const handleYoutubeTourClick = () => {
    // Open an elegant search query or dynamic high-end luxury property tour on YouTube
    const searchQuery = `${property.name} ${property.location} luxury home tour`;
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto block select-none">
      {/* Dark overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Positioning */}
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-10 relative z-10">
        <div className="relative w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
          
          {/* Close Action Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-slate-800 hover:bg-slate-100 transition-all duration-200 cursor-pointer border border-slate-100"
            id="modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Panel: Big Image Block */}
          <div className="md:w-1/2 relative bg-slate-100 min-h-[300px] md:min-h-[550px] flex flex-col justify-between">
            <div className="w-full h-full absolute inset-0">
              <img 
                src={property.imageUrl} 
                alt={property.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-black/30" />
            </div>

            {/* Absolute Overlay metadata */}
            <div className="relative p-8 mt-auto text-white">
              <span className="bg-sky-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-3 inline-block shadow-sm">
                Boutique {property.type}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 leading-tight">
                {property.name}
              </h3>
              <p className="text-slate-200 text-sm mt-1 opacity-90 font-medium">
                {property.location}
              </p>

              {/* Specs card attributes */}
              <div className="mt-6 grid grid-cols-3 gap-2 pt-4 border-t border-white/20 text-center">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5">
                  <span className="text-[10px] font-mono text-sky-200 block">AREA</span>
                  <span className="text-sm font-extrabold text-white">{property.sqft.toLocaleString()} <span className="text-[9px]">SQ.FT</span></span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5">
                  <span className="text-[10px] font-mono text-sky-200 block">BEDROOMS</span>
                  <span className="text-sm font-extrabold text-white">{property.beds} Bed</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5">
                  <span className="text-[10px] font-mono text-sky-200 block">BATHS</span>
                  <span className="text-sm font-extrabold text-white">{property.baths} Bath</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Content Scrolling details */}
          <div className="md:w-1/2 p-6 sm:p-8 md:p-10 overflow-y-auto max-h-[80vh] md:max-h-[85vh] relative flex flex-col justify-between">
            <div>
              {/* Header with Title and Price */}
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest block mb-1">
                    Premium Real Estate Listing
                  </span>
                  <span className="text-[11px] font-bold font-mono tracking-wider text-slate-400">
                    ID: GLD-0{property.id}59
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {property.priceFormatted}
                </div>
              </div>

              {/* Compact Property Card Highlight */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Property Specification Overview</h4>
                <div className="grid grid-cols-2 gap-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                    <span><strong>Project Name:</strong> {property.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                    <span><strong>Location:</strong> {property.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                    <span><strong>Area:</strong> {property.sqft} Sq.Ft.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                    <span><strong>Layout:</strong> {property.beds} BHK, {property.baths} Bath</span>
                  </div>
                </div>
              </div>

              {/* Description Paragraph */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-normal">
                  {property.description}
                </p>
              </div>

              {/* Key Amenities */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Premium Features</h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {property.amenities.slice(0, 4).map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-600 text-xs font-medium">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sticky User Guidance Note: Plan It Loan Section */}
              <div className="bg-sky-50/80 rounded-2xl p-4.5 mb-6 border border-sky-100/60 flex items-start gap-3">
                <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-extrabold text-[#0284c7] block uppercase tracking-tight mb-0.5">Mortgage &amp; Down Payment Planning</span>
                  <p className="text-slate-600 leading-relaxed font-normal">
                    You can estimate loans, dynamic interest rates, and initial down payments in our <strong className="text-sky-700">Plan It</strong> section. Doing so smoothly maps this property to the calculation matrix.
                  </p>
                  <button 
                    onClick={() => {
                      onScrollToCalculator();
                      onClose();
                    }}
                    className="mt-2.5 text-sky-600 hover:text-sky-800 text-xs font-extrabold inline-flex items-center gap-1 cursor-pointer group"
                  >
                    <span>Smooth Go to Calculator Section</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Panel: Buttons for YouTube Tour and Confirm Inquiry */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* YouTube home tour button */}
                <button
                  onClick={handleYoutubeTourClick}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 border border-red-100 active:scale-[0.98]"
                  id="youtube-tour-btn"
                >
                  <Youtube className="w-4 h-4 fill-current" />
                  <span>YouTube Home Tour</span>
                </button>

                {/* Confirm Inquiry button */}
                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="w-full bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
                  id="confirm-inquiry-btn"
                >
                  <Mail className="w-4 h-4" />
                  <span>Confirm Inquiry</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Detail Form overlay popup dialog */}
      {showInquiryForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => {
              setShowInquiryForm(false);
              setInquirySuccess(false);
            }}
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative z-70 animate-scale-up">
            <button
              onClick={() => {
                setShowInquiryForm(false);
                setInquirySuccess(false);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {inquirySuccess ? (
              /* Success Information Container */
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Inquiry Request Received!</h3>
                <p className="mt-3 text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
                  Thank you <strong>{inquiryName}</strong>! Our certified local estate adviser has been notified. <strong>An agent will contact you soon</strong> at your registered phone number (<strong>{inquiryPhone}</strong>) regarding your interest.
                </p>
                <button
                  onClick={() => {
                    setShowInquiryForm(false);
                    setInquirySuccess(false);
                    setInquiryName('');
                    setInquiryPhone('');
                  }}
                  className="mt-6 w-full bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold py-3.5 px-4 rounded-xl cursor-pointer transition"
                >
                  Close Window
                </button>
              </div>
            ) : (
              /* Core Form */
              <form onSubmit={handleInquirySubmit}>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Complete Security Brief</h3>
                  <p className="text-xs text-slate-400 mt-0.5 max-w-xs mx-auto">
                    Configure your inquiry criteria about <span className="font-semibold text-slate-600">{property.name}</span>.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>Your Full Name</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full bg-white border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-sky-300"
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>Mobile Number</span>
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full bg-white border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-sky-300"
                    />
                  </div>

                  {/* Radio Selector what are you looking for */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      What are you looking for specifically?
                    </label>
                    <div className="space-y-2 font-medium text-xs text-slate-700">
                      {[
                        { value: 'Information', label: 'ℹ️ Additional property brochure & information' },
                        { value: 'Visit', label: '🚗 Scheduled site tour / physical visit' },
                        { value: 'Talking with Agent', label: '💬 Direct callback discussion with an agent' }
                      ].map((option) => (
                        <label 
                          key={option.value} 
                          className={`flex items-start gap-2.5 p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                            inquiryReason === option.value
                              ? 'bg-sky-50 border-sky-250 text-sky-900 font-semibold'
                              : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="inquiryReason"
                            value={option.value}
                            checked={inquiryReason === option.value}
                            onChange={() => setInquiryReason(option.value)}
                            className="mt-0.5 text-sky-600 focus:ring-sky-500"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold py-3.5 px-4 rounded-xl cursor-pointer transition shadow-sm active:scale-98 flex items-center justify-center gap-1.5"
                    id="submit-inquiry-modal-btn"
                  >
                    <span>Submit Inquiry Broadsheet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

