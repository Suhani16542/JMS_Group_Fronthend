import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Shield, Award, Users, Building2, Briefcase, CheckCircle2, ArrowRight, Star, HeartHandshake, UserCheck, Search, FileCheck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const stats = [
    { label: 'Years Experience', value: '15+' },
    { label: 'Corporate Clients', value: '500+' },
    { label: 'Candidates Placed', value: '10,000+' },
    { label: 'Industries Served', value: '15+' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision Placement',
      desc: 'Matching candidate skills and career ambitions precisely with corporate employer requirements.',
    },
    {
      icon: Eye,
      title: 'Unwavering Integrity',
      desc: 'Transparent, ethical, and reliable HR consulting practices across all corporate engagements.',
    },
    {
      icon: Shield,
      title: 'Verified Quality',
      desc: 'Rigorously vetted talent profiles ensuring high workforce performance, productivity and retention.',
    },
    {
      icon: Award,
      title: 'Continuous Growth',
      desc: 'Empowering job seekers and businesses to achieve sustainable long-term professional success.',
    },
  ];

  const recruitmentApproach = [
    { num: '01', title: 'Deep Requirement Analysis', desc: 'Understanding technical skills, team dynamics, and company culture for accurate sourcing.', icon: Search },
    { num: '02', title: 'Multi-Channel Candidate Sourcing', desc: 'Tapping into our 10,000+ talent pool, referral networks, and direct executive headhunting.', icon: Users },
    { num: '03', title: 'Comprehensive Evaluation', desc: 'Conducting initial behavioral screening, technical pre-assessments, and background checks.', icon: UserCheck },
    { num: '04', title: 'Seamless Placement & Support', desc: 'Assisting in offer facilitation, smooth onboarding, and post-placement 90-day check-ins.', icon: FileCheck },
  ];

  const companyTrust = [
    { title: '85% Faster Time-to-Hire', desc: 'Our pre-screened talent pipeline reduces hiring timelines from months to days.' },
    { title: '95% Employee Retention', desc: 'Precise cultural and technical alignment ensures candidates stay long-term.' },
    { title: 'Tailored HR Strategies', desc: 'Customized talent acquisition and organizational workflows designed per industry.' },
  ];

  const candidateTrust = [
    { title: '100% Free Placement', desc: 'Zero registration or hidden placement fees for job seekers.' },
    { title: 'Verified Corporate Employers', desc: 'Direct access to reputed MNCs, Fortune 500s, and high-growth enterprises.' },
    { title: 'Personalized Career Counseling', desc: 'One-on-one resume reviews, mock interviews, and salary negotiation support.' },
  ];

  const faqs = [
    { q: 'What makes JMS Group different from traditional staffing agencies?', a: 'JMS Group combines 15+ years of recruitment expertise with 1-on-1 candidate counseling and specialized HR consulting frameworks tailored for corporate client growth.' },
    { q: 'How long does the candidate placement process take?', a: 'For corporate clients, pre-screened shortlists are presented within 48 to 72 hours. Candidate placements typically complete within 10 to 14 business days.' },
    { q: 'Does JMS Group charge candidates for job placement services?', a: 'No, our placement services are completely free for candidates. We never charge registration fees, interview guidance fees, or placement commissions.' },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Banner Header */}
      <section className="relative py-16 lg:py-24 bg-white overflow-hidden border-b border-[#9E3371]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E3371] text-white text-xs font-bold tracking-wider uppercase mb-4 border border-white">
              ABOUT JMS GROUP
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#9E3371] tracking-tight leading-tight mb-6">
              Empowering Careers & <br />
              <span className="text-[#9E3371]">
                Transforming Organizations
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#9E3371] leading-relaxed">
              JMS Group is a premier recruitment, placement, HR consulting, and career guidance organization with a 15+ year legacy of excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main About Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Grid Collage */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl overflow-hidden border-4 border-[#9E3371] shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop"
                    alt="JMS Group Executive HR Team"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-4 w-48 sm:w-56 rounded-2xl overflow-hidden border-4 border-[#9E3371] shadow-2xl hidden sm:block">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop"
                    alt="Corporate Hiring Consultation"
                    className="w-full h-36 object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Content Copy */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex flex-col items-start"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#9E3371] mb-6 leading-snug">
                Growing Your Self with <span className="text-[#9E3371]">JMS Group</span>
              </h2>
              <p className="text-base text-[#9E3371] leading-relaxed mb-4">
                Founded with a mission to bridge the gap between talented individuals and leading corporations, JMS Group provides comprehensive solutions covering Placement Services, HR Consulting, Career Counseling, and Executive Placement.
              </p>
              <p className="text-sm text-[#9E3371] leading-relaxed mb-8">
                Our team of seasoned recruiters and HR strategists leverage industry knowledge to deliver personalized career roadmaps for professionals and talent acquisition frameworks for enterprises.
              </p>

              {/* Statistics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="p-3.5 rounded-2xl bg-white border border-[#9E3371] text-center">
                    <div className="text-2xl sm:text-3xl font-black text-[#9E3371]">{stat.value}</div>
                    <div className="text-xs font-semibold text-[#9E3371] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-[#9E3371] border border-white shadow-lg hover:bg-[#862B5F] transition-all"
              >
                <span>Get In Touch With Us</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white border-t border-[#9E3371]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-[#9E3371] shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-[#9E3371] text-white flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#9E3371] mb-3">Our Mission</h3>
              <p className="text-sm text-[#9E3371] leading-relaxed">
                To connect ambitious professionals with rewarding career opportunities while providing employers with dependable, pre-verified talent that drives organizational excellence.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#9E3371] shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-[#9E3371] text-white flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#9E3371] mb-3">Our Vision</h3>
              <p className="text-sm text-[#9E3371] leading-relaxed">
                To be the most trusted HR consulting and placement partner globally, recognized for candidate-centric career counseling and corporate workforce transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white border-t border-[#9E3371]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#9E3371]">Core Values Driving Our Success</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="p-6 rounded-3xl bg-white border border-[#9E3371] flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#9E3371] text-white flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-[#9E3371] mb-2">{val.title}</h4>
                    <p className="text-xs text-[#9E3371] leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Recruitment Approach Section */}
      <section className="py-16 bg-white border-t border-[#9E3371]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E3371] text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white">
              METHODOLOGY
            </div>
            <h2 className="text-3xl font-extrabold text-[#9E3371]">Our Proven Recruitment Approach</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recruitmentApproach.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.num} className="p-6 rounded-3xl bg-white border border-[#9E3371] shadow-sm relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-[#9E3371]/40">{step.num}</span>
                      <div className="w-10 h-10 rounded-xl bg-[#9E3371] text-white flex items-center justify-center">
                        <StepIcon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#9E3371] mb-2">{step.title}</h3>
                    <p className="text-xs text-[#9E3371] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Grid Section */}
      <section className="py-16 bg-white border-t border-[#9E3371]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Why Companies Trust Us */}
            <div className="p-8 rounded-3xl bg-white border border-[#9E3371] shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#9E3371] text-white flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#9E3371]">Why Companies Trust Us</h3>
              </div>
              <div className="space-y-4">
                {companyTrust.map((item) => (
                  <div key={item.title} className="p-4 rounded-2xl bg-white border border-[#9E3371] flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#9E3371] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#9E3371]">{item.title}</h4>
                      <p className="text-xs text-[#9E3371] leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Candidates Trust Us */}
            <div className="p-8 rounded-3xl bg-white border border-[#9E3371] shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#9E3371] text-white flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#9E3371]">Why Candidates Trust Us</h3>
              </div>
              <div className="space-y-4">
                {candidateTrust.map((item) => (
                  <div key={item.title} className="p-4 rounded-2xl bg-white border border-[#9E3371] flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#9E3371] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#9E3371]">{item.title}</h4>
                      <p className="text-xs text-[#9E3371] leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white border-t border-[#9E3371]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#9E3371]">About Us FAQs</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6 rounded-3xl bg-white border border-[#9E3371] shadow-sm">
                <h4 className="text-base font-bold text-[#9E3371] mb-2">{faq.q}</h4>
                <p className="text-xs text-[#9E3371] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA Banner */}
      <section className="py-16 bg-[#9E3371] text-white border-t border-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-white">Partner With JMS Group Today</h2>
          <p className="text-white mb-8 text-sm sm:text-base">Whether you are hiring executive talent or seeking your next career milestone, JMS Group is your trusted partner.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-white text-[#9E3371] font-bold text-sm shadow-xl hover:bg-[#862B5F] hover:text-white transition-all"
            >
              Contact Our Advisors
            </Link>
            <Link
              to="/jobs"
              className="px-8 py-3.5 rounded-full bg-[#9E3371] text-white font-bold text-sm border border-white hover:bg-[#862B5F] transition-all"
            >
              Explore Open Roles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

