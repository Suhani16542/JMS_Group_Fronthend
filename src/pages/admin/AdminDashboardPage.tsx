import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import {
  getAdminJobsApi,
  createJobApi,
  updateJobApi,
  toggleJobStatusApi,
  deleteJobApi,
  JobOpening,
  JobStats,
  CreateJobPayload,
} from '@/services/jobService';
import {
  Briefcase,
  CheckCircle2,
  XCircle,
  Sparkles,
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  MapPin,
  Clock,
  GraduationCap,
  Users,
  DollarSign,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  LogOut,
  Lock,
  Mail,
  User,
  LayoutDashboard,
  ListOrdered,
  FilePlus,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Check,
  X,
  Loader2,
  RefreshCw,
} from 'lucide-react';
const INITIAL_FORM_STATE = {
  jobTitle: '',
  sector: 'IT',
  department: '',
  location: '',
  experience: '',
  qualification: '',
  salary: '',
  employmentType: 'Full Time',
  vacancies: 1,
  jobDescription: '',
  responsibilities: '',
  requiredSkills: '',
  postedDate: new Date().toISOString().split('T')[0],
  closingDate: '',
  status: 'Active' as 'Active' | 'Closed',
  isFeatured: false,
};

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAdminAuth();

  // Active Tab: 'overview' | 'manage' | 'create'
  const [activeTab, setActiveTab] = useState<'overview' | 'manage' | 'create'>('overview');

  // Job Data State from Backend
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [stats, setStats] = useState<JobStats | null>(null);
  const [isLoadingJobs, setIsLoadingJobs] = useState<boolean>(true);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [togglingJobId, setTogglingJobId] = useState<string | null>(null);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  // Form State for Create / Edit
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  // Filter & Search State for Manage Table
  const [tableSearch, setTableSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Closed'>('All');
  const [sectorFilter, setSectorFilter] = useState<string>('All');

  // Delete Confirmation Modal
  const [deleteModalJob, setDeleteModalJob] = useState<JobOpening | null>(null);

  // ==========================================
  // LOAD JOBS FROM BACKEND (GET /api/jobs/admin/all)
  // ==========================================
  const loadAdminJobs = useCallback(async () => {
    try {
      setIsLoadingJobs(true);
      setJobsError(null);
      const result = await getAdminJobsApi();
      setJobs(result.jobs);
      setStats(result.stats);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setJobsError(err.message || 'Failed to load jobs from server');
      } else {
        setJobsError('Failed to load jobs from server');
      }
    } finally {
      setIsLoadingJobs(false);
    }
  }, []);

  useEffect(() => {
    loadAdminJobs();
  }, [loadAdminJobs]);

  // ==========================================
  // METRICS COMPUTATION
  // ==========================================
  const metrics = useMemo(() => {
    if (stats) return stats;
    const total = jobs.length;
    const active = jobs.filter((j) => j.status === 'Active').length;
    const closed = jobs.filter((j) => j.status === 'Closed').length;
    const featured = jobs.filter((j) => Boolean(j.isFeatured)).length;
    return { total, active, closed, featured };
  }, [jobs, stats]);

  // ==========================================
  // FILTERED JOBS TABLE DATA
  // ==========================================
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        tableSearch.trim() === '' ||
        job.jobTitle.toLowerCase().includes(tableSearch.toLowerCase()) ||
        job.sector.toLowerCase().includes(tableSearch.toLowerCase()) ||
        job.location.toLowerCase().includes(tableSearch.toLowerCase()) ||
        (job.department && job.department.toLowerCase().includes(tableSearch.toLowerCase()));

      const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
      const matchesSector = sectorFilter === 'All' || job.sector === sectorFilter;

      return matchesSearch && matchesStatus && matchesSector;
    });
  }, [jobs, tableSearch, statusFilter, sectorFilter]);

  // ==========================================
  // AUTHENTICATION HANDLERS
  // ==========================================
  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  // ==========================================
  // JOB ACTIONS
  // ==========================================
  const handleToggleStatus = async (jobId: string, currentStatus: string) => {
    const newStatus: 'Active' | 'Closed' = currentStatus === 'Active' ? 'Closed' : 'Active';
    try {
      setTogglingJobId(jobId);
      await toggleJobStatusApi(jobId, newStatus);
      await loadAdminJobs();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update job status');
    } finally {
      setTogglingJobId(null);
    }
  };

  const handleStartCreate = () => {
    setEditingJobId(null);
    setFormData(INITIAL_FORM_STATE);
    setFormErrors({});
    setFormSuccessMessage(null);
    setActiveTab('create');
  };

  const handleStartEdit = (job: JobOpening) => {
    const targetId = job._id || job.id || '';
    setEditingJobId(targetId);
    setFormData({
      jobTitle: job.jobTitle,
      sector: job.sector,
      department: job.department || '',
      location: job.location,
      experience: job.experience,
      qualification: job.qualification,
      salary: job.salary || '',
      employmentType: job.employmentType || 'Full Time',
      vacancies: job.vacancies || 1,
      jobDescription: job.jobDescription,
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : '',
      requiredSkills: Array.isArray(job.requiredSkills) ? job.requiredSkills.join(', ') : '',
      postedDate: job.postedDate ? job.postedDate.split('T')[0] : new Date().toISOString().split('T')[0],
      closingDate: job.closingDate ? job.closingDate.split('T')[0] : '',
      status: (job.status === 'Closed' ? 'Closed' : 'Active') as 'Active' | 'Closed',
      isFeatured: Boolean(job.isFeatured),
    });
    setFormErrors({});
    setFormSuccessMessage(null);
    setActiveTab('create');
  };

  const validateJobForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!formData.jobTitle.trim()) errors.jobTitle = 'Job Title is required';
    if (!formData.sector.trim()) errors.sector = 'Sector is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.experience.trim()) errors.experience = 'Experience requirement is required';
    if (!formData.jobDescription.trim()) errors.jobDescription = 'Job Description is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateJobForm()) return;

    const skillsArray = formData.requiredSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const respArray = formData.responsibilities
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const payload: CreateJobPayload = {
      jobTitle: formData.jobTitle.trim(),
      sector: formData.sector.trim(),
      department: formData.department.trim(),
      location: formData.location.trim(),
      experience: formData.experience.trim(),
      qualification: formData.qualification.trim(),
      salary: formData.salary.trim(),
      employmentType: formData.employmentType,
      vacancies: Number(formData.vacancies) || 1,
      jobDescription: formData.jobDescription.trim(),
      responsibilities: respArray,
      requiredSkills: skillsArray,
      postedDate: formData.postedDate || new Date().toISOString().split('T')[0],
      closingDate: formData.closingDate ? formData.closingDate : null,
      status: formData.status,
      isFeatured: formData.isFeatured,
    };

    setIsSaving(true);
    setFormErrors({});
    setFormSuccessMessage(null);

    try {
      if (editingJobId) {
        await updateJobApi(editingJobId, payload);
        setFormSuccessMessage('Job opening updated successfully!');
      } else {
        await createJobApi(payload);
        setFormSuccessMessage('New monthly job opening created successfully!');
      }

      await loadAdminJobs();
      setTimeout(() => {
        setActiveTab('manage');
        setFormSuccessMessage(null);
      }, 1200);
    } catch (err: unknown) {
      setFormErrors({
        api: err instanceof Error ? err.message : 'Failed to save job opening.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteModalJob) return;
    const targetId = deleteModalJob._id || deleteModalJob.id;
    if (!targetId) return;

    setIsDeleting(true);
    try {
      await deleteJobApi(targetId);
      setDeleteModalJob(null);
      await loadAdminJobs();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete job opening');
    } finally {
      setIsDeleting(false);
    }
  };

  // ==========================================
  // MAIN ADMIN DASHBOARD UI
  // ==========================================
  return (
    <div className="w-full min-h-screen bg-[#FAF8FB] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#8B1E5C]/15 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Portal Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] text-white flex items-center justify-center shadow-xs">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-[#6D214F] tracking-tight">JMS Group</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#FAF8FB] text-[#8B1E5C] border border-[#8B1E5C]/20">
                  HR ADMIN
                </span>
              </div>
              <p className="text-[11px] text-[#777777] hidden sm:block">Talent & Monthly Job Openings Dashboard</p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              to="/recent-openings"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FAF8FB] hover:bg-white text-xs font-semibold text-[#8B1E5C] border border-[#8B1E5C]/20 transition-colors shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Recent Openings</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-xs font-bold text-red-700 border border-red-200 transition-colors cursor-pointer"
              title="Log out from Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#8B1E5C]/15 pb-4">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#8B1E5C] text-white shadow-sm'
                  : 'bg-white text-[#6D214F] hover:bg-[#FAF8FB] border border-[#8B1E5C]/20'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('manage')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'manage'
                  ? 'bg-[#8B1E5C] text-white shadow-sm'
                  : 'bg-white text-[#6D214F] hover:bg-[#FAF8FB] border border-[#8B1E5C]/20'
              }`}
            >
              <ListOrdered className="w-4 h-4" />
              <span>Manage Job Openings</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-current font-black">
                {jobs.length}
              </span>
            </button>

            <button
              onClick={handleStartCreate}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'create'
                  ? 'bg-[#8B1E5C] text-white shadow-sm'
                  : 'bg-white text-[#6D214F] hover:bg-[#FAF8FB] border border-[#8B1E5C]/20'
              }`}
            >
              <FilePlus className="w-4 h-4" />
              <span>{editingJobId ? 'Edit Job Opening' : 'Create Job Opening'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => loadAdminJobs()}
              disabled={isLoadingJobs}
              className="p-2 rounded-xl bg-[#FAF8FB] hover:bg-white text-xs font-semibold text-[#8B1E5C] border border-[#8B1E5C]/20 transition-all shadow-xs cursor-pointer disabled:opacity-50"
              title="Refresh job openings from server"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingJobs ? 'animate-spin' : ''}`} />
            </button>

            {activeTab !== 'create' && (
              <button
                onClick={handleStartCreate}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2 border border-white/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Opening</span>
              </button>
            )}
          </div>

        </div>

        {/* ==================================================== */}
        {/* TAB 1: DASHBOARD HOME / OVERVIEW */}
        {/* ==================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {jobsError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{jobsError}</span>
                </div>
                <button
                  onClick={() => loadAdminJobs()}
                  className="px-3 py-1 rounded-lg bg-white border border-red-200 text-red-700 hover:bg-red-50 text-[11px] font-bold cursor-pointer"
                >
                  Retry
                </button>
              </div>
            )}

            {/* 4 KPI Metric Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Total Openings */}
              <div className="bg-white p-5 rounded-2xl border border-[#8B1E5C]/15 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#8B1E5C] tracking-wide">Total Openings</span>
                  <div className="w-9 h-9 rounded-xl bg-[#FAF8FB] text-[#8B1E5C] flex items-center justify-center border border-[#8B1E5C]/20">
                    <Briefcase className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-[#6D214F]">{metrics.total}</div>
                <p className="text-[11px] text-[#777777]">All registered job requisitions</p>
              </div>

              {/* Active Jobs */}
              <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-emerald-700 tracking-wide">Active Openings</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-emerald-700">{metrics.active}</div>
                <p className="text-[11px] text-emerald-600 font-semibold">Live on Public Recent Openings</p>
              </div>

              {/* Closed Jobs */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-gray-600 tracking-wide">Closed Openings</span>
                  <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center border border-gray-200">
                    <XCircle className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-gray-700">{metrics.closed}</div>
                <p className="text-[11px] text-gray-500">Hidden from public candidates</p>
              </div>

              {/* Featured Jobs */}
              <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-amber-700 tracking-wide">Featured Roles</span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-amber-700">{metrics.featured}</div>
                <p className="text-[11px] text-amber-600 font-semibold">Highlighted on careers page</p>
              </div>

            </div>

            {/* Quick Overview Section with Sector Distribution & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Recent Job Openings Summary Table */}
              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#8B1E5C]/15 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#8B1E5C]/10">
                  <div>
                    <h3 className="text-base font-bold text-[#6D214F]">Latest Openings Activity</h3>
                    <p className="text-xs text-[#777777]">Recent monthly job requisitions</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('manage')}
                    className="text-xs font-bold text-[#8B1E5C] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {jobs.slice(0, 4).map((job) => {
                    const jId = job._id || job.id || '';
                    return (
                      <div
                        key={jId}
                        className="p-3.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/10 flex flex-wrap items-center justify-between gap-3 hover:bg-white hover:border-[#8B1E5C]/30 transition-all"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-[#6D214F]">{job.jobTitle}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.2 rounded-md bg-white border border-[#8B1E5C]/20 text-[#8B1E5C]">
                              {job.sector}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[11px] text-[#666666]">
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.experience}</span>
                            <span>•</span>
                            <span>{job.vacancies} Vacancies</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                              job.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-gray-100 text-gray-600 border-gray-200'
                            }`}
                          >
                            {job.status}
                          </span>
                          <button
                            onClick={() => handleStartEdit(job)}
                            className="p-1.5 rounded-lg bg-white border border-[#8B1E5C]/20 text-[#8B1E5C] hover:bg-[#8B1E5C] hover:text-white transition-colors cursor-pointer"
                            title="Edit opening"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Portal Information & Quick Guide */}
              <div className="lg:col-span-4 bg-gradient-to-br from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] text-white p-6 rounded-2xl shadow-md space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shadow-inner">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-white">Monthly Hiring Controls</h3>
                  <p className="text-xs text-white/90 leading-relaxed font-normal">
                    When you create or update active job openings here, they will automatically reflect on the public <strong>Recent Openings</strong> page for candidates.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/20 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-white/90">
                    <span>Public Sector Cards:</span>
                    <span className="font-bold text-white">6 Permanent</span>
                  </div>
                  <div className="flex items-center justify-between text-white/90">
                    <span>Active Monthly Jobs:</span>
                    <span className="font-bold text-yellow-300">{metrics.active} Live</span>
                  </div>
                </div>

                <button
                  onClick={handleStartCreate}
                  className="w-full py-2.5 rounded-xl bg-white text-[#6D214F] font-bold text-xs hover:bg-[#FAF8FB] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-[#8B1E5C]" />
                  <span>Create New Opening</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: MANAGE JOB OPENINGS (TABLE & LIST VIEW) */}
        {/* ==================================================== */}
        {activeTab === 'manage' && (
          <div className="bg-white rounded-2xl border border-[#8B1E5C]/15 shadow-sm p-5 sm:p-7 space-y-6">
            
            {/* Header & Table Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#8B1E5C]/10">
              <div>
                <h3 className="text-xl font-black text-[#6D214F]">Manage Job Openings</h3>
                <p className="text-xs text-[#777777]">
                  View, edit, close, or delete monthly job requisitions.
                </p>
              </div>

              {/* Table Search & Filter Bar */}
              <div className="flex flex-wrap items-center gap-2.5">
                
                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#8B1E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                    className="pl-8.5 pr-3 py-1.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs text-[#6D214F] focus:outline-none focus:border-[#8B1E5C] w-44 sm:w-56"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e: any) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs font-semibold text-[#6D214F] focus:outline-none focus:border-[#8B1E5C] cursor-pointer"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active Only</option>
                  <option value="Closed">Closed Only</option>
                </select>

                {/* Sector Filter */}
                <select
                  value={sectorFilter}
                  onChange={(e) => setSectorFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs font-semibold text-[#6D214F] focus:outline-none focus:border-[#8B1E5C] cursor-pointer"
                >
                  <option value="All">All Sectors</option>
                  <option value="IT">IT</option>
                  <option value="Banking">Banking</option>
                  <option value="Retail">Retail</option>
                  <option value="BPO">BPO</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Healthcare">Healthcare</option>
                </select>

              </div>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#8B1E5C]/15 bg-[#FAF8FB] text-[11px] font-bold text-[#8B1E5C] uppercase tracking-wider">
                    <th className="py-3 px-4">Job Title & Sector</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Experience</th>
                    <th className="py-3 px-4">Type / Vacancies</th>
                    <th className="py-3 px-4">Posted Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8B1E5C]/10 text-xs">
                  {filteredJobs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-[#777777] text-xs">
                        {isLoadingJobs ? (
                          <div className="flex items-center justify-center gap-2 py-4">
                            <Loader2 className="w-5 h-5 text-[#8B1E5C] animate-spin" />
                            <span>Loading job openings from server...</span>
                          </div>
                        ) : (
                          <span>No job openings found matching your criteria.</span>
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredJobs.map((job) => {
                      const jId = job._id || job.id || '';
                      const isToggling = togglingJobId === jId;

                      return (
                        <tr key={jId} className="hover:bg-[#FAF8FB]/60 transition-colors">
                          
                          {/* Title & Sector */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#6D214F] flex items-center gap-1.5">
                              <span>{job.jobTitle}</span>
                              {job.isFeatured && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-bold">
                                  Featured
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#8B1E5C] font-semibold flex items-center gap-1">
                              <span>{job.sector} Sector</span>
                              {job.department && <span className="text-[#888888]">• {job.department}</span>}
                            </div>
                          </td>

                          {/* Location */}
                          <td className="py-3.5 px-4 text-[#555555]">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#8B1E5C]" />
                              <span>{job.location}</span>
                            </div>
                          </td>

                          {/* Experience */}
                          <td className="py-3.5 px-4 text-[#555555]">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#8B1E5C]" />
                              <span>{job.experience}</span>
                            </div>
                          </td>

                          {/* Type & Vacancies */}
                          <td className="py-3.5 px-4 text-[#555555]">
                            <div>{job.employmentType}</div>
                            <div className="text-[11px] text-[#888888]">{job.vacancies} Vacancies</div>
                          </td>

                          {/* Posted Date */}
                          <td className="py-3.5 px-4 text-[#555555]">
                            <div>{job.postedDate ? job.postedDate.split('T')[0] : 'N/A'}</div>
                          </td>

                          {/* Status Toggle Button */}
                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => handleToggleStatus(jId, job.status)}
                              disabled={isToggling}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-60 ${
                                job.status === 'Active'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                              }`}
                              title={`Click to set as ${job.status === 'Active' ? 'Closed' : 'Active'}`}
                            >
                              {isToggling ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    job.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
                                  }`}
                                />
                              )}
                              <span>{job.status}</span>
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => handleStartEdit(job)}
                                className="p-1.5 rounded-lg bg-[#FAF8FB] border border-[#8B1E5C]/20 text-[#8B1E5C] hover:bg-[#8B1E5C] hover:text-white transition-colors cursor-pointer"
                                title="Edit Job Opening"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => setDeleteModalJob(job)}
                                className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                                title="Delete Job Opening"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: CREATE / EDIT JOB OPENING FORM */}
        {/* ==================================================== */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-2xl border border-[#8B1E5C]/15 shadow-sm p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#8B1E5C]/15">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#FAF8FB] text-[#8B1E5C] border border-[#8B1E5C]/20">
                  {editingJobId ? 'EDIT OPENING' : 'NEW REQUISITION'}
                </span>
                <h3 className="text-xl font-black text-[#6D214F] mt-1">
                  {editingJobId ? 'Edit Job Opening' : 'Create New Job Opening'}
                </h3>
                <p className="text-xs text-[#777777]">
                  Fields marked with <span className="text-red-500 font-bold">*</span> are required.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('manage')}
                className="px-4 py-2 rounded-xl bg-[#FAF8FB] text-xs font-semibold text-[#6D214F] hover:bg-gray-100 border border-[#8B1E5C]/20 transition-colors cursor-pointer"
              >
                Back to List
              </button>
            </div>

            {/* Success Alert */}
            {formSuccessMessage && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{formSuccessMessage}</span>
              </div>
            )}

            {/* API Error Alert */}
            {formErrors.api && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{formErrors.api}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSaveJob} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                
                {/* 1. Job Title */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Frontend Developer"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FB] border text-xs sm:text-sm text-[#6D214F] focus:outline-none ${
                      formErrors.jobTitle ? 'border-red-500 bg-red-50/20' : 'border-[#8B1E5C]/20 focus:border-[#8B1E5C]'
                    }`}
                  />
                  {formErrors.jobTitle && <span className="text-[11px] text-red-600">{formErrors.jobTitle}</span>}
                </div>

                {/* 2. Sector */}
                <div>
                  <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                    Sector / Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] focus:outline-none focus:border-[#8B1E5C] cursor-pointer"
                  >
                    <option value="IT">IT Sector</option>
                    <option value="Banking">Banking Sector</option>
                    <option value="Retail">Retail Sector</option>
                    <option value="BPO">BPO / Customer Support</option>
                    <option value="Manufacturing">Manufacturing Sector</option>
                    <option value="Healthcare">Healthcare Sector</option>
                    <option value="Corporate">Corporate / HR</option>
                  </select>
                </div>

                {/* 3. Department */}
                <div>
                  <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Department</label>
                  <input
                    type="text"
                    placeholder="e.g. Engineering & IT"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

                {/* 4. Location */}
                <div>
                  <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Indore, MP / Bhopal / Remote"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FB] border text-xs sm:text-sm text-[#6D214F] focus:outline-none ${
                      formErrors.location ? 'border-red-500 bg-red-50/20' : 'border-[#8B1E5C]/20 focus:border-[#8B1E5C]'
                    }`}
                  />
                  {formErrors.location && <span className="text-[11px] text-red-600">{formErrors.location}</span>}
                </div>

                {/* 5. Experience */}
                <div>
                  <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                    Experience Requirement <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2-4 Years / Fresher"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FB] border text-xs sm:text-sm text-[#6D214F] focus:outline-none ${
                      formErrors.experience ? 'border-red-500 bg-red-50/20' : 'border-[#8B1E5C]/20 focus:border-[#8B1E5C]'
                    }`}
                  />
                  {formErrors.experience && <span className="text-[11px] text-red-600">{formErrors.experience}</span>}
                </div>

                {/* 6. Qualification */}
                <div>
                  <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Qualification</label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech / MCA / MBA / Graduate"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

                {/* 7. Salary / CTC */}
                <div>
                  <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Salary / CTC Band</label>
                  <input
                    type="text"
                    placeholder="e.g. 4.5 - 7.0 LPA / Best in Industry"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

                {/* 8. Employment Type */}
                <div>
                  <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Employment Type</label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] focus:outline-none focus:border-[#8B1E5C] cursor-pointer"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                {/* 9. Vacancies */}
                <div>
                  <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Vacancies</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.vacancies}
                    onChange={(e) => setFormData({ ...formData, vacancies: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

                {/* 10. Posted Date */}
                <div>
                  <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Posted Date</label>
                  <input
                    type="date"
                    value={formData.postedDate}
                    onChange={(e) => setFormData({ ...formData, postedDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

                {/* 11. Closing Date */}
                <div>
                  <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Closing Date (Optional)</label>
                  <input
                    type="date"
                    value={formData.closingDate}
                    onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] focus:outline-none focus:border-[#8B1E5C]"
                  />
                </div>

                {/* 12. Status & Featured */}
                <div className="flex items-center gap-6 pt-6">
                  <div>
                    <label className="block text-xs font-bold text-[#6D214F] mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e: any) => setFormData({ ...formData, status: e.target.value })}
                      className="px-3 py-1.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs font-bold text-[#6D214F] focus:outline-none cursor-pointer"
                    >
                      <option value="Active">Active (Public)</option>
                      <option value="Closed">Closed (Hidden)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-4">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 accent-[#8B1E5C] cursor-pointer"
                    />
                    <label htmlFor="isFeatured" className="text-xs font-bold text-[#6D214F] cursor-pointer">
                      Featured Role
                    </label>
                  </div>
                </div>

              </div>

              {/* 13. Job Description */}
              <div>
                <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide an overview of the role, expected background, and project details..."
                  value={formData.jobDescription}
                  onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                  className={`w-full p-3 rounded-xl bg-[#FAF8FB] border text-xs sm:text-sm text-[#6D214F] focus:outline-none ${
                    formErrors.jobDescription ? 'border-red-500 bg-red-50/20' : 'border-[#8B1E5C]/20 focus:border-[#8B1E5C]'
                  }`}
                />
                {formErrors.jobDescription && <span className="text-[11px] text-red-600">{formErrors.jobDescription}</span>}
              </div>

              {/* 14. Key Responsibilities */}
              <div>
                <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                  Key Responsibilities (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter each responsibility on a new line..."
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] focus:outline-none focus:border-[#8B1E5C]"
                />
              </div>

              {/* 15. Required Skills */}
              <div>
                <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                  Required Skills (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, MongoDB, TypeScript, REST APIs"
                  value={formData.requiredSkills}
                  onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#6D214F] focus:outline-none focus:border-[#8B1E5C]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#8B1E5C]/15">
                <button
                  type="button"
                  onClick={() => setActiveTab('manage')}
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#FAF8FB] text-[#6D214F] hover:bg-gray-200 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer border border-white/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>
                    {editingJobId
                      ? (isSaving ? 'Updating...' : 'Save & Update Opening')
                      : (isSaving ? 'Creating...' : 'Create Job Opening')}
                  </span>
                </button>
              </div>

            </form>

          </div>
        )}

      </div>

      {/* ==================================================== */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ==================================================== */}
      <AnimatePresence>
        {deleteModalJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 border border-red-200 shadow-2xl space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1.5">
                <h3 className="text-lg font-black text-[#6D214F]">Delete Job Opening?</h3>
                <p className="text-xs text-[#555555]">
                  Are you sure you want to delete <strong className="text-[#6D214F]">"{deleteModalJob.jobTitle}"</strong>? This opening will be removed from your dashboard.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setDeleteModalJob(null)}
                  disabled={isDeleting}
                  className="px-5 py-2 rounded-xl bg-[#FAF8FB] text-[#6D214F] hover:bg-gray-200 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-md transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboardPage;
