import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle2, Send, FileText, User, Mail, Phone, MapPin, Briefcase, Loader2, AlertCircle } from 'lucide-react';
import { uploadResumeApi } from '../../services/resumeService';

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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const allowedExtensions = ['pdf', 'doc', 'docx'];

  const validateFile = (selectedFile: File): boolean => {
    const ext = selectedFile.name.split('.').pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(ext)) {
      setValidationError('Only PDF, DOC, and DOCX files are allowed.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      } else {
        setFile(null);
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setValidationError(null);

    if (!formData.fullName.trim()) {
      setValidationError('Full Name is required.');
      return;
    }
    if (!formData.email.trim()) {
      setValidationError('Email Address is required.');
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError('Phone Number is required.');
      return;
    }
    if (!formData.qualification.trim()) {
      setValidationError('Highest Qualification is required.');
      return;
    }
    if (!formData.experience) {
      setValidationError('Experience is required.');
      return;
    }
    if (!formData.preferredRole.trim()) {
      setValidationError('Preferred Job Role is required.');
      return;
    }
    if (!file) {
      setValidationError('Please upload your resume file (PDF, DOC, or DOCX).');
      return;
    }

    if (!validateFile(file)) {
      return;
    }

    setLoading(true);

    try {
      await uploadResumeApi({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        highestQualification: formData.qualification.trim(),
        experience: formData.experience,
        preferredJobRole: formData.preferredRole.trim(),
        resume: file,
      });

      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        qualification: '',
        experience: '',
        preferredRole: '',
        preferredLocation: '',
      });
      setFile(null);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong while submitting your resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white min-h-screen pb-16">
      {/* Header Banner */}
      <section className="py-16 bg-white border-b border-[#9E3371]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E3371] text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white">
              UPLOAD RESUME
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#9E3371] mb-4">
              Submit Your Resume to <span className="text-[#9E3371]">JMS Group</span>
            </h1>
            <p className="text-base text-[#9E3371] leading-relaxed">
              Let our corporate placement specialists match your qualifications with prime hiring opportunities across top industries.
            </p>
          </div>
        </div>
      </section>

      {/* Main Upload Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#9E3371] shadow-xl">
            
            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#9E3371] text-white text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-white" />
                <h3 className="text-2xl font-bold mb-2 text-white">Resume Submitted Successfully!</h3>
                <p className="text-sm text-white mb-6">
                  Thank you! Our recruitment team has received your profile and saved your resume. We will contact you when suitable openings arise.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-white text-[#9E3371] font-bold text-xs hover:bg-gray-100 transition-colors"
                >
                  Submit Another Resume
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-xs font-bold text-[#9E3371] mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#9E3371] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#9E3371] mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#9E3371] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="priya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#9E3371] mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#9E3371] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#9E3371] mb-2">Highest Qualification</label>
                    <input
                      type="text"
                      placeholder="e.g. B.Tech / MBA / MCA"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#9E3371] mb-2">Years of Experience</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] focus:outline-none cursor-pointer"
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
                    <label className="block text-xs font-bold text-[#9E3371] mb-2">Preferred Job Role</label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-[#9E3371] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Full Stack Developer / HR Manager"
                        value={formData.preferredRole}
                        onChange={(e) => setFormData({ ...formData, preferredRole: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                      />
                    </div>
                  </div>

                </div>

                {/* File Dropzone */}
                <div>
                  <label className="block text-xs font-bold text-[#9E3371] mb-2">Upload Resume (PDF, DOC, DOCX) *</label>
                  <div className="border-2 border-dashed border-[#9E3371] rounded-3xl p-8 text-center bg-white hover:bg-[#9E3371]/5 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-10 h-10 text-[#9E3371] mx-auto mb-3" />
                    {file ? (
                      <div className="text-sm font-bold text-[#9E3371] flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4 text-[#9E3371]" />
                        <span>{file.name}</span>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-bold text-[#9E3371]">Click or Drag & Drop to upload resume</p>
                        <p className="text-xs text-[#9E3371] mt-1">Supported formats: PDF, DOC, DOCX (Max size: 5MB)</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-8 rounded-2xl text-center text-sm font-bold text-white bg-[#9E3371] border border-white shadow-xl flex items-center justify-center gap-2 hover:bg-[#862B5F] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                      <span>Submitting Resume...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Resume</span>
                      <Send className="w-4 h-4 text-white" />
                    </>
                  )}
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


