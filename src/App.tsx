/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import PropertiesGrid from './components/PropertiesGrid';
import PropertyModal from './components/PropertyModal';
import LoanCalculator from './components/LoanCalculator';
import AwardedWorks from './components/AwardedWorks';
import Services from './components/Services';
import Footer from './components/Footer';
import { PROPERTIES, PRICE_RANGES, Property } from './properties';
import { Calendar, CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Search query states
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('Any');
  const [searchPriceIdx, setSearchPriceIdx] = useState(0); // Any Price index

  // User modal overlays state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [preselectedCalcProperty, setPreselectedCalcProperty] = useState<Property | null>(null);
  const [showConsultationDialog, setShowConsultationDialog] = useState(false);
  const [consultationName, setConsultationName] = useState('');
  const [consultationEmail, setConsultationEmail] = useState('');
  const [consultationStatus, setConsultationStatus] = useState(false);

  // Filter properties dynamically
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      // Location filter: case-insensitive check
      if (searchLocation.trim() !== '') {
        const query = searchLocation.toLowerCase();
        const matchesName = property.name.toLowerCase().includes(query);
        const matchesLoc = property.location.toLowerCase().includes(query);
        if (!matchesName && !matchesLoc) return false;
      }

      // Type filter
      if (searchType !== 'Any' && property.type !== searchType) {
        return false;
      }

      // Price filter bounds
      const priceBounds = PRICE_RANGES[searchPriceIdx];
      if (priceBounds) {
        const price = property.priceNumeric;
        if (price < priceBounds.min || price > priceBounds.max) {
          return false;
        }
      }

      return true;
    });
  }, [searchLocation, searchType, searchPriceIdx]);

  // Command Search action callback
  const handleSearchTrigger = (location: string, type: string, priceIdx: number) => {
    setSearchLocation(location);
    setSearchType(type);
    setSearchPriceIdx(priceIdx);
  };

  // Reset helper
  const handleResetFilters = () => {
    setSearchLocation('');
    setSearchType('Any');
    setSearchPriceIdx(0);
  };

  // Smooth scroll helper
  const handleScrollTo = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInquireProperty = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleQuickConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultationName || !consultationEmail) return;
    setConsultationStatus(true);
  };

  return (
    <div className="min-h-screen bg-white relative font-sans text-slate-800 antialiased overflow-x-hidden" id="hero">
      
      {/* Absolute Navbar header */}
      <Navbar 
        onScrollTo={handleScrollTo} 
        onOpenConsultation={() => setShowConsultationDialog(true)} 
      />

      {/* Main Hero block banner with filters */}
      <Hero 
        onSearch={handleSearchTrigger} 
        totalResults={filteredProperties.length} 
      />

      {/* Dynamic properties grid */}
      <PropertiesGrid
        properties={filteredProperties}
        allProperties={PROPERTIES}
        onSelectProperty={handleInquireProperty}
        activeTypeFilter={searchType}
        setActiveTypeFilter={setSearchType}
        activeLocationFilter={searchLocation}
        setActiveLocationFilter={setSearchLocation}
        onResetFilters={handleResetFilters}
        onScrollTo={handleScrollTo}
      />

      {/* About agency content block */}
      <AboutUs />

      {/* Mortgage Tenure loan calculator tool */}
      <LoanCalculator 
        preselectedProperty={preselectedCalcProperty} 
      />

      {/* Awarded project works gallery */}
      <AwardedWorks 
        onSelectProperty={handleInquireProperty} 
      />

      {/* Corporate services blocks representation */}
      <Services />

      {/* Absolute Footer metadata links */}
      <Footer onScrollTo={handleScrollTo} />

      {/* Modal overlays: Property detail details */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onScrollToCalculator={() => {
            setPreselectedCalcProperty(selectedProperty);
            setTimeout(() => {
              handleScrollTo('loan-calculator');
            }, 100);
          }}
        />
      )}

      {/* Special Dialogue consultation popup */}
      {showConsultationDialog && (
        <div className="fixed inset-0 z-50 overflow-y-auto block select-none">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => {
              setShowConsultationDialog(false);
              setConsultationStatus(false);
            }}
          />
          <div className="flex min-h-screen items-center justify-center p-4 relative z-10">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden p-8 border border-slate-100 text-center">
              
              <button
                onClick={() => {
                  setShowConsultationDialog(false);
                  setConsultationStatus(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>

              <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-5">
                <Calendar className="w-6 h-6" />
              </div>

              {consultationStatus ? (
                <div>
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">Consultation Scheduled!</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Thank you <strong>{consultationName}</strong>. Our custom real estate liaison has scheduled your callback appointment. We have sent initial brokerage brochures to <strong>{consultationEmail}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setShowConsultationDialog(false);
                      setConsultationStatus(false);
                      setConsultationName('');
                      setConsultationEmail('');
                    }}
                    className="mt-6 w-full bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold py-3 px-4 rounded-xl cursor-pointer transition shadow-sm"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickConsultation}>
                  <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">Book Private Viewing</h3>
                  <p className="text-xs text-slate-400 mt-1 mb-6 leading-relaxed">
                    Arrange a private on-site inspection or luxury investment briefing with a certified partner.
                  </p>

                  <div className="space-y-4 text-left">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Your Full Name
                      </label>
                      <input 
                        type="text"
                        required 
                        placeholder="John Doe"
                        value={consultationName}
                        onChange={(e) => setConsultationName(e.target.value)}
                        className="w-full bg-slate-5 w-full rounded-xl border border-slate-100 px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-sky-300"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input 
                        type="email"
                        required 
                        placeholder="john@example.com"
                        value={consultationEmail}
                        onChange={(e) => setConsultationEmail(e.target.value)}
                        className="w-full bg-slate-5 w-full rounded-xl border border-slate-100 px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-sky-300"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold py-3.5 px-4 rounded-xl cursor-pointer transition shadow-sm flex items-center justify-center gap-1.5 active:scale-98"
                      >
                        <span>Schedule Free Briefing</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
