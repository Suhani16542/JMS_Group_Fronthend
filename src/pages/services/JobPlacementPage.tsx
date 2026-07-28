import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileCheck,
  UserCheck,
  Search,
  Briefcase,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Star,
  Quote,
} from 'lucide-react';

export const JobPlacementPage: React.FC = () => {
  const steps = [
    { num: '01', title: 'Register Profile', desc: 'Create your free candidate account and upload your updated resume.' },
    { num: '02', title: 'Profile Review', desc: 'JMS placement specialists evaluate your experience, skills, and salary expectations.' },
    { num: '03', title: 'Job Matching', desc: 'Our AI algorithms match your profile with verified corporate openings.' },
    { num: '04', title: 'Shortlisting & Interview', desc: 'Direct interview scheduling with hiring managers and corporate decision-makers.' },
    { num: '05', title: 'Offer & Selection', desc: 'Receive offer letters, salary negotiation advice, and smooth onboarding.' },
    { num: '06', title: 'Career Growth', desc: 'Ongoing post-placement check-ins to ensure career satisfaction.' },
  ];

  const benefits = [
    { title: '100% Free for Candidates', desc: 'No hidden registration fees or charges for job placement.' },
    { title: 'Verified Employer Openings', desc: 'All jobs are vetted directly from leading corporate clients.' },
    { title: 'Direct Recruiter Visibility', desc: 'Your profile gets prioritized by hiring decision-makers.' },
    { title: 'Dedicated Placement Officer', desc: 'Personalized coordination throughout your interview cycle.' },
  ];

  const testimonials = [
    {
      name: 'Rohan Deshmukh',
      role: 'Senior Frontend Developer',
      quote: 'JMS Group connected me with a top fintech firm within 10 days of uploading my resume. Outstanding support!',
    },
    {
      name: 'Neha Kapoor',
      role: 'Supply Chain Executive',
      quote: 'The job placement team guided me through every interview round. Extremely professional experience.',
    },
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
                CANDIDATE JOB PLACEMENT
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-[#170B3B] leading-tight mb-6">
                Land Your Dream Job With <br />
                <span className="bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] bg-clip-text text-transparent">
                  Verified Top Employers
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#5D5A75] leading-relaxed mb-8">
                JMS Group connects ambitious professionals with verified corporate positions matching their skill set, location, and salary goals.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/upload-resume"
                  className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition-all"
                >
                  Upload Your Resume
                </Link>
                <Link
                  to="/jobs"
                  className="px-8 py-3.5 rounded-full text-sm font-bold text-[#6D3DF5] bg-[#EFEAFF] hover:bg-purple-100 transition-all"
                >
                  Browse Openings
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop"
                  alt="Candidate Job Placement Interview"
                  className="w-full h-[380px] object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Candidate Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#170B3B] mb-4">Why Job Seekers Choose JMS Group</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-3xl bg-[#FAF9FF] border border-purple-100/90 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#EFEAFF] text-[#6D3DF5] flex items-center justify-center mb-4 font-bold">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#170B3B] mb-2">{b.title}</h3>
                <p className="text-xs text-[#5D5A75] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="py-16 bg-[#FAF9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEAFF] text-[#6D3DF5] text-xs font-bold uppercase tracking-wider mb-4">
              PLACEMENT TIMELINE
            </div>
            <h2 className="text-3xl font-extrabold text-[#170B3B]">How It Works</h2>
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

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#170B3B]">Candidate Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-3xl bg-[#FAF9FF] border border-purple-100/90 shadow-sm">
                <Quote className="w-8 h-8 text-[#6D3DF5]/40 mb-3" />
                <p className="text-xs text-[#5D5A75] italic leading-relaxed mb-4">"{t.quote}"</p>
                <h4 className="text-sm font-bold text-[#170B3B]">{t.name}</h4>
                <span className="text-xs text-[#6D3DF5] font-medium">{t.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Start Your Job Search Today</h2>
          <p className="text-purple-100 mb-8 text-sm sm:text-base">Upload your CV and let JMS placement specialists connect you with hiring managers.</p>
          <Link
            to="/upload-resume"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#6D3DF5] font-bold text-sm shadow-xl hover:bg-[#FAF9FF] transition-all"
          >
            <span>Submit Resume Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default JobPlacementPage;
