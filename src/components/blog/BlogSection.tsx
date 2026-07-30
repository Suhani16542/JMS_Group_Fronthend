import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const posts = [
    {
      id: 1,
      category: 'Career Advice',
      date: 'May 14, 2026',
      title: 'Top 10 Resume Mistakes Candidates Should Avoid',
      description: 'Learn how to highlight your accomplishments and optimize your CV to pass corporate ATS screeners.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 2,
      category: 'Recruitment Insights',
      date: 'May 10, 2026',
      title: 'How Modern Tech is Reshaping Corporate Hiring',
      description: 'Discover how top placement agencies utilize skills assessments and interview analytics for faster hiring.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 3,
      category: 'HR Trends',
      date: 'May 02, 2026',
      title: 'Building High-Retention Culture in Modern Workplaces',
      description: 'Strategies for corporate leaders to boost employee engagement and lower employee turnover.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-20 bg-[#FAF8FB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#7A1F4D] text-xs font-bold uppercase tracking-wider mb-4 border border-[#8B1E5C]/20 shadow-xs">
              INSIGHTS & NEWS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#6D214F] tracking-tight">
              Latest From <span className="text-gradient">JMS Group</span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B1E5C] hover:text-[#C2188B] transition-colors mt-4 md:mt-0"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 text-[#8B1E5C]" />
          </Link>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-[18px] overflow-hidden border border-[#8B1E5C]/15 shadow-sm hover:shadow-xl hover:border-[#8B1E5C]/40 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#7A1F4D] to-[#C2188B] text-white text-[11px] font-bold shadow-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#8B1E5C] mb-3">
                    <Calendar className="w-3.5 h-3.5 text-[#8B1E5C]" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#6D214F] leading-snug mb-3 group-hover:text-[#C2188B] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#555555] leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B1E5C] hover:text-[#C2188B] transition-colors"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;

