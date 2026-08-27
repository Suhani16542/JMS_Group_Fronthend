import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';

export const AdminProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect unauthenticated user to admin login with return path
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
