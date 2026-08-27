import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Loader2,
  Briefcase,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAdminAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});

  // If already authenticated, redirect to /admin/dashboard
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const validateEmail = (val: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val.trim());
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!email.trim()) {
      setErrorMessage('Official Email or Gmail ID is required.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Password is required.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await login({ email: email.trim(), password: password.trim() });
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message || 'Invalid email or password');
      } else {
        setErrorMessage('Invalid email or password. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF8FB] flex flex-col justify-between selection:bg-[#8B1E5C] selection:text-white relative overflow-hidden font-sans">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#8B1E5C]/10 to-[#C2188B]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#7A1F4D]/10 to-[#8B1E5C]/5 blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="w-full border-b border-[#8B1E5C]/10 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo/logo.png"
              alt="JMS Group"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              onError={(e) => {
                // Fallback text if logo file is missing
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="text-base font-black text-[#6D214F] tracking-tight flex items-center gap-1.5">
                JMS Group
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#FAF8FB] text-[#8B1E5C] border border-[#8B1E5C]/20">
                  HR Portal
                </span>
              </span>
            </div>
          </Link>

          <Link
            to="/recent-openings"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FAF8FB] hover:bg-white text-xs font-semibold text-[#8B1E5C] border border-[#8B1E5C]/20 transition-all shadow-xs hover:shadow-sm"
          >
            <span>Public Openings</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Login Card Section */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-9 border border-[#8B1E5C]/20 shadow-[0_20px_50px_rgba(109,33,79,0.08)] relative"
        >
          {/* Top Security Icon & Pill */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] text-white flex items-center justify-center mx-auto shadow-md shadow-[#8B1E5C]/20 ring-4 ring-[#FAF8FB]">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FAF8FB] text-[#8B1E5C] text-[11px] font-bold uppercase tracking-wider border border-[#8B1E5C]/15">
              <Sparkles className="w-3 h-3 text-[#C2188B]" />
              <span>Admin & HR Portal</span>
            </div>

            <h1 className="text-2xl sm:text-[26px] font-black text-[#6D214F] tracking-tight pt-1">
              Admin Login
            </h1>
            <p className="text-xs sm:text-sm text-[#555555]">
              Sign in to manage job openings
            </p>
          </div>

          {/* Validation / Error Message Alert */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 rounded-xl bg-red-50/90 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <div className="flex-1">
                <span>{errorMessage}</span>
              </div>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold text-[#6D214F] mb-1.5 uppercase tracking-wider"
              >
                Official Email / Gmail ID <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-[#8B1E5C]" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  placeholder="admin@jmsgroup.com"
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#FAF8FB] border text-xs sm:text-sm text-[#222222] placeholder:text-[#999999] transition-all focus:outline-none focus:bg-white focus:ring-2 ${
                    touched.email && !isEmailValid && email.length > 0
                      ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
                      : 'border-[#8B1E5C]/20 focus:border-[#8B1E5C] focus:ring-[#8B1E5C]/15'
                  }`}
                />
              </div>
              {touched.email && !isEmailValid && email.length > 0 && (
                <p className="mt-1 text-[11px] text-red-600 font-medium">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold text-[#6D214F] mb-1.5 uppercase tracking-wider"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-[#8B1E5C]" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                  placeholder="Enter your admin password"
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-xl bg-[#FAF8FB] border text-xs sm:text-sm text-[#222222] placeholder:text-[#999999] transition-all focus:outline-none focus:bg-white focus:ring-2 ${
                    touched.password && !isPasswordValid
                      ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
                      : 'border-[#8B1E5C]/20 focus:border-[#8B1E5C] focus:ring-[#8B1E5C]/15'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8B1E5C] hover:text-[#7A1F4D] transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#7A1F4D] via-[#8B1E5C] to-[#C2188B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating Admin...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Secure Portal Footnote */}
          <div className="mt-6 pt-5 border-t border-[#8B1E5C]/10 text-center space-y-3">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#777777]">
              <Briefcase className="w-3.5 h-3.5 text-[#8B1E5C]" />
              <span>Restricted HR & Admin Access Area</span>
            </div>
            <div>
              <Link
                to="/recent-openings"
                className="inline-flex items-center gap-1.5 text-xs text-[#8B1E5C] font-semibold hover:underline"
              >
                <span>← Back to Public Recent Openings</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Portal Footer */}
      <footer className="w-full py-4 text-center text-xs text-[#777777] border-t border-[#8B1E5C]/10 bg-white/60 backdrop-blur-xs">
        <p>© {new Date().getFullYear()} JMS Group. All rights reserved. Secure HR Portal.</p>
      </footer>
    </div>
  );
};

export default AdminLoginPage;
