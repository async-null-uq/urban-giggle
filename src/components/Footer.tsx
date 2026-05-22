import React, { useState } from 'react';
import { Send, ArrowRight } from 'lucide-react';

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-white pt-20 pb-8 px-6 sm:px-8 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-16 border-b border-slate-100">
          
          {/* Logo Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div 
              onClick={() => onScrollTo('hero')}
              className="text-2xl font-black tracking-tight text-slate-900 cursor-pointer select-none font-sans"
            >
              Glade<span className="text-sky-500">.</span>
            </div>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-sm">
              A full-service property agency helping buyers, sellers, and investors make smarter real estate decisions.
            </p>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'Properties', id: 'properties' },
                { label: 'Services', id: 'services' },
                { label: 'About', id: 'about' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onScrollTo(link.id)}
                    className="text-sm text-slate-500 hover:text-slate-900 cursor-pointer block transition"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>
                <a href="mailto:hello@glade.estate" className="hover:text-slate-900 block transition">
                  hello@glade.estate
                </a>
              </li>
              <li>
                <a href="tel:+14155550142" className="hover:text-slate-900 block transition">
                  +1 (415) 555-0142
                </a>
              </li>
              <li>
                <span className="block">San Francisco, CA</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Input */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Newsletter</h4>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              New listings, every Friday.
            </p>

            {subscribed ? (
              <div className="text-xs font-bold text-[#38bdf8] flex items-center gap-1.5 bg-sky-50 p-2.5 rounded-xl border border-sky-100">
                <span>✓ Successfully Subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email" 
                  required
                  placeholder="Your Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-sky-300 flex-1 leading-snug"
                />
                <button
                  type="submit"
                  className="bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition shadow-sm active:scale-98"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* copyright bottom line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] font-bold text-slate-400 font-mono tracking-wider">
            © 2026 Glade Estates. All rights reserved.
          </div>
          <div className="text-[10px] text-slate-400 font-medium">
            Designed to match pristine spatial guidelines.
          </div>
        </div>
      </div>
    </footer>
  );
}
