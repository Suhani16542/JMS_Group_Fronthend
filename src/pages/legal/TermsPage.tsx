import React, { useState, useRef, useEffect } from 'react';
import { submitCandidateApplicationApi } from '../../services/candidateApplicationService';
import {
  Scale,
  ShieldCheck,
  CheckSquare,
  Square,
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  User,
  Calendar,
  GraduationCap,
  Briefcase,
  MapPin,
  Building,
  DollarSign,
  Clock,
  Mail,
  Phone,
  Paperclip,
  PenTool,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';

interface ApplicationFormData {
  fullName: string;
  fatherOrHusbandName: string;
  dob: string;
  qualification: string;
  specialization: string;
  permanentAddress: string;
  email: string;
  jobAppliedForA: string;
  jobAppliedForB: string;
  currentLocation: string;
  locationPreferenceA: string;
  locationPreferenceB: string;
  currentCtc: string;
  expectedSalary: string;
  noticePeriod: string;
  currentBankOrNbfc: string;
  currentVertical: string;
  fatherOrHusbandOccupation: string;
  motherOccupation: string;
  siblings: string;
  siblingsOccupation: string;
  mobileNumber: string;
  alternateNumber: string;
  fatherNumber: string;
  referenceNameAndNo: string;
  candidateSignatureName: string;
  termsAccepted: boolean;
}

const INITIAL_FORM_DATA: ApplicationFormData = {
  fullName: '',
  fatherOrHusbandName: '',
  dob: '',
  qualification: '',
  specialization: '',
  permanentAddress: '',
  email: '',
  jobAppliedForA: '',
  jobAppliedForB: '',
  currentLocation: '',
  locationPreferenceA: '',
  locationPreferenceB: '',
  currentCtc: '',
  expectedSalary: '',
  noticePeriod: '',
  currentBankOrNbfc: '',
  currentVertical: '',
  fatherOrHusbandOccupation: '',
  motherOccupation: '',
  siblings: '',
  siblingsOccupation: '',
  mobileNumber: '',
  alternateNumber: '',
  fatherNumber: '',
  referenceNameAndNo: '',
  candidateSignatureName: '',
  termsAccepted: false,
};

const ALLOWED_PHOTO_EXTS = ['jpg', 'jpeg', 'png'];
const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_DOC_EXTS = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'];
const MAX_DOC_SIZE = 10 * 1024 * 1024; // 10MB

export const TermsPage: React.FC = () => {
  const [formData, setFormData] = useState<ApplicationFormData>(INITIAL_FORM_DATA);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [photoDragging, setPhotoDragging] = useState(false);
  const [docDragging, setDocDragging] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [refNumber, setRefNumber] = useState<string>('JMS-APP-2026-0001');

  const photoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (photo) {
      const url = URL.createObjectURL(photo);
      setPhotoPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPhotoPreview(null);
    }
  }, [photo]);

  const handleInputChange = (field: keyof ApplicationFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handlePhotoSelect = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_PHOTO_EXTS.includes(ext)) {
      setErrors((prev) => ({ ...prev, photo: 'Allowed photo formats: JPG, JPEG, PNG only.' }));
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      setErrors((prev) => ({ ...prev, photo: 'Photo size must not exceed 5 MB.' }));
      return;
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next.photo;
      return next;
    });
    setPhoto(file);
  };

  const handleDocsSelect = (incomingFiles: FileList | File[]) => {
    const newFiles: File[] = [];
    let docError: string | null = null;

    Array.from(incomingFiles).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (!ALLOWED_DOC_EXTS.includes(ext)) {
        docError = `"${file.name}" has an unsupported format. Allowed: PDF, JPG, JPEG, PNG, DOC, DOCX.`;
        return;
      }
      if (file.size > MAX_DOC_SIZE) {
        docError = `"${file.name}" exceeds the 10 MB limit.`;
        return;
      }
      const duplicate = documents.some((d) => d.name === file.name && d.size === file.size);
      if (!duplicate) {
        newFiles.push(file);
      }
    });

    if (docError) {
      setErrors((prev) => ({ ...prev, documents: docError || undefined }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.documents;
        return next;
      });
    }

    if (newFiles.length > 0) {
      setDocuments((prev) => [...prev, ...newFiles]);
    }
    if (docInputRef.current) docInputRef.current.value = '';
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, idx) => idx !== index));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Candidate name is required.';
    if (!formData.fatherOrHusbandName.trim()) newErrors.fatherOrHusbandName = "Father's / Husband's name is required.";
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required.';
    } else {
      const d = new Date(formData.dob);
      if (isNaN(d.getTime()) || d >= new Date()) {
        newErrors.dob = 'Please enter a valid past date of birth.';
      }
    }
    if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required.';
    if (!formData.permanentAddress.trim()) newErrors.permanentAddress = 'Permanent home address is required.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email ID is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.jobAppliedForA.trim()) newErrors.jobAppliedForA = 'Job Applied For - A is required.';
    if (!formData.currentLocation.trim()) newErrors.currentLocation = 'Current location is required.';
    if (!formData.locationPreferenceA.trim()) newErrors.locationPreferenceA = 'Location Preference - A is required.';

    const phoneRegex = /^[+]?[\d\s-]{7,15}$/;
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required.';
    } else if (!phoneRegex.test(formData.mobileNumber.trim().replace(/\s+/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid mobile number.';
    }

    if (!photo) {
      newErrors.photo = 'Candidate photo is mandatory (JPG, JPEG, PNG, max 5 MB).';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Please accept the Terms & Conditions before submitting.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0];
      const target = document.getElementById(firstKey) || formTopRef.current;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      setSubmitError(null);
      const response = await submitCandidateApplicationApi(formData, photo!, documents);
      const appRef = response.data?._id || ('JMS-APP-' + Date.now().toString().slice(-6));
      setRefNumber(appRef);
      setSubmitted(true);
      if (formTopRef.current) {
        formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit candidate application. Please try again.');
      if (formTopRef.current) {
        formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setPhoto(null);
    setPhotoPreview(null);
    setDocuments([]);
    setErrors({});
    setSubmitError(null);
    setSubmitted(false);
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(refNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={formTopRef} className="w-full bg-[#FAF8FB] min-h-screen pb-16">
      
      {/* Top Banner Header */}
      <section className="relative py-10 sm:py-14 bg-white border-b border-[#8B1E5C]/15 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-2.5">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1E5C] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
            <Scale className="w-3 h-3 text-white" />
            <span>LEGAL TERMS & CANDIDATE REGISTRATION</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#6D214F] tracking-tight">
            Application Form
          </h1>

          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#8B1E5C] max-w-xl mx-auto bg-[#FAF8FB] py-1.5 px-3.5 rounded-lg border border-[#8B1E5C]/20 shadow-xs">
            PLEASE READ ALL THE TERMS & CONDITIONS CAREFULLY BEFORE APPLYING
          </p>

          <p className="text-xs text-[#555555] max-w-xl mx-auto leading-relaxed">
            Please review our recruitment terms and complete the standardized candidate profile below to proceed with placement lineups.
          </p>
        </div>
      </section>

      {/* Main Container - Compact Max Width */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6 sm:space-y-8">

        {/* SECTION 1: TERMS & CONDITIONS */}
        <section className="bg-white rounded-2xl p-5 sm:p-7 border border-[#8B1E5C]/15 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3.5 border-b border-[#8B1E5C]/15">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] text-white flex items-center justify-center shadow-xs flex-shrink-0">
              <Scale className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#FAF8FB] text-[#8B1E5C] border border-[#8B1E5C]/20">
                OFFICIAL POLICIES
              </span>
              <h2 className="text-lg sm:text-xl font-black text-[#6D214F] mt-0.5">
                Terms & Conditions
              </h2>
            </div>
          </div>

          {/* Numbered Terms (Exact Text) */}
          <div className="space-y-2.5">
            <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/15 flex items-start gap-2.5 hover:border-[#8B1E5C]/30 hover:bg-white transition-colors">
              <div className="w-6 h-6 rounded-lg bg-[#8B1E5C] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                1
              </div>
              <p className="text-xs text-[#333333] leading-relaxed flex-1">
                Each candidate will be given certain successful interviews but in case, if candidate is found not following the norms of the Organization then the company is liable to take any possible action. All the Interviews will be lined up as per job/ interview availabilities with the organization.
              </p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/15 flex items-start gap-2.5 hover:border-[#8B1E5C]/30 hover:bg-white transition-colors">
              <div className="w-6 h-6 rounded-lg bg-[#8B1E5C] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                2
              </div>
              <p className="text-xs text-[#333333] leading-relaxed flex-1">
                All the candidates will attend the interviews in time arranged by the organization. If any candidate refuses to attend the interviews organization has the right to cancel the job process for the candidate. No candidate will refer interviews details provided by the organization to other job seekers without the written permission from the organization, if found organization has the right to cancel the services for the candidate.
              </p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/15 flex items-start gap-2.5 hover:border-[#8B1E5C]/30 hover:bg-white transition-colors">
              <div className="w-6 h-6 rounded-lg bg-[#8B1E5C] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                3
              </div>
              <p className="text-xs text-[#333333] leading-relaxed flex-1">
                Service Charges will be Only 15 days salary of Gross CTC, it must be deposited at the time of received Offer mail, offer letter or Received CTC Breakup table which is one time payment. Organization can ask the candidate to deposit the cheque.
              </p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/15 flex items-start gap-2.5 hover:border-[#8B1E5C]/30 hover:bg-white transition-colors">
              <div className="w-6 h-6 rounded-lg bg-[#8B1E5C] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                4
              </div>
              <p className="text-xs text-[#333333] leading-relaxed flex-1">
                If reference verification does not cleared then in this condition organization can ask candidate to submit a cheque.
              </p>
            </div>
          </div>
        </section>

        {/* SUCCESS STATE */}
        {submitted ? (
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#8B1E5C]/20 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] text-white flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-white stroke-[2.2]" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                REGISTRATION RECEIVED
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#6D214F]">
                Application Submitted Successfully
              </h2>
              <p className="text-xs sm:text-sm text-[#555555]">
                Your application has been received successfully.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8FB] border-2 border-[#8B1E5C]/25 max-w-sm mx-auto space-y-2">
              <span className="text-[11px] font-bold uppercase text-[#8B1E5C]">
                Application Reference Number
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-xs sm:text-sm font-black text-[#6D214F] bg-white px-3 py-1.5 rounded-lg border border-[#8B1E5C]/20 shadow-xs break-all">
                  {refNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="p-2 rounded-lg bg-white border border-[#8B1E5C]/20 text-[#8B1E5C] hover:bg-[#8B1E5C]/10 transition-colors cursor-pointer"
                  title="Copy Reference Number"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[10px] text-green-700 font-semibold">
                Official application reference ID registered with JMS Group.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 cursor-pointer border border-white/20"
              >
                <span>Submit Another Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* SECTION 2: APPLICATION FORM */
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            
            {/* Validation Banner */}
            {Object.keys(errors).length > 0 && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2.5 shadow-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-red-800">Please correct the highlighted fields before submitting:</p>
                  <ul className="list-disc pl-4 text-[11px] font-normal text-red-700 space-y-0.5">
                    {Object.entries(errors).map(([key, msg]) => (
                      <li key={key}>{msg}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Application Form Card Container */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 lg:p-8 border border-[#8B1E5C]/15 shadow-sm space-y-6">
              
              {/* Form Title & Photo Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#8B1E5C]/15">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#FAF8FB] text-[#8B1E5C] border border-[#8B1E5C]/20">
                    CANDIDATE APPLICATION
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#6D214F]">
                    Candidate Information Form
                  </h3>
                  <p className="text-[11px] text-[#555555]">
                    Fields marked with <span className="text-red-500 font-bold">*</span> are mandatory.
                  </p>
                </div>

                {/* Compact Candidate Photo Upload Area */}
                <div id="photo" className="w-full sm:w-64 flex-shrink-0">
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handlePhotoSelect(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />

                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold text-[#6D214F]">
                      Candidate Photo <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10px] text-[#777777]">Max: 5 MB</span>
                  </div>

                  {!photo ? (
                    <div
                      onClick={() => photoInputRef.current?.click()}
                      onDrop={(e) => {
                        e.preventDefault();
                        setPhotoDragging(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handlePhotoSelect(e.dataTransfer.files[0]);
                        }
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setPhotoDragging(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setPhotoDragging(false);
                      }}
                      className={`border-2 border-dashed rounded-xl p-2.5 text-center cursor-pointer transition-all flex items-center justify-center gap-2 ${
                        photoDragging
                          ? 'border-[#8B1E5C] bg-[#8B1E5C]/5'
                          : errors.photo
                          ? 'border-red-400 bg-red-50/40'
                          : 'border-[#8B1E5C]/30 bg-[#FAF8FB] hover:border-[#8B1E5C] hover:bg-white'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-white text-[#8B1E5C] border border-[#8B1E5C]/20 flex items-center justify-center shadow-xs flex-shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-[11px] font-bold text-[#6D214F]">Upload Photo</p>
                        <p className="text-[9px] text-[#777777]">JPG, PNG (Passport size)</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {photoPreview ? (
                          <img
                            src={photoPreview}
                            alt="Candidate"
                            className="w-8 h-8 rounded-lg object-cover border border-[#8B1E5C]/30 shadow-xs flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-white border border-[#8B1E5C]/20 flex items-center justify-center text-[#8B1E5C] flex-shrink-0">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold text-[#222222] truncate">{photo.name}</p>
                          <span className="text-[9px] font-bold text-green-700">Attached</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => photoInputRef.current?.click()}
                          className="text-[10px] text-[#8B1E5C] font-bold hover:underline px-1"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPhoto(null);
                            if (photoInputRef.current) photoInputRef.current.value = '';
                          }}
                          className="p-1 rounded text-red-500 hover:bg-red-50"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}

                  {errors.photo && (
                    <div className="flex items-center gap-1 text-[10px] text-red-600 font-medium mt-0.5">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.photo}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Exact Fields Grid (1 to 26) - Compact Spacing & Input Heights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
                
                {/* 1. Name of the Candidate */}
                <div id="fullName" className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    1. Name of the Candidate <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border text-xs focus:outline-none transition-all ${
                        errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#8B1E5C]/25 focus:border-[#8B1E5C]'
                      }`}
                    />
                  </div>
                  {errors.fullName && <span className="text-[11px] text-red-600">{errors.fullName}</span>}
                </div>

                {/* 2. Father’s Name / Husband’s Name */}
                <div id="fatherOrHusbandName" className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    2. Father’s Name / Husband’s Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Sharma"
                      value={formData.fatherOrHusbandName}
                      onChange={(e) => handleInputChange('fatherOrHusbandName', e.target.value)}
                      className={`w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border text-xs focus:outline-none transition-all ${
                        errors.fatherOrHusbandName ? 'border-red-500 bg-red-50/20' : 'border-[#8B1E5C]/25 focus:border-[#8B1E5C]'
                      }`}
                    />
                  </div>
                  {errors.fatherOrHusbandName && <span className="text-[11px] text-red-600">{errors.fatherOrHusbandName}</span>}
                </div>

                {/* 3. Date of Birth */}
                <div id="dob" className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    3. Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      className={`w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border text-xs focus:outline-none transition-all ${
                        errors.dob ? 'border-red-500 bg-red-50/20' : 'border-[#8B1E5C]/25 focus:border-[#8B1E5C]'
                      }`}
                    />
                  </div>
                  {errors.dob && <span className="text-[11px] text-red-600">{errors.dob}</span>}
                </div>

                {/* 4. Qualification */}
                <div id="qualification" className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    4. Qualification <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. MBA / B.Tech / B.Com / Post Graduate"
                      value={formData.qualification}
                      onChange={(e) => handleInputChange('qualification', e.target.value)}
                      className={`w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border text-xs focus:outline-none transition-all ${
                        errors.qualification ? 'border-red-500 bg-red-50/20' : 'border-[#8B1E5C]/25 focus:border-[#8B1E5C]'
                      }`}
                    />
                  </div>
                  {errors.qualification && <span className="text-[11px] text-red-600">{errors.qualification}</span>}
                </div>

                {/* 5. Specialization */}
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    5. Specialization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Finance / Marketing / HR / IT"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

                {/* 6. Home Address (PERMANENT) */}
                <div id="permanentAddress" className="flex flex-col gap-1 md:col-span-2">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    6. Home Address (PERMANENT) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter complete permanent residential address with city, state and PIN code"
                    value={formData.permanentAddress}
                    onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
                    className={`w-full p-2.5 rounded-xl bg-white border text-xs focus:outline-none transition-all ${
                      errors.permanentAddress ? 'border-red-500 bg-red-50/20' : 'border-[#8B1E5C]/25 focus:border-[#8B1E5C]'
                    }`}
                  />
                  {errors.permanentAddress && <span className="text-[11px] text-red-600">{errors.permanentAddress}</span>}
                </div>

                {/* 7. Email ID */}
                <div id="email" className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    7. Email ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="candidate@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border text-xs focus:outline-none transition-all ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-[#8B1E5C]/25 focus:border-[#8B1E5C]'
                      }`}
                    />
                  </div>
                  {errors.email && <span className="text-[11px] text-red-600">{errors.email}</span>}
                </div>

                {/* 8. Job Applied For - A */}
                <div id="jobAppliedForA" className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    8. Job Applied For - A <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Branch Manager / Relationship Officer"
                      value={formData.jobAppliedForA}
                      onChange={(e) => handleInputChange('jobAppliedForA', e.target.value)}
                      className={`w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border text-xs focus:outline-none transition-all ${
                        errors.jobAppliedForA ? 'border-red-500 bg-red-50/20' : 'border-[#8B1E5C]/25 focus:border-[#8B1E5C]'
                      }`}
                    />
                  </div>
                  {errors.jobAppliedForA && <span className="text-[11px] text-red-600">{errors.jobAppliedForA}</span>}
                </div>

                {/* 9. Job Applied For - B */}
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    9. Job Applied For - B
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Credit Manager / Assistant Manager"
                    value={formData.jobAppliedForB}
                    onChange={(e) => handleInputChange('jobAppliedForB', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

                {/* 10. Current Location */}
                <div id="currentLocation" className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    10. Current Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Indore / Bhopal / Mumbai"
                      value={formData.currentLocation}
                      onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                      className={`w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border text-xs focus:outline-none transition-all ${
                        errors.currentLocation ? 'border-red-500 bg-red-50/20' : 'border-[#8B1E5C]/25 focus:border-[#8B1E5C]'
                      }`}
                    />
                  </div>
                  {errors.currentLocation && <span className="text-[11px] text-red-600">{errors.currentLocation}</span>}
                </div>

                {/* 11. Location Preferences - A */}
                <div id="locationPreferenceA" className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    11. Location Preferences - A <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Indore / Madhya Pradesh"
                      value={formData.locationPreferenceA}
                      onChange={(e) => handleInputChange('locationPreferenceA', e.target.value)}
                      className={`w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border text-xs focus:outline-none transition-all ${
                        errors.locationPreferenceA ? 'border-red-500 bg-red-50/20' : 'border-[#8B1E5C]/25 focus:border-[#8B1E5C]'
                      }`}
                    />
                  </div>
                  {errors.locationPreferenceA && <span className="text-[11px] text-red-600">{errors.locationPreferenceA}</span>}
                </div>

                {/* 12. Location Preferences - B */}
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    12. Location Preferences - B
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ujjain / Dewas / Pan India"
                    value={formData.locationPreferenceB}
                    onChange={(e) => handleInputChange('locationPreferenceB', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

                {/* 13. Current CTC */}
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    13. Current CTC
                  </label>
                  <div className="relative">
                    <DollarSign className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. 5.5 LPA"
                      value={formData.currentCtc}
                      onChange={(e) => handleInputChange('currentCtc', e.target.value)}
                      className="w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                    />
                  </div>
                </div>

                {/* 14. Expected Salary */}
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    14. Expected Salary
                  </label>
                  <div className="relative">
                    <DollarSign className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. 7.5 LPA"
                      value={formData.expectedSalary}
                      onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                      className="w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                    />
                  </div>
                </div>

                {/* 15. Notice Period */}
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    15. Notice Period
                  </label>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Immediate / 15 Days / 30 Days"
                      value={formData.noticePeriod}
                      onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
                      className="w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                    />
                  </div>
                </div>

                {/* 16. Current Bank/NBFC */}
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    16. Current Bank/NBFC
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. HDFC Bank, ICICI Bank, Axis Bank"
                      value={formData.currentBankOrNbfc}
                      onChange={(e) => handleInputChange('currentBankOrNbfc', e.target.value)}
                      className="w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                    />
                  </div>
                </div>

                {/* 17. Current Vertical */}
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    17. Current Vertical
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Retail Assets / CASA / Gold Loan / LAP"
                    value={formData.currentVertical}
                    onChange={(e) => handleInputChange('currentVertical', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

                {/* 18. Father’s / Husband’s Occupation */}
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    18. Father’s / Husband’s Occupation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Business / Government / Private Sector"
                    value={formData.fatherOrHusbandOccupation}
                    onChange={(e) => handleInputChange('fatherOrHusbandOccupation', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

                {/* 19. Mother’s Occupation */}
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    19. Mother’s Occupation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Homemaker / Teacher / Business"
                    value={formData.motherOccupation}
                    onChange={(e) => handleInputChange('motherOccupation', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

                {/* 20. Siblings */}
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    20. Siblings
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Brother, 1 Sister / None"
                    value={formData.siblings}
                    onChange={(e) => handleInputChange('siblings', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

                {/* 21. Siblings Occupation */}
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    21. Siblings Occupation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer / Student"
                    value={formData.siblingsOccupation}
                    onChange={(e) => handleInputChange('siblingsOccupation', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

                {/* 22. Mobile No. */}
                <div id="mobileNumber" className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    22. Mobile No. <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      className={`w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border text-xs focus:outline-none transition-all ${
                        errors.mobileNumber ? 'border-red-500 bg-red-50/20' : 'border-[#8B1E5C]/25 focus:border-[#8B1E5C]'
                      }`}
                    />
                  </div>
                  {errors.mobileNumber && <span className="text-[11px] text-red-600">{errors.mobileNumber}</span>}
                </div>

                {/* 23. Alternate No. */}
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    23. Alternate No.
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="Alternate contact number"
                      value={formData.alternateNumber}
                      onChange={(e) => handleInputChange('alternateNumber', e.target.value)}
                      className="w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                    />
                  </div>
                </div>

                {/* 24. Father’s No. */}
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    24. Father’s No.
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="Father's contact number"
                      value={formData.fatherNumber}
                      onChange={(e) => handleInputChange('fatherNumber', e.target.value)}
                      className="w-full pl-8.5 pr-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                    />
                  </div>
                </div>

                {/* 25. Documents Submitted (Upload Multiple) */}
                <div id="documents" className="flex flex-col gap-1 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold text-[#6D214F]">
                      25. Documents Submitted <span className="text-[10px] font-normal text-[#777777]">(Optional - Multiple files: PDF, JPG, PNG, DOC up to 10 MB)</span>
                    </label>
                    <span className="text-[10px] text-[#777777]">Max: 10 MB/file</span>
                  </div>

                  <input
                    ref={docInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleDocsSelect(e.target.files);
                      }
                    }}
                    className="hidden"
                  />

                  <div
                    onClick={() => docInputRef.current?.click()}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDocDragging(false);
                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        handleDocsSelect(e.dataTransfer.files);
                      }
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDocDragging(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setDocDragging(false);
                    }}
                    className={`border-2 border-dashed rounded-xl p-3.5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
                      docDragging
                        ? 'border-[#8B1E5C] bg-[#8B1E5C]/5'
                        : errors.documents
                        ? 'border-red-400 bg-red-50/30'
                        : 'border-[#8B1E5C]/30 bg-[#FAF8FB] hover:border-[#8B1E5C] hover:bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white text-[#8B1E5C] border border-[#8B1E5C]/20 flex items-center justify-center shadow-xs">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#6D214F]">
                        Click or drag & drop supporting candidate documents
                      </p>
                      <p className="text-[10px] text-[#777777]">
                        Attach marksheets, degrees, ID proofs, salary slips or experience certificates
                      </p>
                    </div>
                  </div>

                  {/* Document List */}
                  {documents.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1.5">
                      {documents.map((doc, idx) => (
                        <div
                          key={`${doc.name}-${idx}`}
                          className="p-2 rounded-lg bg-[#FAF8FB] border border-[#8B1E5C]/15 flex items-center justify-between gap-2 shadow-xs"
                        >
                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            <Paperclip className="w-3 h-3 text-[#8B1E5C] flex-shrink-0" />
                            <span className="text-[11px] font-bold text-[#222222] truncate">{doc.name}</span>
                            <span className="text-[9px] text-[#777777] flex-shrink-0">
                              ({(doc.size / 1024).toFixed(0)} KB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDocument(idx)}
                            className="p-0.5 text-red-500 hover:bg-red-50 rounded flex-shrink-0"
                            aria-label={`Remove ${doc.name}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.documents && (
                    <span className="text-[11px] text-red-600">{errors.documents}</span>
                  )}
                </div>

                {/* 26. Reference Name and No. */}
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="block text-[11px] font-bold text-[#6D214F]">
                    26. Reference Name and No.
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Amit Verma (+91 98765 00000) - Former Branch Manager / Colleague"
                    value={formData.referenceNameAndNo}
                    onChange={(e) => handleInputChange('referenceNameAndNo', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#8B1E5C]/25 text-xs focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

              </div>

              {/* CANDIDATE'S DECLARATION SECTION */}
              <div className="pt-4 border-t-2 border-[#8B1E5C]/15 space-y-4">
                
                <div className="flex items-center gap-2 text-[#6D214F]">
                  <ShieldCheck className="w-4 h-4 text-[#8B1E5C]" />
                  <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#6D214F]">
                    CANDIDATE'S DECLARATION
                  </h4>
                </div>

                {/* Declaration Content */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-[11px] sm:text-xs text-[#333333] leading-relaxed italic">
                  "I hereby declare that all the information provided me is true and correct to the best of knowledge and belief. In case any information is found to be false or incorrect organization shall not be held liable or responsible for the same. I further confirm that I have read, understood, and agreed to all the terms and conditions. In the event of receiving an offer letter or CTC breakup table I shall be liable to make a payment equivalent to 15 days’ salary of gross CTC on the same day."
                </div>

                {/* Signatures Area: Authorized Signatory & Candidate Signature */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
                  
                  {/* Authorized Signatory */}
                  <div className="p-3 rounded-xl bg-white border-2 border-dashed border-[#8B1E5C]/30 flex flex-col justify-between min-h-[90px]">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#6D214F]">
                      <span className="uppercase tracking-wider">Authorized Signatory</span>
                      <span className="text-[9px] text-[#8B1E5C] bg-[#FAF8FB] px-1.5 py-0.5 rounded border border-[#8B1E5C]/15 font-semibold">
                        JMS Group Office Seal
                      </span>
                    </div>
                    <div className="pt-3 border-b border-[#8B1E5C]/20 flex items-center justify-center text-[10px] text-[#777777] italic">
                      [ Verified JMS Group Authorized Representative ]
                    </div>
                  </div>

                  {/* Candidate Signature */}
                  <div className="p-3 rounded-xl bg-white border-2 border-dashed border-[#8B1E5C]/30 flex flex-col justify-between min-h-[90px]">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#6D214F]">
                      <span className="uppercase tracking-wider">Candidate Signature</span>
                      <PenTool className="w-3 h-3 text-[#8B1E5C]" />
                    </div>
                    <input
                      type="text"
                      placeholder="Type Full Name as Digital Signature"
                      value={formData.candidateSignatureName}
                      onChange={(e) => handleInputChange('candidateSignatureName', e.target.value)}
                      className="w-full pt-3 pb-0.5 border-b border-[#8B1E5C]/40 bg-transparent text-xs font-serif italic focus:outline-none placeholder:text-[#777777] placeholder:font-sans placeholder:not-italic"
                    />
                  </div>

                </div>

                {/* Mandatory Terms Acceptance Checkbox */}
                <div id="termsAccepted" className="pt-1">
                  <div
                    onClick={() => handleInputChange('termsAccepted', !formData.termsAccepted)}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2.5 ${
                      formData.termsAccepted
                        ? 'bg-white border-[#8B1E5C] shadow-xs'
                        : errors.termsAccepted
                        ? 'bg-red-50/50 border-red-400'
                        : 'bg-[#FAF8FB] border-[#8B1E5C]/20 hover:border-[#8B1E5C]/50'
                    }`}
                  >
                    <div className="flex-shrink-0 text-[#8B1E5C]">
                      {formData.termsAccepted ? (
                        <CheckSquare className="w-4.5 h-4.5 text-[#8B1E5C]" />
                      ) : (
                        <Square className={`w-4.5 h-4.5 ${errors.termsAccepted ? 'text-red-500' : 'text-[#8B1E5C]/60'}`} />
                      )}
                    </div>
                    <label className="text-xs font-extrabold text-[#6D214F] cursor-pointer select-none">
                      I have read, understood, and agreed to all the Terms & Conditions. <span className="text-red-500 font-black">*</span>
                    </label>
                  </div>

                  {errors.termsAccepted && (
                    <div className="flex items-center gap-1.5 text-[11px] text-red-600 font-semibold mt-1 px-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0 text-red-500" />
                      <span>{errors.termsAccepted}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Submit Button Action Area */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#8B1E5C]/15">
                <p className="text-[11px] text-[#777777] text-center sm:text-left">
                  By clicking Submit Application, you agree to JMS Group's placement guidelines and verified candidate norms.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto min-w-[200px] px-6 py-2.5 rounded-full text-center text-xs font-bold text-white bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed border border-white/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="w-3.5 h-3.5 text-white" />
                    </>
                  )}
                </button>
              </div>

            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default TermsPage;
