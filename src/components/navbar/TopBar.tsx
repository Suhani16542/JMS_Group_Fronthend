import React from 'react';
import { Phone, Mail, Clock, Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#17054B] text-white text-xs py-2.5 px-4 sm:px-8 border-b border-purple-900/40 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        {/* Left: Contact Info */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/90 font-medium">
          <a
            href="tel:+911234567890"
            className="flex items-center gap-2 hover:text-[#A78BFA] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span className="tracking-wide">+91 12345 67890</span>
          </a>

          <div className="hidden sm:block h-3.5 w-[1px] bg-white/20" />

          <a
            href="mailto:info@jmsgroup.com"
            className="flex items-center gap-2 hover:text-[#A78BFA] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span className="tracking-wide">info@jmsgroup.com</span>
          </a>

          <div className="hidden md:block h-3.5 w-[1px] bg-white/20" />

          <div className="hidden md:flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span className="tracking-wide text-white/90">Mon - Sat: 9:00 AM - 7:00 PM</span>
          </div>
        </div>

        {/* Right: Social Links */}
        <div className="flex items-center gap-2.5 ml-auto sm:ml-0">
          <span className="hidden lg:inline text-xs font-medium text-white/80 mr-1">Follow Us:</span>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-[#6D3DF5] hover:scale-110 transition-all duration-200"
          >
            <Facebook className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-[#6D3DF5] hover:scale-110 transition-all duration-200"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-[#6D3DF5] hover:scale-110 transition-all duration-200"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-[#6D3DF5] hover:scale-110 transition-all duration-200"
          >
            <Youtube className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
