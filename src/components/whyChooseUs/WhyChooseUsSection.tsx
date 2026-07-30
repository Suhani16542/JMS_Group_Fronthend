import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Play, X } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const features = [
    'Experienced HR Professionals',
    'Fast & Reliable Hiring',
    'Verified & Quality Candidates',
    'Career Growth Support',
    'Industry-Specific Solutions',
    'End-to-End Placement Assistance',
  ];

  return (
    <section className="py-20 bg-[#FAF8FB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Features */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#7A1F4D] text-xs font-bold uppercase tracking-wider mb-4 border border-[#8B1E5C]/20 shadow-xs">
              WHY CHOOSE JMS GROUP
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#6D214F] tracking-tight mb-6">
              We Bring The Right People <br />
              <span className="text-gradient">Together</span>
            </h2>

            <p className="text-base text-[#555555] leading-relaxed mb-8">
              We combine deep industry insights, advanced candidate screening, and personalized counseling to deliver recruitment outcomes that accelerate organizational success.
            </p>

            {/* Feature List (2 columns on sm) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 p-3.5 rounded-[18px] bg-white border border-[#8B1E5C]/15 shadow-sm hover:border-[#8B1E5C]/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7A1F4D] to-[#C2188B] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-[#6D214F]">{feature}</span>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right Column: Video Style Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-[18px] overflow-hidden shadow-xl border border-[#8B1E5C]/20 group bg-white">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
                alt="JMS Group Hiring Process Video Preview" 
                className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B1E5C]/90 via-[#8B1E5C]/40 to-transparent flex flex-col justify-between p-8 text-white">
                <div className="self-end">
                  <span className="px-3.5 py-1.5 rounded-full bg-white text-[#8B1E5C] border border-white text-xs font-bold uppercase tracking-wider shadow-md">
                    Corporate Story
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Watch Our Story</h3>
                    <p className="text-xs text-white/90 mt-1 max-w-xs">
                      How We Help People & Businesses Grow Together
                    </p>
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="w-16 h-16 rounded-full bg-white text-[#8B1E5C] flex items-center justify-center shadow-2xl hover:scale-110 transition-all flex-shrink-0"
                    aria-label="Play video"
                  >
                    <Play className="w-7 h-7 fill-[#8B1E5C] ml-1 text-[#8B1E5C]" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121018]/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#231B33] rounded-[18px] overflow-hidden border border-[#8E24AA]/50 shadow-2xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#121018] text-white hover:text-[#E91E63] transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="aspect-video w-full flex items-center justify-center text-[#9E3371] text-center p-8 bg-white">
              <div>
                <Play className="w-16 h-16 text-[#9E3371] fill-[#9E3371] mx-auto mb-4 animate-bounce" />
                <h4 className="text-xl font-bold text-[#9E3371]">JMS Group Overview Video</h4>
                <p className="text-sm text-[#9E3371] mt-2">Video player ready for deployment.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyChooseUsSection;

