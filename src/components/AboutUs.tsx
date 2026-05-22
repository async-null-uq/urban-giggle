import React from 'react';
import { Award, Users, ShieldCheck } from 'lucide-react';

export default function AboutUs() {
  const stats = [
    {
      id: 'experience',
      icon: Award,
      num: '10+',
      label: 'Years of Experience',
      desc: 'Expert market wisdom in elite properties.'
    },
    {
      id: 'clients',
      icon: Users,
      num: '2,000+',
      label: 'Happy Clients',
      desc: 'Sourcing secure homes across global centers.'
    },
    {
      id: 'properties',
      icon: ShieldCheck,
      num: '1,500+',
      label: 'Verified Properties',
      desc: 'Rigid baseline checks on legal and design builds.'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 px-6 sm:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Asymmetric layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-16 border-b border-slate-100">
          {/* Main heading column */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold text-sky-500 uppercase tracking-widest block mb-4">
              • About Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-2xl">
              A full-service property agency helping buyers, sellers, and investors make smarter real estate decisions.
            </h2>
          </div>

          {/* Descriptive content column */}
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-normal">
              Our experienced agents blend deep market insight, modern technology, and personalized service to deliver transparent guidance, strong results, and long-term value.
            </p>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Serving premium metropolitan sectors since 2016, we prioritize authentic developer ties, clean compliance structures, and custom structural valuations.
            </p>
          </div>
        </div>

        {/* Highlighted stats row */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-start group">
              {/* Colored light blue circle with icon */}
              <div className="w-14 h-14 rounded-full bg-[#caebfe]/60 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <stat.icon className="w-6 h-6 text-sky-600" />
              </div>
              
              {/* Number and Label */}
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {stat.num}
              </div>
              <div className="text-sm font-bold text-slate-800 mt-2 block tracking-tight">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
