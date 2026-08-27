import React from 'react';
import { LegalTemplatePage } from './LegalPages';
import { Scale, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => (
  <LegalTemplatePage
    title="Terms & Conditions"
    subtitle="Rules, guidelines, and legal agreements governing the use of JMS Group services and job portal."
    icon={Scale}
  >
    <div className="p-6 rounded-2xl bg-white border border-[#9E3371] mb-6">
      <h3 className="text-xl font-extrabold text-[#9E3371] mb-3 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-[#9E3371]" />
        1. Acceptance & Website Usage Terms
      </h3>
      <p className="text-xs sm:text-sm text-[#9E3371] leading-relaxed mb-4">
        By accessing or using the JMS Group web portal, candidate database, or HR consulting services, you agree to comply with all terms outlined herein. Users must provide accurate, truthful personal and professional information during registration.
      </p>
      <ul className="space-y-2 text-xs text-[#9E3371]">
        <li className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9E3371] mt-1.5 flex-shrink-0" />
          <span>Job seekers warrant that all resume details, work experience, and educational credentials provided are genuine.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9E3371] mt-1.5 flex-shrink-0" />
          <span>Employers warrant that corporate job openings posted represent active, legitimate hiring requirements.</span>
        </li>
      </ul>
    </div>

    <div className="p-6 rounded-2xl bg-white border border-[#9E3371] mb-6">
      <h3 className="text-xl font-extrabold text-[#9E3371] mb-3 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-[#9E3371]" />
        2. Placement & Recruitment Agency Intermediary Role
      </h3>
      <p className="text-xs sm:text-sm text-[#9E3371] leading-relaxed mb-4">
        JMS Group operates as a specialized recruitment facilitator and talent advisor connecting job candidates with client corporations. Final hiring offers, salary contracts, and employment terms are determined directly between the hiring corporate entity and the selected candidate.
      </p>
    </div>

    <div className="p-6 rounded-2xl bg-white border border-[#9E3371] mb-6">
      <h3 className="text-xl font-extrabold text-[#9E3371] mb-3 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-[#9E3371]" />
        3. Intellectual Property Rights & Candidate Data Protection
      </h3>
      <p className="text-xs sm:text-sm text-[#9E3371] leading-relaxed">
        All trademarks, JMS Group brand assets, website design systems, and proprietary candidate shortlisting algorithms remain the exclusive intellectual property of JMS Group. Unauthorized scraping, data copying, or automated extraction is strictly prohibited.
      </p>
    </div>
  </LegalTemplatePage>
);

export default TermsPage;
