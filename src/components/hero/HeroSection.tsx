import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GroupedTextHover } from '@/components/common/GroupedTextHover';
import { Search, Users, Star, Sparkles, Briefcase, MessageSquare, FileCheck, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const teamImageUrl = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop";

  const bottomServices = [
    {
      title: 'Placement Services',
      desc: 'Connecting businesses with skilled and suitable talent.',
      icon: Users,
      href: '/services/placement',
    },
    {
      title: 'HR Consulting',
      desc: 'Strategic HR solutions to help organizations build stronger teams.',
      icon: Briefcase,
      href: '/services/hr-consulting',
    },
    {
      title: 'Career Counseling',
      desc: 'Expert career guidance to help individuals choose the right career path.',
      icon: MessageSquare,
      href: '/career-counselling',
    },
    {
      title: 'Job Placement',
      desc: 'End-to-end placement support connecting candidates with the right opportunities.',
      icon: FileCheck,
      href: '/services/job-placement',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 bg-hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center mb-12 lg:mb-16">

          {/* LEFT COLUMN: Hero Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-start z-10"
          >
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8FB] text-[#7A1F4D] text-xs font-bold tracking-wide uppercase mb-5 border border-[#8B1E5C]/30 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8B1E5C]" />
              <span>WELCOME TO JMS GROUP</span>
            </div>

            {/* Main Heading matching reference font styling */}
            <h1 className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[54px] font-black text-[#6D214F] leading-[1.12] tracking-tight mb-4">
              <GroupedTextHover
                lines={["Connecting Talent", "With Opportunity"]}
                highlightGradient={true}
              />
            </h1>

            {/* Accent underline bar */}
            <div className="w-16 h-1.5 bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] rounded-full mb-5" />

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-[#555555] max-w-lg leading-relaxed mb-7 font-normal">
              JMS Group provides professional placement, HR consulting, career counseling and job placement solutions that connect talented people with the right opportunities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <Link
                to="/jobs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] shadow-[0_4px_20px_rgba(139,30,92,0.3)] hover:shadow-[0_10px_30px_rgba(194,24,139,0.45)] hover:-translate-y-1 transition-all duration-300 border border-white/20"
              >
                <span>Find Jobs</span>
                <Search className="w-4 h-4 text-white" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold text-[#6D214F] bg-white border-2 border-[#8B1E5C] hover:bg-gradient-to-r hover:from-[#7A1F4D] hover:to-[#C2188B] hover:text-white hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-xs"
              >
                <span>Hire Talent</span>
                <Users className="w-4 h-4" />
              </Link>
            </div>

            {/* Candidate Avatars & Trust Metrics */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex -space-x-3.5">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#8B1E5C] object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                  alt="Candidate 1"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#8B1E5C] object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                  alt="Candidate 2"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#8B1E5C] object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
                  alt="Candidate 3"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#8B1E5C] object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
                  alt="Candidate 4"
                />
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#7A1F4D] to-[#C2188B] ring-2 ring-[#8B1E5C] flex items-center justify-center text-white text-xs font-bold shadow-xs">
                  10K+
                </div>
              </div>

              <div className="flex flex-col text-xs sm:text-sm text-[#555555]">
                <div>
                  Trusted by <span className="font-bold text-[#6D214F]">500+</span> Companies
                </div>
                <div className="font-bold text-[#8B1E5C]">
                  10,000+ <span className="font-normal text-[#777777]">Candidates</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Flowing S-Curve Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 relative flex justify-center lg:justify-end items-center mt-6 lg:mt-0 w-full"
          >
            <div className="relative w-full max-w-2xl">
              
              {/* S-Curve White Container */}
              <div className="relative overflow-hidden rounded-l-[60px] sm:rounded-l-[140px] lg:rounded-l-[180px] rounded-r-[24px] sm:rounded-r-[36px] shadow-xl bg-white p-1.5 sm:p-2 border border-[#8B1E5C]/30">
                
                {/* Hero Image */}
                <img
                  src={teamImageUrl}
                  alt="Corporate Recruitment Team - JMS Group"
                  className="w-full h-[240px] xs:h-[300px] sm:h-[380px] lg:h-[450px] object-cover rounded-l-[54px] sm:rounded-l-[132px] lg:rounded-l-[170px] rounded-r-[20px] sm:rounded-r-[30px]"
                />

                {/* Bottom-Right Curved Ribbon Accent */}
                <div className="absolute -bottom-2 -right-2 w-36 xs:w-60 sm:w-80 lg:w-96 h-20 xs:h-32 sm:h-40 lg:h-44 bg-gradient-to-tl from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] rounded-tl-[100%] border-t-2 border-l-2 border-white shadow-xl overflow-hidden pointer-events-none flex items-end justify-end p-4">
                </div>

              </div>

              {/* Floating Statistics Card - 25+ Years of Excellence */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-4 sm:-bottom-5 left-4 sm:left-16 lg:left-24 bg-white px-4 sm:px-6 py-2.5 sm:py-4 rounded-[18px] shadow-2xl border border-[#8B1E5C]/20 flex items-center gap-3 sm:gap-4 z-30"
              >
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#7A1F4D] to-[#C2188B] flex items-center justify-center text-white shadow-md">
                  <Star className="w-4 h-4 sm:w-6 sm:h-6 fill-white text-transparent" />
                </div>
                <div>
                  <div className="text-xl sm:text-3xl font-black text-[#6D214F] leading-none">25+</div>
                  <div className="text-[10px] sm:text-sm text-[#555555] font-semibold mt-0.5 sm:mt-1">Years of Excellence</div>
                  <div className="w-6 sm:w-8 h-0.5 sm:h-1 bg-[#8B1E5C] rounded-full mt-1" />
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* SERVICES STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#FAF8FB] rounded-[18px] shadow-lg border border-[#8B1E5C]/20 p-6 sm:p-7"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bottomServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={service.title}
                  className={`flex items-start gap-4 ${
                    index !== 0 ? 'lg:border-l lg:border-[#8B1E5C]/20 lg:pl-6' : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7A1F4D] to-[#C2188B] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <ServiceIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-sm text-[#6D214F] mb-1">{service.title}</h3>
                    <p className="text-xs text-[#555555] leading-relaxed font-normal mb-2.5">{service.desc}</p>
                    <Link
                      to={service.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1E5C] hover:text-[#C2188B] transition-colors group/link mt-auto"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;

