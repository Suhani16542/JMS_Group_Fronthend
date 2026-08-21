import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, FileText, UserCheck, MessageSquare, Send, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { sendContactApi } from '../../services/contactService';

export const CareerCounsellingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    referralNumber: '',
    referralName: '',
    experience: '',
    counselingTopic: 'Resume Review & ATS Optimization',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setValidationError('Full Name is required and must be at least 2 characters long.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setValidationError('A valid email address is required.');
      return false;
    }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || phoneDigits.length < 10) {
      setValidationError('Phone number is required and must contain at least 10 digits.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setValidationError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const fullMessage = [
        `1-on-1 Career Counseling Request`,
        `Selected Topic: ${formData.counselingTopic}`,
        formData.referralName.trim() ? `Referral Name: ${formData.referralName.trim()}` : '',
        formData.referralNumber.trim() ? `Referral Number: ${formData.referralNumber.trim()}` : '',
        formData.message.trim() ? `Candidate Note: ${formData.message.trim()}` : 'Note: Candidate requested a 1-on-1 counseling session.',
      ].filter(Boolean).join('\n');

      const response = await sendContactApi({
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: `1-on-1 Career Counseling: ${formData.counselingTopic}`,
        message: fullMessage,
        referralNumber: formData.referralNumber.trim(),
        referralName: formData.referralName.trim(),
        counselingTopic: formData.counselingTopic,
      });

      setSuccessMessage(response?.message || 'Counseling request submitted successfully!');
      setSubmitted(true);
    } catch (err: any) {
      // Do NOT show success on failure. Display actual error message and keep entered form data.
      setErrorMessage(err?.message || 'Failed to submit counseling inquiry. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
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
    <div className="w-full bg-white min-h-screen pb-16">
      {/* Header Banner */}
      <section className="py-16 bg-white border-b border-[#9E3371]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E3371] text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white">
              CAREER COUNSELING
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#9E3371] mb-4">
              Expert Guidance for Your <span className="text-[#9E3371]">Career Growth</span>
            </h1>
            <p className="text-base text-[#9E3371] leading-relaxed">
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
              <h2 className="text-2xl font-extrabold text-[#9E3371] mb-6">How We Help You Succeed</h2>
              
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="p-6 rounded-3xl bg-white border border-[#9E3371] shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#9E3371] text-white flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#9E3371] mb-1">{item.title}</h3>
                      <p className="text-xs text-[#9E3371] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Consultation Form */}
            <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-[#9E3371] shadow-xl">
              <h3 className="text-2xl font-bold text-[#9E3371] mb-2">Book a 1-on-1 Counseling Session</h3>
              <p className="text-xs text-[#9E3371] mb-6">Fill out the details below and our senior career counselor will contact you within 24 hours.</p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#9E3371] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-white" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Counseling Request Received!</h4>
                      <p className="text-xs text-white mt-0.5">{successMessage || `Thank you, ${formData.name}. Our career expert will reach out to you shortly.`}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        referralNumber: '',
                        referralName: '',
                        experience: '',
                        counselingTopic: 'Resume Review & ATS Optimization',
                        message: '',
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-white text-[#9E3371] font-bold text-xs hover:bg-gray-100 transition-colors shrink-0 cursor-pointer"
                  >
                    Book Another Session
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {validationError && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#9E3371] mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#9E3371] mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#9E3371] mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#9E3371] mb-1.5">Referral Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Referral Person Name"
                        value={formData.referralName}
                        onChange={(e) => setFormData({ ...formData, referralName: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#9E3371] mb-1.5">Referral Number</label>
                      <input
                        type="text"
                        placeholder="e.g. REF-1029 or Contact No."
                        value={formData.referralNumber}
                        onChange={(e) => setFormData({ ...formData, referralNumber: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#9E3371] mb-1.5">Counseling Topic</label>
                    <select
                      value={formData.counselingTopic}
                      onChange={(e) => setFormData({ ...formData, counselingTopic: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] focus:outline-none cursor-pointer"
                    >
                      <option>Resume Review & ATS Optimization</option>
                      <option>Interview Preparation & Practice</option>
                      <option>Career Transition Guidance</option>
                      <option>Executive Leadership Coaching</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#9E3371] mb-1.5">Your Message / Career Goal</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your career goals or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-2xl text-center text-sm font-bold text-white bg-[#9E3371] shadow-lg flex items-center justify-center gap-2 hover:bg-[#862B5F] transition-all border border-white cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>{loading ? 'Submitting...' : 'Submit Counseling Enquiry'}</span>
                    {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Who Can Benefit Section */}
          <div className="mt-16 bg-white p-8 sm:p-12 rounded-3xl border border-[#9E3371] shadow-md">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#9E3371]">Who Can Benefit From Our Counseling?</h2>
              <p className="text-xs sm:text-sm text-[#9E3371] mt-2">Tailored guidance for professionals at every career stage.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'College Students', desc: 'Identify ideal career paths, internships, and entry skill requirements early.' },
                { title: 'Fresh Graduates', desc: 'Craft first ATS resumes, LinkedIn profiles, and prepare for campus/off-campus interviews.' },
                { title: 'Working Professionals', desc: 'Accelerate promotion timelines, overcome plateaus, and navigate corporate shifts.' },
                { title: 'Career Changers', desc: 'Transition into new tech or management domains with mapped skill bridges.' },
              ].map((cat) => (
                <div key={cat.title} className="p-6 rounded-2xl bg-white border border-[#9E3371]">
                  <h4 className="text-base font-bold text-[#9E3371] mb-2">{cat.title}</h4>
                  <p className="text-xs text-[#9E3371] leading-relaxed">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Step Counseling Process */}
          <div className="mt-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E3371] text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white">
                OUR METHODOLOGY
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#9E3371]">Our 5-Step Counseling Process</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { step: '01', title: 'Understand You', desc: 'Deep-dive into your background, ambitions, and current obstacles.' },
                { step: '02', title: 'Assess Strengths', desc: 'Skill gap audit and personality/interest profiling.' },
                { step: '03', title: 'Explore Options', desc: 'Discover high-demand job roles matching your capabilities.' },
                { step: '04', title: 'Build Plan', desc: 'Construct a step-by-step resume, interview, and networking roadmap.' },
                { step: '05', title: 'Take Action', desc: 'Execute applications with direct JMS recruiter backing.' },
              ].map((st) => (
                <div key={st.step} className="p-5 rounded-2xl bg-white border border-[#9E3371] shadow-xs relative">
                  <span className="text-2xl font-black text-[#9E3371]/40 block mb-2">{st.step}</span>
                  <h4 className="text-sm font-bold text-[#9E3371] mb-1">{st.title}</h4>
                  <p className="text-[11px] text-[#9E3371] leading-relaxed">{st.desc}</p>
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
