import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedBackground } from './components/AnimatedBackground';
import { LeftPanel } from './components/LeftPanel';
import { LoadingScreen } from './components/LoadingScreen';
import { LoginView } from './components/LoginView';
import { SignupView } from './components/SignupView';
import { ForgotPasswordView } from './components/ForgotPasswordView';
import { Dashboard } from './pages/Dashboard';

function App() {
  const [appState, setAppState] = useState('loading'); // 'loading' | 'auth' | 'dashboard'
  const [authStep, setAuthStep] = useState('login'); // 'login' | 'signup' | 'forgot-password'
  const [user, setUser] = useState(null);

  const handleLoginSubmit = (userData) => {
    setUser(userData);
    setAppState('dashboard');
  };

  const handleSignupSubmit = (userData) => {
    setUser(userData);
    // Directly log in on mock signup
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setAuthStep('login');
    setAppState('auth');
  };

  return (
    <div className="relative min-h-screen w-screen bg-[#030014] text-white flex flex-col justify-center items-center overflow-x-hidden font-sans select-none">

      {/* 1. Global Animated Background - Completely continuous, never resets */}
      <AnimatedBackground />

      {/* 2. Unified AnimatePresence for Loading vs Application Views */}
      <AnimatePresence mode="wait">

        {appState === 'loading' && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-50"
          >
            <LoadingScreen onComplete={() => setAppState('auth')} />
          </motion.div>
        )}

        {appState === 'auth' && (
          <motion.div
            key="auth-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 relative z-10"
          >
            {/* Left Branding Column (Spans 7 Cols) - Hidden on Mobile */}
            <div className="hidden lg:block lg:col-span-7 h-full border-r border-white/5 bg-black/10 backdrop-blur-[2px]">
              <LeftPanel />
            </div>

            {/* Right Auth Column (Spans 5 Cols) - Symmetrical & Centered */}
            <div className="col-span-1 lg:col-span-5 flex flex-col justify-center items-center p-4 sm:p-8 md:p-12 relative">

              {/* Glassmorphism Authentication Card wrapper */}
              <motion.div
                layout
                className="w-full max-w-[440px] rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 relative shadow-[0_15px_35px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Symmetrical ambient glows inside the card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Sub-view State Transition Frame */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={authStep}
                    initial={{ opacity: 0, x: authStep === 'login' ? -15 : 15, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: authStep === 'login' ? 15 : -15, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10"
                  >
                    {authStep === 'login' && (
                      <LoginView
                        onNavigate={setAuthStep}
                        onSubmit={handleLoginSubmit}
                      />
                    )}

                    {authStep === 'signup' && (
                      <SignupView
                        onNavigate={setAuthStep}
                        onSubmit={handleSignupSubmit}
                      />
                    )}

                    {authStep === 'forgot-password' && (
                      <ForgotPasswordView
                        onNavigate={setAuthStep}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

              </motion.div>
            </div>
          </motion.div>
        )}

        {appState === 'dashboard' && (
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-screen flex items-center justify-center p-4 relative z-10"
          >
            <Dashboard user={user} onLogout={handleLogout} />
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

export default App;
