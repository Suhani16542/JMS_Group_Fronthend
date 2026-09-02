import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import {
  LayoutDashboard,
  Users,
  Mail,
  Briefcase,
  FileText,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  User,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAdminAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Analytics & Overview',
    },
    {
      to: '/admin/candidates',
      label: 'Candidates',
      icon: Users,
      description: 'Applications & Screening',
    },
    {
      to: '/admin/contacts',
      label: 'Contacts',
      icon: Mail,
      description: 'Inquiries & Messages',
    },
    {
      to: '/admin/job-openings',
      label: 'Job Openings',
      icon: Briefcase,
      description: 'Postings & Requisitions',
    },
    {
      to: '/admin/resumes',
      label: 'Resumes',
      icon: FileText,
      description: 'Candidate CVs',
    },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/admin/dashboard')) return 'Dashboard Overview';
    if (path.startsWith('/admin/candidates')) return 'Candidate Applications';
    if (path.startsWith('/admin/contacts')) return 'Contact Submissions';
    if (path.startsWith('/admin/job-openings') || path.startsWith('/admin/jobs')) return 'Job Openings Management';
    if (path.startsWith('/admin/resumes')) return 'Resume Database';
    return 'Admin Portal';
  };

  return (
    <div className="min-h-screen bg-[#FAF8FB] flex flex-col lg:flex-row font-sans text-[#222222]">
      
      {/* ==================================================== */}
      {/* MOBILE TOP BAR */}
      {/* ==================================================== */}
      <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-[#8B1E5C]/15 px-4 h-16 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl text-[#6D214F] hover:bg-[#FAF8FB] border border-[#8B1E5C]/20 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] text-white flex items-center justify-center font-black text-xs shadow-xs">
              JMS
            </div>
            <div>
              <span className="font-black text-sm text-[#6D214F] leading-tight block">JMS Portal</span>
              <span className="text-[10px] text-[#777777] leading-tight block">{getPageTitle()}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-xl text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </header>

      {/* ==================================================== */}
      {/* MOBILE DRAWER OVERLAY */}
      {/* ==================================================== */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside
            className="w-72 max-w-[85vw] h-full bg-white border-r border-[#8B1E5C]/20 shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#8B1E5C]/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  JMS
                </div>
                <div>
                  <h2 className="text-sm font-black text-[#6D214F]">JMS Group</h2>
                  <span className="text-[10px] font-bold text-[#8B1E5C] uppercase tracking-wider">
                    Recruitment Admin
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#8B1E5C] text-white shadow-sm'
                          : 'text-[#555555] hover:text-[#6D214F] hover:bg-[#FAF8FB]'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <div className="flex-1">
                      <div>{item.label}</div>
                    </div>
                  </NavLink>
                );
              })}
            </nav>

            {/* Mobile Drawer Footer */}
            <div className="p-4 border-t border-[#8B1E5C]/15 space-y-3 bg-[#FAF8FB]">
              <Link
                to="/recent-openings"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white border border-[#8B1E5C]/20 text-[11px] font-bold text-[#8B1E5C] hover:bg-[#FAF8FB]"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Public Website
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>

              <div className="pt-2 border-t border-[#8B1E5C]/10 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-8 h-8 rounded-full bg-[#8B1E5C]/10 text-[#8B1E5C] flex items-center justify-center font-bold text-xs shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-[#6D214F] truncate">{user?.email || 'Admin'}</div>
                    <div className="text-[9px] text-[#777777] uppercase font-bold">{user?.role || 'Administrator'}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ==================================================== */}
      {/* DESKTOP PERMANENT SIDEBAR */}
      {/* ==================================================== */}
      <aside className="hidden lg:flex w-64 xl:w-72 bg-white border-r border-[#8B1E5C]/15 flex-col justify-between shrink-0 min-h-screen sticky top-0 h-screen z-30">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-[#8B1E5C]/10">
          <Link to="/admin/dashboard" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-[#6D214F] tracking-tight">JMS Group</span>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#8B1E5C]">
                Admin Dashboard
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-[#777777]">
            Portal Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-bold transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7A1F4D] to-[#8B1E5C] text-white shadow-sm'
                      : 'text-[#555555] hover:text-[#6D214F] hover:bg-[#FAF8FB]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#FAF8FB] text-[#8B1E5C] group-hover:bg-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                    </div>
                    <div className="flex-1">
                      <div className="leading-tight">{item.label}</div>
                      <div
                        className={`text-[10px] font-normal leading-tight mt-0.5 ${
                          isActive ? 'text-white/80' : 'text-[#777777]'
                        }`}
                      >
                        {item.description}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isActive ? 'text-white translate-x-0.5' : 'text-transparent group-hover:text-[#8B1E5C]'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#8B1E5C]/15 space-y-3 bg-[#FAF8FB]">
          <Link
            to="/recent-openings"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-white border border-[#8B1E5C]/20 text-xs font-bold text-[#8B1E5C] hover:bg-white/80 hover:border-[#8B1E5C]/40 transition-colors shadow-xs"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Public Website
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          {/* User Profile Card */}
          <div className="p-3 rounded-xl bg-white border border-[#8B1E5C]/15 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B1E5C]/15 to-[#FAF8FB] text-[#8B1E5C] flex items-center justify-center font-black text-xs shrink-0 border border-[#8B1E5C]/20">
                <User className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-[#6D214F] truncate">{user?.email || 'admin@jmsgroup.com'}</div>
                <div className="text-[10px] text-[#777777] font-semibold uppercase">{user?.role || 'Administrator'}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
              title="Log Out from Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* ==================================================== */}
      {/* MAIN CONTENT WORKSPACE */}
      {/* ==================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* Desktop Top Header Bar */}
        <header className="hidden lg:flex sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#8B1E5C]/15 h-16 px-8 items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#777777]">Admin Portal</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#777777]" />
            <span className="font-extrabold text-[#6D214F]">{getPageTitle()}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected to MongoDB Backend
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-xs font-bold text-red-700 border border-red-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
