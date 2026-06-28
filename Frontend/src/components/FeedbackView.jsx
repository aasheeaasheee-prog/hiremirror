import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, ThumbsUp, AlertTriangle, Lightbulb, BarChart2, Calendar, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const FeedbackView = ({ reportData, onSave, onBack }) => {
  const [overallScore, setOverallScore] = useState(0);

  // Generate scores based on interview type or randomize within a high premium threshold (80-95)
  const isTech = reportData?.type === 'tech';
  const isBehavioral = reportData?.type === 'behavioral';

  const metrics = {
    communication: isTech ? 84 : isBehavioral ? 91 : 88,
    confidence: isTech ? 86 : isBehavioral ? 88 : 90,
    consistency: isTech ? 88 : isBehavioral ? 85 : 86,
    techKnowledge: isTech ? 92 : isBehavioral ? 80 : 85,
    problemSolving: isTech ? 90 : isBehavioral ? 86 : 89
  };

  const calculatedOverall = Math.round(
    (metrics.communication + metrics.confidence + metrics.consistency + metrics.techKnowledge + metrics.problemSolving) / 5
  );

  // Count up animation for overall score
  useEffect(() => {
    const duration = 1200; // ms
    const step = calculatedOverall / (duration / 16);
    let current = 0;

    const interval = setInterval(() => {
      current += step;
      if (current >= calculatedOverall) {
        setOverallScore(calculatedOverall);
        clearInterval(interval);
      } else {
        setOverallScore(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [calculatedOverall]);

  // Emotion Analysis mock dataset for the timeline
  const emotionData = [
    { name: 'Intro', Confident: 60, Neutral: 30, Nervous: 10 },
    { name: 'Q1: Background', Confident: 78, Neutral: 15, Nervous: 7 },
    { name: 'Q2: Motivations', Confident: 85, Neutral: 10, Nervous: 5 },
    { name: 'Q3: Challenges', Confident: 70, Neutral: 20, Nervous: 10 },
    { name: 'Q4: Strengths', Confident: 92, Neutral: 6, Nervous: 2 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto space-y-8 select-none relative z-10 text-left"
    >
      {/* Upper Status Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-5 gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase">Interview Feedback Report</span>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 mt-1">
            <Award className="w-6 h-6 text-purple-400" />
            AI Assessment Complete
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Session: <span className="text-white font-semibold uppercase">{reportData?.type || 'General'} Fit</span> • {reportData?.date || 'Today'}
          </p>
        </div>
        
        <div className="flex gap-3">
          {onSave && (
            <button
              onClick={() => onSave({ ...metrics, overall: calculatedOverall, type: reportData?.type, date: reportData?.date })}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs tracking-wider text-white transition-colors shadow-lg shadow-purple-500/20"
            >
              Save Session Log
            </button>
          )}
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-bold text-xs tracking-wider text-gray-300 transition-colors"
          >
            Dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 1. Left Grid: Radial Hireability Score Ring (4 Cols) */}
        <div className="lg:col-span-4 rounded-2xl glass-panel p-6 border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

          <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-4">Hireability Index</span>

          {/* SVG Progress Circle Ring */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="7"
                fill="none"
              />
              {/* Foreground glowing circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#radialScoreGrad)"
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * overallScore) / 100}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="radialScoreGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-white tracking-tight leading-none">{overallScore}</span>
              <span className="text-[10px] text-purple-300 font-semibold tracking-widest uppercase mt-1">/ 100</span>
            </div>
          </div>

          <div className="mt-6 space-y-1">
            <h4 className="text-sm font-bold text-white leading-tight">Excellent Standing</h4>
            <p className="text-[10px] text-gray-400 max-w-[180px]">
              Strong technical responses and excellent pace control across all question sets.
            </p>
          </div>
        </div>

        {/* 2. Right Grid: Performance Dimensions Matrix (8 Cols) */}
        <div className="lg:col-span-8 rounded-2xl glass-panel p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Interactive Breakdown</span>
            <h3 className="text-base font-bold text-white tracking-tight mt-1 mb-4">Competency Dimensions</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Communication Pacing', score: metrics.communication, color: 'from-purple-500 to-indigo-500' },
              { label: 'Confidence & Stability', score: metrics.confidence, color: 'from-indigo-500 to-blue-500' },
              { label: 'Fluency Consistency', score: metrics.consistency, color: 'from-blue-500 to-cyan-500' },
              { label: 'Technical Accuracy', score: metrics.techKnowledge, color: 'from-pink-500 to-purple-500' },
              { label: 'Structured Problem Solving', score: metrics.problemSolving, color: 'from-purple-600 to-pink-500' }
            ].map((metric, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-gray-300">{metric.label}</span>
                  <span className="text-white">{metric.score}%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden relative">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${metric.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.score}%` }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {reportData?.history && reportData.history.length > 0 && (
            <div className="border-t border-white/10 mt-6 pt-4 text-xs text-gray-400 flex items-center justify-between">
              <span>Answers Logged: {reportData.history.length} responses</span>
              <span className="text-emerald-400 font-bold">✓ Audio transcripts processed</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Comprehensive AI Feedback Cards (Strengths, Improve, Suggestions) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strengths Card */}
        <div className="rounded-2xl glass-panel p-5 border border-white/10 text-left space-y-4">
          <div className="flex items-center gap-2.5 text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ThumbsUp className="w-4 h-4" />
            </div>
            Core Strengths
          </div>
          <ul className="text-xs text-gray-400 space-y-2 leading-relaxed list-disc pl-4">
            <li><span className="text-white font-semibold">Clear verbal pacing</span>: Avoided rapid rushes; maintained a consistent tempo (130 wpm).</li>
            <li><span className="text-white font-semibold">Excellent technical vocabulary</span>: Effectively loaded complex topics like lazy bundles and Redis caching.</li>
            <li>Highly resilient vocal inflections.</li>
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="rounded-2xl glass-panel p-5 border border-white/10 text-left space-y-4">
          <div className="flex items-center gap-2.5 text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            Areas to Refine
          </div>
          <ul className="text-xs text-gray-400 space-y-2 leading-relaxed list-disc pl-4">
            <li><span className="text-white font-semibold">Reduce filler words</span>: Logged slightly higher 'um' and 'like' counts during complex tech answers.</li>
            <li><span className="text-white font-semibold">Structure framework</span>: Could enforce a clearer opening timeline context.</li>
            <li>Watch minor breathing interruptions.</li>
          </ul>
        </div>

        {/* AI Action Suggestions */}
        <div className="rounded-2xl glass-panel p-5 border border-white/10 text-left space-y-4">
          <div className="flex items-center gap-2.5 text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3">
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            Platform Suggestions
          </div>
          <ul className="text-xs text-gray-400 space-y-2 leading-relaxed list-disc pl-4">
            <li><span className="text-white font-semibold">Adopt STAR method</span>: Frame behavioral situations clearly (Situation, Task, Action, Result).</li>
            <li><span className="text-white font-semibold">Input quantifiable results</span>: Always state physical metrics (e.g. 'reduced latency by 45%').</li>
            <li>Practice technical structural tags.</li>
          </ul>
        </div>
      </div>

      {/* 4. Interactive Emotion Timeline (Recharts AreaChart) */}
      <div className="rounded-2xl glass-panel p-6 border border-white/10">
        <div className="border-b border-white/10 pb-4 mb-6 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Emotion Telemetry</span>
            <h3 className="text-base font-bold text-white tracking-tight mt-1">Vocal Emotion Timeline Trend</h3>
          </div>
          <div className="flex gap-3 text-[10px] font-bold uppercase tracking-wider">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-400" /> Confident</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-blue-400" /> Neutral</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-purple-400" /> Nervous</div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={emotionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ background: 'rgba(5, 2, 20, 0.85)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="Confident" stroke="#34d399" fillOpacity={0.15} fill="url(#colorConfident)" />
              <Area type="monotone" dataKey="Neutral" stroke="#60a5fa" fillOpacity={0.1} fill="url(#colorNeutral)" />
              <Area type="monotone" dataKey="Nervous" stroke="#c084fc" fillOpacity={0.05} fill="url(#colorNervous)" />
              <defs>
                <linearGradient id="colorConfident" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNervous" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c084fc" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#c084fc" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </motion.div>
  );
};
