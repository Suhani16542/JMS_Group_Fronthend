import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Eye,
  FileText,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  X,
  Calendar,
  Briefcase,
  GraduationCap,
  Clock,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  getCandidateApplicationsApi,
  CandidateApplicationResponseData,
} from '@/services/candidateApplicationService';

export const AdminCandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateApplicationResponseData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [jobRoleFilter, setJobRoleFilter] = useState<string>('All');
  const [experienceFilter, setExperienceFilter] = useState<string>('All');

  // Loading & Error states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Selected Candidate Modal
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateApplicationResponseData | null>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to page 1 on new search
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const loadCandidates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getCandidateApplicationsApi({
        page,
        limit,
        search: debouncedSearch,
        status: statusFilter,
        jobRole: jobRoleFilter,
        experience: experienceFilter,
      });

      setCandidates(response.candidates);
      setTotal(response.total);
      setTotalPages(response.totalPages || 1);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to load candidate applications');
      } else {
        setError('Failed to load candidate applications');
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, debouncedSearch, statusFilter, jobRoleFilter, experienceFilter]);

  useEffect(() => {
    loadCandidates();
  }, [loadCandidates]);

  // Extract distinct job roles and experiences from loaded list for filter dropdowns
  const availableRoles = useMemo(() => {
    const roles = new Set<string>();
    candidates.forEach((c) => {
      if (c.jobAppliedForA) roles.add(c.jobAppliedForA);
      if (c.preferredJobRole) roles.add(c.preferredJobRole);
    });
    return Array.from(roles).filter(Boolean);
  }, [candidates]);

  // Helper to safely get resume URL
  const getResumeUrl = (c: CandidateApplicationResponseData): string | null => {
    return c.resumeUrl || c.resumeFile || c.resume || null;
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'N/A';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  const getStatusBadge = (status?: string) => {
    const s = (status || 'Pending').toLowerCase();
    if (s.includes('select') || s.includes('approve') || s.includes('active') || s.includes('shortlist')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (s.includes('reject') || s.includes('closed')) {
      return 'bg-red-50 text-red-700 border-red-200';
    }
    if (s.includes('review') || s.includes('interview')) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#6D214F] tracking-tight">
              Candidate Applications
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#8B1E5C]/10 text-[#8B1E5C] text-xs font-black">
              {total} Total
            </span>
          </div>
          <p className="text-xs text-[#777777] mt-1">
            Browse, filter, and inspect job applicants submitted through the JMS Group candidate portal.
          </p>
        </div>

        <button
          onClick={() => loadCandidates()}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#8B1E5C]/20 hover:border-[#8B1E5C]/40 text-xs font-bold text-[#8B1E5C] transition-colors shadow-xs cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => loadCandidates()}
            className="px-3 py-1.5 rounded-lg bg-white border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#8B1E5C]/15 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 rounded-xl border border-[#8B1E5C]/20 focus:border-[#8B1E5C] focus:ring-2 focus:ring-[#8B1E5C]/10 text-xs outline-hidden transition-all bg-[#FAF8FB] focus:bg-white"
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
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-[#8B1E5C]/20 focus:border-[#8B1E5C] text-xs outline-hidden bg-[#FAF8FB] focus:bg-white cursor-pointer"
            >
              <option value="All">All Application Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Job Role Filter */}
          <div>
            <select
              value={jobRoleFilter}
              onChange={(e) => {
                setJobRoleFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-[#8B1E5C]/20 focus:border-[#8B1E5C] text-xs outline-hidden bg-[#FAF8FB] focus:bg-white cursor-pointer"
            >
              <option value="All">All Preferred Roles</option>
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Filter */}
          <div>
            <select
              value={experienceFilter}
              onChange={(e) => {
                setExperienceFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-[#8B1E5C]/20 focus:border-[#8B1E5C] text-xs outline-hidden bg-[#FAF8FB] focus:bg-white cursor-pointer"
            >
              <option value="All">All Experience Levels</option>
              <option value="Fresher">Fresher</option>
              <option value="0-1 Years">0-1 Years</option>
              <option value="1-3 Years">1-3 Years</option>
              <option value="3-5 Years">3-5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>

        </div>

        {/* Active Filter Indicators */}
        {(debouncedSearch || statusFilter !== 'All' || jobRoleFilter !== 'All' || experienceFilter !== 'All') && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#8B1E5C]/10 text-xs">
            <span className="text-[11px] text-[#777777] font-semibold">Active Filters:</span>
            {debouncedSearch && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#8B1E5C]/10 text-[#8B1E5C] text-[11px] font-bold">
                Search: "{debouncedSearch}"
                <button onClick={() => setSearchTerm('')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {statusFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#8B1E5C]/10 text-[#8B1E5C] text-[11px] font-bold">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter('All')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {jobRoleFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#8B1E5C]/10 text-[#8B1E5C] text-[11px] font-bold">
                Role: {jobRoleFilter}
                <button onClick={() => setJobRoleFilter('All')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {experienceFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#8B1E5C]/10 text-[#8B1E5C] text-[11px] font-bold">
                Exp: {experienceFilter}
                <button onClick={() => setExperienceFilter('All')}><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setJobRoleFilter('All');
                setExperienceFilter('All');
              }}
              className="text-[11px] text-red-600 hover:underline font-bold ml-auto cursor-pointer"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* CANDIDATES TABLE (DESKTOP) & CARDS (MOBILE) */}
      {/* ==================================================== */}
      {isLoading ? (
        <div className="bg-white p-8 rounded-2xl border border-[#8B1E5C]/15 shadow-sm text-center space-y-4">
          <div className="w-10 h-10 border-3 border-[#8B1E5C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-[#6D214F]">Loading candidate applications from MongoDB...</p>
        </div>
      ) : candidates.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-[#8B1E5C]/15 shadow-sm text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF8FB] text-[#8B1E5C] flex items-center justify-center mx-auto border border-[#8B1E5C]/20">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#6D214F]">No candidate applications found</h3>
          <p className="text-xs text-[#777777] max-w-sm mx-auto">
            {debouncedSearch || statusFilter !== 'All'
              ? 'Try modifying your search query or removing active filters to see results.'
              : 'Candidates who apply through the online application form will appear here in real-time.'}
          </p>
          {(debouncedSearch || statusFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
              }}
              className="px-4 py-2 rounded-xl bg-[#8B1E5C] text-white text-xs font-bold hover:bg-[#7A1F4D] transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden md:block bg-white rounded-2xl border border-[#8B1E5C]/15 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF8FB] border-b border-[#8B1E5C]/15 text-[#6D214F] font-extrabold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Candidate Name</th>
                    <th className="py-3.5 px-4">Contact Info</th>
                    <th className="py-3.5 px-4">Qualification / Exp</th>
                    <th className="py-3.5 px-4">Role Applied</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Resume</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8B1E5C]/10">
                  {candidates.map((cand) => {
                    const resumeUrl = getResumeUrl(cand);
                    return (
                      <tr
                        key={cand._id}
                        className="hover:bg-[#FAF8FB]/70 transition-colors"
                      >
                        {/* Name */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#6D214F]">{cand.fullName}</div>
                          {cand.currentLocation && (
                            <div className="text-[10px] text-[#777777] flex items-center gap-1 mt-0.5">
                              <MapPin className="w-2.5 h-2.5" />
                              <span>{cand.currentLocation}</span>
                            </div>
                          )}
                        </td>

                        {/* Email & Phone */}
                        <td className="py-3.5 px-4">
                          <div className="text-[#333333]">{cand.email || '—'}</div>
                          <div className="text-[11px] text-[#777777]">{cand.mobileNumber || '—'}</div>
                        </td>

                        {/* Qualification & Experience */}
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-[#444444]">{cand.qualification}</div>
                          <div className="text-[11px] text-[#777777]">{cand.experience}</div>
                        </td>

                        {/* Preferred Role / Applied */}
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-1 rounded-md bg-[#FAF8FB] text-[#8B1E5C] border border-[#8B1E5C]/20 font-bold text-[11px]">
                            {cand.jobAppliedForA || cand.preferredJobRole || 'General'}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${getStatusBadge(cand.status)}`}>
                            {cand.status || 'Pending'}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-[#666666] whitespace-nowrap">
                          {formatDate(cand.createdAt)}
                        </td>

                        {/* Resume Link */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {resumeUrl ? (
                            <a
                              href={resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#8B1E5C]/10 text-[#8B1E5C] hover:bg-[#8B1E5C] hover:text-white transition-colors text-[11px] font-bold"
                              title="Open Resume in new tab"
                            >
                              <FileText className="w-3 h-3" />
                              <span>View CV</span>
                            </a>
                          ) : (
                            <span className="text-[#999999] text-[11px]">No CV</span>
                          )}
                        </td>

                        {/* Action: View Modal */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => setSelectedCandidate(cand)}
                            className="px-3 py-1.5 rounded-lg bg-[#FAF8FB] hover:bg-[#8B1E5C] text-[#8B1E5C] hover:text-white border border-[#8B1E5C]/20 transition-all text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards View (Visible on screens < md) */}
          <div className="md:hidden space-y-3">
            {candidates.map((cand) => {
              const resumeUrl = getResumeUrl(cand);
              return (
                <div
                  key={cand._id}
                  className="bg-white p-4 rounded-2xl border border-[#8B1E5C]/15 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-[#6D214F]">{cand.fullName}</h4>
                      <p className="text-xs text-[#777777]">{cand.jobAppliedForA || cand.preferredJobRole || 'Candidate'}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold shrink-0 ${getStatusBadge(cand.status)}`}>
                      {cand.status || 'Pending'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#8B1E5C]/10">
                    <div>
                      <span className="text-[10px] text-[#777777] block">Email:</span>
                      <span className="text-[#333333] font-medium break-all">{cand.email || '—'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#777777] block">Phone:</span>
                      <span className="text-[#333333] font-medium">{cand.mobileNumber || '—'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#777777] block">Qualification:</span>
                      <span className="text-[#333333] font-medium">{cand.qualification || '—'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#777777] block">Experience:</span>
                      <span className="text-[#333333] font-medium">{cand.experience || '—'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#8B1E5C]/10">
                    <span className="text-[10px] text-[#777777]">Applied: {formatDate(cand.createdAt)}</span>
                    <div className="flex items-center gap-2">
                      {resumeUrl && (
                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[#8B1E5C]/10 text-[#8B1E5C] text-xs font-bold inline-flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>CV</span>
                        </a>
                      )}
                      <button
                        onClick={() => setSelectedCandidate(cand)}
                        className="px-3 py-1.5 rounded-lg bg-[#8B1E5C] text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ==================================================== */}
          {/* BACKEND PAGINATION BAR */}
          {/* ==================================================== */}
          <div className="bg-white px-4 py-3.5 rounded-2xl border border-[#8B1E5C]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="text-[#777777]">
              Showing <span className="font-bold text-[#6D214F]">{candidates.length}</span> of{' '}
              <span className="font-bold text-[#6D214F]">{total}</span> candidates (Page {page} of {totalPages})
            </div>

            <div className="flex items-center gap-2 self-center sm:self-auto">
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="px-2.5 py-1.5 rounded-xl border border-[#8B1E5C]/20 bg-[#FAF8FB] text-xs font-bold text-[#6D214F] cursor-pointer"
              >
                <option value={10}>10 / page</option>
                <option value={25}>25 / page</option>
                <option value={50}>50 / page</option>
              </select>

              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1 || isLoading}
                className="p-2 rounded-xl bg-white border border-[#8B1E5C]/20 hover:bg-[#FAF8FB] text-[#6D214F] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-3 py-1.5 rounded-xl bg-[#8B1E5C] text-white font-bold text-xs">
                {page}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages || isLoading}
                className="p-2 rounded-xl bg-white border border-[#8B1E5C]/20 hover:bg-[#FAF8FB] text-[#6D214F] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* ==================================================== */}
      {/* CANDIDATE DETAILS MODAL */}
      {/* ==================================================== */}
      {selectedCandidate && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedCandidate(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#8B1E5C]/20 my-8 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#8B1E5C]/15">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${getStatusBadge(selectedCandidate.status)}`}>
                  {selectedCandidate.status || 'Pending'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#6D214F] mt-1.5">
                  {selectedCandidate.fullName}
                </h2>
                <p className="text-xs text-[#777777]">
                  Application ID: <span className="font-mono text-[#333]">{selectedCandidate._id}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Candidate Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="p-3.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/10 space-y-1">
                <span className="text-[10px] text-[#777777] font-bold uppercase flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-[#8B1E5C]" />
                  Email Address
                </span>
                <p className="font-semibold text-[#222222] break-all">{selectedCandidate.email || 'N/A'}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/10 space-y-1">
                <span className="text-[10px] text-[#777777] font-bold uppercase flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#8B1E5C]" />
                  Phone Number
                </span>
                <p className="font-semibold text-[#222222]">{selectedCandidate.mobileNumber || selectedCandidate.phone || 'N/A'}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/10 space-y-1">
                <span className="text-[10px] text-[#777777] font-bold uppercase flex items-center gap-1.5">
                  <GraduationCap className="w-3 h-3 text-[#8B1E5C]" />
                  Highest Qualification
                </span>
                <p className="font-semibold text-[#222222]">{selectedCandidate.qualification || 'N/A'}</p>
                {selectedCandidate.specialization && (
                  <p className="text-[11px] text-[#555]">{selectedCandidate.specialization}</p>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/10 space-y-1">
                <span className="text-[10px] text-[#777777] font-bold uppercase flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#8B1E5C]" />
                  Experience
                </span>
                <p className="font-semibold text-[#222222]">{selectedCandidate.experience || 'Fresher'}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/10 space-y-1">
                <span className="text-[10px] text-[#777777] font-bold uppercase flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3 text-[#8B1E5C]" />
                  Preferred Role (Choice A)
                </span>
                <p className="font-bold text-[#8B1E5C]">{selectedCandidate.jobAppliedForA || selectedCandidate.preferredJobRole || 'N/A'}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/10 space-y-1">
                <span className="text-[10px] text-[#777777] font-bold uppercase flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3 text-[#8B1E5C]" />
                  Applied Role (Choice B)
                </span>
                <p className="font-semibold text-[#222222]">{selectedCandidate.jobAppliedForB || 'None specified'}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/10 space-y-1">
                <span className="text-[10px] text-[#777777] font-bold uppercase flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#8B1E5C]" />
                  Location Preference
                </span>
                <p className="font-semibold text-[#222222]">
                  {selectedCandidate.locationPreferenceA || selectedCandidate.currentLocation || 'N/A'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/10 space-y-1">
                <span className="text-[10px] text-[#777777] font-bold uppercase flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#8B1E5C]" />
                  Application Date
                </span>
                <p className="font-semibold text-[#222222]">{formatDate(selectedCandidate.createdAt)}</p>
              </div>

            </div>

            {/* Address & Remarks */}
            {selectedCandidate.permanentAddress && (
              <div className="p-3.5 rounded-xl bg-[#FAF8FB] border border-[#8B1E5C]/10 text-xs space-y-1">
                <span className="text-[10px] text-[#777777] font-bold uppercase">Permanent Address:</span>
                <p className="text-[#333] leading-relaxed">{selectedCandidate.permanentAddress}</p>
              </div>
            )}

            {/* Resume Action Buttons */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF8FB] to-white border border-[#8B1E5C]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-[#6D214F] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#8B1E5C]" />
                  <span>Candidate Resume Document</span>
                </h4>
                <p className="text-[11px] text-[#777777] mt-0.5">
                  {getResumeUrl(selectedCandidate)
                    ? 'Resume file uploaded and verified in cloud storage.'
                    : 'No resume document was attached to this application.'}
                </p>
              </div>

              {getResumeUrl(selectedCandidate) ? (
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={getResumeUrl(selectedCandidate)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-[#8B1E5C] text-white hover:bg-[#7A1F4D] text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Resume</span>
                  </a>
                  <a
                    href={getResumeUrl(selectedCandidate)!}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#8B1E5C]/30 text-[#8B1E5C] hover:bg-[#FAF8FB] text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              ) : (
                <span className="text-xs text-gray-400 font-semibold italic">Not available</span>
              )}
            </div>

            {/* Close Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCandidatesPage;
