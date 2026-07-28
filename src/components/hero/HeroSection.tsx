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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF9FF] via-[#FCFBFF] to-white pt-6 pb-12 lg:pt-8 lg:pb-16">
      {/* Background Soft Purple Glow & Flowing Dotted Grid */}
      <div className="absolute top-1/4 left-1/3 -z-10 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#6D3DF5_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEAFF] text-[#6D3DF5] text-xs font-bold tracking-wide uppercase mb-5 shadow-2xs border border-purple-100">
              <Sparkles className="w-3.5 h-3.5 text-[#6D3DF5]" />
              <span>WELCOME TO JMS GROUP</span>
            </div>

            {/* Main Heading matching reference font styling */}
            <h1 className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[54px] font-black text-[#170B3B] leading-[1.12] tracking-tight mb-4">
              <GroupedTextHover
                lines={["Connecting Talent", "With Opportunity"]}
                highlightGradient={true}
              />
            </h1>

            {/* Accent underline bar */}
            <div className="w-14 h-1.5 bg-gradient-to-r from-[#2A0868] via-[#521EE2] to-[#7C3AED] rounded-full mb-5" />

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-[#5D5A75] max-w-lg leading-relaxed mb-7 font-normal">
              JMS Group provides professional placement, HR consulting, career counseling and job placement solutions that connect talented people with the right opportunities.
            </p>

            {/* CTA Buttons - Matching Reference Image (Purple Find Jobs + White Outline Hire Talent) */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <Link
                to="/jobs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl sm:rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#2A0868] via-[#521EE2] to-[#7C3AED] shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 hover:scale-[1.02] transition-all duration-300"
              >
                <span>Find Jobs</span>
                <Search className="w-4 h-4 ml-1" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl sm:rounded-full text-sm font-bold text-[#521EE2] bg-white border-2 border-[#521EE2] hover:bg-[#F5F2FF] hover:scale-[1.02] transition-all duration-300 shadow-2xs"
              >
                <span>Hire Talent</span>
                <Users className="w-4 h-4 ml-1 text-[#521EE2]" />
              </Link>
            </div>

            {/* Candidate Avatars & Trust Metrics */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex -space-x-3.5">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                  alt="Candidate 1"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                  alt="Candidate 2"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
                  alt="Candidate 3"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
                  alt="Candidate 4"
                />
                <div className="h-10 w-10 rounded-full bg-[#521EE2] ring-2 ring-white flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  10K+
                </div>
              </div>

              <div className="flex flex-col text-xs sm:text-sm text-[#5D5A75]">
                <div>
                  Trusted by <span className="font-bold text-[#521EE2]">500+</span> Companies
                </div>
                <div className="font-bold text-[#521EE2]">
                  10,000+ <span className="font-normal text-[#5D5A75]">Candidates</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Flowing S-Curve Purple Ribbon Frame Matching Reference Image Exactly */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 relative flex justify-center lg:justify-end items-center mt-6 lg:mt-0 w-full"
          >
            <div className="relative w-full max-w-2xl">
              
              {/* Flowing S-Curve White & Purple Edge Mask Container */}
              <div className="relative overflow-hidden rounded-l-[60px] sm:rounded-l-[140px] lg:rounded-l-[180px] rounded-r-[24px] sm:rounded-r-[36px] shadow-[0_20px_50px_rgba(23,5,75,0.15)] bg-white p-1.5 sm:p-2 border-2 border-purple-100/80">
                
                {/* Hero Image */}
                <img
                  src={teamImageUrl}
                  alt="Corporate Recruitment Team - JMS Group"
                  className="w-full h-[260px] xs:h-[300px] sm:h-[380px] lg:h-[450px] object-cover rounded-l-[54px] sm:rounded-l-[132px] lg:rounded-l-[170px] rounded-r-[20px] sm:rounded-r-[30px]"
                />

                {/* Bottom-Right Glowing Purple Curved Ribbon Accent */}
                <div className="absolute -bottom-2 -right-2 w-48 xs:w-60 sm:w-80 lg:w-96 h-28 xs:h-32 sm:h-40 lg:h-44 bg-gradient-to-tl from-[#17054B] via-[#4C1DCE] to-[#7C3AED] rounded-tl-[100%] border-t-2 border-l-2 border-white/40 shadow-2xl overflow-hidden pointer-events-none flex items-end justify-end p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:10px_10px] opacity-40" />
                </div>

              </div>

              {/* Left-Side Soft Flowing Purple Curve Ribbon (Connecting hero text towards image) */}
              <div className="absolute -left-6 sm:-left-12 bottom-4 w-32 sm:w-44 h-16 sm:h-24 bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-[#4C1DCE]/40 rounded-full blur-xl pointer-events-none" />

              {/* Floating Statistics Card - 25+ Years of Excellence */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-4 sm:-bottom-5 left-4 sm:left-16 lg:left-24 bg-white/98 backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-purple-100/90 flex items-center gap-3 sm:gap-4 z-30"
              >
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#2A0868] via-[#521EE2] to-[#7C3AED] flex items-center justify-center text-white shadow-md shadow-purple-500/30">
                  <Star className="w-4 h-4 sm:w-6 sm:h-6 fill-white text-transparent" />
                </div>
                <div>
                  <div className="text-xl sm:text-3xl font-black text-[#170B3B] leading-none">25+</div>
                  <div className="text-[10px] sm:text-sm text-[#5D5A75] font-semibold mt-0.5 sm:mt-1">Years of Excellence</div>
                  <div className="w-6 sm:w-8 h-0.5 sm:h-1 bg-[#521EE2] rounded-full mt-1" />
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* SERVICES STRIP: Premium Horizontal Container (Exact Match to Reference Image Bottom Grid Bar) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl sm:rounded-[32px] shadow-xl border border-purple-100/80 p-6 sm:p-7"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bottomServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={service.title}
                  className={`flex items-start gap-4 ${
                    index !== 0 ? 'lg:border-l lg:border-purple-100 lg:pl-6' : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F3EEFF] text-[#521EE2] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <ServiceIcon className="w-6 h-6 text-[#521EE2]" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-sm text-[#170B3B] mb-1">{service.title}</h3>
                    <p className="text-xs text-[#6B6B7A] leading-relaxed font-normal mb-2.5">{service.desc}</p>
                    <Link
                      to={service.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#521EE2] hover:text-[#2A0868] transition-colors group/link mt-auto"
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
