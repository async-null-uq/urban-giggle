import React from 'react';
import { Home, TrendingUp, KeyRound, Activity, FileText, Briefcase } from 'lucide-react';

export default function Services() {
  const serviceList = [
    {
      id: 1,
      name: 'Buy Property',
      desc: 'Find homes perfectly tailored to your lifestyle, preferences, and budget.',
      icon: Home
    },
    {
      id: 2,
      name: 'Sell Property',
      desc: 'Maximize your property\'s value with our pricing strategy and reach.',
      icon: TrendingUp
    },
    {
      id: 3,
      name: 'Rent Property',
      desc: 'Short and long-term rentals matched to verified tenants and landlords.',
      icon: KeyRound
    },
    {
      id: 4,
      name: 'Investment Advisory',
      desc: 'Data-driven insights to grow your real estate portfolio with confidence.',
      icon: Activity
    },
    {
      id: 5,
      name: 'Property Valuation',
      desc: 'Accurate, market-based valuations from certified local experts.',
      icon: FileText
    },
    {
      id: 6,
      name: 'Closing Support',
      desc: 'Paperwork, negotiation, and legal — handled end-to-end on your behalf.',
      icon: Briefcase
    }
  ];

  return (
    <section id="services" className="py-20 px-6 sm:px-8 bg-sky-50/50 border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-bold text-sky-500 uppercase tracking-widest block mb-4">
            • Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Services
          </h2>
        </div>

        {/* 6 Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {serviceList.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-start group"
            >
              {/* Colored light blue circle with icon */}
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                <service.icon className="w-5 h-5" />
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-2">
                {service.name}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
