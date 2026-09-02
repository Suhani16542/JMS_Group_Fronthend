import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Mail,
  Briefcase,
  CheckCircle2,
  FileText,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  UserCheck,
  Building,
} from 'lucide-react';
import { getDashboardStatsApi, DashboardOverviewData } from '@/services/adminDashboardService';

export const AdminDashboardOverviewPage: React.FC = () => {
  const [data, setData] = useState<DashboardOverviewData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getDashboardStatsApi();
      setData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Unable to connect to backend stats API');
      } else {
        setError('Unable to load dashboard statistics from backend.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const stats = data?.stats;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Welcome & Actions Banner */}
      <div className="bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-semibold backdrop-blur-xs mb-3 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>Real-time Recruitment Administration</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              JMS Group Admin Dashboard
            </h1>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-xl">
              Live operational metrics for candidates, client contacts, monthly job openings, and uploaded resumes stored in MongoDB.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchStats}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors border border-white/20 cursor-pointer disabled:opacity-50"
              title="Refresh Stats"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>
            <Link
              to="/admin/candidates"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#6D214F] text-xs font-bold hover:bg-white/90 transition-all shadow-md cursor-pointer"
            >
              <span>View Candidates</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8B1E5C]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Error Alert with Retry */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchStats}
            className="px-3 py-1.5 rounded-lg bg-white border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold cursor-pointer transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* ==================================================== */}
      {/* 5 STATISTIC KPI CARDS */}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        
        {/* Total Candidates */}
        <div className="bg-white p-5 rounded-2xl border border-[#8B1E5C]/15 shadow-sm space-y-2 hover:border-[#8B1E5C]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#8B1E5C] tracking-wide">Total Candidates</span>
            <div className="w-9 h-9 rounded-xl bg-[#FAF8FB] text-[#8B1E5C] flex items-center justify-center border border-[#8B1E5C]/20">
              <Users className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#6D214F]">
            {isLoading ? <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" /> : stats?.totalCandidates ?? 0}
          </div>
          <p className="text-[11px] text-[#777777]">Applications received</p>
        </div>

        {/* Total Contacts */}
        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm space-y-2 hover:border-blue-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-blue-700 tracking-wide">Total Contacts</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <Mail className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-3xl font-black text-blue-700">
            {isLoading ? <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" /> : stats?.totalContacts ?? 0}
          </div>
          <p className="text-[11px] text-blue-600">Client & visitor queries</p>
        </div>

        {/* Total Job Openings */}
        <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-sm space-y-2 hover:border-purple-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-purple-700 tracking-wide">Total Job Openings</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200">
              <Briefcase className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-3xl font-black text-purple-700">
            {isLoading ? <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" /> : stats?.totalJobOpenings ?? 0}
          </div>
          <p className="text-[11px] text-purple-600">Requisitions posted</p>
        </div>

        {/* Active Job Openings */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-2 hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-emerald-700 tracking-wide">Active Job Openings</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <CheckCircle2 className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-700">
            {isLoading ? <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" /> : stats?.activeJobOpenings ?? 0}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold">Live on website</p>
        </div>

        {/* Total Resumes */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-2 hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-amber-700 tracking-wide">Total Resumes</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <FileText className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-700">
            {isLoading ? <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" /> : stats?.totalResumes ?? 0}
          </div>
          <p className="text-[11px] text-amber-600 font-semibold">Uploaded talent CVs</p>
        </div>

      </div>

      {/* ==================================================== */}
      {/* 3 RECENT ACTIVITY SECTIONS */}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Recent Candidate Applications */}
        <div className="bg-white p-6 rounded-2xl border border-[#8B1E5C]/15 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#8B1E5C]/10">
              <div className="flex items-center gap-2">
                <Users className="w-4.5 h-4.5 text-[#8B1E5C]" />
                <h3 className="font-bold text-sm sm:text-base text-[#6D214F]">Recent Candidates</h3>
              </div>
              <Link
                to="/admin/candidates"
                className="text-xs font-bold text-[#8B1E5C] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-2.5">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="p-3 rounded-xl bg-gray-50 animate-pulse h-16" />
                ))}
              </div>
            ) : !data?.recentApplications || data.recentApplications.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#777777] bg-[#FAF8FB] rounded-xl border border-dashed border-[#8B1E5C]/20">
                No recent candidate applications found.
              </div>
            ) : (
              <div className="space-y-2.5">
                {data.recentApplications.slice(0, 4).map((cand, idx) => (
                  <div
                    key={cand._id || idx}
                    className="p-3 rounded-xl bg-[#FAF8FB] hover:bg-white border border-[#8B1E5C]/10 hover:border-[#8B1E5C]/30 transition-all flex items-center justify-between gap-2"
                  >
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-[#6D214F] truncate">
                        {cand.fullName || cand.name || 'Anonymous Candidate'}
                      </h4>
                      <p className="text-[11px] text-[#666666] truncate">
                        {cand.jobAppliedForA || cand.preferredJobRole || cand.qualification || 'General Application'}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B1E5C]/10 text-[#8B1E5C] shrink-0">
                      {cand.status || 'Received'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#8B1E5C]/10 mt-4">
            <Link
              to="/admin/candidates"
              className="w-full py-2 rounded-xl bg-[#FAF8FB] hover:bg-[#8B1E5C] text-[#8B1E5C] hover:text-white border border-[#8B1E5C]/20 transition-colors text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span>Manage All Candidates</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 2. Recent Contacts */}
        <div className="bg-white p-6 rounded-2xl border border-[#8B1E5C]/15 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#8B1E5C]/10">
              <div className="flex items-center gap-2">
                <Mail className="w-4.5 h-4.5 text-blue-600" />
                <h3 className="font-bold text-sm sm:text-base text-[#6D214F]">Recent Contacts</h3>
              </div>
              <Link
                to="/admin/contacts"
                className="text-xs font-bold text-[#8B1E5C] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-2.5">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="p-3 rounded-xl bg-gray-50 animate-pulse h-16" />
                ))}
              </div>
            ) : !data?.recentContacts || data.recentContacts.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#777777] bg-[#FAF8FB] rounded-xl border border-dashed border-blue-200">
                No recent contact inquiries found.
              </div>
            ) : (
              <div className="space-y-2.5">
                {data.recentContacts.slice(0, 4).map((contact, idx) => (
                  <div
                    key={contact._id || idx}
                    className="p-3 rounded-xl bg-[#FAF8FB] hover:bg-white border border-[#8B1E5C]/10 hover:border-blue-300 transition-all flex items-center justify-between gap-2"
                  >
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-[#6D214F] truncate">
                        {contact.fullName || contact.name || 'Anonymous Contact'}
                      </h4>
                      <p className="text-[11px] text-[#666666] truncate">
                        {contact.subject || contact.message || 'General Inquiry'}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                      Inquiry
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#8B1E5C]/10 mt-4">
            <Link
              to="/admin/contacts"
              className="w-full py-2 rounded-xl bg-[#FAF8FB] hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 transition-colors text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span>View Inquiries Inbox</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3. Recent Job Openings */}
        <div className="bg-white p-6 rounded-2xl border border-[#8B1E5C]/15 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#8B1E5C]/10">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4.5 h-4.5 text-purple-600" />
                <h3 className="font-bold text-sm sm:text-base text-[#6D214F]">Recent Openings</h3>
              </div>
              <Link
                to="/admin/job-openings"
                className="text-xs font-bold text-[#8B1E5C] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-2.5">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="p-3 rounded-xl bg-gray-50 animate-pulse h-16" />
                ))}
              </div>
            ) : !data?.recentJobs || data.recentJobs.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#777777] bg-[#FAF8FB] rounded-xl border border-dashed border-purple-200">
                No recent job openings found.
              </div>
            ) : (
              <div className="space-y-2.5">
                {data.recentJobs.slice(0, 4).map((job, idx) => (
                  <div
                    key={job._id || idx}
                    className="p-3 rounded-xl bg-[#FAF8FB] hover:bg-white border border-[#8B1E5C]/10 hover:border-purple-300 transition-all flex items-center justify-between gap-2"
                  >
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-[#6D214F] truncate">
                        {job.jobTitle || 'Job Opening'}
                      </h4>
                      <p className="text-[11px] text-[#666666] truncate">
                        {job.sector} • {job.location}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                        job.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}
                    >
                      {job.status || 'Active'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#8B1E5C]/10 mt-4">
            <Link
              to="/admin/job-openings"
              className="w-full py-2 rounded-xl bg-[#FAF8FB] hover:bg-purple-600 text-purple-700 hover:text-white border border-purple-200 transition-colors text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span>Manage Job Postings</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboardOverviewPage;
