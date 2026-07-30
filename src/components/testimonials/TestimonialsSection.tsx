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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8FB] text-[#7A1F4D] text-xs font-bold uppercase tracking-wider mb-4 border border-[#8B1E5C]/20 shadow-xs">
            CLIENT & CANDIDATE REVIEWS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#6D214F] tracking-tight">
            What Our Clients & <span className="text-gradient">Candidates Say</span>
          </h2>
          <p className="text-[#555555] mt-4 text-sm sm:text-base">
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
              className="bg-white rounded-[18px] p-8 border border-[#8B1E5C]/15 shadow-sm hover:shadow-xl hover:border-[#8B1E5C]/40 hover:-translate-y-2 transition-all duration-300 relative flex flex-col justify-between"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-[#8B1E5C]/20">
                <Quote className="w-10 h-10 stroke-[1.5]" />
              </div>

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-[#C2188B] mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C2188B] text-[#C2188B]" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm text-[#555555] leading-relaxed italic mb-8 relative z-10">
                  "{item.quote}"
                </p>
              </div>

              {/* User details */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#8B1E5C]/15">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#8B1E5C]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#6D214F]">{item.name}</h4>
                  <p className="text-xs text-[#777777]">{item.role}</p>
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

