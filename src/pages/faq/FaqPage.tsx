import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle, Search, UserCheck, Building2, Briefcase, FileCheck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const faqCategories = ['All', 'Job Seekers', 'Employers', 'Recruitment', 'Career Counseling', 'Resume Submission'];

  const faqs = [
    { category: 'Job Seekers', q: 'Is registration free for job seekers at JMS Group?', a: 'Yes, 100% free. We never charge candidates any registration fees, assessment charges, or placement commissions.' },
    { category: 'Job Seekers', q: 'What happens after I upload my resume?', a: 'Our recruitment team reviews your qualifications, indexes your skills, and matches your profile directly with verified corporate openings.' },
    { category: 'Job Seekers', q: 'Do you help with interview preparation?', a: 'Yes! We provide company-specific briefing notes, mock interview sessions, and salary negotiation coaching.' },
    { category: 'Employers', q: 'How quickly can JMS Group present shortlisted candidate profiles?', a: 'For urgent hiring drives, pre-screened shortlists are presented within 48 to 72 hours of receiving job specifications.' },
    { category: 'Employers', q: 'What replacement guarantee do you offer for placed candidates?', a: 'We offer a standard 90-day free candidate replacement guarantee to ensure long-term retention and peace of mind.' },
    { category: 'Employers', q: 'What industries do your recruiters cover?', a: 'We specialize in IT & Software, Manufacturing & Engineering, Banking/BFSI, Healthcare, FMCG, and Executive Leadership.' },
    { category: 'Recruitment', q: 'How does candidate background verification work?', a: 'Our placement team performs multi-stage qualification verification, employment history checks, and professional reference validations.' },
    { category: 'Recruitment', q: 'Do you handle executive headhunting and leadership search?', a: 'Yes, our senior search division specializes in C-suite, VP, and Director level talent acquisition globally.' },
    { category: 'Career Counseling', q: 'How do I schedule a 1-on-1 Career Counseling session?', a: 'You can book directly through our Career Counseling page form or request a callback during resume upload.' },
    { category: 'Career Counseling', q: 'What is included in an ATS Resume Optimization review?', a: 'We rewrite CV bullet points, optimize keyword density for applicant tracking systems, and structure clean corporate layouts.' },
    { category: 'Resume Submission', q: 'What file formats are accepted for resume upload?', a: 'We accept PDF, DOC, and DOCX files up to 10MB in size.' },
    { category: 'Resume Submission', q: 'Is my personal contact information kept secure?', a: 'Yes, personal contact details are kept strictly confidential and shared only with verified employers after initial shortlisting.' },
  ];

  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(item => item.category === activeCategory);

  return (
    <div className="w-full bg-white pb-16">
      {/* Hero Banner */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-[#FAF9FF] via-[#FCFBFF] to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEAFF] text-[#6D3DF5] text-xs font-bold uppercase tracking-wider mb-4">
            HELP CENTER & FAQS
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#170B3B] mb-4">Frequently Asked Questions</h1>
          <p className="text-base text-[#5D5A75] max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about JMS Group placement services, HR consulting, resume submission, and career guidance.
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-4xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(0); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] text-white shadow-md'
                  : 'bg-[#FAF9FF] text-[#5D5A75] hover:bg-purple-100 hover:text-[#6D3DF5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Accordions */}
      <section className="max-w-4xl mx-auto px-4 py-4">
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => (
            <div key={faq.q} className="border border-purple-100/90 rounded-2xl overflow-hidden bg-[#FAF9FF] shadow-xs">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-[#170B3B] flex items-center justify-between gap-4 hover:bg-purple-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2.5 py-1 rounded-md bg-[#EFEAFF] text-[#6D3DF5] font-bold">{faq.category}</span>
                  <span className="text-sm sm:text-base">{faq.q}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#6D3DF5] flex-shrink-0 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="p-5 pt-3 text-xs sm:text-sm text-[#5D5A75] leading-relaxed border-t border-purple-50 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mt-16 max-w-4xl mx-auto px-4">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] text-white text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">Still Have Questions?</h3>
          <p className="text-xs sm:text-sm text-purple-100 mb-6">Our recruitment and HR advisory team is available to assist you.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#6D3DF5] font-bold text-xs sm:text-sm shadow-md hover:bg-[#FAF9FF] transition-all"
          >
            Contact Our Advisory Team
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
