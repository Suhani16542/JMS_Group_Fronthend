import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  Briefcase,
  Settings,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export const HrConsultingPage: React.FC = () => {
  const solutions = [
    { title: 'HR Strategy & Policy Development', desc: 'Custom HR manuals, compliance guidelines, employee code of conduct, and legal framework design.' },
    { title: 'Workforce Planning & Architecture', desc: 'Organizational design, role mapping, compensation structuring, and talent succession planning.' },
    { title: 'Recruitment Strategy & Sourcing', desc: 'Optimizing corporate talent acquisition pipelines, ATS setups, and employer brand enhancement.' },
    { title: 'Performance Management (PMS)', desc: 'KPI / OKR framework implementation, annual review workflows, and merit-based reward systems.' },
    { title: 'HR Process Digitalization & Audit', desc: 'Auditing existing HR operations, payroll workflow optimization, and cloud HRIS integration.' },
    { title: 'Employee Retention & Engagement', desc: 'Developing high-retention cultural programs, pulse survey analytics, and conflict resolution.' },
  ];

  const faqs = [
    { q: 'How does JMS Group HR Consulting benefit small & mid-sized businesses?', a: 'We function as your dedicated virtual HR director, building enterprise-grade HR policies, compliance frameworks, and hiring systems without the full overhead of an internal HR team.' },
    { q: 'Can you help redesign our existing employee performance management system?', a: 'Yes. We design and implement modern OKR and KPI frameworks that align individual employee goals directly with business revenue growth.' },
    { q: 'What industries do your HR consultants specialize in?', a: 'We have extensive consulting experience across IT, Manufacturing, Healthcare, Retail, BFSI, and Logistics sectors.' },
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
                HR CONSULTING
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-[#170B3B] leading-tight mb-6">
                Strategic HR Solutions for <br />
                <span className="bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] bg-clip-text text-transparent">
                  Sustainable Business Growth
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#5D5A75] leading-relaxed mb-8">
                JMS Group empowers corporate leaders to optimize workforce architecture, build high-retention workplace cultures, and ensure 100% HR regulatory compliance.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition-all"
              >
                <span>Talk To Our HR Experts</span>
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
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop"
                  alt="JMS HR Consulting Strategy Meeting"
                  className="w-full h-[380px] object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#170B3B] mb-4">Our HR Consulting Solutions</h2>
            <p className="text-sm sm:text-base text-[#5D5A75]">
              Tailored advisory services designed to transform HR departments into strategic growth drivers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol) => (
              <div key={sol.title} className="p-8 rounded-3xl bg-[#FAF9FF] border border-purple-100/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white text-[#6D3DF5] shadow-xs flex items-center justify-center mb-6">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#170B3B] mb-3">{sol.title}</h3>
                  <p className="text-xs text-[#5D5A75] leading-relaxed mb-6">{sol.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 bg-[#FAF9FF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#170B3B]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6 rounded-3xl bg-white border border-purple-100/80 shadow-sm">
                <h4 className="text-base font-bold text-[#170B3B] mb-2">{faq.q}</h4>
                <p className="text-xs text-[#5D5A75] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Optimize Your HR Operations Today</h2>
          <p className="text-purple-100 mb-8 text-sm sm:text-base">Schedule a confidential consultation with senior JMS Group HR advisors.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#6D3DF5] font-bold text-sm shadow-xl hover:bg-[#FAF9FF] transition-all"
          >
            <span>Book HR Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HrConsultingPage;
