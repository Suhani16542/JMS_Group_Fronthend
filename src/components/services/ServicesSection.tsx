import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, UserCheck, Compass, FileCheck, ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      id: 'placement',
      icon: Users,
      title: 'Placement Services',
      description: 'Connecting businesses with skilled and suitable talent across multiple corporate domains.',
      link: '/services',
    },
    {
      id: 'hr-consulting',
      icon: UserCheck,
      title: 'HR Consulting',
      description: 'Strategic HR solutions and talent management to help organizations build stronger teams.',
      link: '/services',
    },
    {
      id: 'career-counselling',
      icon: Compass,
      title: 'Career Counseling',
      description: 'Expert career guidance and counseling to help individuals choose and navigate the right career path.',
      link: '/career-counselling',
    },
    {
      id: 'job-placement',
      icon: FileCheck,
      title: 'Job Placement',
      description: 'End-to-end placement support connecting job seekers with top verified employer opportunities.',
      link: '/jobs',
    },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E3371] text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white">
            OUR PROFESSIONAL SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#9E3371] tracking-tight">
            Complete HR & Career Solutions <br />
            <span className="text-[#9E3371]">For People & Businesses</span>
          </h2>
          <p className="text-[#9E3371] mt-4 text-base">
            Complete HR and career solutions designed to empower job seekers and accelerate corporate growth.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-3xl p-8 border border-[#9E3371] shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Hover Accent */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-[#9E3371] rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Icon Container */}
                  <div className="w-14 h-14 rounded-2xl bg-[#9E3371] text-white flex items-center justify-center transition-colors duration-300 mb-6 shadow-sm">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#9E3371] mb-3 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#9E3371] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Learn More Link */}
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E3371] hover:underline transition-colors pt-4 border-t border-[#9E3371]"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;

