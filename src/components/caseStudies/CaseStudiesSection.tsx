import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const CaseStudiesSection: React.FC = () => {
  const cases = [
    {
      id: 1,
      category: 'Technology & IT',
      title: 'IT Staffing Solution for Global Tech Company',
      description: 'Successfully deployed 150+ full-stack software engineers and cloud architects within 45 days.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 2,
      category: 'Manufacturing & Heavy Industry',
      title: 'Recruitment Drive for Manufacturing Industry',
      description: 'Streamlined technical hiring for plant managers, quality leads, and specialized engineers.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 3,
      category: 'Retail & FMCG',
      title: 'End-to-End HR Consulting for Retail Chain',
      description: 'Implemented modern HR framework and hired store managers across 30+ regional locations.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E3371] text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white">
              SUCCESS STORIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#9E3371] tracking-tight">
              Our <span className="text-[#9E3371]">Business Cases</span>
            </h2>
          </div>
          <p className="text-[#9E3371] text-sm sm:text-base max-w-md mt-4 md:mt-0">
            Real impact delivered through tailored recruitment, executive search, and HR consulting solutions.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-[#9E3371] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#9E3371] text-[11px] font-bold text-white shadow-sm border border-white">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#9E3371] leading-snug mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#9E3371] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#9E3371] hover:underline transition-colors"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CaseStudiesSection;

