import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, UserCheck, ArrowRight, ShieldCheck } from 'lucide-react';

export const EmployerCtaSection: React.FC = () => {
  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-[#382080] via-[#2A1768] to-[#161131] rounded-3xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden"
        >
          {/* Subtle Background Glow Circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B5CF6]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#6D3DF5]/20 rounded-full blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-purple-200 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                <Building className="w-3.5 h-3.5 text-[#8B5CF6]" />
                FOR EMPLOYERS & CORPORATE CLIENTS
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Looking for the <span className="text-[#8B5CF6]">Right Talent?</span>
              </h2>

              <p className="text-base text-purple-100/90 leading-relaxed max-w-2xl mb-6">
                Tell us your hiring requirements and let JMS Group help you find pre-screened, highly qualified candidates tailored to your corporate goals.
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-purple-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Pre-screened Candidates</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Fast Turnaround Time</span>
                </div>
              </div>
            </div>

            {/* Right Button */}
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                to="/employers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-bold text-[#2A1768] bg-white hover:bg-[#F4F0FF] shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all"
              >
                <span>Submit Hiring Requirement</span>
                <ArrowRight className="w-4 h-4 text-[#6D3DF5]" />
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default EmployerCtaSection;
