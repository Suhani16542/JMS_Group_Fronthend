import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Compass, FileCheck, ArrowRight, ShieldCheck, CheckCircle2, Building2, Layers, Award, Sparkles, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  const services = [
    {
      title: 'Placement Services',
      subtitle: 'Connecting talent with suitable corporate opportunities',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop',
      features: [
        'Executive Search & Leadership Hiring',
        'Bulk Lateral Recruitment Drives',
        'Industry-Specific Candidate Sourcing',
        'Thorough Background Verification',
      ],
      link: '/services/placement',
    },
    {
      title: 'HR Consulting',
      subtitle: 'Strategic HR & workforce optimization solutions',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop',
      features: [
        'HR Policy Development & Compliance',
        'Organizational Restructuring',
        'Performance Management Systems',
        'Employee Retention Strategies',
      ],
      link: '/services/hr-consulting',
    },
    {
      title: 'Career Counseling',
      subtitle: 'Expert guidance for professional career growth',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
      features: [
        'One-on-One Career Pathway Mapping',
        'ATS Resume & LinkedIn Profile Optimization',
        'Mock Interview & Behavioral Preparation',
        'Salary Negotiation Coaching',
      ],
      link: '/career-counselling',
    },
    {
      title: 'Job Placement',
      subtitle: 'End-to-end recruitment and candidate onboarding support',
      icon: FileCheck,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
      features: [
        'Verified Employer Job Matching',
        'End-to-End Interview Scheduling',
        'Offer Letter Facilitation',
        'Post-Placement Support',
      ],
      link: '/services/job-placement',
    },
  ];

  const whyChooseServices = [
    { title: 'Tailored Corporate HR Frameworks', desc: 'Customized talent acquisition and organizational solutions designed for your specific industry requirements.' },
    { title: 'Pre-Screened & Verified Talent', desc: 'Multi-stage candidate vetting ensures immediate job readiness, productivity, and long-term retention.' },
    { title: '85% Faster Time-To-Hire', desc: 'Streamlined interview scheduling and proactive candidate pipelines cut hiring cycles significantly.' },
    { title: 'End-to-End Career Support', desc: 'Dedicated career advisors supporting job seekers from CV optimization to final offer negotiation.' },
  ];

  const processSteps = [
    { num: '01', title: 'Consultation & Goal Mapping', desc: 'We analyze hiring requirements or candidate career ambitions to set precise benchmarks.' },
    { num: '02', title: 'Sourcing & Assessment', desc: 'Leveraging multi-channel networks and technical pre-screenings to curate top talent.' },
    { num: '03', title: 'Matching & Interview Prep', desc: 'Connecting candidates with compatible corporate decision-makers with mock interview prep.' },
    { num: '04', title: 'Placement & Growth Support', desc: 'Facilitating offer letters, smooth onboarding, and 90-day post-hire check-ins.' },
  ];

  const industriesSupported = [
    'Information Technology & Software',
    'Manufacturing & Heavy Engineering',
    'Banking, Financial Services & Insurance',
    'Healthcare & Pharmaceuticals',
    'Retail & Supply Chain Logistics',
    'Education & Corporate Training',
  ];

  return (
    <div className="w-full bg-[#FAF9FF] min-h-screen pb-16">
      {/* Header Banner */}
      <section className="py-16 bg-gradient-to-b from-[#FAF9FF] via-white to-[#FAF9FF] border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEAFF] text-[#6D3DF5] text-xs font-bold uppercase tracking-wider mb-4">
              OUR PROFESSIONAL SERVICES
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#170B3B] mb-4">
              Tailored HR & Placement <span className="text-[#6D3DF5]">Solutions</span>
            </h1>
            <p className="text-base text-[#5D5A75] leading-relaxed">
              JMS Group provides end-to-end solutions for job seekers looking to advance their careers and corporate clients seeking top-tier talent.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <motion.div
                  key={srv.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden border border-purple-100/90 shadow-sm hover:shadow-xl hover:border-[#6D3DF5]/30 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Service Visual Header */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={srv.image}
                        alt={srv.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#170B3B]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-6 flex items-center gap-3 text-white">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">{srv.title}</h3>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-xs font-semibold text-[#6D3DF5] mb-4">{srv.subtitle}</p>
                      <div className="space-y-2.5 mb-6">
                        {srv.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-[#6D3DF5] flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-[#5D5A75]">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      to={srv.link}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#6D3DF5] hover:text-[#4C1D95] transition-colors pt-4 border-t border-purple-50 w-full"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 bg-white border-y border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#170B3B]">Why Choose JMS Group Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseServices.map((item) => (
              <div key={item.title} className="p-6 rounded-3xl bg-[#FAF9FF] border border-purple-100/80">
                <ShieldCheck className="w-8 h-8 text-[#6D3DF5] mb-4" />
                <h4 className="text-base font-bold text-[#170B3B] mb-2">{item.title}</h4>
                <p className="text-xs text-[#5D5A75] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Process Section */}
      <section className="py-16 bg-[#FAF9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#6D3DF5] text-xs font-bold uppercase tracking-wider mb-4 border border-purple-100">
              METHODOLOGY
            </div>
            <h2 className="text-3xl font-extrabold text-[#170B3B]">Our End-to-End Service Delivery Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div key={step.num} className="p-6 rounded-3xl bg-white border border-purple-100/80 shadow-sm relative">
                <span className="text-3xl font-black text-[#6D3DF5]/20 block mb-3">{step.num}</span>
                <h3 className="text-base font-bold text-[#170B3B] mb-2">{step.title}</h3>
                <p className="text-xs text-[#5D5A75] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Supported */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#170B3B]">Industries We Support</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industriesSupported.map((ind) => (
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
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Talk To Our HR & Placement Experts</h2>
          <p className="text-purple-100 mb-8 text-sm sm:text-base">Ready to hire top corporate candidates or accelerate your career? Contact JMS Group today.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#6D3DF5] font-bold text-sm shadow-xl hover:bg-[#FAF9FF] transition-all"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
