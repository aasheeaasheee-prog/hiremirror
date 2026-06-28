import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ThumbsUp, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const FeedbackCard = ({ reportData, onSave, onBack }) => {
  const [animatedOverall, setAnimatedOverall] = useState(0);

  // Map incoming props cleanly, matching historical names and requested naming
  const scores = {
    communication: reportData?.communication ?? 85,
    confidence: reportData?.confidence ?? 85,
    clarity: reportData?.clarity ?? reportData?.consistency ?? 80,
    technicalDepth: reportData?.technicalDepth ?? reportData?.techKnowledge ?? 80,
    problemSolving: reportData?.problemSolving ?? 85,
    overallScore: reportData?.overall ?? reportData?.overallScore ?? 85,
    hireabilityScore: reportData?.hireabilityScore ?? Math.round((reportData?.overall ?? 85) * 0.96)
  };

  // Count up animation for overall score
  useEffect(() => {
    const duration = 1000; // ms
    const target = scores.overallScore;
    const step = target / (duration / 16);
    let current = 0;

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setAnimatedOverall(target);
        clearInterval(interval);
      } else {
        setAnimatedOverall(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [scores.overallScore]);

  // Vocal Emotion analysis mock dataset (varied based on confidence score)
  const baseConf = scores.confidence;
  const emotionData = [
    { name: 'Intro', Confident: Math.round(baseConf * 0.7), Neutral: 25, Nervous: 15 },
    { name: 'Q1', Confident: Math.round(baseConf * 0.85), Neutral: 10, Nervous: 5 },
    { name: 'Q2', Confident: Math.round(baseConf * 0.95), Neutral: 5, Nervous: 0 },
    { name: 'Q3', Confident: Math.round(baseConf * 0.8), Neutral: 15, Nervous: 5 },
    { name: 'Q4', Confident: baseConf, Neutral: 10, Nervous: 0 }
  ];

  // Dynamic hireability rank text
  const getHireabilityStatus = (score) => {
    if (score >= 90) return { title: 'Premium Hire', color: 'text-emerald-400', desc: 'Outstanding execution. Exceptional communication and domain depth.' };
    if (score >= 80) return { title: 'Strong Candidate', color: 'text-indigo-300', desc: 'Very solid capability. Communicates issues clearly with good stability.' };
    return { title: 'Needs Practice', color: 'text-purple-400', desc: 'Core capabilities are present. Needs better speech structure and pacing.' };
  };

  const status = getHireabilityStatus(scores.hireabilityScore);

  return (
    <div className="w-full space-y-8 select-none text-left font-sans">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-5 gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase">AI Analytics Report</span>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 mt-1">
            <Award className="w-6 h-6 text-purple-400" />
            Interview Evaluation Report
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Session: <span className="text-white font-semibold uppercase">{reportData?.type || 'General'}</span> • {reportData?.date || 'Today'}
          </p>
        </div>
        
        <div className="flex gap-2">
          {onSave && (
            <button
              onClick={() => onSave({
                ...scores,
                type: reportData?.type,
                date: reportData?.date || 'Today'
              })}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs tracking-wider text-white transition-all shadow-md shadow-purple-500/25"
            >
              Save Report to History
            </button>
          )}
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-bold text-xs tracking-wider text-gray-300 transition-colors"
            >
              Exit to Dashboard
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Radial Hireability Score (4 Cols) */}
        <div className="lg:col-span-4 rounded-2xl glass-panel p-6 border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

          <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-4">Overall Score</span>

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
                stroke="url(#radialFeedbackGrad)"
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * animatedOverall) / 100}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="radialFeedbackGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-white tracking-tight leading-none">{animatedOverall}</span>
              <span className="text-[9px] text-purple-300 font-semibold tracking-widest uppercase mt-1">/ 100</span>
            </div>
          </div>

          <div className="mt-6 space-y-1">
            <h4 className={`text-sm font-bold ${status.color} leading-tight`}>{status.title}</h4>
            <p className="text-[10px] text-gray-400 max-w-[200px] leading-relaxed mt-1">
              {status.desc}
            </p>
          </div>
        </div>

        {/* Competency Dimensions Matrix (8 Cols) */}
        <div className="lg:col-span-8 rounded-2xl glass-panel p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Assessment Breakdown</span>
            <h3 className="text-base font-bold text-white tracking-tight mt-1 mb-5">AI Competency Matrix</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {[
              { label: 'Communication', score: scores.communication, color: 'from-purple-500 to-indigo-500' },
              { label: 'Confidence', score: scores.confidence, color: 'from-indigo-500 to-blue-500' },
              { label: 'Clarity', score: scores.clarity, color: 'from-blue-500 to-cyan-500' },
              { label: 'Technical Depth', score: scores.technicalDepth, color: 'from-pink-500 to-purple-500' },
              { label: 'Problem Solving', score: scores.problemSolving, color: 'from-purple-600 to-pink-500' }
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
                    transition={{ duration: 1, delay: 0.1 * idx }}
                  />
                </div>
              </div>
            ))}
            
            {/* Added Hireability Score Badge to bottom right */}
            <div className="sm:col-span-2 mt-2 bg-purple-500/5 rounded-xl border border-purple-500/10 p-3 flex justify-between items-center text-xs">
              <span className="text-gray-400">Mock Hireability Score Index</span>
              <span className="font-extrabold text-purple-300 text-sm">{scores.hireabilityScore}%</span>
            </div>
          </div>

          <div className="border-t border-white/5 mt-5 pt-3 text-[10px] text-gray-500 flex items-center justify-between">
            <span>Dynamic Telemetry Analysis</span>
            <span className="text-emerald-400 font-medium">✓ Transcript parsing verified</span>
          </div>
        </div>
      </div>

      {/* Strengths, Weaknesses, and Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Strengths */}
        <div className="rounded-2xl glass-panel p-5 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ThumbsUp className="w-4 h-4" />
            </div>
            Strengths
          </div>
          <ul className="text-xs text-gray-400 space-y-2.5 leading-relaxed list-disc pl-4">
            {reportData?.strengths?.map((str, i) => (
              <li key={i}>{str}</li>
            )) || (
              <>
                <li>Strong conceptual knowledge mapping directly to the questions.</li>
                <li>Articulate phrasing with negligible long pauses.</li>
                <li>Excellent confidence and structural alignment.</li>
              </>
            )}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="rounded-2xl glass-panel p-5 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            Weaknesses
          </div>
          <ul className="text-xs text-gray-400 space-y-2.5 leading-relaxed list-disc pl-4">
            {reportData?.weaknesses?.map((weak, i) => (
              <li key={i}>{weak}</li>
            )) || (
              <>
                <li>Minor presence of filler buffers under stress.</li>
                <li>Short technical depth on scale constraints.</li>
                <li>Could structure situational timelines better.</li>
              </>
            )}
          </ul>
        </div>

        {/* Suggestions */}
        <div className="rounded-2xl glass-panel p-5 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3">
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Lightbulb className="w-4 h-4" />
            </div>
            Suggestions
          </div>
          <ul className="text-xs text-gray-400 space-y-2.5 leading-relaxed list-disc pl-4">
            {reportData?.suggestions?.map((sug, i) => (
              <li key={i}>{sug}</li>
            )) || (
              <>
                <li>Incorporate concrete metrics into behavioral outcomes.</li>
                <li>Adopt structural timeline breakdowns (STAR method).</li>
                <li>Keep response length near 60-90 seconds per node.</li>
              </>
            )}
          </ul>
        </div>

      </div>

      {/* Vocal Emotion Timeline (Area Chart) */}
      <div className="rounded-2xl glass-panel p-6 border border-white/10">
        <div className="border-b border-white/10 pb-4 mb-6 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Tone Telemetry</span>
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
              <Area type="monotone" dataKey="Confident" stroke="#34d399" fillOpacity={0.15} fill="url(#colorFeedbackConf)" />
              <Area type="monotone" dataKey="Neutral" stroke="#60a5fa" fillOpacity={0.1} fill="url(#colorFeedbackNeu)" />
              <Area type="monotone" dataKey="Nervous" stroke="#c084fc" fillOpacity={0.05} fill="url(#colorFeedbackNer)" />
              <defs>
                <linearGradient id="colorFeedbackConf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFeedbackNeu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFeedbackNer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c084fc" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#c084fc" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
