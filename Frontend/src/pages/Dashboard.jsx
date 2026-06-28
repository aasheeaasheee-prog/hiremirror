import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  History,
  BarChart2,
  Settings,
  LogOut,
  Award,
  Video,
  Clock,
  ArrowRight,
  TrendingUp,
  User,
  BookOpen
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { InterviewRoom } from './InterviewRoom';
import { FeedbackCard } from '../components/FeedbackCard';
import { Analytics } from './Analytics';
import { InterviewHistory } from './InterviewHistory';
import { Profile } from './Profile';
import { Settings as SettingsPage } from './Settings';
import { InterviewGuide } from './InterviewGuide';

export const Dashboard = ({ user, onLogout }) => {
  const [currentTab, setCurrentTab] = useState('dashboard'); // 'dashboard' | 'interviewer' | 'history' | 'analytics' | 'profile' | 'settings' | 'feedback'
  const [currentReport, setCurrentReport] = useState(null);
  const [interviewSessions, setInterviewSessions] = useState([]);

  // Load and seed sessions into localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hiremirror_interview_sessions');
    if (saved) {
      try {
        setInterviewSessions(JSON.parse(saved));
        return;
      } catch (e) {
        console.error("Failed to parse saved sessions:", e);
      }
    }

    const defaultSeed = [
      {
        id: 'session-1',
        type: 'tech',
        date: 'Jun 2, 2026',
        overall: 94,
        communication: 91,
        confidence: 93,
        clarity: 89,
        technicalDepth: 96,
        problemSolving: 92,
        strengths: [
          "Clear verbal pacing: Maintained a consistent tempo (130 wpm) avoiding rushes.",
          "Excellent technical vocabulary: Explained lazy loading, useMemo caching, and WebSockets fluently.",
          "Decoupled architecture: Outlined RabbitMQ message broker decoupling logic clearly."
        ],
        weaknesses: [
          "Filler words: Minor presence of 'um' and 'like' when discussing database schemas.",
          "Include load figures: Could reference exact load factors or server cluster sizes in backend questions.",
          "Brief breathing transitions under stress."
        ],
        suggestions: [
          "Adopt strict timeboxes for technical explanations (60s context, 60s execution).",
          "Ensure latency metrics (e.g. millisecond delays) are cited explicitly.",
          "Integrate the STAR situation-task framework in failure logs."
        ]
      },
      {
        id: 'session-2',
        type: 'behavioral',
        date: 'May 29, 2026',
        overall: 85,
        communication: 88,
        confidence: 84,
        clarity: 86,
        technicalDepth: 82,
        problemSolving: 85,
        strengths: [
          "Resolution Frameworks: Structured dispute resolution using objective benchmarking stats.",
          "Quantified outcomes: Shared project results citing exact time frames.",
          "Sincere self-reflection: Articulated database migration failures and specific takeaways."
        ],
        weaknesses: [
          "Filler terms density: Minor use of vocal buffers during conflict resolution answers.",
          "Role delegation: Detail how task assignments were distributed during crisis intervals.",
          "Watch speech speed swings during stress responses."
        ],
        suggestions: [
          "Incorporate team scale metrics (number of active engineers block size).",
          "Structure the initial situational context more concisely to prevent pacing dips.",
          "Explain the precise long-term impact on stakeholder relationships."
        ]
      },
      {
        id: 'session-3',
        type: 'hr',
        date: 'May 25, 2026',
        overall: 89,
        communication: 90,
        confidence: 91,
        clarity: 85,
        technicalDepth: 88,
        problemSolving: 89,
        strengths: [
          "Professional presentation: Speaks dynamically on frontend design systems and portfolio projects.",
          "Motivations match: Clear career progression timeline aligning with SaaS directions.",
          "Cultural fit: Reflective listening and good interactive pacing."
        ],
        weaknesses: [
          "Watch compensation pivots: Keep descriptions of compensation boundaries brief and clear.",
          "Vocal projection dips when concluding long answers.",
          "Finer grammatical alignments under stress."
        ],
        suggestions: [
          "Structure standard elevator pitches under 90 seconds.",
          "Always verify core company values before answering cultural alignment nodes.",
          "Limit minor vocal shifts when pivoting to weaknesses."
        ]
      }
    ];
    setInterviewSessions(defaultSeed);
    localStorage.setItem('hiremirror_interview_sessions', JSON.stringify(defaultSeed));
  }, []);

  // Update localStorage when local state modifies
  const saveSessionsToLocal = (updatedList) => {
    setInterviewSessions(updatedList);
    localStorage.setItem('hiremirror_interview_sessions', JSON.stringify(updatedList));
  };

  // Helper stats computation
  const getAggregatedStats = () => {
    if (interviewSessions.length === 0) {
      return { overall: "0", confidence: "0%", time: "0 hrs" };
    }
    const sumOverall = interviewSessions.reduce((acc, s) => acc + (s.overall || 0), 0);
    const sumConf = interviewSessions.reduce((acc, s) => acc + (s.confidence || 0), 0);
    const avgOverall = Math.round(sumOverall / interviewSessions.length);
    const avgConf = Math.round(sumConf / interviewSessions.length);
    const calculatedHours = (4.5 + (interviewSessions.length * 1.5)).toFixed(1);

    return {
      overall: `${avgOverall}/100`,
      confidence: `${avgConf}%`,
      time: `${calculatedHours} hrs`
    };
  };

  const aggStats = getAggregatedStats();

  const stats = [
    { label: "Overall Score", value: aggStats.overall, change: "+2.1%", icon: <Award className="w-5 h-5 text-purple-400" /> },
    { label: "Practice Time", value: aggStats.time, change: "+1.5 hrs", icon: <Clock className="w-5 h-5 text-blue-400" /> },
    { label: "Confidence", value: aggStats.confidence, change: "+1.2%", icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> }
  ];

  // Callback on mock interview completion
  const handleInterviewComplete = (interviewData) => {
    setCurrentReport(interviewData);
    setCurrentTab('feedback');
  };

  // Callback to append new session log into State Store
  const handleSaveReport = (savedData) => {
    const newSession = {
      id: `session-${Date.now()}`,
      type: savedData.type || 'General',
      date: savedData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      overall: savedData.overallScore,
      communication: savedData.communication,
      confidence: savedData.confidence,
      clarity: savedData.clarity,
      technicalDepth: savedData.technicalDepth,
      problemSolving: savedData.problemSolving,
      strengths: savedData.strengths || [],
      weaknesses: savedData.weaknesses || [],
      suggestions: savedData.suggestions || [],
      history: currentReport?.history || []
    };

    const updatedList = [newSession, ...interviewSessions];
    saveSessionsToLocal(updatedList);
    setCurrentTab('history');
    setCurrentReport(null);
  };

  const handleStartPracticeDirect = () => {
    setCurrentTab('interviewer');
  };

  const handleDeleteSession = (id) => {
    const updated = interviewSessions.filter(s => s.id !== id);
    saveSessionsToLocal(updated);
  };

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: <Layers className="w-4 h-4" /> },
    { id: "interviewer", label: "AI Interviewer", icon: <Video className="w-4 h-4" /> },
    { id: "guide", label: "Interview Guide", icon: <BookOpen className="w-4 h-4" /> },
    { id: "history", label: "Performance Logs", icon: <History className="w-4 h-4" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart2 className="w-4 h-4" /> },
    { id: "profile", label: "Candidate Profile", icon: <User className="w-4 h-4" /> },
    { id: "settings", label: "Platform Settings", icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-5xl rounded-3xl glass-panel border border-white/10 p-6 lg:p-8 relative shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden text-left"
    >
      {/* Symmetrical backlights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 mb-6 gap-4 z-10 relative">
        <div className="flex items-center gap-3">
          <Logo size={42} showText={false} animated={true} />
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight leading-none">HireMirror AI Workspace</h2>
            <p className="text-xs text-purple-300 font-medium mt-1">Logged in as {user?.email || 'user@example.com'}</p>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
        
        {/* Left Side Navigation Panel */}
        <div className="lg:col-span-1 space-y-2 flex flex-col">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setCurrentReport(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all text-left ${
                currentTab === item.id || (item.id === 'interviewer' && currentTab === 'feedback')
                  ? "bg-gradient-to-r from-purple-500/15 to-blue-500/5 border border-purple-500/30 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]" 
                  : "bg-transparent border border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/[0.02]"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Side Content Panel with dynamic mounting */}
        <div className="lg:col-span-3 min-h-[460px] flex flex-col">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full flex-grow flex flex-col justify-between"
            >
              {/* VIEW 1: Dashboard Overview */}
              {currentTab === 'dashboard' && (
                <div className="space-y-6 w-full">
                  {/* Welcome Banner */}
                  <div className="rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-blue-900/20 border border-purple-500/20 p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1 max-w-md">
                      <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase">Preparation Platform</span>
                      <h3 className="text-xl font-bold text-gradient-primary">Welcome to your AI cockpit!</h3>
                      <p className="text-xs text-gray-300 leading-relaxed mt-1">
                        Your communication stability has improved by 8% this week. Let's record a mock session to solidify your progress.
                      </p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleStartPracticeDirect}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 font-bold text-xs tracking-wider text-white shadow-lg flex items-center gap-2 group self-stretch md:self-auto justify-center"
                    >
                      <Video className="w-3.5 h-3.5 fill-none" /> Start AI Interview
                    </motion.button>
                  </div>

                  {/* Quick Metrics grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {stats.map((s, i) => (
                      <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-400 font-medium block">{s.label}</span>
                          <span className="text-xl font-bold text-white tracking-tight mt-1 block">{s.value}</span>
                          <span className="text-[9px] text-emerald-400 font-semibold block mt-0.5">{s.change}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                          {s.icon}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sessional logs summary */}
                  <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-bold tracking-wider text-purple-300 uppercase">Recent AI Sessions</h4>
                      <button 
                        onClick={() => setCurrentTab('history')}
                        className="text-[10px] text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 group"
                      >
                        View all logs <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {interviewSessions.slice(0, 3).map((session, i) => (
                        <div 
                          key={session.id || i} 
                          className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors flex items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <h5 className="text-xs font-bold text-white leading-none capitalize">{session.type} Mock Session</h5>
                            <p className="text-[10px] text-gray-400">HireMirror AI • {session.date} • Complete</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className="text-xs font-extrabold text-white">{session.overall}%</span>
                              <span className="text-[8px] text-emerald-400 font-medium block leading-none">Passed</span>
                            </div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              session.overall >= 90 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                            }`}>
                              {session.overall >= 90 ? "A" : "B"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: AI Interviewer Panel */}
              {currentTab === 'interviewer' && (
                <InterviewRoom onComplete={handleInterviewComplete} />
              )}

              {/* VIEW 3: Feedback report panel */}
              {currentTab === 'feedback' && (
                <FeedbackCard 
                  reportData={currentReport} 
                  onSave={handleSaveReport}
                  onBack={() => {
                    setCurrentTab('dashboard');
                    setCurrentReport(null);
                  }} 
                />
              )}

              {/* VIEW 4: Performance Logs History */}
              {currentTab === 'history' && (
                <InterviewHistory 
                  sessions={interviewSessions} 
                  onDelete={handleDeleteSession} 
                />
              )}

              {/* VIEW 5: Recharts Analytics Platform */}
              {currentTab === 'analytics' && (
                <Analytics sessions={interviewSessions} />
              )}

              {/* VIEW 6: Candidate Portfolio Profile */}
              {currentTab === 'profile' && (
                <Profile />
              )}

              {/* VIEW 8: Interview Guide Page */}
              {currentTab === 'guide' && (
                <InterviewGuide />
              )}

              {/* VIEW 7: Platform Preference Settings */}
              {currentTab === 'settings' && (
                <SettingsPage />
              )}

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
};
