import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, ChevronDown } from 'lucide-react';

export const JobSearchSection: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/jobs');
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#9E3371] max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#9E3371]">
              Find Your Next <span className="text-[#9E3371]">Career Opportunity</span>
            </h2>
            <p className="text-sm sm:text-base text-[#9E3371] mt-2">
              Explore the latest jobs and take the next step toward your career goals.
            </p>
          </div>

          {/* Search Box Form */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Input 1: Job Title */}
            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9E3371]">
                <Search className="w-4 h-4 text-[#9E3371]" />
              </div>
              <input
                type="text"
                placeholder="Job title, skill, or keyword"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none focus:border-[#9E3371] transition-all"
              />
            </div>

            {/* Input 2: Location */}
            <div className="md:col-span-3 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9E3371]">
                <MapPin className="w-4 h-4 text-[#9E3371]" />
              </div>
              <input
                type="text"
                placeholder="City or Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none focus:border-[#9E3371] transition-all"
              />
            </div>

            {/* Input 3: Experience Dropdown */}
            <div className="md:col-span-3 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9E3371]">
                <Briefcase className="w-4 h-4 text-[#9E3371]" />
              </div>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full pl-11 pr-8 py-3.5 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] appearance-none focus:outline-none focus:border-[#9E3371] transition-all cursor-pointer"
              >
                <option value="">All Experience Levels</option>
                <option value="entry">Freshers / Entry Level (0-2 Yrs)</option>
                <option value="mid">Mid Level (2-5 Yrs)</option>
                <option value="senior">Senior Level (5-10 Yrs)</option>
                <option value="executive">Executive / Leadership (10+ Yrs)</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#9E3371]">
                <ChevronDown className="w-4 h-4 text-[#9E3371]" />
              </div>
            </div>

            {/* Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#9E3371] border border-white text-white text-sm font-semibold shadow-md hover:bg-[#862B5F] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-white" />
                <span>Search</span>
              </button>
            </div>

          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default JobSearchSection;

