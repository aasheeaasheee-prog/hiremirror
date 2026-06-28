import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate premium resource loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400); // Slight delay for smooth fadeout
          return 100;
        }
        // Random step sizes for realistic feeling
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 180);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 bg-[#030014] z-50 flex flex-col justify-center items-center select-none overflow-hidden">
      
      {/* Background abstract glowing node fields */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[200px] h-[200px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative flex flex-col items-center max-w-sm px-8 text-center z-10">
        
        {/* Animated Rotating Outer Glow Rings */}
        <div className="relative mb-8">
          <motion.div
            className="absolute -inset-4 rounded-full border border-purple-500/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-8 rounded-full border border-dashed border-blue-500/5"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          <Logo size={96} showText={false} animated={true} />
        </div>

        {/* Brand Text */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold tracking-tight text-white font-sans"
        >
          HireMirror <span className="text-primary text-gradient-purple-blue">AI</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-xs text-gray-400 tracking-[0.25em] uppercase mt-1 mb-8"
        >
          Reflect. Improve. Get Hired.
        </motion.p>

        {/* Progress bar container */}
        <div className="w-[200px] bg-white/[0.04] backdrop-blur-md border border-white/5 h-[5px] rounded-full overflow-hidden mb-3 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-400"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>

        {/* Loading Description */}
        <motion.span
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-xs text-purple-300 font-medium font-sans tracking-wide"
        >
          Preparing Your Interview Experience... {progress}%
        </motion.span>
      </div>

      {/* Floating subtle lines at bottom */}
      <div className="absolute bottom-8 text-[9px] text-gray-600 font-mono tracking-widest uppercase">
        SECURE PROTOCOL ACTIVE // END-TO-END ENCRYPTED
      </div>
    </div>
  );
};
