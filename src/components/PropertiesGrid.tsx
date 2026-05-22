import React, { useState } from 'react';
import { ArrowUpRight, SearchSlash, RotateCcw } from 'lucide-react';
import { Property, PROPERTY_TYPES } from '../properties';

interface PropertiesGridProps {
  properties: Property[];
  allProperties: Property[];
  onSelectProperty: (property: Property) => void;
  activeTypeFilter: string;
  setActiveTypeFilter: (type: string) => void;
  activeLocationFilter: string;
  setActiveLocationFilter: (loc: string) => void;
  onResetFilters: () => void;
  onScrollTo: (sectionId: string) => void;
}

export default function PropertiesGrid({
  properties,
  allProperties,
  onSelectProperty,
  activeTypeFilter,
  setActiveTypeFilter,
  activeLocationFilter,
  setActiveLocationFilter,
  onResetFilters,
  onScrollTo
}: PropertiesGridProps) {

  return (
    <section id="properties" className="py-20 bg-slate-50 border-t border-b border-slate-100 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header content and navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-sky-500 uppercase tracking-widest block mb-4">
              • Listings
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              All Properties
            </h2>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              {properties.length === allProperties.length 
                ? `Showing all ${properties.length} curated properties` 
                : `${properties.length} of ${allProperties.length} match your search filters`}
            </p>
          </div>

          <button
            onClick={() => onScrollTo('services')}
            className="group inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-sky-600 transition-colors duration-200 cursor-pointer text-left md:text-right"
          >
            <span>Our Services</span>
            <span className="w-6 h-6 rounded-full bg-slate-200 group-hover:bg-sky-100 flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-sky-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>

        {/* Quick Property Type Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {PROPERTY_TYPES.map((type) => {
            const isActive = activeTypeFilter === type;
            // Calculate how many of this type exist
            const count = allProperties.filter(p => type === 'Any' || p.type === type).length;

            return (
              <button
                key={type}
                onClick={() => setActiveTypeFilter(type)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-tight transition-all duration-200 select-none cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-100'
                }`}
              >
                {type === 'Any' ? 'Show All' : type} <span className={`ml-1 text-[10px] ${isActive ? 'text-sky-300' : 'text-slate-400'}`}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Properties Grid of Cards */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {properties.map((property) => (
              <div 
                key={property.id}
                onClick={() => onSelectProperty(property)}
                className="group flex flex-col cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-350 border border-slate-100/60"
              >
                {/* Scaled/Zooming Image Wrapper */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-100">
                  <img 
                    src={property.imageUrl} 
                    alt={property.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 bg-sky-100 text-sky-800 text-[10px] sm:text-xs font-extrabold px-3 py-1.5 rounded-full shadow-sm">
                    {property.type}
                  </div>

                  {/* Top-Right Mini Diagnostic Expand Action Circle */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProperty(property);
                    }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center text-slate-800 transition-all duration-300 group-hover:scale-110 group-hover:bg-white cursor-pointer"
                  >
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                  </button>
                </div>

                {/* Info and price layout section */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-3 mb-1">
                      <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-sky-600 transition-colors duration-200">
                        {property.name}
                      </h3>
                      <div className="text-lg font-black text-slate-900 shrink-0 tracking-tight">
                        {property.priceFormatted}
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 font-medium tracking-tight mb-5">
                      {property.location}
                    </p>
                  </div>

                  {/* Monospace attributes meta row */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-4 text-[11px] font-bold text-slate-500 font-mono tracking-wider">
                    <span>{property.sqft.toLocaleString()} SQ.FT.</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    <span>{property.beds} BED</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    <span>{property.baths} BATH</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search and Filter States */
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-5">
              <SearchSlash className="w-7 h-7 text-rose-500" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              No matching properties
            </h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              We couldn't find any listings matching your active filters. Try adjusting your parameters or reset the filters below.
            </p>
            <button
              onClick={onResetFilters}
              className="mt-6 inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold px-6 py-3 rounded-full cursor-pointer transition shadow-sm active:scale-98"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
