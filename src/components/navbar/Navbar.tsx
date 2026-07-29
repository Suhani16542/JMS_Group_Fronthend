import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/common/Logo';
import {
  ChevronDown,
  Upload,
  ArrowRight,
  Menu,
  X,
  Briefcase,
  Users,
  Compass,
  FileCheck,
  Phone
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesList = [
    { title: 'Placement Services', desc: 'Connecting talent with suitable opportunities', icon: Briefcase, href: '/services/placement' },
    { title: 'HR Consulting', desc: 'Strategic HR & workforce optimization', icon: Users, href: '/services/hr-consulting' },
    { title: 'Career Counseling', desc: 'Expert guidance for career growth', icon: Compass, href: '/career-counselling' },
    { title: 'Job Placement', desc: 'End-to-end recruitment support', icon: FileCheck, href: '/services/job-placement' },
  ];

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Recent Openings', href: '/jobs' },
    { label: 'Services', href: '/services', hasDropdown: true },
    { label: 'Career Counseling', href: '/career-counselling' },
    { label: 'Upload Resume', href: '/upload-resume', isHighlight: false, icon: Upload },
  ];

  return (
    <div className="w-full transition-all duration-300 pointer-events-none relative z-50">
      {/* Top Outer Navigation Container Header */}
      <div className="pt-2 pb-1 px-3 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Floating Navbar Pill */}
          <div className="pointer-events-auto relative bg-white rounded-full shadow-[0_10px_30px_rgba(158,51,113,0.15)] p-1 sm:p-1.5 pl-4 sm:pl-6 flex items-center justify-between min-h-[58px] sm:min-h-[64px] border border-[#9E3371] transition-all duration-300">

            {/* LEFT: Official Brand JMS Group Logo */}
            <div className="flex items-center flex-shrink-0 pr-3 sm:pr-5 py-0.5">
              <Logo />
            </div>

            {/* CENTER: Horizontal Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href || (link.hasDropdown && location.pathname.startsWith('/services'));
                const Icon = link.icon;

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <button
                        className={`group relative flex items-center gap-1 px-3 xl:px-3.5 py-1.5 rounded-full font-bold text-xs xl:text-sm transition-all duration-200 cursor-pointer ${
                          isActive || isServicesOpen
                            ? 'text-white bg-[#9E3371]'
                            : 'text-[#9E3371] bg-white hover:bg-[#9E3371] hover:text-white'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-white' : (isActive ? 'text-white' : 'text-[#9E3371] group-hover:text-white')}`} />
                        
                        {isActive && (
                          <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-white rounded-full" />
                        )}
                      </button>

                      {/* Services Dropdown */}
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border-2 border-[#9E3371] p-3 z-50"
                          >
                            <div className="flex flex-col gap-1.5">
                              {servicesList.map((item) => {
                                const ServiceIcon = item.icon;
                                const isSubActive = location.pathname === item.href;
                                return (
                                  <Link
                                    key={item.title}
                                    to={item.href}
                                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 group/item border ${
                                      isSubActive
                                        ? 'bg-[#9E3371] text-white border-white'
                                        : 'bg-white text-[#9E3371] border-transparent hover:bg-[#9E3371] hover:text-white'
                                    }`}
                                    onClick={() => setIsServicesOpen(false)}
                                  >
                                    <div className={`p-2 rounded-lg transition-all duration-200 mt-0.5 shadow-xs ${
                                      isSubActive
                                        ? 'bg-white text-[#9E3371]'
                                        : 'bg-[#9E3371] text-white group-hover/item:bg-white group-hover/item:text-[#9E3371]'
                                    }`}>
                                      <ServiceIcon className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <div className={`text-sm font-bold transition-colors ${
                                        isSubActive
                                          ? 'text-white'
                                          : 'text-[#9E3371] group-hover/item:text-white'
                                      }`}>
                                        {item.title}
                                      </div>
                                      <div className={`text-xs leading-tight mt-0.5 font-normal ${
                                        isSubActive
                                          ? 'text-white/90'
                                          : 'text-[#9E3371] group-hover/item:text-white/90'
                                      }`}>
                                        {item.desc}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`group relative font-bold text-xs xl:text-sm transition-all duration-200 px-3 xl:px-3.5 py-1.5 flex items-center gap-1.5 rounded-full ${
                      isActive
                        ? 'text-white bg-[#9E3371]'
                        : 'text-[#9E3371] bg-white hover:bg-[#9E3371] hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {Icon && <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-white' : 'text-[#9E3371] group-hover:text-white'}`} />}
                    
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-white rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT: Compact Contact Us Section */}
            <div className="hidden lg:block h-full relative -mr-2 my-[-8px] py-0.5">
              <Link
                to="/contact"
                className="group relative flex items-center gap-2 px-5 xl:px-8 py-3.5 rounded-[36px_90px_36px_90px] text-xs xl:text-sm font-black text-white bg-[#9E3371] shadow-[0_6px_25px_rgba(158,51,113,0.35)] hover:bg-[#862B5F] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden border border-white"
              >
                {/* Left Circle with Phone Icon */}
                <div className="relative flex items-center justify-center z-10">
                  <div className="w-6 h-6 xl:w-7 xl:h-7 rounded-full bg-white text-[#9E3371] flex items-center justify-center border border-white shadow-inner group-hover:rotate-12 transition-all duration-300">
                    <Phone className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-[#9E3371] transition-colors duration-300" />
                  </div>
                </div>

                {/* Contact Us Label */}
                <span className="tracking-wide relative z-10 text-xs xl:text-sm font-extrabold text-white">Contact Us</span>

                {/* Animated Arrow Icon */}
                <ArrowRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-white relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Mobile/Tablet Menu Toggle Button */}
            <div className="flex lg:hidden items-center gap-3 pr-2">
              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-[#9E3371] shadow-md hover:bg-[#862B5F] transition-all border border-white"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full bg-white text-[#9E3371] border border-[#9E3371] hover:bg-[#9E3371] hover:text-white transition-all cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="pointer-events-auto lg:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-1 overflow-hidden"
          >
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#9E3371] p-5 mb-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href || (link.hasDropdown && location.pathname.startsWith('/services'));
                  const Icon = link.icon;

                  if (link.hasDropdown) {
                    return (
                      <div key={link.label} className="rounded-2xl overflow-hidden border border-[#9E3371]">
                        <button
                          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                          className={`w-full flex items-center justify-between p-3 text-left font-bold text-sm transition-colors ${
                            isActive || isMobileServicesOpen
                              ? 'bg-[#9E3371] text-white'
                              : 'text-[#9E3371] bg-white hover:bg-[#9E3371] hover:text-white'
                          }`}
                        >
                          <span>{link.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180 text-white' : (isActive ? 'text-white' : 'text-[#9E3371]')}`} />
                        </button>

                        {isMobileServicesOpen && (
                          <div className="bg-white p-2 flex flex-col gap-1 border-t border-[#9E3371]">
                            {servicesList.map((item) => {
                              const ServiceIcon = item.icon;
                              const isSubActive = location.pathname === item.href;
                              return (
                                <Link
                                  key={item.title}
                                  to={item.href}
                                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors group ${
                                    isSubActive
                                      ? 'bg-[#9E3371] text-white'
                                      : 'hover:bg-[#9E3371] hover:text-white text-[#9E3371]'
                                  }`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <div className={`p-1.5 rounded-lg ${
                                    isSubActive
                                      ? 'bg-white text-[#9E3371]'
                                      : 'bg-[#9E3371] text-white group-hover:bg-white group-hover:text-[#9E3371]'
                                  }`}>
                                    <ServiceIcon className="w-3.5 h-3.5" />
                                  </div>
                                  <span className={`text-xs font-bold ${isSubActive ? 'text-white' : 'text-[#9E3371] group-hover:text-white'}`}>
                                    {item.title}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-[#9E3371] text-white shadow-md'
                          : 'text-[#9E3371] border border-[#9E3371] hover:bg-[#9E3371] hover:text-white'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      <span>{link.label}</span>
                    </Link>
                  );
                })}

                <div className="pt-3 border-t border-[#9E3371] mt-2">
                  <Link
                    to="/contact"
                    className="w-full py-3.5 px-6 rounded-2xl text-center text-sm font-bold text-white bg-[#9E3371] shadow-lg flex items-center justify-center gap-2 hover:bg-[#862B5F] border border-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;


