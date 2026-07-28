import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Briefcase,
  UserCheck,
  FileCheck,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';

export const PlacementServicesPage: React.FC = () => {
  const steps = [
    { num: '01', title: 'Understand Requirement', desc: 'Detailed consultation to define job roles, required tech stacks, and culture fit.' },
    { num: '02', title: 'Source Candidates', desc: 'Leverage our 10K+ candidate database and multi-channel talent acquisition.' },
    { num: '03', title: 'Screening & Vetting', desc: 'Rigorous technical evaluation, background verification, and soft-skill assessments.' },
    { num: '04', title: 'Shortlisting', desc: 'Present top 3-5 pre-screened profiles per position for employer review.' },
    { num: '05', title: 'Interview Coordination', desc: 'End-to-end interview scheduling, feedback collection, and salary alignment.' },
    { num: '06', title: 'Placement & Onboarding', desc: 'Offer letter facilitation, background checks, and 90-day post-hire support.' },
  ];

  const benefits = [
    { title: '85% Faster Time-to-Hire', desc: 'Reduce hiring turnaround from months to under 14 business days.' },
    { title: 'Pre-Verified Profiles', desc: 'All candidates undergo multi-level qualification and reference checks.' },
    { title: 'Industry-Specific Experts', desc: 'Specialized recruiters dedicated to IT, Manufacturing, Healthcare, and Finance.' },
    { title: '95% Retention Rate', desc: 'High cultural alignment resulting in long-term employee retention.' },
  ];

  const industries = [
    'Information Technology & Software',
    'Manufacturing & Heavy Engineering',
    'Banking, Financial Services & Insurance',
    'Healthcare & Pharmaceuticals',
    'Retail & FMCG Supply Chain',
    'Telecommunication & Media',
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Banner */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-[#FAF9FF] via-[#FCFBFF] to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEAFF] text-[#6D3DF5] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#6D3DF5]" />
                PLACEMENT SERVICES
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-[#170B3B] leading-tight mb-6">
                Connecting Businesses With <br />
                <span className="bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] bg-clip-text text-transparent">
                  Top-Tier Corporate Talent
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#5D5A75] leading-relaxed mb-8">
                JMS Group delivers end-to-end placement solutions tailored for enterprises, startups, and mid-sized companies seeking verified, high-performing professionals.
              </p>
              <Link
                to="/employers"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition-all"
              >
                <span>Submit Hiring Requirement</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=900&auto=format&fit=crop"
                  alt="Corporate Placement Consultation"
                  className="w-full h-[380px] object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#170B3B] mb-4">Precision Candidate Matching</h2>
            <p className="text-sm sm:text-base text-[#5D5A75]">
              We streamline your recruitment workflow by combining advanced candidate assessment methodologies with deep domain expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-3xl bg-[#FAF9FF] border border-purple-100/90 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#EFEAFF] text-[#6D3DF5] flex items-center justify-center mb-4 font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#170B3B] mb-2">{b.title}</h3>
                <p className="text-xs text-[#5D5A75] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Step Placement Process */}
      <section className="py-16 bg-[#FAF9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEAFF] text-[#6D3DF5] text-xs font-bold uppercase tracking-wider mb-4">
              OUR WORKFLOW
            </div>
            <h2 className="text-3xl font-extrabold text-[#170B3B]">Our 6-Step Placement Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="bg-white p-8 rounded-3xl border border-purple-100/80 shadow-sm relative">
                <div className="text-4xl font-black text-[#6D3DF5]/20 mb-3">{step.num}</div>
                <h3 className="text-xl font-bold text-[#170B3B] mb-2">{step.title}</h3>
                <p className="text-xs text-[#5D5A75] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#170B3B]">Industries We Serve</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind) => (
              <div key={ind} className="p-4 rounded-2xl bg-[#FAF9FF] border border-purple-100/80 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6D3DF5] flex-shrink-0" />
                <span className="text-sm font-bold text-[#170B3B]">{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Ready to Build a High-Performing Workforce?</h2>
          <p className="text-purple-100 mb-8 text-sm sm:text-base">Let JMS Group handle your candidate sourcing, screening, and placement requirements.</p>
          <Link
            to="/employers"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#6D3DF5] font-bold text-sm shadow-xl hover:bg-[#FAF9FF] transition-all"
          >
            <span>Submit Your Hiring Need</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PlacementServicesPage;
