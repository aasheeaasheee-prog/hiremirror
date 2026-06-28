import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Sliders, Bell, UserCog, Save, Lock, Mail, User, ShieldAlert, Key } from 'lucide-react';

export const Settings = () => {
  const [glowStrength, setGlowStrength] = useState(80);
  const [particleSpeed, setParticleSpeed] = useState(25);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [vocalInsights, setVocalInsights] = useState(true);
  const [jobMatches, setJobMatches] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Account details
  const [name, setName] = useState('Alex Mercer');
  const [email, setEmail] = useState('alex@stanford.edu');
  const [password, setPassword] = useState('');

  // API Key integration
  const [geminiKey, setGeminiKey] = useState('');

  // Load settings on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('hiremirror_gemini_api_key');
    if (savedKey) setGeminiKey(savedKey);

    const savedProfile = localStorage.getItem('hiremirror_user_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.name) setName(parsed.name);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);

      // Save Gemini key
      localStorage.setItem('hiremirror_gemini_api_key', geminiKey.trim());

      // Save profile name updates to user profile store
      const savedProfile = localStorage.getItem('hiremirror_user_profile');
      let profileObj = {};
      if (savedProfile) {
        try { profileObj = JSON.parse(savedProfile); } catch (err) {}
      }
      profileObj.name = name;
      localStorage.setItem('hiremirror_user_profile', JSON.stringify(profileObj));

      alert("Preferences and Gemini API Key successfully saved and synced.");
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto space-y-6 text-left select-none relative z-10 font-sans"
    >
      {/* Header */}
      <div className="border-b border-white/10 pb-4 mb-4">
        <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase">Platform Controls</span>
        <h2 className="text-xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
          <SettingsIcon className="w-5.5 h-5.5 text-purple-400" /> Platform Settings
        </h2>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Preferences (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Theme Preferences */}
          <div className="rounded-2xl glass-panel p-5 border border-white/10 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-2.5">
              <Sliders className="w-4 h-4 text-purple-400" /> Theme Preferences
            </h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="text-white font-semibold block">SaaS Dark Theme</span>
                  <span className="text-[10px] text-gray-500">Platform base colors locked at deep black/navy.</span>
                </div>
                <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 uppercase">
                  ACTIVE // LOCKED
                </span>
              </div>

              {/* Glow Backlight slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 font-medium">Ambient Backlight Glow Strength</span>
                  <span className="text-white">{glowStrength}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={glowStrength}
                  onChange={(e) => setGlowStrength(e.target.value)}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              {/* Particle Speed slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 font-medium">Canvas Floating Particle Speed</span>
                  <span className="text-white">{particleSpeed}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={particleSpeed}
                  onChange={(e) => setParticleSpeed(e.target.value)}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-2xl glass-panel p-5 border border-white/10 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-2.5">
              <Bell className="w-4 h-4 text-blue-400" /> Notifications Settings
            </h4>

            <div className="space-y-3.5 select-none">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-white block">Vocal Analysis Insights</span>
                  <span className="text-[10px] text-gray-500 block">Get detailed email performance stats on verbal pacing.</span>
                </div>
                <input
                  type="checkbox"
                  checked={vocalInsights}
                  onChange={(e) => setVocalInsights(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-purple-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-white block">Interview Reminders</span>
                  <span className="text-[10px] text-gray-500 block">Alerts for scheduled mock sessions or target role deadlines.</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-purple-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-white block">Job Match Alerts</span>
                  <span className="text-[10px] text-gray-500 block">Instant notifications when hiring managers request mock telemetry profiles.</span>
                </div>
                <input
                  type="checkbox"
                  checked={jobMatches}
                  onChange={(e) => setJobMatches(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-purple-500 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* NEW API Integration Card */}
          <div className="rounded-2xl glass-panel p-5 border border-white/10 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-2.5">
              <Key className="w-4 h-4 text-emerald-400" /> API Integrations
            </h4>
            
            <div className="space-y-3">
              <div className="text-xs space-y-1">
                <label className="text-gray-300 font-semibold block">Google Gemini API Key</label>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="glass-input px-3 py-2 text-xs rounded-xl w-full text-white placeholder-gray-600 focus:outline-none font-mono"
                  placeholder="AI Key (AIzaSy...)"
                />
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed font-sans">
                Supplying your own API key connects the platform to the live Gemini 1.5/2.5 models to evaluate and parse your transcripts. If empty, the platform defaults to a local heuristic evaluation system. Key is stored locally in your browser memory.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Account Management (4 Cols) */}
        <div className="lg:col-span-4 rounded-2xl glass-panel p-5 border border-white/10 h-fit space-y-4 flex flex-col">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-2.5">
            <UserCog className="w-4 h-4 text-pink-400" /> Account Settings
          </h4>

          <div className="space-y-3.5">
            {/* Full Name */}
            <div className="space-y-1 text-left">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600 pointer-events-none">
                  <User className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-input pl-8 pr-3 py-2 text-xs rounded-xl w-full text-white placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1 text-left">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600 pointer-events-none">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input pl-8 pr-3 py-2 text-xs rounded-xl w-full text-white placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Password Credentials */}
            <div className="space-y-1 text-left">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Update Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600 pointer-events-none">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input pl-8 pr-3 py-2 text-xs rounded-xl w-full text-white placeholder-gray-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSaving}
                className="w-full py-2.5 px-3 rounded-xl font-bold text-xs tracking-wider text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-md flex items-center justify-center gap-1.5"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" /> Save Changes
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>

      </form>
    </motion.div>
  );
};
