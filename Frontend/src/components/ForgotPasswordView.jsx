import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

export const ForgotPasswordView = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Simulate sending password reset email
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1800);
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {!isSent ? (
        <>
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <Logo size={56} showText={false} animated={true} />
            <h2 className="text-2xl font-bold tracking-tight text-white mt-4 font-sans text-center">
              Reset Your Password
            </h2>
            <p className="text-xs text-gray-400 mt-2 font-medium tracking-wide text-center max-w-[280px]">
              Enter your email and we'll send you a secure link to recover your credentials.
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
          <form onSubmit={handleFormSubmit} className="w-full space-y-5">
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

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 shadow-[0_4px_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Send Recovery Link
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('login')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Return to Login
            </button>
          </div>
        </>
      ) : (
        /* Success Message Layout */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-6"
        >
          {/* Animated Success Badge */}
          <div className="relative">
            <motion.div
              className="absolute -inset-2 bg-emerald-500/20 rounded-full blur-md"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white font-sans">Recovery Link Sent</h3>
            <p className="text-xs text-gray-400 max-w-[280px] mx-auto leading-relaxed">
              We've dispatched a secure reset authorization token to <span className="text-white font-semibold">{email}</span>.
            </p>
          </div>

          {/* Frosted Action Box */}
          <div className="w-full bg-white/[0.01] border border-white/5 rounded-xl p-4 text-xs text-gray-400 text-left space-y-2 leading-relaxed">
            <div className="flex items-center gap-2 text-white font-semibold mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              Security Guidelines
            </div>
            <p>• The validation link will remain active for exactly 30 minutes.</p>
            <p>• If you don't receive the email, make sure to inspect your spam or junk folder.</p>
          </div>

          {/* Bottom Controls */}
          <div className="space-y-4 w-full pt-2">
            <button
              onClick={() => onNavigate('login')}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              Return to Login
            </button>
            <p className="text-[10px] text-gray-500 font-medium">
              Didn't get the code?{' '}
              <button 
                type="button" 
                onClick={handleFormSubmit}
                className="text-purple-400 hover:text-purple-300 font-bold hover:underline"
              >
                Resend Email
              </button>
            </p>
          </div>
        </motion.div>
      )}

    </div>
  );
};
