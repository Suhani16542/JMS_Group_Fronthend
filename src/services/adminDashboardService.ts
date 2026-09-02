import { getFullApiUrl, AUTH_TOKEN_KEY } from './api';

export interface DashboardStats {
  totalCandidates: number;
  totalContacts: number;
  totalJobOpenings: number;
  activeJobOpenings: number;
  totalResumes: number;
}

export interface DashboardOverviewData {
  stats: DashboardStats;
  recentApplications: any[];
  recentContacts: any[];
  recentJobs: any[];
}

const getAuthHeaders = (): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } catch {
    // Storage access error handling
  }
  return headers;
};

const handleAuthError = (status: number) => {
  if (status === 401) {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    } catch {
      // ignore
    }
    if (
      typeof window !== 'undefined' &&
      window.location.pathname.startsWith('/admin') &&
      window.location.pathname !== '/admin/login'
    ) {
      window.location.href = '/admin/login';
    }
  }
};

/**
 * Fetch stats and overview data for Admin Dashboard
 * GET /api/admin/dashboard/stats
 */
export const getDashboardStatsApi = async (): Promise<DashboardOverviewData> => {
  const url = getFullApiUrl('/api/admin/dashboard/stats');

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    handleAuthError(response.status);
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || `Failed to fetch dashboard stats (Status: ${response.status})`);
  }

  const resJson = await response.json().catch(() => ({}));
  const data = resJson.data || resJson;

  // Extract or normalize stats
  const stats: DashboardStats = {
    totalCandidates:
      data.stats?.totalCandidates ??
      data.totalCandidates ??
      data.candidatesCount ??
      0,
    totalContacts:
      data.stats?.totalContacts ??
      data.totalContacts ??
      data.contactsCount ??
      0,
    totalJobOpenings:
      data.stats?.totalJobOpenings ??
      data.totalJobOpenings ??
      data.jobsCount ??
      0,
    activeJobOpenings:
      data.stats?.activeJobOpenings ??
      data.activeJobOpenings ??
      data.activeJobsCount ??
      0,
    totalResumes:
      data.stats?.totalResumes ??
      data.totalResumes ??
      data.resumesCount ??
      0,
  };

  const recentApplications = Array.isArray(data.recentApplications)
    ? data.recentApplications
    : Array.isArray(data.recentCandidates)
    ? data.recentCandidates
    : [];

  const recentContacts = Array.isArray(data.recentContacts) ? data.recentContacts : [];

  const recentJobs = Array.isArray(data.recentJobs)
    ? data.recentJobs
    : Array.isArray(data.recentJobOpenings)
    ? data.recentJobOpenings
    : [];

  return {
    stats,
    recentApplications,
    recentContacts,
    recentJobs,
  };
};

export default getDashboardStatsApi;
