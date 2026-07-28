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
    <section className="py-20 bg-white relative">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F0FF] text-[#6D3DF5] text-xs font-bold uppercase tracking-wider mb-4">
              WHY CHOOSE JMS GROUP
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17152B] tracking-tight mb-6">
              We Bring The Right People <br />
              <span className="text-gradient">Together</span>
            </h2>

            <p className="text-base text-[#6B6B7A] leading-relaxed mb-8">
              We combine deep industry insights, advanced candidate screening, and personalized counseling to deliver recruitment outcomes that accelerate organizational success.
            </p>

            {/* Feature List (2 columns on sm) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF9FF] border border-purple-50">
                  <div className="w-7 h-7 rounded-lg bg-[#6D3DF5] text-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-[#17152B]">{feature}</span>
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
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
                alt="JMS Group Hiring Process Video Preview" 
                className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Dark Deep Purple Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1768]/90 via-[#2A1768]/40 to-transparent flex flex-col justify-between p-8 text-white">
                <div className="self-end">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
                    Corporate Story
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">Watch Our Story</h3>
                    <p className="text-xs text-purple-200 mt-1 max-w-xs">
                      How We Help People & Businesses Grow Together
                    </p>
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="w-16 h-16 rounded-full bg-white text-[#6D3DF5] flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#F4F0FF] transition-all flex-shrink-0"
                    aria-label="Play video"
                  >
                    <Play className="w-7 h-7 fill-[#6D3DF5] ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Video Modal Placeholder */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full flex items-center justify-center text-white text-center p-8 bg-[#161131]">
              <div>
                <Play className="w-16 h-16 text-[#6D3DF5] mx-auto mb-4 animate-bounce" />
                <h4 className="text-xl font-bold">JMS Group Overview Video</h4>
                <p className="text-sm text-gray-400 mt-2">Video player ready for deployment.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyChooseUsSection;
