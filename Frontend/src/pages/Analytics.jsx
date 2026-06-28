import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Calendar } from 'lucide-react';
import { AnalyticsCharts } from '../components/AnalyticsCharts';

export const Analytics = ({ sessions = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto space-y-6 text-left select-none relative z-10 font-sans"
    >
      {/* Header */}
      <div className="border-b border-white/10 pb-4 mb-4 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase">Analytics Dashboard</span>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
            <BarChart3 className="w-5.5 h-5.5 text-purple-400" /> Platform Insights Telemetry
          </h2>
        </div>
        
        <div className="px-3.5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md">
          <Calendar className="w-3.5 h-3.5" /> 30-Day Aggregated Data
        </div>
      </div>

      {/* Embed Dynamic Recharts */}
      <AnalyticsCharts sessions={sessions} />

    </motion.div>
  );
};
