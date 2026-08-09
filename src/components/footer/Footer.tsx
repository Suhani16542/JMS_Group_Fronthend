import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { Mail, Phone, MapPin, Clock, Facebook, Linkedin, Instagram, Youtube, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const location = useLocation();
  const hideNewsletter = location.pathname === '/jobs' || location.pathname === '/recent-openings';

  return (
    <footer className="bg-[#FAF8FB] text-[#222222] pt-16 pb-8 border-t-2 border-[#8B1E5C]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Newsletter / Stay Connected Strip */}
        {!hideNewsletter && (
          <div className="mb-14 p-8 sm:p-10 rounded-[18px] bg-white border border-[#8B1E5C]/20 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E5C] mb-1 block">STAY CONNECTED WITH JMS GROUP</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#6D214F] mb-2">Get Jobs & HR Insights in Your Inbox</h3>
                <p className="text-xs sm:text-sm text-[#555555]">Subscribe to receive curated corporate openings, career guidance, and HR trends directly.</p>
              </div>
              <div className="lg:col-span-5">
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    required
                    className="w-full px-5 py-3.5 rounded-full bg-[#FAF8FB] text-[#222222] placeholder-[#777777] text-xs sm:text-sm focus:outline-none border border-[#8B1E5C]/30 focus:border-[#8B1E5C]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] shadow-md flex items-center justify-center gap-2 hover:shadow-[0_8px_25px_rgba(194,24,139,0.4)] hover:-translate-y-0.5 transition-all flex-shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Main Footer Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#8B1E5C]/15">
          
          {/* Column 1: Official Logo & Company Intro */}
          <div className="lg:col-span-4 flex flex-col items-start">
            {/* Clean White Container for Footer Logo */}
            <div className="bg-white p-4 sm:p-5 rounded-[18px] shadow-sm border border-[#8B1E5C]/15 mb-5 inline-flex items-center justify-center">
              <Logo />
            </div>
            
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-5 max-w-sm">
              JMS Group is a premier corporate placement, HR consulting, career counseling and executive recruitment organization. Growing Your Self with JMS Group.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white text-[#8B1E5C] border border-[#8B1E5C]/20 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#7A1F4D] hover:to-[#C2188B] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-xs">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white text-[#8B1E5C] border border-[#8B1E5C]/20 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#7A1F4D] hover:to-[#C2188B] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-xs">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white text-[#8B1E5C] border border-[#8B1E5C]/20 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#7A1F4D] hover:to-[#C2188B] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-xs">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white text-[#8B1E5C] border border-[#8B1E5C]/20 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#7A1F4D] hover:to-[#C2188B] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-xs">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: COMPANY */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-[#6D214F] mb-4 border-b border-[#8B1E5C]/30 pb-2 inline-block">COMPANY</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#555555]">
              <li><Link to="/about" className="hover:text-[#C2188B] transition-colors">About Us</Link></li>
              <li><Link to="/our-team" className="hover:text-[#C2188B] transition-colors">Our Team</Link></li>
              <li><Link to="/careers" className="hover:text-[#C2188B] transition-colors">Careers</Link></li>
              <li><Link to="/jobs" className="hover:text-[#C2188B] transition-colors">Recent Openings</Link></li>
            </ul>
          </div>

          {/* Column 3: SERVICES */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-[#6D214F] mb-4 border-b border-[#8B1E5C]/30 pb-2 inline-block">SERVICES</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#555555]">
              <li><Link to="/services/placement" className="hover:text-[#C2188B] transition-colors">Placement Services</Link></li>
              <li><Link to="/services/hr-consulting" className="hover:text-[#C2188B] transition-colors">HR Consulting</Link></li>
              <li><Link to="/career-counselling" className="hover:text-[#C2188B] transition-colors">Career Counseling</Link></li>
              <li><Link to="/services/job-placement" className="hover:text-[#C2188B] transition-colors">Job Placement</Link></li>
            </ul>
          </div>

          {/* Column 4: QUICK LINKS */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-[#6D214F] mb-4 border-b border-[#8B1E5C]/30 pb-2 inline-block">QUICK LINKS</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#555555]">
              <li><Link to="/upload-resume" className="hover:text-[#C2188B] transition-colors">Upload Resume</Link></li>
              <li><Link to="/contact" className="hover:text-[#C2188B] transition-colors">Contact Us</Link></li>
              <li><Link to="/faqs" className="hover:text-[#C2188B] transition-colors">FAQs</Link></li>
              <li><Link to="/blog" className="hover:text-[#C2188B] transition-colors">Blog</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#C2188B] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-[#C2188B] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:text-[#C2188B] transition-colors">Disclaimer</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-[#C2188B] transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Column 5: CONTACT */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-[#6D214F] mb-4 border-b border-[#8B1E5C]/30 pb-2 inline-block">CONTACT</h4>
            <ul className="flex flex-col gap-3 text-xs text-[#555555]">
              <li className="flex items-start gap-2.5 group">
                <Mail className="w-4 h-4 text-[#8B1E5C] mt-0.5 flex-shrink-0 group-hover:text-[#C2188B] transition-colors" />
                <a href="mailto:jmsplacement@gmail.com" className="hover:text-[#C2188B] transition-colors">jmsplacement@gmail.com</a>
              </li>
              <li className="flex items-start gap-2.5 group">
                <Phone className="w-4 h-4 text-[#8B1E5C] mt-0.5 flex-shrink-0 group-hover:text-[#C2188B] transition-colors" />
                <a href="tel:+918349608102" className="hover:text-[#C2188B] transition-colors">+91 83496 08102</a>
              </li>
              <li className="flex items-start gap-2.5 group">
                <MapPin className="w-4 h-4 text-[#8B1E5C] mt-0.5 flex-shrink-0 group-hover:text-[#C2188B] transition-colors" />
                <span>
                  129, 1st Floor, Orbit Mall, Near C21 Mall,<br />
                  A.B. Road, Vijay Nagar,<br />
                  Indore, Madhya Pradesh
                </span>
              </li>
              <li className="flex items-start gap-2.5 group">
                <Clock className="w-4 h-4 text-[#8B1E5C] mt-0.5 flex-shrink-0 group-hover:text-[#C2188B] transition-colors" />
                <div className="flex flex-col gap-1">
                  <span><strong>Office Time:</strong> Mon – Sat: 10:00 AM – 5:30 PM</span>
                  <span><strong>Meeting Time:</strong> Mon – Sat: 11:00 AM – 4:00 PM</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] gap-4">
          <div>© 2026 JMS Group. All Rights Reserved.</div>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <Link to="/privacy-policy" className="hover:text-[#C2188B] transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-conditions" className="hover:text-[#C2188B] transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-[#C2188B] transition-colors">Disclaimer</Link>
            <span>•</span>
            <Link to="/cookie-policy" className="hover:text-[#C2188B] transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

