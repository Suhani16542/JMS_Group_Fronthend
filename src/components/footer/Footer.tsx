import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '@/assets/images/jms-logo.png';
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Instagram, Youtube, Send, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#161131] text-white pt-16 pb-8 border-t border-purple-900/40 relative overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6D3DF5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#4C1D95]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Newsletter / Stay Connected Strip */}
        <div className="mb-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#24174D] via-[#1E0F45] to-[#2B185A] border border-purple-800/40 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A78BFA] mb-1 block">STAY CONNECTED WITH JMS GROUP</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Get Jobs & HR Insights in Your Inbox</h3>
              <p className="text-xs sm:text-sm text-purple-200/80">Subscribe to receive curated corporate openings, career guidance, and HR trends directly.</p>
            </div>
            <div className="lg:col-span-5">
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  required
                  className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-purple-300/60 focus:outline-none focus:border-[#8B5CF6]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#8B5CF6] shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all flex-shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-purple-900/50">
          
          {/* Column 1: Official Logo & Company Intro */}
          <div className="lg:col-span-4 flex flex-col items-start">
            {/* White Rounded Premium Card Container for Footer Logo */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-purple-100/40 mb-5 inline-flex items-center justify-center">
              <Link to="/" className="inline-flex items-center flex-shrink-0">
                <img
                  src={logoImg}
                  alt="JMS Group - Growing Your Self"
                  className="h-12 sm:h-15 md:h-18 lg:h-[76px] w-auto object-contain max-w-[240px] sm:max-w-[300px] md:max-w-[360px]"
                />
              </Link>
            </div>
            
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed mb-4 max-w-sm">
              JMS Group is a premier corporate placement, HR consulting, career counseling and executive recruitment organization. Growing Your Self with JMS Group.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-purple-200 hover:bg-[#6D3DF5] hover:text-white hover:scale-110 hover:rotate-6 hover:shadow-[0_0_15px_rgba(109,61,245,0.6)] transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-purple-200 hover:bg-[#6D3DF5] hover:text-white hover:scale-110 hover:rotate-6 hover:shadow-[0_0_15px_rgba(109,61,245,0.6)] transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-purple-200 hover:bg-[#6D3DF5] hover:text-white hover:scale-110 hover:rotate-6 hover:shadow-[0_0_15px_rgba(109,61,245,0.6)] transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-purple-200 hover:bg-[#6D3DF5] hover:text-white hover:scale-110 hover:rotate-6 hover:shadow-[0_0_15px_rgba(109,61,245,0.6)] transition-all duration-300">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: COMPANY */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white mb-4 border-b border-purple-800/60 pb-2 inline-block">COMPANY</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-purple-200/80">
              <li><Link to="/about" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">About Us</Link></li>
              <li><Link to="/our-team" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">Our Team</Link></li>
              <li><Link to="/careers" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">Careers</Link></li>
              <li><Link to="/jobs" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">Recent Openings</Link></li>
            </ul>
          </div>

          {/* Column 3: SERVICES */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white mb-4 border-b border-purple-800/60 pb-2 inline-block">SERVICES</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-purple-200/80">
              <li><Link to="/services/placement" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">Placement Services</Link></li>
              <li><Link to="/services/hr-consulting" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">HR Consulting</Link></li>
              <li><Link to="/career-counselling" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">Career Counseling</Link></li>
              <li><Link to="/services/job-placement" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">Job Placement</Link></li>
            </ul>
          </div>

          {/* Column 4: QUICK LINKS */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white mb-4 border-b border-purple-800/60 pb-2 inline-block">QUICK LINKS</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-purple-200/80">
              <li><Link to="/upload-resume" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">Upload Resume</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">Contact Us</Link></li>
              <li><Link to="/faqs" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">FAQs</Link></li>
              <li><Link to="/blog" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">Blog</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">Disclaimer</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-white hover:translate-x-1.5 hover:text-[#A78BFA] inline-block transition-all duration-200">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Column 5: CONTACT */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white mb-4 border-b border-purple-800/60 pb-2 inline-block">CONTACT</h4>
            <ul className="flex flex-col gap-3 text-xs text-purple-200/80">
              <li className="flex items-start gap-2.5 group">
                <Phone className="w-4 h-4 text-[#8B5CF6] mt-0.5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
                <a href="tel:+911234567890" className="hover:text-white hover:text-[#A78BFA] transition-colors">+91 12345 67890</a>
              </li>
              <li className="flex items-start gap-2.5 group">
                <Mail className="w-4 h-4 text-[#8B5CF6] mt-0.5 flex-shrink-0 group-hover:-translate-y-0.5 transition-transform" />
                <a href="mailto:info@jmsgroup.com" className="hover:text-white hover:text-[#A78BFA] transition-colors">info@jmsgroup.com</a>
              </li>
              <li className="flex items-start gap-2.5 group">
                <MapPin className="w-4 h-4 text-[#8B5CF6] mt-0.5 flex-shrink-0" />
                <span>123, Business Park, New Delhi, India - 110001</span>
              </li>
              <li className="flex items-start gap-2.5 group">
                <Clock className="w-4 h-4 text-[#8B5CF6] mt-0.5 flex-shrink-0" />
                <span>Mon - Sat: 9:30 AM - 6:30 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-300/60 gap-4">
          <div>© 2026 JMS Group. All Rights Reserved.</div>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <span>•</span>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
