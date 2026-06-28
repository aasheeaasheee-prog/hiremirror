import React from 'react';
import { motion } from 'framer-motion';

export const Logo = ({ size = 64, showText = false, animated = true }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <div 
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Animated Ambient Glow */}
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-md"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Symmetrical Mirror Outer Frame */}
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#mirrorGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="280"
            animate={animated ? {
              strokeDashoffset: [280, 0],
              rotate: [0, 360]
            } : {}}
            transition={{
              strokeDashoffset: { duration: 2, ease: "easeInOut" },
              rotate: { duration: 25, repeat: Infinity, ease: "linear" }
            }}
          />

          {/* Symmetrical Reflective Border Glow */}
          <motion.circle
            cx="50"
            cy="50"
            r="38"
            stroke="url(#mirrorInnerGradient)"
            strokeWidth="1.5"
            strokeDasharray="10 5"
            animate={animated ? {
              rotate: [360, 0]
            } : {}}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Microphone Core Body (Mirror Symmetrical Capsule) */}
          <motion.rect
            x="42"
            y="30"
            width="16"
            height="26"
            rx="8"
            fill="url(#capsuleGradient)"
            stroke="url(#capsuleBorderGradient)"
            strokeWidth="1.5"
            animate={animated ? {
              y: [30, 28, 30]
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Microphone Symmetrical Grill Lines */}
          <line x1="46" y1="36" x2="54" y2="36" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
          <line x1="44" y1="41" x2="56" y2="41" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
          <line x1="46" y1="46" x2="54" y2="46" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />

          {/* Neural Net Nodes - Symmetrical Reflections */}
          {/* Left Node */}
          <motion.circle
            cx="26"
            cy="50"
            r="3.5"
            fill="#a855f7"
            animate={animated ? {
              scale: [1, 1.4, 1],
              opacity: [0.7, 1, 0.7]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          {/* Right Node */}
          <motion.circle
            cx="74"
            cy="50"
            r="3.5"
            fill="#3b82f6"
            animate={animated ? {
              scale: [1, 1.4, 1],
              opacity: [0.7, 1, 0.7]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />

          {/* Symmetrical Neural Paths connecting to Microphone */}
          <motion.path
            d="M 29.5 50 Q 38 50 42 46"
            stroke="url(#neuralGradientPurple)"
            strokeWidth="1.5"
            strokeDasharray="6 3"
            animate={animated ? {
              strokeDashoffset: [20, 0]
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 70.5 50 Q 62 50 58 46"
            stroke="url(#neuralGradientBlue)"
            strokeWidth="1.5"
            strokeDasharray="6 3"
            animate={animated ? {
              strokeDashoffset: [-20, 0]
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Symmetrical Soundwaves bottom reflection */}
          <motion.path
            d="M 38 66 Q 50 78 62 66"
            stroke="url(#soundwaveGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            animate={animated ? {
              strokeWidth: [2, 3, 2],
              opacity: [0.5, 0.9, 0.5]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Custom Definitions for Gradients */}
          <defs>
            <linearGradient id="mirrorGradient" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="mirrorInnerGradient" x1="0" y1="100" x2="100" y2="0">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="capsuleGradient" x1="42" y1="30" x2="58" y2="56">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f0e2b" />
            </linearGradient>
            <linearGradient id="capsuleBorderGradient" x1="42" y1="30" x2="58" y2="56">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="neuralGradientPurple" x1="26" y1="50" x2="42" y2="46">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="neuralGradientBlue" x1="74" y1="50" x2="58" y2="46">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="soundwaveGradient" x1="38" y1="66" x2="62" y2="66">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-bold tracking-tight text-xl text-white font-sans bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-200">
            HireMirror <span className="text-primary font-extrabold text-gradient-purple-blue">AI</span>
          </span>
          <span className="text-[10px] text-gray-400 font-sans tracking-[0.2em] uppercase -mt-0.5">
            Reflect. Improve. Get Hired.
          </span>
        </div>
      )}
    </div>
  );
};
