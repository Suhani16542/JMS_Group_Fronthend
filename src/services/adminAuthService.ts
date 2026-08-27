/**
 * Admin Authentication Service
 * Connected to REAL Backend API: POST /api/admin/login
 */

import { getFullApiUrl, AUTH_TOKEN_KEY, AUTH_USER_KEY } from './api';

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminUser {
  email: string;
  name?: string;
  role: string;
}

export interface AdminAuthResponse {
  success: boolean;
  message: string;
  user?: AdminUser;
  token?: string;
}

export const adminAuthService = {
  /**
   * Real Admin Login API Call
   * POST /api/admin/login
   */
  async login(credentials: AdminLoginCredentials): Promise<AdminAuthResponse> {
    const { email, password } = credentials;

    // Validate inputs
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      throw new Error('Please enter a valid official email address.');
    }

    if (!password || password.trim().length === 0) {
      throw new Error('Password is required.');
    }

    const url = getFullApiUrl('/api/admin/login');

    let response: Response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      });
    } catch {
      throw new Error('Cannot connect to the authentication server. Please verify backend is running.');
    }

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid email or password');
      }

      // Handle custom error message or validation errors array
      let errorMsg = responseData.message || responseData.error;
      if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
        errorMsg = responseData.errors
          .map((err: unknown) => (typeof err === 'string' ? err : (err as { msg?: string; message?: string }).msg || (err as { msg?: string; message?: string }).message || JSON.stringify(err)))
          .join(', ');
      }
      throw new Error(errorMsg || `Authentication failed (Status: ${response.status})`);
    }

    // Extract token and admin user from backend response
    // Typical backend response: { success: true, message: '...', data: { token: '...', admin: { email: '...', role: 'admin' } } }
    const token = responseData.data?.token || responseData.token;
    if (!token) {
      throw new Error('Authentication succeeded but no security token was returned.');
    }

    const rawAdmin = responseData.data?.admin || responseData.admin || {};
    const adminUser: AdminUser = {
      email: rawAdmin.email || email.trim().toLowerCase(),
      name: rawAdmin.name || (rawAdmin.email ? rawAdmin.email.split('@')[0].toUpperCase() : 'Admin'),
      role: rawAdmin.role || 'admin',
    };

    // Store token and user details (never password)
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(adminUser));
    } catch {
      // LocalStorage access handling
    }

    return {
      success: true,
      message: responseData.message || 'Login successful',
      user: adminUser,
      token,
    };
  },

  /**
   * Clears the current admin session
   */
  logout(): void {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } catch {
      // Handle error gracefully
    }
  },

  /**
   * Checks if an admin session is currently active
   */
  isAuthenticated(): boolean {
    try {
      return Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
    } catch {
      return false;
    }
  },

  /**
   * Retrieves the currently logged in admin user data
   */
  getCurrentUser(): AdminUser | null {
    try {
      const stored = localStorage.getItem(AUTH_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  /**
   * Retrieves the stored auth token
   */
  getToken(): string | null {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch {
      return null;
    }
  },
};

export default adminAuthService;
