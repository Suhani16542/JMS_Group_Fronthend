import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { adminAuthService, AdminLoginCredentials, AdminUser } from '@/services/adminAuthService';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  isLoading: boolean;
  login: (credentials: AdminLoginCredentials) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => adminAuthService.isAuthenticated());
  const [user, setUser] = useState<AdminUser | null>(() => adminAuthService.getCurrentUser());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Sync state in case of changes in other tabs
    const handleStorageChange = () => {
      setIsAuthenticated(adminAuthService.isAuthenticated());
      setUser(adminAuthService.getCurrentUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = useCallback(async (credentials: AdminLoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await adminAuthService.login(credentials);
      setIsAuthenticated(true);
      setUser(response.user || null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    adminAuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      isLoading,
      login,
      logout,
    }),
    [isAuthenticated, user, isLoading, login, logout]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export default AdminAuthContext;
