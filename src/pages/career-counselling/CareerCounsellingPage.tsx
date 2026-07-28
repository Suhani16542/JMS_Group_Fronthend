import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, FileText, UserCheck, MessageSquare, Send, CheckCircle2, ArrowRight } from 'lucide-react';

export const CareerCounsellingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    counselingTopic: 'Resume Review & ATS Optimization',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const services = [
    {
      icon: FileText,
      title: 'Resume & LinkedIn Optimization',
      desc: 'Craft an ATS-optimized CV and LinkedIn profile that attracts top corporate recruiters.',
    },
    {
      icon: UserCheck,
      title: 'Interview Mastery & Prep',
      desc: 'Conduct mock interviews and master behavioral responses for executive positions.',
    },
    {
      icon: Compass,
      title: 'Career Direction & Transition',
      desc: 'Identify your core competencies and construct a strategic roadmap for career shifts.',
    },
    {
      icon: MessageSquare,
      title: 'Salary & Offer Negotiation',
      desc: 'Gain expert advice to negotiate fair compensation packages confidently.',
    },
  ];

  return (
    <div className="w-full bg-[#FAF9FF] min-h-screen pb-16">
      {/* Header Banner */}
      <section className="py-16 bg-gradient-to-b from-[#FAF9FF] via-white to-[#FAF9FF] border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEAFF] text-[#6D3DF5] text-xs font-bold uppercase tracking-wider mb-4">
              CAREER COUNSELING
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#170B3B] mb-4">
              Expert Guidance for Your <span className="text-[#6D3DF5]">Career Growth</span>
            </h1>
            <p className="text-base text-[#5D5A75] leading-relaxed">
              Unlock your full potential with personalized 1-on-1 counseling from JMS Group HR advisors.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Services & Form */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Services Offerings */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl font-extrabold text-[#170B3B] mb-6">How We Help You Succeed</h2>
              
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="p-6 rounded-3xl bg-white border border-purple-100/90 shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#EFEAFF] text-[#6D3DF5] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#170B3B] mb-1">{item.title}</h3>
                      <p className="text-xs text-[#5D5A75] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Consultation Form */}
            <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-purple-100 shadow-xl">
              <h3 className="text-2xl font-bold text-[#170B3B] mb-2">Book a 1-on-1 Counseling Session</h3>
              <p className="text-xs text-[#5D5A75] mb-6">Fill out the details below and our senior career counselor will contact you within 24 hours.</p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#EFEAFF] text-[#6D3DF5] flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Counseling Request Received!</h4>
                    <p className="text-xs text-[#5D5A75] mt-0.5">Thank you, {formData.name}. Our career expert will reach out to you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#170B3B] mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#170B3B] mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#170B3B] mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#170B3B] mb-1.5">Counseling Topic</label>
                    <select
                      value={formData.counselingTopic}
                      onChange={(e) => setFormData({ ...formData, counselingTopic: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5] cursor-pointer"
                    >
                      <option>Resume Review & ATS Optimization</option>
                      <option>Interview Preparation & Practice</option>
                      <option>Career Transition Guidance</option>
                      <option>Executive Leadership Coaching</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#170B3B] mb-1.5">Your Message / Career Goal</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your career goals or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl text-center text-sm font-bold text-white bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                  >
                    <span>Submit Counseling Enquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Who Can Benefit Section */}
          <div className="mt-16 bg-white p-8 sm:p-12 rounded-3xl border border-purple-100 shadow-md">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#170B3B]">Who Can Benefit From Our Counseling?</h2>
              <p className="text-xs sm:text-sm text-[#5D5A75] mt-2">Tailored guidance for professionals at every career stage.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'College Students', desc: 'Identify ideal career paths, internships, and entry skill requirements early.' },
                { title: 'Fresh Graduates', desc: 'Craft first ATS resumes, LinkedIn profiles, and prepare for campus/off-campus interviews.' },
                { title: 'Working Professionals', desc: 'Accelerate promotion timelines, overcome plateaus, and navigate corporate shifts.' },
                { title: 'Career Changers', desc: 'Transition into new tech or management domains with mapped skill bridges.' },
              ].map((cat) => (
                <div key={cat.title} className="p-6 rounded-2xl bg-[#FAF9FF] border border-purple-100/80">
                  <h4 className="text-base font-bold text-[#170B3B] mb-2">{cat.title}</h4>
                  <p className="text-xs text-[#5D5A75] leading-relaxed">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Step Counseling Process */}
          <div className="mt-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#6D3DF5] text-xs font-bold uppercase tracking-wider mb-4 border border-purple-100">
                OUR METHODOLOGY
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#170B3B]">Our 5-Step Counseling Process</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { step: '01', title: 'Understand You', desc: 'Deep-dive into your background, ambitions, and current obstacles.' },
                { step: '02', title: 'Assess Strengths', desc: 'Skill gap audit and personality/interest profiling.' },
                { step: '03', title: 'Explore Options', desc: 'Discover high-demand job roles matching your capabilities.' },
                { step: '04', title: 'Build Plan', desc: 'Construct a step-by-step resume, interview, and networking roadmap.' },
                { step: '05', title: 'Take Action', desc: 'Execute applications with direct JMS recruiter backing.' },
              ].map((st) => (
                <div key={st.step} className="p-5 rounded-2xl bg-white border border-purple-100/80 shadow-xs relative">
                  <span className="text-2xl font-black text-[#6D3DF5]/30 block mb-2">{st.step}</span>
                  <h4 className="text-sm font-bold text-[#170B3B] mb-1">{st.title}</h4>
                  <p className="text-[11px] text-[#5D5A75] leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CareerCounsellingPage;
