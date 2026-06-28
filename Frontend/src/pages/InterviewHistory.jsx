import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, Calendar, Eye, ChevronLeft, Trash2 } from 'lucide-react';
import { FeedbackCard } from '../components/FeedbackCard';

export const InterviewHistory = ({ sessions = [], onDelete }) => {
  const [activeSession, setActiveSession] = useState(null);

  if (activeSession) {
    return (
      <div className="space-y-4 font-sans">
        <button
          onClick={() => setActiveSession(null)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back to History Archives
        </button>
        <FeedbackCard 
          reportData={activeSession} 
          onBack={() => setActiveSession(null)} 
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto space-y-6 text-left select-none relative z-10 font-sans"
    >
      {/* Header */}
      <div className="border-b border-white/10 pb-4 mb-4">
        <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase">Interview Archives</span>
        <h2 className="text-xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
          <History className="w-5.5 h-5.5 text-purple-400" /> Performance Logs History
        </h2>
      </div>

      {sessions.length === 0 ? (
        <div className="rounded-2xl glass-panel p-16 text-center border border-white/10 text-gray-500 flex flex-col items-center justify-center space-y-3">
          <History className="w-10 h-10 opacity-30 text-purple-400" />
          <p className="text-xs">No mock interview logs found. Record a session to seed your archive.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session, i) => (
            <motion.div
              key={session.id || i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl glass-panel p-5 border border-white/5 hover:border-white/15 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {session.type} Interview
                  </span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-purple-400" /> {session.date}
                  </span>
                </div>
                
                <h4 className="text-sm font-semibold text-white leading-snug">
                  Mock Session Report #{sessions.length - i}
                </h4>
                <p className="text-[11px] text-gray-400 leading-relaxed max-w-md line-clamp-2">
                  {session.strengths && session.strengths.length > 0 
                    ? `Key Strength: ${session.strengths[0]}` 
                    : "Telemetry analysis synchronized successfully. Evaluation metrics compiled."
                  }
                </p>
              </div>

              {/* Right Scores & Actions */}
              <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between border-t border-white/5 sm:border-0 pt-3 sm:pt-0">
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[9px] font-semibold text-gray-500 block leading-tight">Score</span>
                    <span className="text-base font-extrabold text-white tracking-tight">{session.overall || 85}%</span>
                  </div>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border text-xs font-extrabold ${
                    (session.overall || 85) >= 90 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                  }`}>
                    {(session.overall || 85) >= 90 ? 'A' : 'B'}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveSession(session)}
                    className="px-3 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 hover:text-white transition-all text-xs font-semibold flex items-center gap-1 group"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Report
                  </button>

                  {onDelete && (
                    <button
                      onClick={() => onDelete(session.id)}
                      className="p-2 rounded-xl bg-red-500/5 hover:bg-red-500/20 border border-red-500/10 text-red-400 transition-colors"
                      title="Delete log"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      )}

    </motion.div>
  );
};
