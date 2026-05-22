import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { PROPERTY_TYPES, PRICE_RANGES } from '../properties';

interface HeroProps {
  onSearch: (location: string, type: string, priceRangeIdx: number) => void;
  totalResults: number;
}

export default function Hero({ onSearch, totalResults }: HeroProps) {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Any');
  const [priceIdx, setPriceIdx] = useState(0); // 0 corresponds to Any Price

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(location, type, priceIdx);
    // Smooth scroll down to listings to show the results
    const listingsSection = document.getElementById('properties');
    if (listingsSection) {
      listingsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-[120px] pb-16 bg-gradient-to-b from-[#caebfe] via-[#edf7fd] to-white px-4 sm:px-6 md:px-8">
      {/* Search Section Header */}
      <div className="max-w-4xl mx-auto text-center mt-6 sm:mt-12 mb-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-sm">
          Find Your Dream Property <br className="hidden sm:inline" />
          with Confidence
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-700 max-w-2xl mx-auto font-medium opacity-90">
          Curated homes, expert agents, and a transparent process — from first viewing to final keys.
        </p>
      </div>

      {/* Featured Big House Image */}
      <div className="max-w-5xl mx-auto relative mb-12 select-none">
        <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-[2rem] overflow-hidden shadow-2xl relative group">
          <img 
            src="https://your-dream-home-finder-nine.vercel.app/assets/hero-house-BA3YyBVA.jpg" 
            alt="Glade Modern Dream House" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Interactive Search Grid Bar */}
      <div className="max-w-4xl mx-auto -mt-20 relative z-30 px-2">
        <form 
          onSubmit={handleSearch}
          className="bg-white rounded-3xl md:rounded-full p-3 sm:p-4 shadow-xl sm:shadow-2xl border border-sky-100/50 flex flex-col md:flex-row gap-4 items-stretch md:items-center"
        >
          {/* Location Input */}
          <div className="flex-1 px-4 sm:px-6 py-2 border-b md:border-b-0 md:border-r border-slate-100">
            <label className="block text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-1">
              Location
            </label>
            <input 
              type="text" 
              placeholder="e.g. Bengaluru, Hyderabad" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-sm font-semibold bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Type Dropdown */}
          <div className="flex-1 px-4 sm:px-6 py-2 border-b md:border-b-0 md:border-r border-slate-100">
            <label className="block text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full text-sm font-semibold bg-transparent text-slate-800 focus:outline-none appearance-none cursor-pointer"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Price Selector */}
          <div className="flex-1 px-4 sm:px-6 py-2">
            <label className="block text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-1">
              Price Range
            </label>
            <select
              value={priceIdx}
              onChange={(e) => setPriceIdx(Number(e.target.value))}
              className="w-full text-sm font-semibold bg-transparent text-slate-800 focus:outline-none appearance-none cursor-pointer"
            >
              {PRICE_RANGES.map((range, index) => (
                <option key={index} value={index}>{range.label}</option>
              ))}
            </select>
          </div>

          {/* Search Action Pill Button */}
          <div className="md:pl-2">
            <button
              type="submit"
              className="w-full bg-slate-950 hover:bg-slate-900 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-250 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <Search className="w-4 h-4" />
              <span>Search Property</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
