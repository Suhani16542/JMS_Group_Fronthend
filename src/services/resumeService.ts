export interface ResumePayload {
  fullName: string;
  email: string;
  phone: string;
  referenceNumber: string;
  referenceName: string;
  highestQualification?: string;
  experience?: string;
  preferredJobRole?: string;
  resume: File;
}

export interface ResumeUploadResponseData {
  _id: string;
  resumeId?: string;
  fullName: string;
  email: string;
  phone: string;
  highestQualification?: string;
  experience?: string;
  preferredJobRole?: string;
  referenceNumber?: string;
  referenceName?: string;
  resumeUrl?: string;
  viewUrl?: string;
  downloadUrl?: string;
  whatsappUrl?: string;
  whatsappLink?: string;
  deepLink?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface ResumeUploadResponse {
  success: boolean;
  message: string;
  data: ResumeUploadResponseData;
  whatsappUrl?: string;
  deepLink?: string;
  [key: string]: any;
}

const getApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.NEXT_PUBLIC_API_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }
  return import.meta.env.DEV ? 'http://localhost:5000' : 'https://jms-group-backend.onrender.com';
};

export const uploadResumeApi = async (payload: ResumePayload): Promise<ResumeUploadResponse> => {
  const baseUrl = getApiUrl();
  const formData = new FormData();

  formData.append('fullName', payload.fullName);
  formData.append('email', payload.email);
  formData.append('phone', payload.phone);
  formData.append('referenceNumber', payload.referenceNumber);
  formData.append('referenceName', payload.referenceName);
  if (payload.highestQualification) {
    formData.append('highestQualification', payload.highestQualification);
  }
  if (payload.experience) {
    formData.append('experience', payload.experience);
  }
  if (payload.preferredJobRole) {
    formData.append('preferredJobRole', payload.preferredJobRole);
  }
  formData.append('resume', payload.resume);

  const response = await fetch(`${baseUrl}/api/resume`, {
    method: 'POST',
    body: formData,
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    let errorMsg = responseData.message || responseData.error;
    if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
      errorMsg = responseData.errors
        .map((err: any) => (typeof err === 'string' ? err : err.msg || err.message || JSON.stringify(err)))
        .join(' ');
    }
    throw new Error(errorMsg || 'Failed to upload resume. Please try again.');
  }

  return responseData;
};

export interface ResumesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ResumesListResponse {
  resumes: ResumeUploadResponseData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const getAdminAuthHeaders = (): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  try {
    const token = localStorage.getItem('jms_admin_auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } catch {
    // Storage access error
  }
  return headers;
};

/**
 * Fetch uploaded resumes
 * GET /api/resumes
 */
export const getResumesApi = async (params: ResumesQueryParams = {}): Promise<ResumesListResponse> => {
  const baseUrl = getApiUrl();
  const url = new URL(`${baseUrl}/api/resumes`);

  if (params.page) url.searchParams.set('page', String(params.page));
  if (params.limit) url.searchParams.set('limit', String(params.limit));
  if (params.search && params.search.trim()) url.searchParams.set('search', params.search.trim());

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: getAdminAuthHeaders(),
  });

  if (!response.ok) {
    if (response.status === 401) {
      try {
        localStorage.removeItem('jms_admin_auth_token');
      } catch {
        // ignore
      }
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    const errJson = await response.json().catch(() => ({}));
    throw new Error(errJson.message || `Failed to fetch resumes (Status: ${response.status})`);
  }

  const resData = await response.json().catch(() => ({}));

  let rawList: any[] = [];
  let total = 0;
  let page = params.page || 1;
  let limit = params.limit || 10;
  let totalPages = 1;

  if (Array.isArray(resData.data)) {
    rawList = resData.data;
    total = rawList.length;
  } else if (resData.data && Array.isArray(resData.data.resumes)) {
    rawList = resData.data.resumes;
    total = resData.data.total ?? rawList.length;
    page = resData.data.page ?? page;
    limit = resData.data.limit ?? limit;
    totalPages = resData.data.totalPages || Math.ceil(total / limit) || 1;
  } else if (Array.isArray(resData.resumes)) {
    rawList = resData.resumes;
    total = resData.total ?? rawList.length;
    page = resData.page ?? page;
    limit = resData.limit ?? limit;
    totalPages = resData.totalPages || Math.ceil(total / limit) || 1;
  } else if (Array.isArray(resData)) {
    rawList = resData;
    total = rawList.length;
  }

  const resumes: ResumeUploadResponseData[] = rawList.map((item) => ({
    ...item,
    _id: String(item._id || item.id || ''),
    fullName: item.fullName || item.name || item.candidateName || 'Candidate',
    email: item.email || '',
    phone: item.phone || item.mobileNumber || '',
    preferredJobRole: item.preferredJobRole || item.jobRole || item.role || 'Not Specified',
    highestQualification: item.highestQualification || item.qualification || '',
    experience: item.experience || 'Not Specified',
    createdAt: item.createdAt || new Date().toISOString(),
    resumeUrl: item.resumeUrl || item.viewUrl || item.url || '',
    downloadUrl: item.downloadUrl || item.resumeUrl || item.viewUrl || '',
    viewUrl: item.viewUrl || item.resumeUrl || '',
  }));

  return {
    resumes,
    total,
    page,
    limit,
    totalPages,
  };
};

export default uploadResumeApi;
