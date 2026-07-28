import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Sharma',
      role: 'VP of Human Resources, Tech Corp',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      quote: 'JMS Group completely transformed our talent acquisition process. Their team understood our technical requirements and delivered pre-verified senior candidates within 2 weeks.',
    },
    {
      id: 2,
      name: 'Ananya Verma',
      role: 'Senior Product Designer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      quote: 'The career counseling session at JMS Group was an absolute game changer. They guided me through salary negotiations and helped me land my dream role at a Fortune 500 company.',
    },
    {
      id: 3,
      name: 'Vikramaditya Mehta',
      role: 'Managing Director, Apex Logistics',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      quote: 'Exceptional HR consulting and staffing support! JMS Group has been our exclusive recruitment partner for 5+ years. Reliable, ethical, and fast execution.',
    },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F0FF] text-[#6D3DF5] text-xs font-bold uppercase tracking-wider mb-4">
            CLIENT & CANDIDATE REVIEWS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17152B] tracking-tight">
            What Our Clients & <span className="text-gradient">Candidates Say</span>
          </h2>
          <p className="text-[#6B6B7A] mt-4 text-sm sm:text-base">
            Trusted by corporate leaders and ambitious professionals across industries.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#FAF9FF] rounded-3xl p-8 border border-purple-100/80 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 relative flex flex-col justify-between"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-purple-200">
                <Quote className="w-10 h-10 stroke-[1.5]" />
              </div>

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm text-[#17152B] leading-relaxed italic mb-8 relative z-10">
                  "{item.quote}"
                </p>
              </div>

              {/* User details */}
              <div className="flex items-center gap-4 pt-4 border-t border-purple-100">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#6D3DF5]/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#17152B]">{item.name}</h4>
                  <p className="text-xs text-[#6B6B7A]">{item.role}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
