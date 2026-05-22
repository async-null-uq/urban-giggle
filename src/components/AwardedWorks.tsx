import React from 'react';
import { Property, PROPERTIES } from '../properties';

interface AwardedWorksProps {
  onSelectProperty: (property: Property) => void;
}

export default function AwardedWorks({ onSelectProperty }: AwardedWorksProps) {
  // Pre-filter the 4 requested awarded works
  const awardedIds = ['4', '5', '6', '7']; // Azure Villa, Pinegrove Retreat, Linden Court, DLF Skyline
  const works = PROPERTIES.filter(p => awardedIds.includes(p.id));

  return (
    <section id="awarded-works" className="py-20 px-6 sm:px-8 bg-[#fdfeff]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-bold text-sky-500 uppercase tracking-widest block mb-4">
            • Our Project
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Awarded Works
          </h2>
        </div>

        {/* Tall vertical layout grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {works.map((work) => (
            <div
              key={work.id}
              onClick={() => onSelectProperty(work)}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-lg transition-all duration-350 border border-slate-100/50"
            >
              {/* Image */}
              <img
                src={work.imageUrl}
                alt={work.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic bottom gradient cover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/10 to-transparent"></div>

              {/* Text content absolute */}
              <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-sky-400">
                  {work.type} • Award Winner
                </span>
                <h3 className="text-lg font-extrabold tracking-tight mt-1 group-hover:text-sky-300 transition-colors duration-200">
                  {work.name}
                </h3>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  {work.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
