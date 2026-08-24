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
    <div className="w-full bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <section className="relative py-16 lg:py-24 bg-white border-b border-[#9E3371] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9E3371] text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>LEGAL & COMPLIANCE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#9E3371] mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-base text-[#9E3371] max-w-2xl mx-auto leading-relaxed mb-4">
            {subtitle}
          </p>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#9E3371] text-xs font-semibold border border-[#9E3371]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#9E3371]" />
            <span>Effective Date: {lastUpdated} | JMS Group Corporate Governance</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#9E3371] shadow-xl">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#9E3371]">
              <div className="w-14 h-14 rounded-2xl bg-[#9E3371] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#9E3371]">{title} Overview</h2>
                <p className="text-xs text-[#9E3371] mt-1">Please read these official JMS Group compliance guidelines carefully.</p>
              </div>
            </div>

            <div className="space-y-8 text-sm sm:text-base text-[#9E3371] leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { TermsPage } from './TermsPage';

export const PrivacyPolicyPage: React.FC = () => (
  <LegalTemplatePage title="Privacy Policy" subtitle="How JMS Group collects, protects, uses, and safeguards candidate and employer data." icon={Lock}>
    <div className="p-6 rounded-2xl bg-white border border-[#9E3371] mb-6">
      <h3 className="text-xl font-extrabold text-[#9E3371] mb-3 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-[#9E3371]" />
        1. Information We Collect
      </h3>
      <p className="text-xs sm:text-sm text-[#9E3371] leading-relaxed">
        We collect candidate resumes, contact information, educational credentials, work histories, preferred salary bands, and corporate client hiring requisitions.
      </p>
    </div>

    <div className="p-6 rounded-2xl bg-white border border-[#9E3371] mb-6">
      <h3 className="text-xl font-extrabold text-[#9E3371] mb-3 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-[#9E3371]" />
        2. How Candidate Data is Shared
      </h3>
      <p className="text-xs sm:text-sm text-[#9E3371] leading-relaxed">
        Candidate details are shared strictly with verified corporate recruiters and hiring managers only after candidate evaluation and matching approval. We do not sell candidate data to third-party marketers.
      </p>
    </div>
  </LegalTemplatePage>
);

export const DisclaimerPage: React.FC = () => (
  <LegalTemplatePage title="Disclaimer" subtitle="General information guidelines regarding recruitment listings and career guidance." icon={Info}>
    <div className="p-6 rounded-2xl bg-white border border-[#9E3371] mb-6">
      <h3 className="text-xl font-extrabold text-[#9E3371] mb-3">Job Listing Accuracy & Disclaimer</h3>
      <p className="text-xs sm:text-sm text-[#9E3371] leading-relaxed">
        While JMS Group rigorously vets corporate client openings, we make no express guarantees regarding guaranteed job selection, offer timelines, or employer hiring decisions.
      </p>
    </div>
  </LegalTemplatePage>
);

export const CookiePolicyPage: React.FC = () => (
  <LegalTemplatePage title="Cookie Policy" subtitle="Understanding how cookies enhance your browsing experience on JMS Group." icon={Eye}>
    <div className="p-6 rounded-2xl bg-white border border-[#9E3371] mb-6">
      <h3 className="text-xl font-extrabold text-[#9E3371] mb-3">Cookie Usage & Preference Controls</h3>
      <p className="text-xs sm:text-sm text-[#9E3371] leading-relaxed">
        We use essential cookies for secure form submissions and analytical cookies to improve portal navigation. Users can modify cookie preferences through browser settings.
      </p>
    </div>
  </LegalTemplatePage>
);

