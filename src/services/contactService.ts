export interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  referralNumber?: string;
  referralName?: string;
  referenceNumber?: string;
  referenceName?: string;
  counselingTopic?: string;
  [key: string]: any;
}

const getApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.NEXT_PUBLIC_API_URL;
  return envUrl || 'https://jms-group-backend.onrender.com';
};

export const sendContactApi = async (payload: ContactPayload) => {
  const baseUrl = getApiUrl();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      let errorMsg = responseData.message || responseData.error;
      if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
        errorMsg = responseData.errors.join(' ');
      }
      throw new Error(errorMsg || `Submission failed with status ${response.status}`);
    }

    return responseData;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your network connection and try again.');
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network Error: Unable to reach backend server. Please check your connection.');
    }
    throw error;
  }
};

export interface ContactItem {
  _id: string;
  fullName: string;
  name?: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status?: string;
  createdAt?: string;
  [key: string]: any;
}

export interface ContactsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface ContactsListResponse {
  contacts: ContactItem[];
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
 * Fetch contacts with search and pagination
 * GET /api/contacts
 */
export const getContactsApi = async (params: ContactsQueryParams = {}): Promise<ContactsListResponse> => {
  const baseUrl = getApiUrl();
  const url = new URL(`${baseUrl}/api/contacts`);

  if (params.page) url.searchParams.set('page', String(params.page));
  if (params.limit) url.searchParams.set('limit', String(params.limit));
  if (params.search && params.search.trim()) url.searchParams.set('search', params.search.trim());
  if (params.status && params.status !== 'All') url.searchParams.set('status', params.status);

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
    throw new Error(errJson.message || `Failed to fetch contacts (Status: ${response.status})`);
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
  } else if (resData.data && Array.isArray(resData.data.contacts)) {
    rawList = resData.data.contacts;
    total = resData.data.total ?? rawList.length;
    page = resData.data.page ?? page;
    limit = resData.data.limit ?? limit;
    totalPages = resData.data.totalPages || Math.ceil(total / limit) || 1;
  } else if (Array.isArray(resData.contacts)) {
    rawList = resData.contacts;
    total = resData.total ?? rawList.length;
    page = resData.page ?? page;
    limit = resData.limit ?? limit;
    totalPages = resData.totalPages || Math.ceil(total / limit) || 1;
  } else if (Array.isArray(resData)) {
    rawList = resData;
    total = rawList.length;
  }

  const contacts: ContactItem[] = rawList.map((item) => ({
    ...item,
    _id: String(item._id || item.id || ''),
    fullName: item.fullName || item.name || 'Anonymous Contact',
    email: item.email || '',
    phone: item.phone || item.mobile || '',
    subject: item.subject || 'General Inquiry',
    message: item.message || '',
    status: item.status || 'Received',
    createdAt: item.createdAt || new Date().toISOString(),
  }));

  return {
    contacts,
    total,
    page,
    limit,
    totalPages,
  };
};

/**
 * Fetch a single contact details by ID
 * GET /api/contacts/:id
 */
export const getContactByIdApi = async (id: string): Promise<ContactItem> => {
  const baseUrl = getApiUrl();
  const response = await fetch(`${baseUrl}/api/contacts/${id}`, {
    method: 'GET',
    headers: getAdminAuthHeaders(),
  });

  if (!response.ok) {
    const errJson = await response.json().catch(() => ({}));
    throw new Error(errJson.message || `Failed to fetch contact details (Status: ${response.status})`);
  }

  const resJson = await response.json().catch(() => ({}));
  const item = resJson.data || resJson;

  return {
    ...item,
    _id: String(item._id || item.id || id),
    fullName: item.fullName || item.name || 'Anonymous Contact',
  };
};

export default sendContactApi;

