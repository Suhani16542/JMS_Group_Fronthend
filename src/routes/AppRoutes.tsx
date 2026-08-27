import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';

import HomePage from '@/pages/home/HomePage';
import AboutPage from '@/pages/about/AboutPage';
import ServicesPage from '@/pages/services/ServicesPage';
import PlacementServicesPage from '@/pages/services/PlacementServicesPage';
import HrConsultingPage from '@/pages/services/HrConsultingPage';
import JobPlacementPage from '@/pages/services/JobPlacementPage';
import JobsPage from '@/pages/jobs/JobsPage';
import EmployersPage from '@/pages/employers/EmployersPage';
import CareerCounsellingPage from '@/pages/career-counselling/CareerCounsellingPage';
import UploadResumePage from '@/pages/upload-resume/UploadResumePage';
import BlogPage from '@/pages/blog/BlogPage';
import ContactPage from '@/pages/contact/ContactPage';
import TeamPage from '@/pages/team/TeamPage';
import CareersPage from '@/pages/careers/CareersPage';
import FaqPage from '@/pages/faq/FaqPage';
import { TermsPage } from '@/pages/legal/TermsPage';
import { PrivacyPolicyPage, DisclaimerPage, CookiePolicyPage } from '@/pages/legal/LegalPages';

import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminProtectedRoute from '@/routes/AdminProtectedRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/our-team" element={<TeamPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/recent-openings" element={<JobsPage />} />

        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/placement" element={<PlacementServicesPage />} />
        <Route path="/services/hr-consulting" element={<HrConsultingPage />} />
        <Route path="/career-counselling" element={<CareerCounsellingPage />} />
        <Route path="/career-counseling" element={<CareerCounsellingPage />} />
        <Route path="/services/job-placement" element={<JobPlacementPage />} />

        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/employers" element={<EmployersPage />} />
        <Route path="/upload-resume" element={<UploadResumePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/blog" element={<BlogPage />} />

        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-conditions" element={<TermsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/candidate-application" element={<Navigate to="/upload-resume" replace />} />
        <Route path="/application" element={<Navigate to="/upload-resume" replace />} />
        <Route path="/apply" element={<Navigate to="/upload-resume" replace />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
      </Route>

      {/* Admin Login Route (Dedicated Auth Screen) */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Routes */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
