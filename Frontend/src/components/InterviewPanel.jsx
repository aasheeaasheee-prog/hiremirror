import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Cpu,
  Users,
  MessageSquare,
  Brain,
  Award,
  ChevronLeft,
  Sliders,
  CheckCircle,
  Hash,
  Target,
  Layers
} from 'lucide-react';

export const InterviewPanel = ({ onStartSession }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRole, setSelectedRole] = useState('Frontend Developer');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Intermediate');
  const [selectedQuestionsCount, setSelectedQuestionsCount] = useState(5);

  const categories = [
    {
      id: 'hr',
      title: 'HR Interview',
      desc: 'Cultural fit, motivation, career goals',
      icon: <Briefcase className="w-4 h-4 text-purple-400" />,
      accent: 'purple',
      border: 'border-purple-500/20',
      bg: 'bg-purple-500/5',
      hoverBorder: 'hover:border-purple-500/40',
      activeBorder: 'border-purple-500/50',
      activeBg: 'bg-purple-500/10',
      dot: 'bg-purple-400'
    },
    {
      id: 'tech',
      title: 'Technical Interview',
      desc: 'Coding, system design, backend & frontend',
      icon: <Cpu className="w-4 h-4 text-blue-400" />,
      accent: 'blue',
      border: 'border-blue-500/20',
      bg: 'bg-blue-500/5',
      hoverBorder: 'hover:border-blue-500/40',
      activeBorder: 'border-blue-500/50',
      activeBg: 'bg-blue-500/10',
      dot: 'bg-blue-400'
    },
    {
      id: 'behavioral',
      title: 'Behavioral Interview',
      desc: 'Problem solving, teamwork, leadership',
      icon: <Users className="w-4 h-4 text-pink-400" />,
      accent: 'pink',
      border: 'border-pink-500/20',
      bg: 'bg-pink-500/5',
      hoverBorder: 'hover:border-pink-500/40',
      activeBorder: 'border-pink-500/50',
      activeBg: 'bg-pink-500/10',
      dot: 'bg-pink-400'
    },
    {
      id: 'communication',
      title: 'Communication',
      desc: 'Speech clarity, presentation skills',
      icon: <MessageSquare className="w-4 h-4 text-emerald-400" />,
      accent: 'emerald',
      border: 'border-emerald-500/20',
      bg: 'bg-emerald-500/5',
      hoverBorder: 'hover:border-emerald-500/40',
      activeBorder: 'border-emerald-500/50',
      activeBg: 'bg-emerald-500/10',
      dot: 'bg-emerald-400'
    },
    {
      id: 'aptitude',
      title: 'Aptitude',
      desc: 'Logical reasoning & math puzzles',
      icon: <Brain className="w-4 h-4 text-amber-400" />,
      accent: 'amber',
      border: 'border-amber-500/20',
      bg: 'bg-amber-500/5',
      hoverBorder: 'hover:border-amber-500/40',
      activeBorder: 'border-amber-500/50',
      activeBg: 'bg-amber-500/10',
      dot: 'bg-amber-400'
    },
    {
      id: 'leadership',
      title: 'Leadership',
      desc: 'Decision making & people management',
      icon: <Award className="w-4 h-4 text-indigo-400" />,
      accent: 'indigo',
      border: 'border-indigo-500/20',
      bg: 'bg-indigo-500/5',
      hoverBorder: 'hover:border-indigo-500/40',
      activeBorder: 'border-indigo-500/50',
      activeBg: 'bg-indigo-500/10',
      dot: 'bg-indigo-400'
    }
  ];

  const jobRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Java Developer',
    'Python Developer',
    'MERN Stack Developer',
    'Data Analyst',
    'UI/UX Designer',
    'DevOps Engineer',
    'Mobile App Developer'
  ];

  const difficulties = [
    { label: 'Beginner', desc: 'Foundational concepts' },
    { label: 'Intermediate', desc: 'Real-world scenarios' },
    { label: 'Advanced', desc: 'Expert-level depth' }
  ];

  const questionCounts = [
    { value: 5, label: '5 Questions', sub: '~10 min' },
    { value: 10, label: '10 Questions', sub: '~20 min' },
    { value: 15, label: '15 Questions', sub: '~30 min' }
  ];

  const handleStart = () => {
    if (!selectedCategory) return;
    onStartSession({
      category: selectedCategory,
      role: selectedRole,
      difficulty: selectedDifficulty,
      questionsCount: selectedQuestionsCount
    });
  };

  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div className="w-full max-w-3xl mx-auto py-4 font-sans">
      <AnimatePresence mode="wait">

        {/* ── STEP 1: SELECT CATEGORY ── */}
        {!selectedCategory ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Header */}
            <div className="text-left space-y-1">
              <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase">
                AI Interviewer
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Select Interview Category
              </h2>
              <p className="text-xs text-gray-400">
                Choose a session type to begin your AI-powered mock interview.
              </p>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {categories.map((cat, idx) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    group p-4 rounded-xl border text-left transition-all duration-300
                    bg-white/[0.02] ${cat.border} ${cat.hoverBorder}
                    hover:bg-white/[0.05] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]
                  `}
                >
                  {/* Icon wrapper — same style as Dashboard stat cards */}
                  <div className={`inline-flex p-2 rounded-lg border border-white/10 ${cat.bg} mb-3`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-xs font-bold text-white leading-tight mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {cat.desc}
                  </p>
                  {/* Hover arrow */}
                  <div className="mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-purple-400 font-semibold">Select</span>
                    <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

        ) : (

          /* ── STEP 2: CONFIGURE INTERVIEW ── */
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 text-left"
          >
            {/* Back + Header */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <div className="h-4 w-px bg-white/10" />
              {/* Selected category badge */}
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${currentCategory?.border} ${currentCategory?.bg}`}>
                {currentCategory?.icon}
                <span className="text-[10px] font-bold text-white">{currentCategory?.title}</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase">Step 2 of 2</span>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                Configure Interview
              </h2>
            </div>

            {/* ── JOB ROLE ── */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-semibold text-gray-300 tracking-wide">Target Job Role</span>
              </div>
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="
                    w-full px-4 py-3 rounded-xl text-xs font-semibold text-white
                    bg-white/[0.03] border border-white/10
                    hover:border-white/20 focus:border-purple-500/50
                    focus:outline-none focus:ring-0
                    focus:shadow-[0_0_0_1px_rgba(168,85,247,0.25)]
                    transition-all duration-300
                    appearance-none cursor-pointer
                  "
                  style={{ background: 'rgba(5,2,20,0.6)' }}
                >
                  {jobRoles.map(role => (
                    <option key={role} value={role} style={{ background: '#0a0520' }}>
                      {role}
                    </option>
                  ))}
                </select>
                {/* Custom chevron */}
                <ChevronLeft className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none -rotate-90" />
              </div>
            </div>

            {/* ── DIFFICULTY ── */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-semibold text-gray-300 tracking-wide">Difficulty Level</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {difficulties.map(({ label, desc }) => (
                  <button
                    key={label}
                    onClick={() => setSelectedDifficulty(label)}
                    className={`
                      px-3 py-3 rounded-xl border text-left transition-all duration-300
                      ${selectedDifficulty === label
                        ? 'bg-gradient-to-br from-purple-500/15 to-blue-500/10 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.12)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${selectedDifficulty === label ? 'text-white' : 'text-gray-300'}`}>
                        {label}
                      </span>
                      {selectedDifficulty === label && (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ── QUESTIONS COUNT ── */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Hash className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-semibold text-gray-300 tracking-wide">Number of Questions</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {questionCounts.map(({ value, label, sub }) => (
                  <button
                    key={value}
                    onClick={() => setSelectedQuestionsCount(value)}
                    className={`
                      px-3 py-3 rounded-xl border text-left transition-all duration-300
                      ${selectedQuestionsCount === value
                        ? 'bg-gradient-to-br from-blue-500/15 to-indigo-500/10 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.12)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${selectedQuestionsCount === value ? 'text-white' : 'text-gray-300'}`}>
                        {label}
                      </span>
                      {selectedQuestionsCount === value && (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">{sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ── SESSION SUMMARY ── */}
            <div className="rounded-xl bg-white/[0.02] border border-white/8 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border border-white/10 ${currentCategory?.bg}`}>
                  {currentCategory?.icon}
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Session Preview</p>
                  <p className="text-xs font-bold text-white">{currentCategory?.title} · {selectedRole}</p>
                  <p className="text-[10px] text-gray-500">{selectedDifficulty} · {selectedQuestionsCount} questions</p>
                </div>
              </div>
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>

            {/* ── START BUTTON ── same gradient style as Dashboard "Start AI Interview" */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="
                w-full px-5 py-3.5 rounded-xl font-bold text-xs tracking-wider text-white
                bg-gradient-to-r from-purple-600 to-blue-600
                hover:from-purple-500 hover:to-blue-500
                shadow-lg shadow-purple-900/30
                flex items-center justify-center gap-2
                transition-all duration-300
              "
            >
              Start AI Interview
              <ArrowRight className="w-4 h-4" />
            </motion.button>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};