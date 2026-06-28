import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, MapPin, Code, FolderGit2, Download, ShieldCheck, Edit3, Check, X } from 'lucide-react';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Mercer",
    title: "Software Engineering Specialist",
    degree: "Bachelor of Science in Computer Science",
    college: "Stanford University",
    location: "San Francisco, CA",
    skills: ["React 19", "Vite", "Tailwind CSS v4", "Framer Motion", "Recharts", "Node.js", "TypeScript", "Python"],
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    projects: [
      {
        title: "HireMirror AI Platform",
        desc: "Designed and engineered an AI-powered mock interview platform utilizing time-sequenced speech simulations, real-time vocal transcription, and modular SPA state routing.",
        tags: ["React", "Tailwind CSS", "Framer Motion"]
      },
      {
        title: "Socket Throttler Middleware",
        desc: "Created a buffering protocol that batches high-frequency incoming socket metrics in memory, locking render rates at 60 FPS and cutting browser CPU usage by 60%.",
        tags: ["Node.js", "WebSockets", "Redis"]
      }
    ]
  });

  const [editForm, setEditForm] = useState({ ...profile });

  // Load profile from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hiremirror_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        setEditForm(parsed);
      } catch (e) {
        console.error("Failed to load profile:", e);
      }
    }
  }, []);

  const handleSave = () => {
    // Convert skills text comma format to list
    let processedSkills = editForm.skills;
    if (typeof processedSkills === 'string') {
      processedSkills = processedSkills.split(',').map(s => s.trim()).filter(Boolean);
    }

    const updatedProfile = {
      ...editForm,
      skills: processedSkills
    };

    setProfile(updatedProfile);
    setEditForm(updatedProfile);
    localStorage.setItem('hiremirror_user_profile', JSON.stringify(updatedProfile));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...profile });
    setIsEditing(false);
  };

  const handleDownloadResume = () => {
    alert("Simulating secure Resume PDF download protocol...");
  };

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
          <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase">User Space</span>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
            <User className="w-5.5 h-5.5 text-purple-400" /> Candidate Profile
          </h2>
        </div>

        <div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors text-xs font-semibold flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 transition-colors text-xs font-semibold flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Avatar & Socials card (4 Cols) */}
        <div className="lg:col-span-4 rounded-2xl glass-panel p-6 border border-white/10 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 p-[1.5px] shadow-lg shadow-purple-500/10">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-2xl font-bold text-white">
                {profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'AM'}
              </div>
            </div>
            <div className="absolute bottom-0 right-1 w-6 h-6 bg-purple-600 rounded-full border-2 border-slate-950 flex items-center justify-center text-[10px] text-white">
              ✓
            </div>
          </div>

          {isEditing ? (
            <div className="w-full space-y-2 mb-3">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="glass-input px-3 py-1.5 text-xs rounded-xl w-full text-white text-center focus:outline-none"
                placeholder="Full Name"
              />
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="glass-input px-3 py-1.5 text-xs rounded-xl w-full text-purple-300 text-center focus:outline-none"
                placeholder="Job Title"
              />
            </div>
          ) : (
            <>
              <h3 className="text-lg font-bold text-white tracking-tight leading-none">{profile.name}</h3>
              <span className="text-[10px] text-purple-300 font-semibold tracking-wider uppercase mt-2">
                {profile.title}
              </span>
            </>
          )}

          <div className="w-full border-t border-white/5 my-4" />

          {/* Details */}
          <div className="w-full space-y-3.5 text-left text-xs text-gray-400">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.college}
                  onChange={(e) => setEditForm({ ...editForm, college: e.target.value })}
                  className="glass-input px-2.5 py-1 text-xs rounded-lg w-full text-white focus:outline-none"
                  placeholder="University"
                />
              ) : (
                <span>{profile.college}</span>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="glass-input px-2.5 py-1 text-xs rounded-lg w-full text-white focus:outline-none"
                  placeholder="Location"
                />
              ) : (
                <span>{profile.location}</span>
              )}
            </div>

            <div className="flex items-center gap-2.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>AI Verified Status</span>
            </div>
          </div>

          <div className="w-full border-t border-white/5 my-4" />

          {/* Socials & Resume actions */}
          <div className="grid grid-cols-2 gap-2 w-full">
            {isEditing ? (
              <div className="col-span-2 space-y-2">
                <input
                  type="text"
                  value={editForm.githubUrl}
                  onChange={(e) => setEditForm({ ...editForm, githubUrl: e.target.value })}
                  className="glass-input px-2.5 py-1 text-xs rounded-lg w-full text-white focus:outline-none"
                  placeholder="GitHub URL"
                />
                <input
                  type="text"
                  value={editForm.linkedinUrl}
                  onChange={(e) => setEditForm({ ...editForm, linkedinUrl: e.target.value })}
                  className="glass-input px-2.5 py-1 text-xs rounded-lg w-full text-white focus:outline-none"
                  placeholder="LinkedIn URL"
                />
              </div>
            ) : (
              <>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-xs font-semibold text-gray-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                  </svg>
                  GitHub
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-xs font-semibold text-gray-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0" fill="#0077B5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </motion.a>
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadResume}
              className="col-span-2 py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs tracking-wider text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download Resume
            </motion.button>
          </div>
        </div>

        {/* Right Column: Skill tags & Projects (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Degree Card */}
          <div className="rounded-2xl glass-panel p-5 border border-white/10">
            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Education Credentials</span>
            {isEditing ? (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  value={editForm.degree}
                  onChange={(e) => setEditForm({ ...editForm, degree: e.target.value })}
                  className="glass-input px-3 py-1.5 text-xs rounded-xl w-full text-white focus:outline-none"
                  placeholder="Degree"
                />
              </div>
            ) : (
              <>
                <h4 className="text-sm font-bold text-white mt-1.5 leading-snug">{profile.degree}</h4>
                <p className="text-xs text-gray-400 mt-1">{profile.college} • GPA: 3.92 / 4.0</p>
              </>
            )}
          </div>

          {/* Interactive Skill Tags */}
          <div className="rounded-2xl glass-panel p-5 border border-white/10">
            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider mb-3">Skills List</span>
            {isEditing ? (
              <div className="space-y-1">
                <input
                  type="text"
                  value={Array.isArray(editForm.skills) ? editForm.skills.join(', ') : editForm.skills}
                  onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                  className="glass-input px-3 py-2 text-xs rounded-xl w-full text-white focus:outline-none"
                  placeholder="React 19, TypeScript, Node.js (Comma separated)"
                />
                <span className="text-[9px] text-gray-500 block pl-1">Provide skills separated by a comma.</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl border border-purple-500/20 bg-purple-500/5 text-purple-300 text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Projects list */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-purple-300 uppercase flex items-center gap-1.5">
              <Code className="w-4 h-4" /> Selected Portfolio Achievements
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.projects.map((proj, idx) => (
                <div key={idx} className="rounded-2xl glass-panel p-5 border border-white/5 flex flex-col justify-between h-48 hover:border-white/10 transition-all">
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <FolderGit2 className="w-4 h-4 text-blue-400" /> {proj.title}
                    </h5>
                    <p className="text-[11px] text-gray-400 mt-2.5 leading-relaxed line-clamp-3 font-sans">
                      {proj.desc}
                    </p>
                  </div>
                  <div className="flex gap-1.5 flex-wrap pt-2">
                    {proj.tags.map((t, idx) => (
                      <span key={idx} className="text-[9px] font-semibold text-gray-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </motion.div>
  );
};
