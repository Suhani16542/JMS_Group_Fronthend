import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle2, Send, FileText, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export const UploadResumePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    preferredRole: '',
    preferredLocation: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAF9FF] min-h-screen pb-16">
      {/* Header Banner */}
      <section className="py-16 bg-gradient-to-b from-[#FAF9FF] via-white to-[#FAF9FF] border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEAFF] text-[#6D3DF5] text-xs font-bold uppercase tracking-wider mb-4">
              UPLOAD RESUME
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#170B3B] mb-4">
              Submit Your Resume to <span className="text-[#6D3DF5]">JMS Group</span>
            </h1>
            <p className="text-base text-[#5D5A75] leading-relaxed">
              Let our corporate placement specialists match your qualifications with prime hiring opportunities across top industries.
            </p>
          </div>
        </div>
      </section>

      {/* Main Upload Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-purple-100 shadow-xl">
            
            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#EFEAFF] text-[#6D3DF5] text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Resume Submitted Successfully!</h3>
                <p className="text-sm text-[#5D5A75]">
                  Thank you, {formData.fullName}. Our recruitment team has received your profile and will contact you when suitable openings arise.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-xs font-bold text-[#170B3B] mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#170B3B] mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="priya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#170B3B] mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#170B3B] mb-2">Highest Qualification</label>
                    <input
                      type="text"
                      placeholder="e.g. B.Tech / MBA / MCA"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#170B3B] mb-2">Years of Experience</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5] cursor-pointer"
                    >
                      <option value="">Select Experience</option>
                      <option value="Fresher">Fresher / Entry Level (0-1 Yrs)</option>
                      <option value="1-3 Yrs">1 - 3 Years</option>
                      <option value="3-5 Yrs">3 - 5 Years</option>
                      <option value="5-10 Yrs">5 - 10 Years</option>
                      <option value="10+ Yrs">10+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#170B3B] mb-2">Preferred Job Role</label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Full Stack Developer / HR Manager"
                        value={formData.preferredRole}
                        onChange={(e) => setFormData({ ...formData, preferredRole: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5]"
                      />
                    </div>
                  </div>

                </div>

                {/* File Dropzone */}
                <div>
                  <label className="block text-xs font-bold text-[#170B3B] mb-2">Upload Resume (PDF, DOCX) *</label>
                  <div className="border-2 border-dashed border-purple-200 rounded-3xl p-8 text-center bg-[#FAF9FF] hover:bg-purple-50/50 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-10 h-10 text-[#6D3DF5] mx-auto mb-3" />
                    {file ? (
                      <div className="text-sm font-bold text-[#6D3DF5] flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>{file.name}</span>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-bold text-[#170B3B]">Click or Drag & Drop to upload resume</p>
                        <p className="text-xs text-[#5D5A75] mt-1">Supported formats: PDF, DOCX (Max size: 5MB)</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-8 rounded-2xl text-center text-sm font-bold text-white bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                >
                  <span>Submit Resume</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>
        </div>
      </section>
    </div>
  );
};

export default UploadResumePage;
