import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

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
              CONTACT US
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#170B3B] mb-4">
              Get in Touch with <span className="text-[#6D3DF5]">JMS Group</span>
            </h1>
            <p className="text-base text-[#5D5A75] leading-relaxed">
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
              <div className="bg-white p-8 rounded-3xl border border-purple-100/90 shadow-sm space-y-6">
                <h3 className="text-2xl font-bold text-[#170B3B] mb-4">Contact Details</h3>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EFEAFF] text-[#6D3DF5] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Phone Number</h4>
                    <a href="tel:+911234567890" className="text-sm font-bold text-[#170B3B] hover:text-[#6D3DF5] transition-colors">+91 12345 67890</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EFEAFF] text-[#6D3DF5] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Email Address</h4>
                    <a href="mailto:info@jmsgroup.com" className="text-sm font-bold text-[#170B3B] hover:text-[#6D3DF5] transition-colors">info@jmsgroup.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EFEAFF] text-[#6D3DF5] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Headquarters</h4>
                    <p className="text-sm font-semibold text-[#170B3B]">123, Corporate Business Park, New Delhi, India - 110001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EFEAFF] text-[#6D3DF5] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Working Hours</h4>
                    <p className="text-sm font-semibold text-[#170B3B]">Monday - Saturday: 9:30 AM - 6:30 PM</p>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="pt-4 border-t border-purple-50">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Connect With Us</h4>
                  <div className="flex items-center gap-3">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#EFEAFF] text-[#6D3DF5] flex items-center justify-center hover:bg-[#6D3DF5] hover:text-white transition-all">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#EFEAFF] text-[#6D3DF5] flex items-center justify-center hover:bg-[#6D3DF5] hover:text-white transition-all">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#EFEAFF] text-[#6D3DF5] flex items-center justify-center hover:bg-[#6D3DF5] hover:text-white transition-all">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#EFEAFF] text-[#6D3DF5] flex items-center justify-center hover:bg-[#6D3DF5] hover:text-white transition-all">
                      <Youtube className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-purple-100 shadow-xl">
              <h3 className="text-2xl font-bold text-[#170B3B] mb-2">Send Us a Message</h3>
              <p className="text-xs text-[#5D5A75] mb-6">Fill in the form below and our representative will respond within 24 hours.</p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#EFEAFF] text-[#6D3DF5] flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Message Sent Successfully!</h4>
                    <p className="text-xs text-[#5D5A75] mt-0.5">Thank you, {formData.name}. We will get back to you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#170B3B] mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Singh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#170B3B] mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="vikram@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#170B3B] mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#170B3B] mb-1.5">Subject</label>
                      <input
                        type="text"
                        placeholder="e.g. Hiring Enquiry / Placement"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#170B3B] mb-1.5">Your Message *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your query or requirement..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF9FF] border border-purple-100 text-sm focus:outline-none focus:border-[#6D3DF5]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-8 rounded-2xl text-center text-sm font-bold text-white bg-gradient-to-r from-[#4C1D95] via-[#6D3DF5] to-[#7C3AED] shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
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
