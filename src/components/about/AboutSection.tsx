import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users2, 
  Briefcase, 
  ArrowRight 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const stats = [
    { icon: Users2, label: 'Corporate Clients', value: '500+' },
    { icon: Briefcase, label: 'Industry Expertise', value: '15+' },
  ];

  return (
    <section className="py-20 bg-[#FAF8FB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column Image Collage */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image */}
              <div className="rounded-[18px] overflow-hidden border border-[#8B1E5C]/20 shadow-xl bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop" 
                  alt="JMS Group Team Consultation" 
                  className="w-full h-[360px] sm:h-[420px] object-cover"
                />
              </div>

              {/* Secondary Floating Image Collage */}
              <div className="absolute -bottom-8 -right-4 sm:right-2 w-48 sm:w-56 rounded-[18px] overflow-hidden border border-[#8B1E5C]/20 shadow-2xl hidden sm:block bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop" 
                  alt="Candidate Interview" 
                  className="w-full h-36 object-cover"
                />
              </div>

            </div>
          </motion.div>

          {/* Right Column Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#8B1E5C] text-xs font-bold uppercase tracking-wider mb-4 border border-[#8B1E5C]/20 shadow-xs">
              ABOUT JMS GROUP
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#6D214F] tracking-tight mb-6">
              Growing <span className="text-gradient">Your Self</span>
            </h2>

            <p className="text-base text-[#555555] leading-relaxed mb-6">
              JMS Group is a trusted leader in HR Consulting, Placement Services, Career Counseling, and Job Placement. We are committed to empowering individuals to achieve career fulfillment and helping companies build high-performing workforces.
            </p>

            <p className="text-sm text-[#777777] leading-relaxed mb-8">
              With over 15+ years of industry expertise, our custom recruitment methodologies ensure seamless alignment between candidate aspirations and organizational goals.
            </p>

            {/* 2 Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={stat.label}
                    className="p-4 rounded-[18px] bg-white border border-[#8B1E5C]/15 shadow-sm flex items-center gap-3.5 hover:border-[#8B1E5C]/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7A1F4D] to-[#C2188B] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-[#6D214F] leading-none">{stat.value}</div>
                      <div className="text-xs text-[#555555] font-medium mt-1">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link
              to="/about"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] shadow-[0_4px_20px_rgba(139,30,92,0.3)] hover:shadow-[0_10px_30px_rgba(194,24,139,0.45)] hover:-translate-y-1 transition-all duration-300 border border-white/20"
            >
              <span>Know More About Us</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;

