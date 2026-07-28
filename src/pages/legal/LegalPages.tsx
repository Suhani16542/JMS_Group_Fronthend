import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, FileText, CheckCircle2, HelpCircle, ArrowRight, Sparkles, Scale, Info, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LegalTemplatePage: React.FC<{ title: string; subtitle: string; icon: React.ElementType; lastUpdated?: string; children: React.ReactNode }> = ({
  title,
  subtitle,
  icon: Icon,
  lastUpdated = 'January 2026',
  children,
}) => {
  return (
    <div className="w-full bg-[#FAF9FF] min-h-screen pb-20">
      {/* Hero Header */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-[#FAF9FF] via-white to-[#FAF9FF] border-b border-purple-100/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFEAFF] text-[#6D3DF5] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LEGAL & COMPLIANCE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#170B3B] mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-base text-[#5D5A75] max-w-2xl mx-auto leading-relaxed mb-4">
            {subtitle}
          </p>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-[#6D3DF5] text-xs font-semibold border border-purple-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Effective Date: {lastUpdated} | JMS Group Corporate Governance</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-100/90 shadow-xl">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-purple-100">
              <div className="w-14 h-14 rounded-2xl bg-[#EFEAFF] text-[#6D3DF5] flex items-center justify-center flex-shrink-0 shadow-xs">
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#170B3B]">{title} Overview</h2>
                <p className="text-xs text-[#5D5A75] mt-1">Please read these official JMS Group compliance guidelines carefully.</p>
              </div>
            </div>

            <div className="space-y-8 text-sm sm:text-base text-[#5D5A75] leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const TermsPage: React.FC = () => (
  <LegalTemplatePage title="Terms & Conditions" subtitle="Rules, guidelines, and legal agreements governing the use of JMS Group services and job portal." icon={Scale}>
    <div className="p-6 rounded-2xl bg-[#FAF9FF] border border-purple-100 mb-6">
      <h3 className="text-xl font-extrabold text-[#170B3B] mb-3 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-[#6D3DF5]" />
        1. Acceptance & Website Usage Terms
      </h3>
      <p className="text-xs sm:text-sm text-[#5D5A75] leading-relaxed mb-4">
        By accessing or using the JMS Group web portal, candidate database, or HR consulting services, you agree to comply with all terms outlined herein. Users must provide accurate, truthful personal and professional information during registration.
      </p>
      <ul className="space-y-2 text-xs text-[#5D5A75]">
        <li className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6D3DF5] mt-1.5 flex-shrink-0" />
          <span>Job seekers warrant that all resume details, work experience, and educational credentials provided are genuine.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6D3DF5] mt-1.5 flex-shrink-0" />
          <span>Employers warrant that corporate job openings posted represent active, legitimate hiring requirements.</span>
        </li>
      </ul>
    </div>

    <div className="p-6 rounded-2xl bg-[#FAF9FF] border border-purple-100 mb-6">
      <h3 className="text-xl font-extrabold text-[#170B3B] mb-3 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-[#6D3DF5]" />
        2. Placement & Recruitment Agency Intermediary Role
      </h3>
      <p className="text-xs sm:text-sm text-[#5D5A75] leading-relaxed mb-4">
        JMS Group operates as a specialized recruitment facilitator and talent advisor connecting job candidates with client corporations. Final hiring offers, salary contracts, and employment terms are determined directly between the hiring corporate entity and the selected candidate.
      </p>
    </div>

    <div className="p-6 rounded-2xl bg-[#FAF9FF] border border-purple-100 mb-6">
      <h3 className="text-xl font-extrabold text-[#170B3B] mb-3 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-[#6D3DF5]" />
        3. Intellectual Property Rights & Candidate Data Protection
      </h3>
      <p className="text-xs sm:text-sm text-[#5D5A75] leading-relaxed">
        All trademarks, JMS Group brand assets, website design systems, and proprietary candidate shortlisting algorithms remain the exclusive intellectual property of JMS Group. Unauthorized scraping, data copying, or automated extraction is strictly prohibited.
      </p>
    </div>
  </LegalTemplatePage>
);

export const PrivacyPolicyPage: React.FC = () => (
  <LegalTemplatePage title="Privacy Policy" subtitle="How JMS Group collects, protects, uses, and safeguards candidate and employer data." icon={Lock}>
    <div className="p-6 rounded-2xl bg-[#FAF9FF] border border-purple-100 mb-6">
      <h3 className="text-xl font-extrabold text-[#170B3B] mb-3 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-[#6D3DF5]" />
        1. Information We Collect
      </h3>
      <p className="text-xs sm:text-sm text-[#5D5A75] leading-relaxed">
        We collect candidate resumes, contact information, educational credentials, work histories, preferred salary bands, and corporate client hiring requisitions.
      </p>
    </div>

    <div className="p-6 rounded-2xl bg-[#FAF9FF] border border-purple-100 mb-6">
      <h3 className="text-xl font-extrabold text-[#170B3B] mb-3 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-[#6D3DF5]" />
        2. How Candidate Data is Shared
      </h3>
      <p className="text-xs sm:text-sm text-[#5D5A75] leading-relaxed">
        Candidate details are shared strictly with verified corporate recruiters and hiring managers only after candidate evaluation and matching approval. We do not sell candidate data to third-party marketers.
      </p>
    </div>
  </LegalTemplatePage>
);

export const DisclaimerPage: React.FC = () => (
  <LegalTemplatePage title="Disclaimer" subtitle="General information guidelines regarding recruitment listings and career guidance." icon={Info}>
    <div className="p-6 rounded-2xl bg-[#FAF9FF] border border-purple-100 mb-6">
      <h3 className="text-xl font-extrabold text-[#170B3B] mb-3">Job Listing Accuracy & Disclaimer</h3>
      <p className="text-xs sm:text-sm text-[#5D5A75] leading-relaxed">
        While JMS Group rigorously vets corporate client openings, we make no express guarantees regarding guaranteed job selection, offer timelines, or employer hiring decisions.
      </p>
    </div>
  </LegalTemplatePage>
);

export const CookiePolicyPage: React.FC = () => (
  <LegalTemplatePage title="Cookie Policy" subtitle="Understanding how cookies enhance your browsing experience on JMS Group." icon={Eye}>
    <div className="p-6 rounded-2xl bg-[#FAF9FF] border border-purple-100 mb-6">
      <h3 className="text-xl font-extrabold text-[#170B3B] mb-3">Cookie Usage & Preference Controls</h3>
      <p className="text-xs sm:text-sm text-[#5D5A75] leading-relaxed">
        We use essential cookies for secure form submissions and analytical cookies to improve portal navigation. Users can modify cookie preferences through browser settings.
      </p>
    </div>
  </LegalTemplatePage>
);
