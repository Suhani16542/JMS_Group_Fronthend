export interface CandidateApplicationPayload {
  fullName: string;
  fatherOrHusbandName: string;
  dob: string;
  qualification: string;
  specialization?: string;
  permanentAddress: string;
  email: string;
  jobAppliedForA: string;
  jobAppliedForB?: string;
  currentLocation: string;
  locationPreferenceA: string;
  locationPreferenceB?: string;
  currentCtc?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  currentBankOrNbfc?: string;
  currentVertical?: string;
  currentCompany?: string;
  fatherOrHusbandOccupation?: string;
  motherOccupation?: string;
  siblings?: string;
  siblingsOccupation?: string;
  mobileNumber: string;
  alternateNumber?: string;
  fatherNumber?: string;
  referenceNameAndNo?: string;
  candidateSignatureName?: string;
  signature: string; // Base64 data URL from SignaturePad
  termsAccepted: boolean | string;
  resumeId?: string;
  documents?: File[];
  photo?: File | null;
  [key: string]: any;
}

export interface CandidateApplicationResponseData {
  _id: string;
  applicationId?: string;
  fullName: string;
  fatherOrHusbandName: string;
  dob: string;
  qualification: string;
  specialization?: string;
  permanentAddress: string;
  email: string;
  mobileNumber: string;
  jobAppliedForA: string;
  jobAppliedForB?: string;
  currentLocation: string;
  locationPreferenceA: string;
  locationPreferenceB?: string;
  resumeId?: string;
  resumeUrl?: string;
  signature?: string;
  signatureUrl?: string;
  candidateSignatureName?: string;
  termsAccepted: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface CandidateApplicationResponse {
  success: boolean;
  message: string;
  data: CandidateApplicationResponseData;
  [key: string]: any;
}

const getApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.NEXT_PUBLIC_API_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }
  return import.meta.env.DEV ? 'http://localhost:5000' : 'https://jms-group-backend.onrender.com';
};

/**
 * Submits the Candidate Application form to the backend.
 * Handles FormData directly or constructs JSON / multipart/form-data.
 */
export const submitCandidateApplicationApi = async (
  formDataOrPayload: FormData | CandidateApplicationPayload | Record<string, any>,
  photo?: File | null,
  documents?: File[]
): Promise<CandidateApplicationResponse> => {
  const baseUrl = getApiUrl();
  let bodyData: BodyInit;
  let headers: HeadersInit = {};

  if (formDataOrPayload instanceof FormData) {
    bodyData = formDataOrPayload;
  } else {
    const hasFiles = (documents && documents.length > 0) ||
      (Array.isArray(formDataOrPayload.documents) && formDataOrPayload.documents.length > 0) ||
      photo instanceof File ||
      (formDataOrPayload as any).photo instanceof File;

    if (hasFiles) {
      const formData = new FormData();
      Object.entries(formDataOrPayload).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'photo' && key !== 'documents') {
          formData.append(key, typeof value === 'boolean' ? String(value) : (value as any));
        }
      });

      const docList = documents || (formDataOrPayload as any).documents;
      if (Array.isArray(docList)) {
        docList.forEach((doc) => {
          if (doc instanceof File) {
            formData.append('documents', doc);
          }
        });
      }

      bodyData = formData;
    } else {
      // Clean JSON payload
      headers = { 'Content-Type': 'application/json' };
      const jsonPayload = { ...formDataOrPayload };
      delete jsonPayload.photo;
      delete jsonPayload.documents;
      bodyData = JSON.stringify(jsonPayload);
    }
  }

  try {
    const response = await fetch(`${baseUrl}/api/applications`, {
      method: 'POST',
      headers,
      body: bodyData,
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      let errorMsg = responseData.message || responseData.error;
      if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
        errorMsg = responseData.errors
          .map((err: any) => (typeof err === 'string' ? err : err.msg || err.message || JSON.stringify(err)))
          .join(' ');
      }
      throw new Error(errorMsg || `Submission failed with status ${response.status}`);
    }

    return responseData;
  } catch (error: any) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network Error: Unable to reach backend server. Please check your connection.');
    }
    throw error;
  }
};

export interface CandidateApplicationsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  jobRole?: string;
  experience?: string;
  date?: string;
}

export interface CandidateApplicationsListResponse {
  candidates: CandidateApplicationResponseData[];
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
 * Fetch candidate applications with search, filters, and pagination
 * GET /api/candidateapplications
 */
export const getCandidateApplicationsApi = async (
  params: CandidateApplicationsQueryParams = {}
): Promise<CandidateApplicationsListResponse> => {
  const baseUrl = getApiUrl();
  const url = new URL(`${baseUrl}/api/candidateapplications`);

  if (params.page) url.searchParams.set('page', String(params.page));
  if (params.limit) url.searchParams.set('limit', String(params.limit));
  if (params.search && params.search.trim()) url.searchParams.set('search', params.search.trim());
  if (params.status && params.status !== 'All') url.searchParams.set('status', params.status);
  if (params.jobRole && params.jobRole !== 'All') url.searchParams.set('jobRole', params.jobRole);
  if (params.experience && params.experience !== 'All') url.searchParams.set('experience', params.experience);
  if (params.date) url.searchParams.set('date', params.date);

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
    throw new Error(errJson.message || `Failed to fetch candidate applications (Status: ${response.status})`);
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
  } else if (resData.data && Array.isArray(resData.data.candidates)) {
    rawList = resData.data.candidates;
    total = resData.data.total ?? rawList.length;
    page = resData.data.page ?? page;
    limit = resData.data.limit ?? limit;
    totalPages = resData.data.totalPages || Math.ceil(total / limit) || 1;
  } else if (resData.data && Array.isArray(resData.data.applications)) {
    rawList = resData.data.applications;
    total = resData.data.total ?? rawList.length;
    page = resData.data.page ?? page;
    limit = resData.data.limit ?? limit;
    totalPages = resData.data.totalPages || Math.ceil(total / limit) || 1;
  } else if (Array.isArray(resData.candidates)) {
    rawList = resData.candidates;
    total = resData.total ?? rawList.length;
    page = resData.page ?? page;
    limit = resData.limit ?? limit;
    totalPages = resData.totalPages || Math.ceil(total / limit) || 1;
  } else if (Array.isArray(resData.applications)) {
    rawList = resData.applications;
    total = resData.total ?? rawList.length;
  } else if (Array.isArray(resData)) {
    rawList = resData;
    total = rawList.length;
  }

  const candidates: CandidateApplicationResponseData[] = rawList.map((item) => ({
    ...item,
    _id: String(item._id || item.id || ''),
    fullName: item.fullName || item.name || 'Anonymous Candidate',
    email: item.email || '',
    mobileNumber: item.mobileNumber || item.phone || item.alternateNumber || '',
    qualification: item.qualification || item.highestQualification || 'Not Specified',
    experience: item.experience || 'Fresher',
    jobAppliedForA: item.jobAppliedForA || item.preferredJobRole || item.preferredRole || item.appliedJob || 'General',
    status: item.status || 'Pending',
    createdAt: item.createdAt || new Date().toISOString(),
  }));

  return {
    candidates,
    total,
    page,
    limit,
    totalPages,
  };
};

/**
 * Fetch a single candidate application by ID
 * GET /api/candidateapplications/:id
 */
export const getCandidateApplicationByIdApi = async (id: string): Promise<CandidateApplicationResponseData> => {
  const baseUrl = getApiUrl();
  const response = await fetch(`${baseUrl}/api/candidateapplications/${id}`, {
    method: 'GET',
    headers: getAdminAuthHeaders(),
  });

  if (!response.ok) {
    const errJson = await response.json().catch(() => ({}));
    throw new Error(errJson.message || `Failed to fetch candidate details (Status: ${response.status})`);
  }

  const resJson = await response.json().catch(() => ({}));
  const item = resJson.data || resJson;

  return {
    ...item,
    _id: String(item._id || item.id || id),
    fullName: item.fullName || item.name || 'Anonymous Candidate',
  };
};

export default submitCandidateApplicationApi;

