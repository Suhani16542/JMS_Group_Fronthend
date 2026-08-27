import axios from 'axios';

export const AUTH_TOKEN_KEY = 'jms_admin_auth_token';
export const AUTH_USER_KEY = 'jms_admin_user';

export const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.NEXT_PUBLIC_API_URL || '';
  const trimmed = envUrl.trim().replace(/\/+$/, '');
  if (!trimmed) {
    return import.meta.env.DEV ? 'http://localhost:5000' : 'https://jms-group-backend.onrender.com';
  }
  return trimmed;
};

export const getFullApiUrl = (endpoint: string): string => {
  const base = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  if (base.endsWith('/api') && cleanEndpoint.startsWith('/api/')) {
    return `${base}${cleanEndpoint.slice(4)}`;
  }
  if (!base.endsWith('/api') && !cleanEndpoint.startsWith('/api/')) {
    return `${base}/api${cleanEndpoint}`;
  }
  return `${base}${cleanEndpoint}`;
};

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Attach JWT token if available
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Handle storage access error gracefully
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and user on 401 Unauthorized
      try {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
      } catch {
        // ignore
      }

      // If user is currently on an admin page (other than login), redirect to login
      if (
        typeof window !== 'undefined' &&
        window.location.pathname.startsWith('/admin') &&
        window.location.pathname !== '/admin/login'
      ) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
