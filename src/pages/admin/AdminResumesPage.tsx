import React, { useState, useEffect, useCallback } from 'react';
import {
  FileText,
  Search,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  X,
  Eye,
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import { getResumesApi, ResumeUploadResponseData } from '@/services/resumeService';

export const AdminResumesPage: React.FC = () => {
  const [resumes, setResumes] = useState<ResumeUploadResponseData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Search
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  // Loading & Error states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Detail Modal
  const [selectedResume, setSelectedResume] = useState<ResumeUploadResponseData | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const loadResumes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getResumesApi({
        page,
        limit,
        search: debouncedSearch,
      });

      setResumes(result.resumes);
      setTotal(result.total);
      setTotalPages(result.totalPages || 1);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to load resumes');
      } else {
        setError('Failed to load resumes from backend server');
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, debouncedSearch]);

  useEffect(() => {
    loadResumes();
  }, [loadResumes]);

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

  const getResumeUrl = (r: ResumeUploadResponseData): string | null => {
    return r.resumeUrl || r.viewUrl || r.downloadUrl || null;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#6D214F] tracking-tight">
              Resume Database
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black">
              {total} Resumes
            </span>
          </div>
          <p className="text-xs text-[#777777] mt-1">
            Browse and download CV documents submitted by candidates through the Upload Resume page.
          </p>
        </div>

        <button
          onClick={() => loadResumes()}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#8B1E5C]/20 hover:border-[#8B1E5C]/40 text-xs font-bold text-[#8B1E5C] transition-colors shadow-xs cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => loadResumes()}
            className="px-3 py-1.5 rounded-lg bg-white border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#8B1E5C]/15 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
          <input
            type="text"
            placeholder="Search resumes by candidate name, email, job role..."
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

        {debouncedSearch && (
          <div className="flex items-center gap-2 pt-2 text-xs">
            <span className="text-[11px] text-[#777]">Filtering for: "{debouncedSearch}"</span>
            <button
              onClick={() => setSearchTerm('')}
              className="text-[11px] text-[#8B1E5C] hover:underline font-bold"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Resumes Table / Mobile Cards */}
      {isLoading ? (
        <div className="bg-white p-8 rounded-2xl border border-[#8B1E5C]/15 shadow-sm text-center space-y-4">
          <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-[#6D214F]">Loading resume records from MongoDB...</p>
        </div>
      ) : resumes.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-[#8B1E5C]/15 shadow-sm text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#6D214F]">No resumes found</h3>
          <p className="text-xs text-[#777] max-w-sm mx-auto">
            {debouncedSearch
              ? 'No resume matches your search terms.'
              : 'Uploaded candidate CVs will appear in this database automatically.'}
          </p>
          {debouncedSearch && (
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-colors cursor-pointer"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-2xl border border-[#8B1E5C]/15 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF8FB] border-b border-[#8B1E5C]/15 text-[#6D214F] font-extrabold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Candidate</th>
                    <th className="py-3.5 px-4">Email & Phone</th>
                    <th className="py-3.5 px-4">Job Role / Exp</th>
                    <th className="py-3.5 px-4">Upload Date</th>
                    <th className="py-3.5 px-4 text-right">Resume Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8B1E5C]/10">
                  {resumes.map((resume) => {
                    const resumeUrl = getResumeUrl(resume);
                    return (
                      <tr key={resume._id} className="hover:bg-[#FAF8FB]/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#6D214F]">{resume.fullName}</div>
                          {resume.highestQualification && (
                            <div className="text-[11px] text-[#777]">{resume.highestQualification}</div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-[#333] font-medium">{resume.email}</div>
                          <div className="text-[11px] text-[#777]">{resume.phone || '—'}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FAF8FB] text-[#8B1E5C] border border-[#8B1E5C]/20 font-bold text-[11px]">
                            {resume.preferredJobRole || 'Not Specified'}
                          </span>
                          {resume.experience && (
                            <div className="text-[11px] text-[#777] mt-0.5">{resume.experience}</div>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-[#777] whitespace-nowrap">
                          {formatDate(resume.createdAt)}
                        </td>

                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          {resumeUrl ? (
                            <div className="inline-flex items-center gap-1.5">
                              <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-[#8B1E5C] hover:bg-[#7A1F4D] text-white text-xs font-bold inline-flex items-center gap-1 shadow-2xs transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>View Resume</span>
                              </a>
                              <a
                                href={resumeUrl}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-white border border-[#8B1E5C]/20 hover:bg-[#FAF8FB] text-[#8B1E5C] text-xs font-bold inline-flex items-center gap-1 transition-colors"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Download</span>
                              </a>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs italic">No link available</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden space-y-3">
            {resumes.map((resume) => {
              const resumeUrl = getResumeUrl(resume);
              return (
                <div
                  key={resume._id}
                  className="bg-white p-4 rounded-2xl border border-[#8B1E5C]/15 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-[#6D214F]">{resume.fullName}</h4>
                      <p className="text-xs text-[#8B1E5C] font-semibold">{resume.preferredJobRole || 'Candidate CV'}</p>
                    </div>
                    <span className="text-[10px] text-[#777] whitespace-nowrap">{formatDate(resume.createdAt)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#8B1E5C]/10">
                    <div>
                      <span className="text-[10px] text-[#777] block">Email:</span>
                      <span className="text-[#333] font-medium break-all">{resume.email}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#777] block">Phone:</span>
                      <span className="text-[#333] font-medium">{resume.phone || '—'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#777] block">Qualification:</span>
                      <span className="text-[#333] font-medium">{resume.highestQualification || '—'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#777] block">Experience:</span>
                      <span className="text-[#333] font-medium">{resume.experience || '—'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#8B1E5C]/10">
                    {resumeUrl ? (
                      <>
                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[#8B1E5C] text-white text-xs font-bold inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View</span>
                        </a>
                        <a
                          href={resumeUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-white border border-[#8B1E5C]/20 text-[#8B1E5C] text-xs font-bold inline-flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </a>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 italic">No CV available</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3.5 rounded-2xl border border-[#8B1E5C]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="text-[#777]">
              Showing <span className="font-bold text-[#6D214F]">{resumes.length}</span> of{' '}
              <span className="font-bold text-[#6D214F]">{total}</span> resumes (Page {page} of {totalPages})
            </div>

            <div className="flex items-center gap-2 self-center sm:self-auto">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1 || isLoading}
                className="p-2 rounded-xl bg-white border border-[#8B1E5C]/20 hover:bg-[#FAF8FB] text-[#6D214F] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-3 py-1.5 rounded-xl bg-[#8B1E5C] text-white font-bold text-xs">
                {page} / {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages || isLoading}
                className="p-2 rounded-xl bg-white border border-[#8B1E5C]/20 hover:bg-[#FAF8FB] text-[#6D214F] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default AdminResumesPage;
