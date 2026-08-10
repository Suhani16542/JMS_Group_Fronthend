import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Upload, 
  Briefcase, 
  CheckCircle2, 
  Send, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Loader2, 
  AlertCircle, 
  Code, 
  Layout, 
  Server, 
  Palette, 
  TrendingUp, 
  Users, 
  Paintbrush, 
  Building2, 
  Award, 
  Smile, 
  BookOpen, 
  TrendingUpIcon, 
  X,
  Globe,
  Smartphone,
  Layers,
  Cloud,
  CheckCircle,
  Landmark,
  Laptop,
  ShoppingBag,
  Headset,
  Factory,
  Stethoscope,
  Hash
} from 'lucide-react';
import { uploadResumeApi } from '../../services/resumeService';

export const JobsPage: React.FC = () => {
  // Modal State for Resume Upload
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoleTitle, setSelectedRoleTitle] = useState('');

  // Form State
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    referenceNumber: '',
    referenceName: '',
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

  const openUploadModal = (roleTitle?: string) => {
    if (roleTitle) {
      setSelectedRoleTitle(roleTitle);
      setFormData((prev) => ({ ...prev, preferredRole: roleTitle }));
    }
    setSubmitted(false);
    setErrorMessage(null);
    setValidationError(null);
    setIsModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsModalOpen(false);
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
    if (!formData.referenceNumber.trim()) {
      setValidationError('Reference Number is required.');
      return;
    }
    if (!formData.referenceName.trim()) {
      setValidationError('Reference Name is required.');
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
        referenceNumber: formData.referenceNumber.trim(),
        referenceName: formData.referenceName.trim(),
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
        referenceNumber: '',
        referenceName: '',
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const hiringAreas = [
    {
      title: 'Banking Sector',
      description: 'JMS Group regularly recruits for various positions across retail banking, corporate finance, risk management, operations, and loan processing in top banking institutions.',
      icon: Landmark,
      tags: ['Banking', 'Finance', 'Operations', 'Risk Mgmt'],
    },
    {
      title: 'IT Sector',
      description: 'JMS Group regularly recruits software developers, cloud architects, DevOps engineers, UI/UX designers, IT support specialists, and tech leaders.',
      icon: Laptop,
      tags: ['Software', 'QA', 'DevOps', 'Cloud', 'Support'],
    },
    {
      title: 'Retail Sector',
      description: 'JMS Group regularly recruits store managers, inventory specialists, category managers, digital operations staff, and e-commerce logistics teams.',
      icon: ShoppingBag,
      tags: ['Sales', 'Warehouse', 'Inventory', 'Merchandising'],
    },
    {
      title: 'BPO / Customer Support Sector',
      description: 'JMS Group regularly recruits inbound/outbound customer support executives, technical support representatives, team leads, and quality analysts.',
      icon: Headset,
      tags: ['Customer Support', 'Voice/Non-Voice', 'BPO', 'KPO'],
    },
    {
      title: 'Manufacturing Sector',
      description: 'JMS Group regularly recruits skilled engineers, plant managers, quality assurance auditors, and supply chain coordinators for top manufacturing units.',
      icon: Factory,
      tags: ['Engineering', 'Plant Ops', 'Quality Check', 'Supply Chain'],
    },
    {
      title: 'Healthcare Sector',
      description: 'JMS Group regularly recruits qualified healthcare professionals, clinical staff, medical administration personnel, and lab specialists for leading hospitals and clinics.',
      icon: Stethoscope,
      tags: ['Clinical', 'Medical Admin', 'Lab Specs', 'Nursing'],
    },
  ];

  const whatWeDoPoints = [
    {
      title: 'Web Development',
      desc: 'Scalable and modern web applications built using modern frameworks.',
      icon: Globe,
    },
    {
      title: 'Mobile-Friendly Applications',
      desc: 'Seamless, high-performance responsive interfaces for all screen sizes.',
      icon: Smartphone,
    },
    {
      title: 'UI/UX Design',
      desc: 'User-centric designs, interactive wireframes, and modern visual systems.',
      icon: Layers,
    },
    {
      title: 'Backend & APIs',
      desc: 'Robust RESTful microservices, secure database architectures, and integrations.',
      icon: Server,
    },
    {
      title: 'Cloud Deployment',
      desc: 'Reliable cloud infrastructure, automated CI/CD pipelines, and hosting.',
      icon: Cloud,
    },
    {
      title: 'Digital Business Solutions',
      desc: 'Custom CRM systems, enterprise HR portals, and e-commerce platforms.',
      icon: CheckCircle,
    },
  ];

  const whyJoinFeatures = [
    {
      title: 'Professional Growth',
      description: 'Accelerate your career trajectory with challenging projects and structured advancement paths.',
      icon: Award,
    },
    {
      title: 'Friendly Work Culture',
      description: 'Enjoy a collaborative, inclusive, and positive environment that values team well-being.',
      icon: Smile,
    },
    {
      title: 'Learning Opportunities',
      description: 'Gain access to continuous training, mentorship, and modern technology frameworks.',
      icon: BookOpen,
    },
    {
      title: 'Career Development',
      description: 'Unlock opportunities for leadership roles, skill enhancement, and personalized career roadmaps.',
      icon: TrendingUpIcon,
    },
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      
      {/* ==================================================== */}
      {/* SECTION 1 – HERO */}
      {/* ==================================================== */}
      <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-16 lg:pb-20 bg-hero-gradient border-b border-[#8B1E5C]/10">
        {/* Subtle background glow shapes */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C2188B]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#7A1F4D]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8FB] text-[#7A1F4D] text-xs font-bold tracking-wide uppercase mb-6 border border-[#8B1E5C]/30 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8B1E5C]" />
              <span>💼 Careers at JMS Group</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#6D214F] leading-[1.12] tracking-tight mb-5"
            >
              Join Our <span className="text-gradient">Growing Team</span>
            </motion.h1>

            <div className="w-20 h-1.5 bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] rounded-full mx-auto mb-6" />

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-[#555555] leading-relaxed mb-8 max-w-2xl mx-auto font-normal"
            >
              We're always looking for passionate, talented, and motivated professionals to join our team. Explore exciting career opportunities and submit your resume today.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <button
                onClick={() => openUploadModal()}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] shadow-[0_4px_20px_rgba(139,30,92,0.3)] hover:shadow-[0_10px_30px_rgba(194,24,139,0.45)] hover:-translate-y-1 transition-all duration-300 border border-white/20 cursor-pointer"
              >
                <span>Upload Resume</span>
                <Upload className="w-4 h-4 text-white" />
              </button>
              
              <button
                onClick={() => scrollToSection('hiring-areas-section')}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold text-[#6D214F] bg-white border-2 border-[#8B1E5C] hover:bg-gradient-to-r hover:from-[#7A1F4D] hover:to-[#C2188B] hover:text-white hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-xs cursor-pointer"
              >
                <span>View Open Positions</span>
                <Briefcase className="w-4 h-4" />
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 2 – TWO COLUMN LAYOUT */}
      {/* ==================================================== */}
      <section className="py-16 lg:py-20 bg-white" id="hiring-areas-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* ----------------------------------- */}
            {/* LEFT COLUMN: Clean Informational Card */}
            {/* ----------------------------------- */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-24"
            >
              <div className="w-full bg-[#FAF8FB] p-7 sm:p-8 rounded-[24px] border border-[#8B1E5C]/20 shadow-xl">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#7A1F4D] text-xs font-bold uppercase tracking-wider mb-4 border border-[#8B1E5C]/20 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#8B1E5C]" />
                  <span>ABOUT OUR WORK</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#6D214F] tracking-tight mb-4">
                  What We Do
                </h2>
                
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
                  At JMS Group, we work on modern web applications, business websites, enterprise software, CRM systems, HR platforms, e-commerce solutions, and custom digital products. Our team focuses on building scalable, responsive, and user-friendly applications using the latest technologies. We believe in innovation, teamwork, continuous learning, and delivering high-quality solutions to our clients.
                </p>

                <div className="w-full h-px bg-[#8B1E5C]/15 mb-6" />

                {/* Direct Helpline Badge */}
                <div className="mb-6 p-3.5 rounded-xl bg-white border border-[#8B1E5C]/20 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7A1F4D] to-[#C2188B] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase text-[#8B1E5C] tracking-wider">Recruitment Helpline</div>
                    <a href="tel:07314991624" className="text-xs sm:text-sm font-extrabold text-[#6D214F] hover:text-[#C2188B] transition-colors">
                      0731-4991624
                    </a>
                  </div>
                </div>

                {/* 6 Feature Points */}
                <div className="space-y-4">
                  {whatWeDoPoints.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-[#8B1E5C]/10 shadow-xs">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7A1F4D] to-[#C2188B] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                          <ItemIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-[#6D214F]">{item.title}</h3>
                          <p className="text-[11px] text-[#555555] leading-normal">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </motion.div>

            {/* ----------------------------------- */}
            {/* RIGHT COLUMN: Modern Job Cards */}
            {/* ----------------------------------- */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8FB] text-[#7A1F4D] text-xs font-bold uppercase tracking-wider mb-3 border border-[#8B1E5C]/20 shadow-xs">
                EXPLORE POSITIONS
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#6D214F] tracking-tight mb-6">
                Current Hiring Areas
              </h2>

              {/* Redesigned Job Cards Stack */}
              <div className="space-y-5">
                {hiringAreas.map((area, index) => {
                  const AreaIcon = area.icon;
                  return (
                    <motion.div
                      key={area.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="p-6 sm:p-7 rounded-[22px] bg-white border border-[#8B1E5C]/15 shadow-md hover:border-[#8B1E5C]/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                    >
                      {/* Top Accent Highlight Line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] opacity-80 group-hover:opacity-100 transition-opacity" />

                      {/* Header & Icon */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7A1F4D] to-[#C2188B] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                            <AreaIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-extrabold text-[#6D214F] group-hover:text-[#8B1E5C] transition-colors">
                              {area.title}
                            </h3>
                            <span className="text-[11px] font-semibold text-[#8B1E5C]">
                              Recruitment Opportunities
                            </span>
                          </div>
                        </div>

                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Actively Hiring
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-5 font-normal">
                        {area.description}
                      </p>

                      {/* Sector Skill / Specialization Tags */}
                      <div className="mb-5">
                        <div className="flex flex-wrap gap-1.5">
                          {area.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="px-3 py-1 rounded-full bg-[#FAF8FB] text-[#6D214F] text-xs font-semibold border border-[#8B1E5C]/20 shadow-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-4 border-t border-[#8B1E5C]/10 flex items-center justify-between gap-4">
                        <span className="text-xs text-[#555555] font-medium hidden sm:inline">Regular & Executive Recruitment</span>
                        <button
                          onClick={() => openUploadModal(area.title)}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/20 cursor-pointer ml-auto sm:ml-0"
                        >
                          <span>Upload Resume</span>
                          <Upload className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>

                    </motion.div>
                  );
                })}
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 3 – WHY JOIN JMS GROUP */}
      {/* ==================================================== */}
      <section className="py-16 lg:py-20 bg-[#FAF8FB] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#7A1F4D] text-xs font-bold uppercase tracking-wider mb-3 border border-[#8B1E5C]/20 shadow-xs">
              OUR WORK CULTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#6D214F] tracking-tight">
              Why Join JMS Group?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyJoinFeatures.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-[20px] bg-white border border-[#8B1E5C]/15 shadow-sm hover:shadow-xl hover:border-[#8B1E5C]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7A1F4D] to-[#C2188B] text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <FeatureIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8B1E5C]" />
                    <h3 className="text-lg font-bold text-[#6D214F] group-hover:text-[#8B1E5C] transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 4 – CALL TO ACTION */}
      {/* ==================================================== */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] text-white relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-white tracking-tight">
              Don't See Your Role?
            </h2>
            <p className="text-sm sm:text-base text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto font-normal">
              We're always looking for talented people. Send us your resume and we'll reach out when a suitable position becomes available.
            </p>
            <button
              onClick={() => openUploadModal()}
              className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-white text-[#6D214F] font-extrabold text-sm sm:text-base shadow-2xl hover:bg-[#FAF8FB] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span>Submit Resume</span>
              <Upload className="w-5 h-5 text-[#8B1E5C]" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* RESUME UPLOAD MODAL */}
      {/* ==================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 lg:p-6 bg-black/65 backdrop-blur-xs overflow-hidden">
            {/* Overlay backdrop click to close */}
            <div className="absolute inset-0" onClick={closeUploadModal} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-xl bg-white rounded-[24px] shadow-2xl border border-[#8B1E5C]/20 max-h-[92vh] sm:max-h-[88vh] flex flex-col z-10 overflow-hidden"
            >
              {/* Sticky Modal Header */}
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 sm:px-7 pt-5 pb-4 border-b border-[#8B1E5C]/10 flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF8FB] text-[#7A1F4D] text-[10px] sm:text-[11px] font-bold uppercase mb-1.5 border border-[#8B1E5C]/20">
                    <Upload className="w-3 h-3 text-[#8B1E5C]" />
                    <span>CANDIDATE APPLICATION</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#6D214F] leading-tight">
                    Submit Resume {selectedRoleTitle ? `for ${selectedRoleTitle}` : ''}
                  </h3>
                </div>

                {/* Close Button */}
                <button
                  onClick={closeUploadModal}
                  aria-label="Close modal"
                  className="p-2 rounded-full bg-[#FAF8FB] text-[#6D214F] hover:bg-[#8B1E5C] hover:text-white transition-colors cursor-pointer shrink-0 shadow-xs mt-0.5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body Content */}
              <div className="p-5 sm:p-7 overflow-y-auto flex-1 scrollbar-thin">
                <p className="text-xs sm:text-sm text-[#555555] mb-5">
                  Fill out your details below and upload your resume. Our recruitment team will get in touch with you.
                </p>

              {submitted ? (
                <div className="p-8 rounded-[18px] bg-[#6D214F] text-white text-center shadow-md">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-[#C2188B]" />
                  <h3 className="text-2xl font-bold mb-2 text-white">Resume Submitted Successfully!</h3>
                  <p className="text-xs sm:text-sm text-white/90 mb-6 leading-relaxed">
                    Thank you! Our recruitment team has received your profile and saved your resume. We will contact you when suitable openings arise.
                  </p>
                  <button
                    onClick={closeUploadModal}
                    className="px-6 py-3 rounded-full bg-white text-[#6D214F] font-bold text-xs hover:bg-[#FAF8FB] transition-all cursor-pointer shadow-md"
                  >
                    Done & Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {validationError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div>
                      <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8B1E5C] absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Priya Sharma"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] placeholder-[#555555]/50 focus:outline-none focus:border-[#8B1E5C] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Phone Number *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#8B1E5C] absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] placeholder-[#555555]/50 focus:outline-none focus:border-[#8B1E5C] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Reference Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8B1E5C] absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="Enter Reference Name"
                          value={formData.referenceName}
                          onChange={(e) => setFormData({ ...formData, referenceName: e.target.value })}
                          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] placeholder-[#555555]/50 focus:outline-none focus:border-[#8B1E5C] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Reference Number *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#8B1E5C] absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="Enter Reference Number"
                          value={formData.referenceNumber}
                          onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
                          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] placeholder-[#555555]/50 focus:outline-none focus:border-[#8B1E5C] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Email Address *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8B1E5C] absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="priya@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] placeholder-[#555555]/50 focus:outline-none focus:border-[#8B1E5C] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Highest Qualification *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. B.Tech / MBA / MCA"
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] placeholder-[#555555]/50 focus:outline-none focus:border-[#8B1E5C] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Years of Experience *</label>
                      <select
                        required
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] focus:outline-none focus:border-[#8B1E5C] transition-colors cursor-pointer"
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
                      <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Preferred Job Role *</label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-[#8B1E5C] absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Full Stack Developer"
                          value={formData.preferredRole}
                          onChange={(e) => setFormData({ ...formData, preferredRole: e.target.value })}
                          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] placeholder-[#555555]/50 focus:outline-none focus:border-[#8B1E5C] transition-colors"
                        />
                      </div>
                    </div>

                  </div>

                  {/* File Dropzone */}
                  <div>
                    <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Upload Resume (PDF, DOC, DOCX) *</label>
                    <div className="border-2 border-dashed border-[#8B1E5C]/30 rounded-2xl p-5 text-center bg-[#FAF8FB] hover:border-[#8B1E5C] transition-all cursor-pointer relative">
                      <input
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Upload className="w-8 h-8 text-[#8B1E5C] mx-auto mb-2" />
                      {file ? (
                        <div className="text-xs font-bold text-[#6D214F] flex items-center justify-center gap-2">
                          <FileText className="w-4 h-4 text-[#8B1E5C]" />
                          <span>{file.name}</span>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs font-bold text-[#6D214F]">Click or Drag & Drop to upload resume</p>
                          <p className="text-[11px] text-[#555555] mt-0.5">Supported formats: PDF, DOC, DOCX (Max: 5MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeUploadModal}
                      className="px-5 py-2.5 rounded-full text-xs font-bold text-[#6D214F] bg-[#FAF8FB] hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="py-2.5 px-6 rounded-full text-center text-xs font-bold text-white bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] shadow-md flex items-center justify-center gap-2 hover:shadow-lg transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed border border-white/20"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 text-white animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Resume</span>
                          <Send className="w-3.5 h-3.5 text-white" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default JobsPage;



