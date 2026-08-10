import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Facebook, Linkedin, Instagram, Youtube, Loader2, AlertCircle } from 'lucide-react';
import { sendContactApi } from '../../services/contactService';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const getEnteredName = () => (formData.name || formData.fullName || '').trim();

  const validateForm = (): boolean => {
    const rawName = getEnteredName();
    if (!rawName || rawName.length < 2) {
      setValidationError('Full name is required and must be at least 2 characters long.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setValidationError('A valid email address is required.');
      return false;
    }
    const phoneDigits = formData.phone ? String(formData.phone).replace(/\D/g, '') : '';
    if (!formData.phone.trim() || phoneDigits.length < 10) {
      setValidationError('Phone number is required and must contain at least 10 digits.');
      return false;
    }
    if (!formData.subject.trim()) {
      setValidationError('Subject is required.');
      return false;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setValidationError('Message is required and must be at least 10 characters long.');
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
      // Map frontend `name` -> backend `fullName` in the API payload
      const response = await sendContactApi({
        fullName: getEnteredName(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setSuccessMessage(response?.message || 'Contact inquiry submitted successfully');
      setSubmitted(true);
      setFormData({
        name: '',
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit contact inquiry. Please try again.');
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
              CONTACT US
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#9E3371] mb-4">
              Get in Touch with <span className="text-[#9E3371]">JMS Group</span>
            </h1>
            <p className="text-base text-[#9E3371] leading-relaxed">
              Have questions about candidate placements, corporate HR consulting, or career guidance? We are here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-[#9E3371] shadow-sm space-y-6">
                <h3 className="text-2xl font-bold text-[#9E3371] mb-4">Contact Details</h3>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#9E3371] text-white flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#9E3371] uppercase tracking-wide">Email Address</h4>
                    <a href="mailto:jmsplacement@gmail.com" className="text-sm font-bold text-[#9E3371] hover:underline transition-colors">jmsplacement@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#9E3371] text-white flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#9E3371] uppercase tracking-wide">Phone Number</h4>
                    <a href="tel:07314991624" className="text-sm font-bold text-[#9E3371] hover:underline transition-colors">0731-4991624</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#9E3371] text-white flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#9E3371] uppercase tracking-wide">Headquarters</h4>
                    <p className="text-sm font-semibold text-[#9E3371] leading-relaxed">
                      129, 1st Floor, Orbit Mall,<br />
                      Near C21 Mall, A.B. Road,<br />
                      Vijay Nagar, Indore
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#9E3371] text-white flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#9E3371] uppercase tracking-wide">Working Hours</h4>
                    <p className="text-sm font-semibold text-[#9E3371]">Monday - Saturday: 9:30 AM - 6:30 PM</p>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="pt-4 border-t border-[#9E3371]">
                  <h4 className="text-xs font-bold text-[#9E3371] uppercase tracking-wide mb-3">Connect With Us</h4>
                  <div className="flex items-center gap-3">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#9E3371] text-white flex items-center justify-center hover:bg-[#862B5F] transition-all border border-white">
                      <Facebook className="w-4 h-4 text-white" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#9E3371] text-white flex items-center justify-center hover:bg-[#862B5F] transition-all border border-white">
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#9E3371] text-white flex items-center justify-center hover:bg-[#862B5F] transition-all border border-white">
                      <Instagram className="w-4 h-4 text-white" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#9E3371] text-white flex items-center justify-center hover:bg-[#862B5F] transition-all border border-white">
                      <Youtube className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#9E3371] shadow-xl">
              <h3 className="text-2xl font-bold text-[#9E3371] mb-2">Send Us a Message</h3>
              <p className="text-xs text-[#9E3371] mb-6">Fill in the form below and our representative will respond within 24 hours.</p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#9E3371] text-white flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-white" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Message Sent Successfully!</h4>
                      <p className="text-xs text-white mt-0.5">{successMessage || 'Thank you for reaching out. We will get back to you shortly.'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-white text-[#9E3371] font-bold text-xs hover:bg-gray-100 transition-colors shrink-0"
                  >
                    Send Another Message
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#9E3371] mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Singh"
                        value={formData.fullName || formData.name}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#9E3371] mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="vikram@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#9E3371] mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#9E3371] mb-1.5">Subject *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hiring Enquiry / Placement"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#ffffff] border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#9E3371] mb-1.5">Your Message *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your query or requirement..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#9E3371] text-sm text-[#9E3371] placeholder-[#9E3371]/60 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-8 rounded-2xl text-center text-sm font-bold text-white bg-[#9E3371] border border-white shadow-xl flex items-center justify-center gap-2 hover:bg-[#862B5F] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
