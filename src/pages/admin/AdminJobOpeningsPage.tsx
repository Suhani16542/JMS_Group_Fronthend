import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
  MapPin,
  Clock,
  GraduationCap,
  Users,
  DollarSign,
  Calendar,
  Layers,
  AlertTriangle,
  RefreshCw,
  X,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Check,
  Building,
} from 'lucide-react';
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

const SECTORS_LIST = [
  'Banking',
  'NBFC',
  'Finance & Accounts',
  'IT',
  'FMCG',
  'Healthcare',
  'Human Resources',
  'Sales & Marketing',
  'Engineering',
  'Operations',
];

export const AdminJobOpeningsPage: React.FC = () => {
  // Job Data State
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [stats, setStats] = useState<JobStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // View Mode: 'list' | 'create' | 'edit'
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list');
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  // Details Modal
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  // Delete Confirmation Modal
  const [deleteModalJob, setDeleteModalJob] = useState<JobOpening | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Status toggle ID
  const [togglingJobId, setTogglingJobId] = useState<string | null>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Closed'>('All');
  const [sectorFilter, setSectorFilter] = useState<string>('All');

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const loadJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getAdminJobsApi();
      setJobs(result.jobs);
      setStats(result.stats);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to load job openings');
      } else {
        setError('Failed to load job openings from backend server');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // Filtered jobs list
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.department && job.department.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
      const matchesSector = sectorFilter === 'All' || job.sector === sectorFilter;

      return matchesSearch && matchesStatus && matchesSector;
    });
  }, [jobs, searchTerm, statusFilter, sectorFilter]);

  // Paginated jobs
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredJobs.slice(start, start + pageSize);
  }, [filteredJobs, currentPage]);

  const totalPages = Math.ceil(filteredJobs.length / pageSize) || 1;

  // Toggle status
  const handleToggleStatus = async (jobId: string, currentStatus: string) => {
    const newStatus: 'Active' | 'Closed' = currentStatus === 'Active' ? 'Closed' : 'Active';
    try {
      setTogglingJobId(jobId);
      await toggleJobStatusApi(jobId, newStatus);
      await loadJobs();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update job status');
    } finally {
      setTogglingJobId(null);
    }
  };

  // Start Create Job
  const handleStartCreate = () => {
    setEditingJobId(null);
    setFormData(INITIAL_FORM_STATE);
    setFormErrors({});
    setFormSuccessMessage(null);
    setViewMode('create');
  };

  // Start Edit Job
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
    setViewMode('edit');
  };

  // Validate form
  const validateJobForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!formData.jobTitle.trim()) errors.jobTitle = 'Job Title is required';
    if (!formData.sector.trim()) errors.sector = 'Sector is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.experience.trim()) errors.experience = 'Experience requirement is required';
    if (!formData.qualification.trim()) errors.qualification = 'Qualification is required';
    if (!formData.jobDescription.trim()) errors.jobDescription = 'Job Description is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Job (Create or Update)
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
        setFormSuccessMessage('New job opening created successfully!');
      }

      await loadJobs();
      setTimeout(() => {
        setViewMode('list');
        setFormSuccessMessage(null);
      }, 1000);
    } catch (err: unknown) {
      setFormErrors({
        api: err instanceof Error ? err.message : 'Failed to save job opening.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Job
  const handleConfirmDelete = async () => {
    if (!deleteModalJob) return;
    const targetId = deleteModalJob._id || deleteModalJob.id;
    if (!targetId) return;

    setIsDeleting(true);
    try {
      await deleteJobApi(targetId);
      setDeleteModalJob(null);
      await loadJobs();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete job opening');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (isoString?: string | null) => {
    if (!isoString) return '—';
    try {
      return new Date(isoString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#6D214F] tracking-tight">
              Job Openings Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-black">
              {jobs.length} Total ({stats?.active ?? jobs.filter(j => j.status === 'Active').length} Active)
            </span>
          </div>
          <p className="text-xs text-[#777777] mt-1">
            Create, edit, toggle status, and inspect monthly job requisitions synced with the public Recent Openings page.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            to="/recent-openings"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF8FB] hover:bg-white text-xs font-semibold text-[#8B1E5C] border border-[#8B1E5C]/20 transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Public Openings</span>
          </Link>

          <button
            onClick={() => loadJobs()}
            disabled={isLoading}
            className="p-2 rounded-xl bg-white border border-[#8B1E5C]/20 hover:bg-[#FAF8FB] text-[#8B1E5C] text-xs font-bold transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            title="Refresh jobs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          {viewMode === 'list' ? (
            <button
              onClick={handleStartCreate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Opening</span>
            </button>
          ) : (
            <button
              onClick={() => setViewMode('list')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Openings List</span>
            </button>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => loadJobs()}
            className="px-3 py-1.5 rounded-lg bg-white border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODE 1: CREATE OR EDIT FORM */}
      {/* ==================================================== */}
      {viewMode !== 'list' ? (
        <div className="bg-white rounded-3xl border border-[#8B1E5C]/20 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#8B1E5C]/15">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E5C] block">
                {viewMode === 'edit' ? 'Update Job Requisition' : 'New Monthly Requisition'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#6D214F] mt-1">
                {viewMode === 'edit' ? 'Edit Job Opening' : 'Post New Job Opening'}
              </h2>
            </div>
            <button
              onClick={() => setViewMode('list')}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {formSuccessMessage && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{formSuccessMessage}</span>
            </div>
          )}

          {formErrors.api && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>{formErrors.api}</span>
            </div>
          )}

          <form onSubmit={handleSaveJob} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Job Title */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Branch Manager - Retail Lending"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8B1E5C]/25 focus:border-[#8B1E5C] focus:ring-2 focus:ring-[#8B1E5C]/10 text-xs outline-hidden"
                />
                {formErrors.jobTitle && <p className="text-red-500 text-[11px] mt-1">{formErrors.jobTitle}</p>}
              </div>

              {/* Sector */}
              <div>
                <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                  Sector <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8B1E5C]/25 focus:border-[#8B1E5C] text-xs outline-hidden cursor-pointer"
                >
                  {SECTORS_LIST.map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
                {formErrors.sector && <p className="text-red-500 text-[11px] mt-1">{formErrors.sector}</p>}
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Department</label>
                <input
                  type="text"
                  placeholder="e.g. Retail Assets / Corporate Finance"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8B1E5C]/25 focus:border-[#8B1E5C] text-xs outline-hidden"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai, Maharashtra / Pan-India"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8B1E5C]/25 focus:border-[#8B1E5C] text-xs outline-hidden"
                />
                {formErrors.location && <p className="text-red-500 text-[11px] mt-1">{formErrors.location}</p>}
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                  Experience <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3-5 Years / Fresher"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8B1E5C]/25 focus:border-[#8B1E5C] text-xs outline-hidden"
                />
                {formErrors.experience && <p className="text-red-500 text-[11px] mt-1">{formErrors.experience}</p>}
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                  Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Any Graduate / MBA / CA"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8B1E5C]/25 focus:border-[#8B1E5C] text-xs outline-hidden"
                />
                {formErrors.qualification && <p className="text-red-500 text-[11px] mt-1">{formErrors.qualification}</p>}
              </div>

              {/* Salary / CTC */}
              <div>
                <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Salary Range / CTC</label>
                <input
                  type="text"
                  placeholder="e.g. 6 - 9 LPA / Best in Industry"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8B1E5C]/25 focus:border-[#8B1E5C] text-xs outline-hidden"
                />
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Employment Type</label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8B1E5C]/25 focus:border-[#8B1E5C] text-xs outline-hidden cursor-pointer"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Vacancies */}
              <div>
                <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Vacancies</label>
                <input
                  type="number"
                  min="1"
                  value={formData.vacancies}
                  onChange={(e) => setFormData({ ...formData, vacancies: Number(e.target.value) || 1 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8B1E5C]/25 focus:border-[#8B1E5C] text-xs outline-hidden"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Closed' })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8B1E5C]/25 focus:border-[#8B1E5C] text-xs outline-hidden cursor-pointer"
                >
                  <option value="Active">Active (Visible on public site)</option>
                  <option value="Closed">Closed (Hidden from public site)</option>
                </select>
              </div>

              {/* Closing Date */}
              <div>
                <label className="block text-xs font-bold text-[#6D214F] mb-1.5">Closing Date (Optional)</label>
                <input
                  type="date"
                  value={formData.closingDate}
                  onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8B1E5C]/25 focus:border-[#8B1E5C] text-xs outline-hidden"
                />
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="isFeaturedCheck"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-[#8B1E5C] rounded border-gray-300 focus:ring-[#8B1E5C] cursor-pointer"
                />
                <label htmlFor="isFeaturedCheck" className="text-xs font-bold text-[#6D214F] cursor-pointer">
                  Feature this job prominently on public careers page
                </label>
              </div>

            </div>

            {/* Job Description */}
            <div>
              <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Comprehensive overview of role requirements, mission, and scope..."
                value={formData.jobDescription}
                onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#8B1E5C]/25 focus:border-[#8B1E5C] focus:ring-2 focus:ring-[#8B1E5C]/10 text-xs outline-hidden"
              />
              {formErrors.jobDescription && <p className="text-red-500 text-[11px] mt-1">{formErrors.jobDescription}</p>}
            </div>

            {/* Key Responsibilities */}
            <div>
              <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                Key Responsibilities (One per line)
              </label>
              <textarea
                rows={3}
                placeholder="Oversee branch asset operations&#10;Drive monthly acquisition targets&#10;Lead a team of 10 relationship managers"
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#8B1E5C]/25 focus:border-[#8B1E5C] text-xs outline-hidden font-mono"
              />
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-xs font-bold text-[#6D214F] mb-1.5">
                Required Skills (Comma separated)
              </label>
              <input
                type="text"
                placeholder="Credit Analysis, Branch Banking, Client Acquisition, Team Management"
                value={formData.requiredSkills}
                onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#8B1E5C]/25 focus:border-[#8B1E5C] text-xs outline-hidden"
              />
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#8B1E5C]/15">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-[#8B1E5C] hover:bg-[#7A1F4D] text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
              >
                {isSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>{editingJobId ? 'Save Changes' : 'Publish Job Opening'}</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* ==================================================== */
        /* MODE 2: JOB OPENINGS LIST & MANAGE TABLE */
        /* ==================================================== */
        <>
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-[#8B1E5C]/15 shadow-sm space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
                <input
                  type="text"
                  placeholder="Search job title, sector, location..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9.5 pr-4 py-2 rounded-xl border border-[#8B1E5C]/20 focus:border-[#8B1E5C] text-xs outline-hidden bg-[#FAF8FB] focus:bg-white"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value as 'All' | 'Active' | 'Closed');
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-[#8B1E5C]/20 focus:border-[#8B1E5C] text-xs outline-hidden bg-[#FAF8FB] focus:bg-white cursor-pointer"
                >
                  <option value="All">All Statuses (Active & Closed)</option>
                  <option value="Active">Active Only</option>
                  <option value="Closed">Closed Only</option>
                </select>
              </div>

              {/* Sector Filter */}
              <div>
                <select
                  value={sectorFilter}
                  onChange={(e) => {
                    setSectorFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-[#8B1E5C]/20 focus:border-[#8B1E5C] text-xs outline-hidden bg-[#FAF8FB] focus:bg-white cursor-pointer"
                >
                  <option value="All">All Industry Sectors</option>
                  {SECTORS_LIST.map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table Container */}
          {isLoading ? (
            <div className="bg-white p-8 rounded-2xl border border-[#8B1E5C]/15 shadow-sm text-center space-y-4">
              <div className="w-10 h-10 border-3 border-[#8B1E5C] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-[#6D214F]">Loading job requisitions from MongoDB...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-[#8B1E5C]/15 shadow-sm text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto border border-purple-200">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#6D214F]">No job openings found</h3>
              <p className="text-xs text-[#777777] max-w-sm mx-auto">
                {searchTerm || statusFilter !== 'All' || sectorFilter !== 'All'
                  ? 'Try modifying your search query or removing active filters.'
                  : 'Get started by creating your first job opening requisition.'}
              </p>
              <button
                onClick={handleStartCreate}
                className="px-4 py-2 rounded-xl bg-[#8B1E5C] text-white text-xs font-bold hover:bg-[#7A1F4D] transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Job Opening</span>
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block bg-white rounded-2xl border border-[#8B1E5C]/15 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF8FB] border-b border-[#8B1E5C]/15 text-[#6D214F] font-extrabold uppercase tracking-wider text-[10px]">
                        <th className="py-3.5 px-4">Job Title & Sector</th>
                        <th className="py-3.5 px-4">Location / Exp</th>
                        <th className="py-3.5 px-4">Salary / Type</th>
                        <th className="py-3.5 px-4">Vacancies</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Posted Date</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#8B1E5C]/10">
                      {paginatedJobs.map((job) => {
                        const jId = job._id || job.id || '';
                        return (
                          <tr key={jId} className="hover:bg-[#FAF8FB]/70 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#6D214F]">{job.jobTitle}</span>
                                {job.isFeatured && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-amber-100 text-amber-800">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-[#777] flex items-center gap-1.5 mt-0.5">
                                <span className="font-semibold text-[#8B1E5C]">{job.sector}</span>
                                {job.department && <span>• {job.department}</span>}
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="text-[#333] font-medium">{job.location}</div>
                              <div className="text-[11px] text-[#777]">{job.experience}</div>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="text-[#333] font-medium">{job.salary || 'Best in Industry'}</div>
                              <div className="text-[11px] text-[#777]">{job.employmentType || 'Full Time'}</div>
                            </td>

                            <td className="py-3.5 px-4 font-bold text-[#6D214F]">
                              {job.vacancies || 1}
                            </td>

                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => handleToggleStatus(jId, job.status)}
                                disabled={togglingJobId === jId}
                                className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold cursor-pointer transition-colors ${
                                  job.status === 'Active'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                                }`}
                                title="Click to toggle Active / Closed status"
                              >
                                {togglingJobId === jId ? 'Updating...' : job.status}
                              </button>
                            </td>

                            <td className="py-3.5 px-4 text-[#777] whitespace-nowrap">
                              {formatDate(job.postedDate || job.createdAt)}
                            </td>

                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => setSelectedJob(job)}
                                  className="p-1.5 rounded-lg bg-white border border-[#8B1E5C]/20 text-[#8B1E5C] hover:bg-[#FAF8FB] transition-colors cursor-pointer"
                                  title="View Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleStartEdit(job)}
                                  className="p-1.5 rounded-lg bg-white border border-[#8B1E5C]/20 text-[#8B1E5C] hover:bg-[#8B1E5C] hover:text-white transition-colors cursor-pointer"
                                  title="Edit Job"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setDeleteModalJob(job)}
                                  className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                                  title="Delete Job"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards View */}
              <div className="lg:hidden space-y-3">
                {paginatedJobs.map((job) => {
                  const jId = job._id || job.id || '';
                  return (
                    <div
                      key={jId}
                      className="bg-white p-4 rounded-2xl border border-[#8B1E5C]/15 shadow-sm space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-[#6D214F]">{job.jobTitle}</h4>
                            {job.isFeatured && (
                              <span className="px-1 py-0.2 rounded text-[8px] font-black uppercase bg-amber-100 text-amber-800">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#8B1E5C] font-semibold">{job.sector} • {job.location}</p>
                        </div>
                        <button
                          onClick={() => handleToggleStatus(jId, job.status)}
                          className={`px-2 py-0.5 rounded-full border text-[10px] font-bold shrink-0 ${
                            job.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-gray-100 text-gray-600 border-gray-200'
                          }`}
                        >
                          {job.status}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#8B1E5C]/10">
                        <div>
                          <span className="text-[10px] text-[#777] block">Experience:</span>
                          <span className="text-[#333] font-medium">{job.experience}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#777] block">Salary:</span>
                          <span className="text-[#333] font-medium">{job.salary || 'Competitive'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#777] block">Vacancies:</span>
                          <span className="text-[#333] font-medium">{job.vacancies || 1}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#777] block">Posted:</span>
                          <span className="text-[#333] font-medium">{formatDate(job.postedDate || job.createdAt)}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#8B1E5C]/10">
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="px-2.5 py-1 rounded-lg bg-[#FAF8FB] text-[#8B1E5C] border border-[#8B1E5C]/20 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStartEdit(job)}
                            className="px-2.5 py-1 rounded-lg bg-[#8B1E5C] text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteModalJob(job)}
                            className="p-1 rounded-lg bg-red-50 text-red-600 border border-red-200 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              <div className="bg-white px-4 py-3.5 rounded-2xl border border-[#8B1E5C]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="text-[#777]">
                  Showing <span className="font-bold text-[#6D214F]">{paginatedJobs.length}</span> of{' '}
                  <span className="font-bold text-[#6D214F]">{filteredJobs.length}</span> jobs (Page {currentPage} of {totalPages})
                </div>

                <div className="flex items-center gap-2 self-center sm:self-auto">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage <= 1}
                    className="p-2 rounded-xl bg-white border border-[#8B1E5C]/20 hover:bg-[#FAF8FB] text-[#6D214F] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="px-3 py-1.5 rounded-xl bg-[#8B1E5C] text-white font-bold text-xs">
                    {currentPage}
                  </span>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage >= totalPages}
                    className="p-2 rounded-xl bg-white border border-[#8B1E5C]/20 hover:bg-[#FAF8FB] text-[#6D214F] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* ==================================================== */}
      {/* JOB DETAILS MODAL */}
      {/* ==================================================== */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#8B1E5C]/20 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#8B1E5C]/15">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${
                  selectedJob.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}>
                  {selectedJob.status}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#6D214F] mt-1.5">
                  {selectedJob.jobTitle}
                </h2>
                <p className="text-xs text-[#8B1E5C] font-bold">
                  {selectedJob.sector} {selectedJob.department ? `• ${selectedJob.department}` : ''}
                </p>
              </div>

              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/10">
                <span className="text-[10px] text-[#777] block font-bold uppercase">Location</span>
                <span className="font-bold text-[#333]">{selectedJob.location}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/10">
                <span className="text-[10px] text-[#777] block font-bold uppercase">Experience</span>
                <span className="font-bold text-[#333]">{selectedJob.experience}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/10">
                <span className="text-[10px] text-[#777] block font-bold uppercase">Salary</span>
                <span className="font-bold text-[#333]">{selectedJob.salary || 'Best in Industry'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/10">
                <span className="text-[10px] text-[#777] block font-bold uppercase">Vacancies</span>
                <span className="font-bold text-[#333]">{selectedJob.vacancies || 1} Positions</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5 text-xs">
              <h4 className="font-bold text-[#6D214F] uppercase tracking-wider text-[10px]">Job Description</h4>
              <p className="text-[#333] leading-relaxed whitespace-pre-wrap bg-[#FAF8FB] p-3.5 rounded-xl border border-[#8B1E5C]/10">
                {selectedJob.jobDescription}
              </p>
            </div>

            {/* Responsibilities */}
            {Array.isArray(selectedJob.responsibilities) && selectedJob.responsibilities.length > 0 && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-[#6D214F] uppercase tracking-wider text-[10px]">Key Responsibilities</h4>
                <ul className="list-disc pl-5 space-y-1 text-[#444]">
                  {selectedJob.responsibilities.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Skills */}
            {Array.isArray(selectedJob.requiredSkills) && selectedJob.requiredSkills.length > 0 && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-[#6D214F] uppercase tracking-wider text-[10px]">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJob.requiredSkills.map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-[#8B1E5C]/10 text-[#8B1E5C] font-semibold text-[11px]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Footer buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#8B1E5C]/15">
              <button
                onClick={() => {
                  setSelectedJob(null);
                  handleStartEdit(selectedJob);
                }}
                className="px-4 py-2 rounded-xl bg-[#8B1E5C] hover:bg-[#7A1F4D] text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit This Job</span>
              </button>
              <button
                onClick={() => setSelectedJob(null)}
                className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ==================================================== */}
      {deleteModalJob && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setDeleteModalJob(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-red-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-gray-900">Delete Job Opening?</h3>
              <p className="text-xs text-gray-500">
                Are you sure you want to permanently delete{' '}
                <strong className="text-gray-800">"{deleteModalJob.jobTitle}"</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteModalJob(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
              >
                {isDeleting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>{isDeleting ? 'Deleting...' : 'Yes, Delete Job'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminJobOpeningsPage;
