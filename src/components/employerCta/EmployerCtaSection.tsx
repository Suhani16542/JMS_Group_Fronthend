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
          className="relative bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] rounded-[18px] p-8 sm:p-12 text-white shadow-xl overflow-hidden border border-white/20"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/30 backdrop-blur-md">
                <Building className="w-3.5 h-3.5 text-white" />
                <span>FOR EMPLOYERS & CORPORATE CLIENTS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Looking for the <span className="text-white">Right Talent?</span>
              </h2>

              <p className="text-base text-white/95 leading-relaxed max-w-2xl mb-6">
                Tell us your hiring requirements and let JMS Group help you find pre-screened, highly qualified candidates tailored to your corporate goals.
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-white/95">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Pre-screened Candidates</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-white" />
                  <span>Fast Turnaround Time</span>
                </div>
              </div>
            </div>

            {/* Right Button */}
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-bold text-[#6D214F] bg-white hover:bg-[#FAF8FB] shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span>Submit Hiring Requirement</span>
                <ArrowRight className="w-4 h-4 text-[#8B1E5C]" />
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default EmployerCtaSection;

