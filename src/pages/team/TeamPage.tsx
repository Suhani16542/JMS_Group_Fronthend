import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Briefcase, Heart, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TeamPage: React.FC = () => {
  const leadership = [
    {
      name: 'Rajesh Sharma',
      role: 'Founder & Managing Director',
      bio: '25+ years in corporate executive recruitment, human resource strategy, and organizational growth.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Ananya Verma',
      role: 'Vice President - HR Consulting',
      bio: 'Leading strategic HR policy design, performance frameworks, and talent acquisition drives for enterprise clients.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Vikram Malhotra',
      role: 'Head of Executive Placement',
      bio: 'Specializing in IT, BFSI, and C-suite talent matching with an 85% placement turnaround efficiency.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Pooja Deshmukh',
      role: 'Chief Career Guidance Advisor',
      bio: 'Empowered 3,000+ candidates through ATS resume workshops, mock interviews, and career transition planning.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Banner */}
      <section className="relative py-16 lg:py-24 bg-white border-b border-[#9E3371] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E3371] text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white">
            MEET OUR TEAM
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#9E3371] mb-4">
            The Experts Behind <span className="text-[#9E3371]">JMS Group</span>
          </h1>
          <p className="text-base text-[#9E3371] max-w-2xl mx-auto leading-relaxed">
            Our team of seasoned HR directors, executive headhunters, and career guidance specialists are dedicated to driving organizational excellence and candidate success.
          </p>
        </div>
      </section>

      {/* Leadership Team Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-[#9E3371]">Leadership & Senior Consultants</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member) => (
              <div key={member.name} className="bg-white rounded-3xl overflow-hidden border border-[#9E3371] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
                <div>
                  <div className="relative h-64 overflow-hidden border-b border-[#9E3371]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#9E3371]/20" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#9E3371] mb-1">{member.name}</h3>
                    <p className="text-xs font-semibold text-[#9E3371] mb-3">{member.role}</p>
                    <p className="text-xs text-[#9E3371] leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;

