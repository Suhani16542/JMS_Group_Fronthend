import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Filter, ChevronRight, Clock, Building, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export const JobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const jobsList = [
    {
      id: 'job-1',
      title: 'Senior Software Engineer (Full Stack)',
      company: 'Tech Corp India',
      location: 'Delhi / NCR',
      type: 'Full-time',
      experience: '4-7 Years',
      salary: '₹18 - ₹25 LPA',
      category: 'IT & Software',
      posted: '2 days ago',
      description: 'Looking for a Senior Full Stack Engineer experienced in React, Node.js, and cloud infrastructure.',
    },
    {
      id: 'job-2',
      title: 'HR Talent Acquisition Specialist',
      company: 'Apex Solutions',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '2-5 Years',
      salary: '₹8 - ₹12 LPA',
      category: 'HR & Personnel',
      posted: '1 day ago',
      description: 'Manage end-to-end recruitment pipelines, candidate screening, and onboarding activities.',
    },
    {
      id: 'job-3',
      title: 'Plant Operations & Quality Manager',
      company: 'Precision Manufacturing',
      location: 'Pune',
      type: 'Full-time',
      experience: '7-12 Years',
      salary: '₹20 - ₹28 LPA',
      category: 'Manufacturing',
      posted: '3 days ago',
      description: 'Lead plant operational efficiency, ISO quality compliance, and safety management.',
    },
    {
      id: 'job-4',
      title: 'Senior Financial Analyst',
      company: 'Global Advisory Group',
      location: 'Bengaluru',
      type: 'Full-time',
      experience: '3-6 Years',
      salary: '₹14 - ₹19 LPA',
      category: 'Finance & Banking',
      posted: '4 days ago',
      description: 'Perform financial modeling, budget forecasting, and corporate risk management analysis.',
    },
    {
      id: 'job-5',
      title: 'Corporate Career Counselor',
      company: 'JMS Group Solutions',
      location: 'Delhi / NCR',
      type: 'Full-time',
      experience: '3-5 Years',
      salary: '₹7 - ₹11 LPA',
      category: 'Education & Counseling',
      posted: 'Just now',
      description: 'Guide candidates through career pathway planning, resume optimizations, and interview prep.',
    },
  ];

  const filteredJobs = jobsList.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'All' || job.location.includes(selectedLocation);
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="w-full bg-white min-h-screen pb-16">
      {/* Header Banner */}
      <section className="py-12 lg:py-16 bg-white border-b border-[#9E3371]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E3371] text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white">
              RECENT OPENINGS
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#9E3371] mb-4">
              Explore Top Career <span className="text-[#9E3371]">Opportunities</span>
            </h1>
            <p className="text-base text-[#9E3371]">
              Discover verified corporate job openings across technology, HR, manufacturing, and executive roles.
            </p>
          </div>
        </div>
      </section>

      {/* Main Search & Job Listings */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search Filter Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-xl border border-[#9E3371] mb-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-[#9E3371] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Job title, keyword, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                />
              </div>

              <div className="md:col-span-4 relative">
                <MapPin className="w-4 h-4 text-[#9E3371] absolute left-4 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="All">All Locations</option>
                  <option value="Delhi">Delhi / NCR</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Bengaluru">Bengaluru</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <Link
                  to="/upload-resume"
                  className="w-full py-3 px-6 rounded-2xl text-center text-sm font-bold text-white bg-[#9E3371] shadow-md flex items-center justify-center gap-2 hover:bg-[#862B5F] transition-all border border-white"
                >
                  <span>Upload Resume</span>
                </Link>
              </div>

            </div>
          </div>

          {/* Job List Cards */}
          <div className="space-y-4 mb-16">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-3xl border border-[#9E3371] shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-[#9E3371] text-white text-xs font-bold border border-white">
                      {job.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white border border-[#9E3371] text-[#9E3371] text-xs font-semibold">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#9E3371] mb-1">{job.title}</h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#9E3371] mb-3">
                    <span className="flex items-center gap-1 font-semibold text-[#9E3371]">
                      <Building className="w-3.5 h-3.5 text-[#9E3371]" /> {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#9E3371]" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-[#9E3371]" /> {job.experience}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-[#9E3371]" /> {job.salary}
                    </span>
                  </div>

                  <p className="text-xs text-[#9E3371] leading-relaxed max-w-2xl">
                    {job.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <Link
                    to="/contact"
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#9E3371] border border-white shadow-md hover:bg-[#862B5F] transition-all"
                  >
                    Apply Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Popular Job Categories */}
          <div className="mb-16">
            <h2 className="text-2xl font-extrabold text-[#9E3371] mb-8 text-center">Popular Job Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'IT & Software', count: '120+ Jobs' },
                { name: 'HR & People', count: '45+ Jobs' },
                { name: 'Manufacturing', count: '80+ Jobs' },
                { name: 'Finance & Banking', count: '60+ Jobs' },
                { name: 'Sales & Marketing', count: '90+ Jobs' },
                { name: 'Supply Chain', count: '35+ Jobs' },
              ].map((cat) => (
                <div key={cat.name} className="p-4 rounded-2xl bg-white border border-[#9E3371] text-center hover:bg-[#9E3371] hover:text-white group transition-all cursor-pointer">
                  <h4 className="text-sm font-bold text-[#9E3371] group-hover:text-white">{cat.name}</h4>
                  <span className="text-xs text-[#9E3371] group-hover:text-white font-semibold mt-1 inline-block">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Apply Through JMS Group */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#9E3371] shadow-md">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl font-extrabold text-[#9E3371]">Why Apply Through JMS Group?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#9E3371]">
                <h4 className="text-base font-bold text-[#9E3371] mb-2">Direct HR Sourcing</h4>
                <p className="text-xs text-[#9E3371] leading-relaxed">Your resume bypasses automated ATS filters and reaches corporate decision-makers directly.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#9E3371]">
                <h4 className="text-base font-bold text-[#9E3371] mb-2">Interview Coaching</h4>
                <p className="text-xs text-[#9E3371] leading-relaxed">Receive interview briefings, company insight notes, and salary negotiation guidance.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#9E3371]">
                <h4 className="text-base font-bold text-[#9E3371] mb-2">100% Free Service</h4>
                <p className="text-xs text-[#9E3371] leading-relaxed">No candidate fees or placement commission ever charged to job seekers.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Candidate Banner */}
      <section className="py-16 bg-[#9E3371] text-white border-t border-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4 text-white">Can't Find the Right Role Today?</h2>
          <p className="text-white mb-8 text-sm sm:text-base">Upload your resume to our database and our placement specialists will match you with upcoming positions.</p>
          <Link
            to="/upload-resume"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#9E3371] font-bold text-sm shadow-xl hover:bg-[#862B5F] hover:text-white transition-all"
          >
            <span>Upload Resume Now</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default JobsPage;

