import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users2, 
  UserCheck2, 
  Briefcase, 
  ArrowRight 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const stats = [
    { icon: Building2, label: 'Years Experience', value: '25+' },
    { icon: Users2, label: 'Corporate Clients', value: '500+' },
    { icon: UserCheck2, label: 'Candidates Placed', value: '10K+' },
    { icon: Briefcase, label: 'Industry Expertise', value: '20+' },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
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
              <div className="rounded-3xl overflow-hidden border-4 border-[#9E3371] shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop" 
                  alt="JMS Group Team Consultation" 
                  className="w-full h-[360px] sm:h-[420px] object-cover"
                />
              </div>

              {/* Secondary Floating Image Collage */}
              <div className="absolute -bottom-8 -right-4 sm:right-2 w-48 sm:w-56 rounded-2xl overflow-hidden border-4 border-[#9E3371] shadow-2xl hidden sm:block">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop" 
                  alt="Candidate Interview" 
                  className="w-full h-36 object-cover"
                />
              </div>

              {/* Stat Overlay Badge */}
              <div className="absolute -top-6 -left-4 sm:left-2 bg-[#9E3371] text-white p-5 rounded-2xl shadow-xl border border-white max-w-[200px]">
                <div className="text-3xl font-extrabold leading-none text-white">10K+</div>
                <div className="text-xs text-white font-medium mt-1">Candidates Placed Successfully</div>
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E3371] text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white">
              ABOUT JMS GROUP
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#9E3371] tracking-tight mb-6">
              Growing <span className="text-[#9E3371]">Your Self</span>
            </h2>

            <p className="text-base text-[#9E3371] leading-relaxed mb-6">
              JMS Group is a trusted leader in HR Consulting, Placement Services, Career Counseling, and Job Placement. We are committed to empowering individuals to achieve career fulfillment and helping companies build high-performing workforces.
            </p>

            <p className="text-sm text-[#9E3371] leading-relaxed mb-8">
              With over two decades of industry expertise, our custom recruitment methodologies ensure seamless alignment between candidate aspirations and organizational goals.
            </p>

            {/* 4 Statistics Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={stat.label}
                    className="p-4 rounded-2xl bg-white border border-[#9E3371] shadow-sm flex items-center gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#9E3371] text-white flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-[#9E3371] leading-none">{stat.value}</div>
                      <div className="text-xs text-[#9E3371] font-medium mt-1">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link
              to="/about"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-[#9E3371] border border-white shadow-lg hover:bg-[#862B5F] hover:scale-[1.02] transition-all"
            >
              <span>Know More About Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;

