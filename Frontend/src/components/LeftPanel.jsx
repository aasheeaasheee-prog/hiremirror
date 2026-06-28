import React from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, Sparkles, Activity, Mic, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LeftPanel = () => {
  const features = [
    {
      icon: <Brain className="w-5 h-5 text-purple-400" />,
      title: "AI Interview Analysis",
      desc: "Instant feedback on content quality and response structure."
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-blue-400" />,
      title: "Communication Insights",
      desc: "Track pacing, fluency, filler words, and vocabulary strength."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
      title: "Confidence Scoring",
      desc: "Analyze voice tone, inflection, stability, and facial presence."
    },
    {
      icon: <Activity className="w-5 h-5 text-pink-400" />,
      title: "Performance Tracking",
      desc: "Track historical growth across industries and role-specific metrics."
    }
  ];

  return (
    <div className="flex flex-col justify-between h-full p-8 lg:p-16 text-left relative overflow-hidden select-none">
      
      {/* Upper Brand Section */}
      <div className="space-y-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          Next-Gen AI Technology
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.1] font-sans"
        >
          Master Every <br />
          <span className="text-gradient-purple-blue">Interview with AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-gray-300 text-base lg:text-lg max-w-xl font-normal leading-relaxed"
        >
          Practice high-fidelity mock interviews, receive comprehensive multi-dimensional AI feedback, optimize communication speed, and secure your target career.
        </motion.p>
      </div>

      {/* Center Interactive Floating Preview Dashboard */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="my-8 lg:my-0 flex justify-center items-center z-10"
      >
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-full max-w-[420px] rounded-2xl glass-panel p-6 border border-white/10 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Symmetrical glowing corner accents */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Candidate Card Status Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[1px]">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-xs font-semibold text-white">
                    HM
                  </div>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white leading-tight">Live Interview Session</h4>
                <p className="text-[10px] text-gray-400">Software Engineer Role</p>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
              <Mic className="w-3 h-3" /> Live
            </div>
          </div>

          {/* Waveform Visualization Grid */}
          <div className="bg-black/40 rounded-xl p-4 border border-white/5 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-semibold tracking-wider text-purple-300 uppercase">Fluency Waveform</span>
              <span className="text-[10px] text-gray-400">Pacing: 132 WPM</span>
            </div>
            
            {/* Animated soundwaves */}
            <div className="h-10 flex items-end justify-between gap-[3px] px-2 py-1">
              {[6, 12, 28, 16, 8, 22, 34, 18, 30, 42, 24, 12, 18, 28, 40, 20, 10, 24, 14, 6].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-full bg-gradient-to-t from-purple-500 to-blue-400"
                  animate={{
                    height: [h - 4, h + 8, h - 4]
                  }}
                  transition={{
                    duration: 1.5 + (i % 3) * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Feedback Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
              <span className="text-[10px] text-gray-400 block mb-0.5">Confidence Score</span>
              <span className="text-lg font-bold text-white tracking-tight">96%</span>
              <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-purple-500 to-blue-400 h-full"
                  initial={{ width: 0 }}
                  animate={{ width: "96%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
              <span className="text-[10px] text-gray-400 block mb-0.5">Filler Word Rate</span>
              <span className="text-lg font-bold text-emerald-400 tracking-tight">1.2%</span>
              <span className="text-[9px] text-emerald-400/80 block mt-1">✓ Excellent control</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Symmetrical Feature Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 z-10">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: "easeOut" }}
            className="glass-panel glass-panel-hover rounded-xl p-4 border border-white/5 flex gap-3.5 items-start"
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 shrink-0">
              {f.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wide">{f.title}</h3>
              <p className="text-xs text-gray-400 leading-normal mt-0.5">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
    </div>
  );
};
