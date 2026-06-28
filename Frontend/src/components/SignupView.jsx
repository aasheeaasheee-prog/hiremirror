import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export const SignupView = ({ onNavigate, onSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Password requirements state
  const [requirements, setRequirements] = useState({
    length: false,
    number: false,
    special: false,
    casing: false,
  });

  useEffect(() => {
    setRequirements({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
      casing: /[a-z]/.test(password) && /[A-Z]/.test(password),
    });
  }, [password]);

  const strengthCount = Object.values(requirements).filter(Boolean).length;
  
  const getStrengthInfo = () => {
    if (!password) return { text: 'None', color: 'bg-white/10', glow: 'shadow-none', textClass: 'text-gray-500' };
    if (strengthCount <= 1) return { text: 'Weak', color: 'bg-red-500', glow: 'shadow-[0_0_10px_rgba(239,68,68,0.5)]', textClass: 'text-red-400' };
    if (strengthCount <= 3) return { text: 'Medium', color: 'bg-amber-500', glow: 'shadow-[0_0_10px_rgba(245,158,11,0.5)]', textClass: 'text-amber-400' };
    return { text: 'Strong', color: 'bg-emerald-500', glow: 'shadow-[0_0_10px_rgba(16,185,129,0.5)]', textClass: 'text-emerald-400' };
  };

  const strength = getStrengthInfo();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (strengthCount < 4) {
      setError('Please meet all password strength requirements.');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms and Conditions.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Simulate database signup
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit({ fullName, email });
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col items-center max-h-[85vh] overflow-y-auto pr-1">
      
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <Logo size={48} showText={false} animated={true} />
        <h2 className="text-xl font-bold tracking-tight text-white mt-3 font-sans text-center">
          Create HireMirror Account
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide">
          Start your premium interview preparation today.
        </p>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full p-3 mb-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 text-xs text-center font-medium"
        >
          {error}
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleFormSubmit} className="w-full space-y-3.5">
        
        {/* Full Name */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-semibold text-gray-300 font-sans tracking-wide">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Elon Musk"
              className="glass-input pl-10 pr-4 py-2.5 rounded-xl w-full text-sm text-white placeholder-gray-500 font-sans focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1 text-left">
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
              placeholder="elon@spacex.com"
              className="glass-input pl-10 pr-4 py-2.5 rounded-xl w-full text-sm text-white placeholder-gray-500 font-sans focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-semibold text-gray-300 font-sans tracking-wide">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="glass-input pl-10 pr-10 py-2.5 rounded-xl w-full text-sm text-white placeholder-gray-500 font-sans focus:outline-none"
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

        {/* Password Strength Indicator */}
        {password && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 bg-white/[0.01] border border-white/5 rounded-xl p-3.5 text-left"
          >
            <div className="flex justify-between items-center text-[10px] font-semibold text-gray-400">
              <span>Password Security</span>
              <span className={`uppercase font-bold tracking-wider ${strength.textClass}`}>
                {strength.text}
              </span>
            </div>

            {/* Glowing Strength Bar */}
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${strength.color} ${strength.glow} transition-all duration-300`}
                style={{ width: `${(strengthCount / 4) * 100}%` }}
              />
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-[10px]">
              <div className="flex items-center gap-1.5">
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${requirements.length ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-gray-500 border border-white/5'}`}>
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span className={requirements.length ? 'text-emerald-400/80 font-medium' : 'text-gray-500'}>8+ Characters</span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${requirements.casing ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-gray-500 border border-white/5'}`}>
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span className={requirements.casing ? 'text-emerald-400/80 font-medium' : 'text-gray-500'}>Aa & aZ Case</span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${requirements.number ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-gray-500 border border-white/5'}`}>
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span className={requirements.number ? 'text-emerald-400/80 font-medium' : 'text-gray-500'}>At least 1 Number</span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${requirements.special ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-gray-500 border border-white/5'}`}>
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span className={requirements.special ? 'text-emerald-400/80 font-medium' : 'text-gray-500'}>1 Symbol (!@#$)</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Confirm Password */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-semibold text-gray-300 font-sans tracking-wide">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="glass-input pl-10 pr-4 py-2.5 rounded-xl w-full text-sm text-white placeholder-gray-500 font-sans focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="flex items-start text-left py-1 select-none">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs font-medium text-gray-400 hover:text-gray-300 transition">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-purple-500 checked:border-purple-500 focus:ring-0 focus:ring-offset-0 text-purple-500 cursor-pointer mt-0.5"
            />
            <span>
              I agree to the{' '}
              <a href="#terms" className="text-purple-400 font-bold hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="text-purple-400 font-bold hover:underline">
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        {/* Create Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 shadow-[0_4px_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2 group"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Create HireMirror Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </motion.button>
      </form>

      {/* Switch to Login */}
      <div className="mt-6 text-center text-xs text-gray-400 font-medium font-sans">
        Already have an account?{' '}
        <button
          onClick={() => onNavigate('login')}
          className="text-purple-400 hover:text-purple-300 font-bold hover:underline transition ml-1"
        >
          Sign In
        </button>
      </div>

    </div>
  );
};
