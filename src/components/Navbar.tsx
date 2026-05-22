import React from 'react';

interface NavbarProps {
  onScrollTo: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export default function Navbar({ onScrollTo, onOpenConsultation }: NavbarProps) {
  return (
    <nav className="w-full absolute top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 md:py-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onScrollTo('hero')}
          className="text-2xl font-black tracking-tight text-[#111827] cursor-pointer hover:opacity-90 select-none font-sans"
        >
          Glade<span className="text-[#38bdf8]">.</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-10">
          {[
            { label: 'Home', id: 'hero' },
            { label: 'Properties', id: 'properties' },
            { label: 'Services', id: 'services' },
            { label: 'About', id: 'about' }
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => onScrollTo(link.id)}
              className="text-sm font-medium text-slate-600 hover:text-black transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Cta button */}
        <div>
          <button
            onClick={onOpenConsultation}
            className="bg-black hover:bg-slate-900 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
