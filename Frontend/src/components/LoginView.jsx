import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export const LoginView = ({ onNavigate, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load email from localStorage if Remember Me was active
  useEffect(() => {
    const savedEmail = localStorage.getItem('hiremirror_remember_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Simulate authenticating against HireMirror API
    setTimeout(() => {
      setIsSubmitting(false);
      if (rememberMe) {
        localStorage.setItem('hiremirror_remember_email', email);
      } else {
        localStorage.removeItem('hiremirror_remember_email');
      }
      onSubmit({ email });
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-8">
        <Logo size={56} showText={false} animated={true} />
        <h2 className="text-2xl font-bold tracking-tight text-white mt-4 font-sans text-center">
          Login to HireMirror <span className="text-gradient-purple-blue">AI</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide">
          Reflect. Improve. Get Hired.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full p-3 mb-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 text-xs text-center font-medium"
        >
          {error}
        </motion.div>
      )}

      {/* Main Login Form */}
      <form onSubmit={handleFormSubmit} className="w-full space-y-4">
        
        {/* Email Field */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-gray-300 font-sans tracking-wide">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="glass-input pl-10 pr-4 py-3 rounded-xl w-full text-sm text-white placeholder-gray-500 font-sans focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5 text-left">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-gray-300 font-sans tracking-wide">
              Password
            </label>
            <button
              type="button"
              onClick={() => onNavigate('forgot-password')}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 hover:underline transition font-sans"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="glass-input pl-10 pr-10 py-3 rounded-xl w-full text-sm text-white placeholder-gray-500 font-sans focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me Toggle */}
        <div className="flex items-center text-left py-1 select-none">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-gray-400 hover:text-gray-300 transition">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-purple-500 checked:border-purple-500 focus:ring-0 focus:ring-offset-0 text-purple-500 cursor-pointer"
            />
            Remember me
          </label>
        </div>

        {/* Primary Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 shadow-[0_4px_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Login to HireMirror AI
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </motion.button>
      </form>

      {/* Social Divider */}
      <div className="w-full flex items-center my-6">
        <div className="flex-grow border-t border-white/5" />
        <span className="px-3 text-[10px] font-semibold text-gray-500 uppercase tracking-widest font-sans">
          Or continue with
        </span>
        <div className="flex-grow border-t border-white/5" />
      </div>

      {/* Social Buttons Grid */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {/* Google OAuth */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => onSubmit({ email: 'sundarpichai@google.com' })}
          className="py-3 px-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-xs font-semibold text-gray-300 hover:text-white flex items-center justify-center gap-2.5 transition-colors"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          Google
        </motion.button>

        {/* LinkedIn OAuth */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => onSubmit({ email: 'jobseeker@linkedin.com' })}
          className="py-3 px-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-xs font-semibold text-gray-300 hover:text-white flex items-center justify-center gap-2.5 transition-colors"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="#0077B5"/>
          </svg>
          LinkedIn
        </motion.button>
      </div>

      {/* Switch to Signup View Link */}
      <div className="mt-8 text-center text-xs text-gray-400 font-medium font-sans">
        Don't have an account?{' '}
        <button
          onClick={() => onNavigate('signup')}
          className="text-purple-400 hover:text-purple-300 font-bold hover:underline transition ml-1"
        >
          Create Account
        </button>
      </div>

    </div>
  );
};
