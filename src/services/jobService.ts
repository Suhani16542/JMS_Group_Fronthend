import { getFullApiUrl, AUTH_TOKEN_KEY } from './api';

export interface JobOpening {
  _id: string;
  id?: string;
  jobTitle: string;
  sector: string;
  department?: string;
  location: string;
  experience: string;
  qualification: string;
  salary?: string;
  employmentType?: 'Full Time' | 'Part Time' | 'Contract' | 'Internship' | string;
  vacancies?: number;
  jobDescription: string;
  responsibilities?: string[];
  requiredSkills?: string[];
  postedDate?: string;
  closingDate?: string | null;
  status: 'Active' | 'Closed' | string;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobStats {
  total: number;
  active: number;
  closed: number;
  featured: number;
}

export interface JobFilterParams {
  sector?: string;
  location?: string;
  experience?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface JobOpeningsResponse {
  success: boolean;
  message: string;
  data: {
    jobs: JobOpening[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateJobPayload {
  jobTitle: string;
  sector: string;
  location: string;
  experience: string;
  qualification: string;
  jobDescription: string;
  department?: string;
  salary?: string;
  employmentType?: 'Full Time' | 'Part Time' | 'Contract' | 'Internship' | string;
  vacancies?: number;
  responsibilities?: string[];
  requiredSkills?: string[];
  postedDate?: string;
  closingDate?: string | null;
  status?: 'Active' | 'Closed' | string;
  isFeatured?: boolean;
}

export type UpdateJobPayload = Partial<CreateJobPayload>;

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
    // ignore
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
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
      window.location.href = '/admin/login';
    }
  }
};

/**
 * 1. Public API: Fetch active job openings (GET /api/jobs)
 * No Authorization required.
 */
export const getJobOpeningsApi = async (filters: JobFilterParams = {}): Promise<JobOpeningsResponse> => {
  const url = new URL(getFullApiUrl('/api/jobs'));

  if (filters.sector && filters.sector !== 'All') {
    url.searchParams.set('sector', filters.sector.trim());
  }
  if (filters.location && filters.location !== 'All') {
    url.searchParams.set('location', filters.location.trim());
  }
  if (filters.experience && filters.experience !== 'All') {
    url.searchParams.set('experience', filters.experience.trim());
  }
  if (filters.search && filters.search.trim()) {
    url.searchParams.set('search', filters.search.trim());
  }
  if (filters.page) {
    url.searchParams.set('page', String(filters.page));
  }
  if (filters.limit) {
    url.searchParams.set('limit', String(filters.limit));
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(responseData.message || `Failed to fetch jobs (Status: ${response.status})`);
  }

  let jobsList: JobOpening[] = [];
  if (Array.isArray(responseData.data)) {
    jobsList = responseData.data;
  } else if (responseData.data && Array.isArray(responseData.data.jobs)) {
    jobsList = responseData.data.jobs;
  } else if (Array.isArray(responseData.jobs)) {
    jobsList = responseData.jobs;
  } else if (Array.isArray(responseData)) {
    jobsList = responseData;
  }

  return {
    success: responseData.success ?? true,
    message: responseData.message || 'Jobs fetched successfully',
    data: {
      jobs: jobsList.map((j: any) => ({
        ...j,
        id: String(j._id || j.id || ''),
        _id: String(j._id || j.id || ''),
      })),
      total: responseData.data?.total ?? jobsList.length,
      page: responseData.data?.page ?? 1,
      limit: responseData.data?.limit ?? jobsList.length,
      totalPages: responseData.data?.totalPages ?? 1,
    },
  };
};

/**
 * 2. Admin API: Fetch all jobs & statistics (GET /api/jobs/admin/all)
 * Requires Authorization: Bearer <token>
 */
export const getAdminJobsApi = async (): Promise<{ jobs: JobOpening[]; stats: JobStats }> => {
  const url = getFullApiUrl('/api/jobs/admin/all');

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    handleAuthError(response.status);
    const responseData = await response.json().catch(() => ({}));
    throw new Error(responseData.message || `Failed to load admin jobs (Status: ${response.status})`);
  }

  const responseData = await response.json().catch(() => ({}));

  // Adapt to various potential response structures from backend:
  // e.g. { data: { jobs: [...], stats: {...} } } OR { data: [...] } OR { data: { allJobs: [...] } }
  let rawJobs: any[] = [];
  let stats: JobStats | null = null;

  if (Array.isArray(responseData.data)) {
    rawJobs = responseData.data;
  } else if (responseData.data && Array.isArray(responseData.data.jobs)) {
    rawJobs = responseData.data.jobs;
    if (responseData.data.stats || responseData.data.statistics) {
      const s = responseData.data.stats || responseData.data.statistics;
      stats = {
        total: s.total ?? rawJobs.length,
        active: s.active ?? 0,
        closed: s.closed ?? 0,
        featured: s.featured ?? 0,
      };
    }
  } else if (responseData.data && Array.isArray(responseData.data.allJobs)) {
    rawJobs = responseData.data.allJobs;
  } else if (Array.isArray(responseData.jobs)) {
    rawJobs = responseData.jobs;
  }

  // Normalize jobs to ensure id/_id consistency
  const jobs: JobOpening[] = rawJobs.map((j: any) => ({
    ...j,
    id: String(j._id || j.id || ''),
    _id: String(j._id || j.id || ''),
  }));

  // Compute stats if not explicitly provided by backend
  if (!stats) {
    const total = jobs.length;
    const active = jobs.filter((j) => j.status === 'Active').length;
    const closed = jobs.filter((j) => j.status === 'Closed').length;
    const featured = jobs.filter((j) => Boolean(j.isFeatured)).length;
    stats = { total, active, closed, featured };
  }

  return { jobs, stats };
};

/**
 * 3. Admin API: Create a new Job Opening (POST /api/jobs)
 * Requires Authorization: Bearer <token>
 */
export const createJobApi = async (payload: CreateJobPayload): Promise<JobOpening> => {
  const url = getFullApiUrl('/api/jobs');

  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    handleAuthError(response.status);
    let errorMsg = responseData.message || responseData.error;
    if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
      errorMsg = responseData.errors
        .map((err: unknown) => (typeof err === 'string' ? err : (err as { msg?: string; message?: string }).msg || (err as { msg?: string; message?: string }).message || JSON.stringify(err)))
        .join(', ');
    }
    throw new Error(errorMsg || `Failed to create job opening (Status: ${response.status})`);
  }

  const job = responseData.data?.job || responseData.data || responseData.job;
  return {
    ...job,
    id: job?._id || job?.id,
    _id: job?._id || job?.id,
  };
};

/**
 * 4. Admin API: Update a Job Opening (PATCH /api/jobs/:id)
 * Requires Authorization: Bearer <token>
 */
export const updateJobApi = async (id: string, payload: UpdateJobPayload): Promise<JobOpening> => {
  const url = getFullApiUrl(`/api/jobs/${id}`);

  let response = await fetch(url, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  // If PATCH is not allowed, fallback to PUT
  if (response.status === 405 || response.status === 404) {
    response = await fetch(url, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
  }

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    handleAuthError(response.status);
    let errorMsg = responseData.message || responseData.error;
    if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
      errorMsg = responseData.errors
        .map((err: unknown) => (typeof err === 'string' ? err : (err as { msg?: string; message?: string }).msg || (err as { msg?: string; message?: string }).message || JSON.stringify(err)))
        .join(', ');
    }
    throw new Error(errorMsg || `Failed to update job opening (Status: ${response.status})`);
  }

  const job = responseData.data?.job || responseData.data || responseData.job;
  return {
    ...job,
    id: job?._id || job?.id,
    _id: job?._id || job?.id,
  };
};

/**
 * 5. Admin API: Toggle status - Close / Reopen Job (PATCH /api/jobs/:id)
 * Requires Authorization: Bearer <token>
 */
export const toggleJobStatusApi = async (id: string, newStatus: 'Active' | 'Closed'): Promise<JobOpening> => {
  return updateJobApi(id, { status: newStatus });
};

/**
 * 6. Admin API: Delete a Job Opening (DELETE /api/jobs/:id)
 * Requires Authorization: Bearer <token>
 */
export const deleteJobApi = async (id: string): Promise<{ success: boolean; message: string }> => {
  const url = getFullApiUrl(`/api/jobs/${id}`);

  const response = await fetch(url, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    handleAuthError(response.status);
    throw new Error(responseData.message || `Failed to delete job opening (Status: ${response.status})`);
  }

  return {
    success: true,
    message: responseData.message || 'Job opening deleted successfully',
  };
};

export default getJobOpeningsApi;
