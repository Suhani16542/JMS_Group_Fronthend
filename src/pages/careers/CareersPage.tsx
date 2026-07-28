import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Heart, Award, Users, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CareersPage: React.FC = () => {
  const benefits = [
    { title: 'Accelerated Growth', desc: 'Fast-track career advancement opportunities with continuous mentorship.' },
    { title: 'Workplace Culture', desc: 'Collaborative, inclusive, and empowering corporate work environment.' },
    { title: 'Competitive Rewards', desc: 'Performance-driven bonuses, health insurance, and wellness perks.' },
    { title: 'Learning & Development', desc: 'Regular executive workshops, HR certification support, and training.' },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-[#FAF9FF] via-[#FCFBFF] to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEAFF] text-[#6D3DF5] text-xs font-bold uppercase tracking-wider mb-4">
            CAREERS AT JMS GROUP
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#170B3B] mb-4">
            Build Your Career With <span className="bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] bg-clip-text text-transparent">JMS Group</span>
          </h1>
          <p className="text-base text-[#5D5A75] max-w-2xl mx-auto leading-relaxed mb-8">
            Join a passionate team of recruitment specialists, HR consultants, and career advisors transforming corporate hiring across India.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition-all"
          >
            <span>Apply Internal Roles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#170B3B]">Why Work With Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-3xl bg-[#FAF9FF] border border-purple-100/90 shadow-sm">
                <h3 className="text-lg font-bold text-[#170B3B] mb-2">{b.title}</h3>
                <p className="text-xs text-[#5D5A75] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
