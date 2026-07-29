import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, User, Tag, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BlogPage: React.FC = () => {
  const featuredArticle = {
    title: 'Top HR Recruitment Trends & Hiring Strategies Shaping 2026',
    category: 'HR Trends',
    date: 'Jan 24, 2026',
    author: 'Ananya Verma',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop',
    excerpt: 'Discover how AI-driven candidate screening, flexible workplace frameworks, and employee retention strategies are redefining corporate talent acquisition.',
  };

  const articles = [
    {
      id: 1,
      title: 'How to Build an ATS-Optimized Resume That Gets Interview Calls',
      category: 'Career Advice',
      date: 'Jan 20, 2026',
      author: 'Pooja Deshmukh',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
      excerpt: 'Learn the exact keywords, formatting structure, and bullet-point strategies to bypass ATS filters.',
    },
    {
      id: 2,
      title: 'Mastering Executive Behavioral Interviews: Questions & Frameworks',
      category: 'Interview Tips',
      date: 'Jan 15, 2026',
      author: 'Vikram Malhotra',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
      excerpt: 'Key STAR-method answers and leadership scenarios expected during senior C-suite placement interviews.',
    },
    {
      id: 3,
      title: 'Why Mid-Sized Enterprises Need Strategic HR Policy Frameworks',
      category: 'Recruitment Insights',
      date: 'Jan 10, 2026',
      author: 'Rajesh Sharma',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop',
      excerpt: 'How structured OKR frameworks and compliance guidelines drive sustainable workforce performance.',
    },
    {
      id: 4,
      title: 'Navigating Career Shifts: Moving From Tech Roles to Executive Leadership',
      category: 'Job Search Tips',
      date: 'Jan 05, 2026',
      author: 'Pooja Deshmukh',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
      excerpt: 'A practical roadmap for senior engineers transitioning into management and director positions.',
    },
  ];

  return (
    <div className="w-full bg-white pb-16">
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-white border-b border-[#9E3371]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E3371] text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white">
            CAREER & HR INSIGHTS
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#9E3371] mb-4">JMS Group Blog & Insights</h1>
          <p className="text-base text-[#9E3371] max-w-2xl mx-auto leading-relaxed">
            Expert articles on HR consulting, recruitment trends, resume building, interview strategies, and career development.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Article Card */}
        <div className="mb-14 rounded-3xl overflow-hidden bg-white border border-[#9E3371] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 lg:p-8">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden h-72 lg:h-96 border border-[#9E3371]">
            <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="px-3 py-1 rounded-full bg-[#9E3371] text-white text-xs font-bold mb-3 border border-white">{featuredArticle.category}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#9E3371] mb-3 leading-snug">{featuredArticle.title}</h2>
            <p className="text-xs sm:text-sm text-[#9E3371] leading-relaxed mb-6">{featuredArticle.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-[#9E3371] font-semibold mb-6">
              <span>{featuredArticle.author}</span>
              <span>•</span>
              <span>{featuredArticle.date}</span>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#9E3371] hover:underline">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 text-[#9E3371]" />
            </Link>
          </div>
        </div>

        {/* Article Grid */}
        <h3 className="text-2xl font-extrabold text-[#9E3371] mb-8">Latest Articles & Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((art) => (
            <div key={art.id} className="bg-white rounded-3xl overflow-hidden border border-[#9E3371] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="h-48 overflow-hidden">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="px-2.5 py-1 rounded-md bg-[#9E3371] text-white text-[11px] font-bold inline-block mb-3 border border-white">{art.category}</span>
                  <h4 className="text-base font-bold text-[#9E3371] mb-2 leading-snug">{art.title}</h4>
                  <p className="text-xs text-[#9E3371] leading-relaxed mb-4">{art.excerpt}</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9E3371] hover:underline">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#9E3371]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

