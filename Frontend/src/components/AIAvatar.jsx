import React from 'react';
import { motion } from 'framer-motion';

export const AIAvatar = ({ state = 'idle', size = 160 }) => {
  // state can be: 'idle' | 'listening' | 'speaking'

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      
      {/* Outer Halo Rings */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 blur-xl"
        animate={
          state === 'speaking'
            ? { scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }
            : state === 'listening'
            ? { scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }
            : { scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }
        }
        transition={{
          duration: state === 'speaking' ? 2 : state === 'listening' ? 1.5 : 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Pulsing Concentric Sound Ring 2 */}
      {(state === 'speaking' || state === 'listening') && (
        <motion.div
          className={`absolute inset-4 rounded-full border ${state === 'speaking' ? 'border-purple-500/30 bg-purple-500/5' : 'border-blue-500/30 bg-blue-500/5'}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: [0, 0.5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}

      {/* Pulsing Concentric Sound Ring 1 */}
      {(state === 'speaking' || state === 'listening') && (
        <motion.div
          className={`absolute inset-8 rounded-full border ${state === 'speaking' ? 'border-purple-400/40 bg-purple-400/5' : 'border-blue-400/40 bg-blue-400/5'}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.35, opacity: [0, 0.6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.7
          }}
        />
      )}

      {/* Main Glassmorphic Sphere */}
      <motion.div
        className="absolute inset-8 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[inset_0_4px_20px_rgba(255,255,255,0.08),0_10px_40px_rgba(168,85,247,0.25)] relative overflow-hidden"
        animate={
          state === 'speaking'
            ? { scale: [1, 1.05, 1], borderColor: 'rgba(168, 85, 247, 0.4)' }
            : state === 'listening'
            ? { scale: [1, 1.03, 1], borderColor: 'rgba(59, 130, 246, 0.4)' }
            : { scale: [1, 1.02, 1], borderColor: 'rgba(255, 255, 255, 0.08)' }
        }
        transition={{
          duration: state === 'speaking' ? 1 : state === 'listening' ? 1.5 : 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Symmetrical Internal Nebula Glows */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-blue-500/20 pointer-events-none" />

        {/* Animated Inner Sound Wave Orbs */}
        <div className="flex items-center gap-1.5 z-10 relative">
          {[0, 1, 2, 3, 4].map((bar) => {
            let heightRange;
            let durationVal;

            if (state === 'speaking') {
              heightRange = [16, [36, 48, 24][bar % 3], 16];
              durationVal = 0.6 + (bar % 3) * 0.15;
            } else if (state === 'listening') {
              heightRange = [12, [24, 30, 18][bar % 3], 12];
              durationVal = 0.8 + (bar % 3) * 0.15;
            } else {
              // Slow idle breathing
              heightRange = [12, 16, 12];
              durationVal = 2 + (bar % 2) * 0.5;
            }

            return (
              <motion.div
                key={bar}
                className={`w-1 rounded-full ${
                  state === 'speaking'
                    ? 'bg-gradient-to-t from-purple-500 to-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                    : state === 'listening'
                    ? 'bg-gradient-to-t from-blue-500 to-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.8)]'
                    : 'bg-white/30'
                }`}
                animate={{
                  height: heightRange
                }}
                transition={{
                  duration: durationVal,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ height: 16 }}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Symmetrical Orbit Nodes */}
      <motion.div
        className={`absolute w-3 h-3 rounded-full ${state === 'speaking' ? 'bg-purple-500 shadow-[0_0_10px_#a855f7]' : state === 'listening' ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-white/20'}`}
        animate={
          state === 'speaking'
            ? { rotate: 360, scale: [1, 1.2, 1] }
            : state === 'listening'
            ? { rotate: 360 }
            : { rotate: 360 }
        }
        transition={{
          duration: state === 'speaking' ? 6 : state === 'listening' ? 10 : 18,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          transformOrigin: 'center center',
          top: 10,
          left: '50%',
          marginLeft: -6
        }}
      />
    </div>
  );
};
