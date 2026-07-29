import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Award, Layers } from 'lucide-react';

export const CountersSection: React.FC = () => {
  const stats = [
    { icon: Users, count: '10,000+', label: 'Candidates Placed' },
    { icon: Building2, count: '500+', label: 'Corporate Clients' },
    { icon: Award, count: '25+', label: 'Years Experience' },
    { icon: Layers, count: '20+', label: 'Industries Served' },
  ];

  return (
    <section className="py-16 bg-[#9E3371] text-white relative overflow-hidden border-t border-b border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/30">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center p-4 pt-8 sm:pt-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-white text-[#9E3371] flex items-center justify-center mb-4 shadow-md">
                  <Icon className="w-6 h-6 text-[#9E3371]" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 text-white">
                  {item.count}
                </div>
                <div className="text-xs sm:text-sm text-white font-medium tracking-wide uppercase">
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CountersSection;

