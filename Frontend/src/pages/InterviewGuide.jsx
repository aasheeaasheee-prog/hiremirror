// src/pages/InterviewGuide.jsx
// AI-Powered Interview Guide — rich expandable guide with detailed content per topic

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  UserCheck,
  Code,
  MessageSquare,
  ClipboardList,
  AlertTriangle,
  CalendarCheck2,
  Lightbulb,
  ChevronLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Zap,
  Star,
  Target,
  AlertCircle
} from "lucide-react";

// ─────────────────────────────────────────────
//  DETAILED CONTENT DATA
// ─────────────────────────────────────────────
const guideData = [
  {
    id: "tips",
    title: "Interview Preparation Tips",
    subtitle: "Build a rock-solid preparation system",
    icon: <BookOpen className="w-4 h-4 text-purple-400" />,
    iconBg: "bg-purple-500/10",
    iconBorder: "border-purple-500/20",
    accentColor: "text-purple-400",
    badgeBg: "bg-purple-500/10",
    badgeBorder: "border-purple-500/20",
    preview: "Structure your preparation: research the company, rehearse STAR stories, and practice concise technical explanations.",
    sections: [
      {
        heading: "The 7-Day Sprint Plan",
        icon: <Target className="w-3.5 h-3.5" />,
        items: [
          "Day 1–2: Research the company — mission, product, culture, recent news, and their tech stack.",
          "Day 3–4: Review job description line-by-line. Match every requirement to a real story from your experience.",
          "Day 5: Practice 5–8 core behavioral stories using the STAR framework (Situation, Task, Action, Result).",
          "Day 6: Do 2 timed mock sessions. Focus on clarity, pacing, and hitting time limits per answer.",
          "Day 7: Rest, lightly review notes, prepare your questions for the interviewer."
        ]
      },
      {
        heading: "Company Research Checklist",
        icon: <CheckCircle className="w-3.5 h-3.5" />,
        items: [
          "Core business model — how does the company make money?",
          "Recent milestones, product launches, or funding rounds (Crunchbase, news, LinkedIn).",
          "Tech stack from job descriptions, GitHub repos, engineering blogs.",
          "Company values and mission statement — prepare a 30-second alignment statement.",
          "Key competitors and how the company differentiates itself.",
          "Interview reviews on Glassdoor and Blind to understand culture and interview difficulty."
        ]
      },
      {
        heading: "STAR Framework — How to Structure Every Answer",
        icon: <Star className="w-3.5 h-3.5" />,
        items: [
          "Situation: Set the context briefly — team size, project, and timeline. Keep it under 20 seconds.",
          "Task: Describe your specific responsibility. What were you accountable for?",
          "Action: This is the most important part. Be specific — what exact steps did you take and why?",
          "Result: Quantify the outcome. Use metrics (%, time saved, users impacted, revenue affected).",
          "Practice tip: Write 8 STAR stories that can be adapted to ANY behavioral question."
        ]
      },
      {
        heading: "Best Practices",
        icon: <Zap className="w-3.5 h-3.5" />,
        items: [
          "Record yourself answering on video — watch for filler words and body language.",
          "Practice out loud, not just in your head. Articulation is a different muscle.",
          "Prepare 3–5 thoughtful questions to ask at the end of each round.",
          "Have a concise 90-second 'Tell me about yourself' pitch ready and memorized.",
          "Simulate real conditions: sit at a desk, dress properly, use headphones."
        ]
      }
    ]
  },
  {
    id: "hr",
    title: "HR Interview Guidance",
    subtitle: "Master cultural fit and behavioral questions",
    icon: <UserCheck className="w-4 h-4 text-blue-400" />,
    iconBg: "bg-blue-500/10",
    iconBorder: "border-blue-500/20",
    accentColor: "text-blue-400",
    badgeBg: "bg-blue-500/10",
    badgeBorder: "border-blue-500/20",
    preview: "Focus on cultural fit, motivations, and career trajectory. Align your values with the company's mission.",
    sections: [
      {
        heading: "Most Common HR Questions & How to Answer",
        icon: <MessageSquare className="w-3.5 h-3.5" />,
        items: [
          "'Tell me about yourself' — Lead with your current role, 2 key achievements, and why you're interested in this company. Keep under 90 seconds.",
          "'Why do you want to work here?' — Cite specific company values, products, or initiatives. Never say 'good salary' first.",
          "'What are your strengths?' — Name 2–3 strengths with evidence. Match them to the job requirements.",
          "'What is your biggest weakness?' — Pick a real weakness you've actively improved. Show growth, not deflection.",
          "'Where do you see yourself in 5 years?' — Align your growth with what this company can offer. Show ambition + commitment.",
          "'Why are you leaving your current job?' — Stay positive. Focus on growth, challenge, or opportunity — never blame."
        ]
      },
      {
        heading: "Compensation Negotiation Tips",
        icon: <Target className="w-3.5 h-3.5" />,
        items: [
          "Research the market range before the interview (Glassdoor, Levels.fyi, LinkedIn Salary).",
          "Let the interviewer mention a number first if possible. Anchor high if you must go first.",
          "Negotiate the total package — base, bonus, equity, PTO, remote policy, learning budget.",
          "Use silence as leverage — after stating your number, stop talking.",
          "If the offer is low, say: 'I'm very excited about this role. Is there flexibility on the base given my X years of experience in Y?'"
        ]
      },
      {
        heading: "Cultural Fit Signals to Demonstrate",
        icon: <Star className="w-3.5 h-3.5" />,
        items: [
          "Show genuine curiosity — ask informed questions that demonstrate pre-research.",
          "Mirror the company's language from their job description and website.",
          "Share a story that demonstrates alignment with their stated values.",
          "Demonstrate adaptability — give an example of pivoting under changing requirements.",
          "Express enthusiasm authentically — interviewers remember energy and presence."
        ]
      },
      {
        heading: "Common HR Mistakes to Avoid",
        icon: <XCircle className="w-3.5 h-3.5" />,
        items: [
          "Speaking negatively about a previous employer or manager.",
          "Rambling — every answer should have a clear beginning, middle, and end.",
          "Saying 'I don't have any weaknesses' — it signals low self-awareness.",
          "Appearing disinterested by not asking questions at the end.",
          "Being unprepared on compensation expectations — always know your range."
        ]
      }
    ]
  },
  {
    id: "tech",
    title: "Technical Interview Preparation",
    subtitle: "Ace coding rounds and system design",
    icon: <Code className="w-4 h-4 text-indigo-400" />,
    iconBg: "bg-indigo-500/10",
    iconBorder: "border-indigo-500/20",
    accentColor: "text-indigo-400",
    badgeBg: "bg-indigo-500/10",
    badgeBorder: "border-indigo-500/20",
    preview: "Review core concepts, practice live coding, and explain trade-offs. Use systematic problem-solving frameworks.",
    sections: [
      {
        heading: "The 4-Step Coding Interview Framework",
        icon: <Target className="w-3.5 h-3.5" />,
        items: [
          "Step 1 — Clarify: Ask 2–3 clarifying questions before writing any code. Edge cases, constraints, expected input/output.",
          "Step 2 — Plan: Talk through your approach before coding. Mention time & space complexity upfront.",
          "Step 3 — Code: Write clean, readable code with meaningful variable names. Narrate your thinking as you type.",
          "Step 4 — Review: Once done, walk through a test case manually. Catch bugs before they're pointed out."
        ]
      },
      {
        heading: "Core Data Structures to Master",
        icon: <Code className="w-3.5 h-3.5" />,
        items: [
          "Arrays & Strings — Two pointers, sliding window, prefix sums.",
          "Hash Maps & Sets — O(1) lookup. Used in 40%+ of problems.",
          "Stacks & Queues — Monotonic stack patterns, BFS using queues.",
          "Trees & Graphs — DFS, BFS, tree traversals, shortest path (Dijkstra, BFS).",
          "Heaps/Priority Queues — Top-K problems, merge sorted lists.",
          "Dynamic Programming — Bottom-up tabulation, memoization, state compression."
        ]
      },
      {
        heading: "System Design Interview Checklist",
        icon: <Zap className="w-3.5 h-3.5" />,
        items: [
          "Clarify requirements: scale (users/day), read vs write ratio, consistency vs availability trade-offs.",
          "High-level design first: clients → load balancer → services → databases → caches.",
          "Database selection: SQL for ACID transactions, NoSQL for scale + flexibility.",
          "Caching strategy: Redis or Memcached at API layer, CDN for static assets.",
          "Async processing: message queues (Kafka, RabbitMQ) for decoupling heavy workloads.",
          "Reliability: horizontal scaling, replication, circuit breakers, graceful degradation."
        ]
      },
      {
        heading: "Live Coding Best Practices",
        icon: <Star className="w-3.5 h-3.5" />,
        items: [
          "Think aloud — interviewers assess your reasoning process, not just the final answer.",
          "Start with the brute-force solution, then optimize. Never jump to complex approaches.",
          "Write clean code first. You can optimize after correctness is confirmed.",
          "If you're stuck, explain the direction you're thinking — partial credit matters.",
          "Use familiar idioms of your chosen language — don't switch languages mid-interview."
        ]
      }
    ]
  },
  {
    id: "comm",
    title: "Communication Skills Tips",
    subtitle: "Communicate with clarity and confidence",
    icon: <MessageSquare className="w-4 h-4 text-emerald-400" />,
    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-500/20",
    accentColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10",
    badgeBorder: "border-emerald-500/20",
    preview: "Maintain eye contact, pace your speech, and avoid filler words. Summarize before diving deep.",
    sections: [
      {
        heading: "Verbal Communication Techniques",
        icon: <MessageSquare className="w-3.5 h-3.5" />,
        items: [
          "Use the BLUF method: Bottom Line Up Front. State your conclusion first, then support it.",
          "Target 120–140 words per minute — slightly slower than casual conversation.",
          "Eliminate filler words (um, uh, like, you know) by inserting a brief pause instead.",
          "Use strategic silence — pause for 1–2 seconds before answering complex questions.",
          "Vary your tone and inflection — monotone delivery signals low energy."
        ]
      },
      {
        heading: "Active Listening in Interviews",
        icon: <CheckCircle className="w-3.5 h-3.5" />,
        items: [
          "Paraphrase the question before answering: 'So what you're asking is...' — this confirms understanding.",
          "Nod subtly and maintain eye contact to signal engagement.",
          "Take mental notes on multi-part questions — address each part explicitly.",
          "It's acceptable to say 'Let me take a moment to think' — it signals composure.",
          "If you misunderstood a question mid-answer, correct course immediately and calmly."
        ]
      },
      {
        heading: "Non-Verbal Communication",
        icon: <Star className="w-3.5 h-3.5" />,
        items: [
          "Sit upright — good posture signals confidence and engagement.",
          "Maintain eye contact for 3–5 seconds at a time (video: look at the camera, not the screen).",
          "Use open hand gestures to appear trustworthy and transparent.",
          "Smile naturally when appropriate — warmth builds rapport quickly.",
          "Mirror the interviewer's energy level subtly to build subconscious connection."
        ]
      },
      {
        heading: "Common Communication Mistakes",
        icon: <XCircle className="w-3.5 h-3.5" />,
        items: [
          "Over-explaining — learn when your answer is complete and stop talking.",
          "Interrupting the interviewer — always let them finish before responding.",
          "Being too technical with non-technical interviewers — always gauge your audience.",
          "Negative body language: crossed arms, looking away, slouching.",
          "Speaking too fast when nervous — practice controlled breathing before the call."
        ]
      }
    ]
  },
  {
    id: "resume",
    title: "Resume Improvement Tips",
    subtitle: "Create a resume that gets past ATS and humans",
    icon: <ClipboardList className="w-4 h-4 text-yellow-400" />,
    iconBg: "bg-yellow-500/10",
    iconBorder: "border-yellow-500/20",
    accentColor: "text-yellow-400",
    badgeBg: "bg-yellow-500/10",
    badgeBorder: "border-yellow-500/20",
    preview: "Quantify impact, use action verbs, and tailor each bullet to the target role. Keep it to one page for early-career.",
    sections: [
      {
        heading: "Bullet Point Formula That Works",
        icon: <Zap className="w-3.5 h-3.5" />,
        items: [
          "Formula: [Strong Action Verb] + [What You Did] + [Measurable Outcome]",
          "Bad: 'Worked on improving website performance.'",
          "Good: 'Reduced Time to Interactive by 42% by implementing route-based code splitting and lazy loading across 12 pages.'",
          "Bad: 'Helped the team deliver projects on time.'",
          "Good: 'Led a 4-engineer sprint to deliver a redesigned checkout flow, increasing conversion rate by 18% and generating $200K in monthly ARR.'"
        ]
      },
      {
        heading: "ATS Optimization",
        icon: <Target className="w-3.5 h-3.5" />,
        items: [
          "Mirror exact keywords from the job description in your resume (ATS scores keyword density).",
          "Use standard section headers: Experience, Education, Skills, Projects — avoid creative names.",
          "Save your resume as a clean PDF (not .docx) unless specifically requested.",
          "Avoid tables, columns, headers/footers — many ATS parsers break on these.",
          "Test your resume at resumeworded.com or jobscan.co before submitting."
        ]
      },
      {
        heading: "Section-by-Section Guide",
        icon: <CheckCircle className="w-3.5 h-3.5" />,
        items: [
          "Summary: 2–3 sentences max. Role + years of experience + 1–2 standout achievements.",
          "Experience: 3–6 bullets per role, most recent first. Focus on impact over duties.",
          "Skills: List tools, languages, and frameworks relevant to the role. Group by category.",
          "Projects: Include 2–4 projects with tech stack, your role, and a measurable outcome.",
          "Education: Degree, university, graduation year. Include GPA only if above 3.5."
        ]
      },
      {
        heading: "Common Resume Mistakes",
        icon: <XCircle className="w-3.5 h-3.5" />,
        items: [
          "Using vague phrases like 'responsible for', 'assisted with', 'helped team'.",
          "Including a photo, age, or personal information (irrelevant and sometimes discriminatory).",
          "Going beyond 1 page (junior/mid) or 2 pages (senior 10+ years) without justification.",
          "Using a fancy template that breaks ATS parsing.",
          "Not tailoring your resume per application — one size never fits all."
        ]
      }
    ]
  },
  {
    id: "mistakes",
    title: "Common Interview Mistakes",
    subtitle: "Know what kills great candidates",
    icon: <AlertTriangle className="w-4 h-4 text-red-400" />,
    iconBg: "bg-red-500/10",
    iconBorder: "border-red-500/20",
    accentColor: "text-red-400",
    badgeBg: "bg-red-500/10",
    badgeBorder: "border-red-500/20",
    preview: "Avoid rambling, negative talk about past employers, and over-promising on skills you don't have.",
    sections: [
      {
        heading: "Before the Interview",
        icon: <AlertCircle className="w-3.5 h-3.5" />,
        items: [
          "Not researching the company — interviewers immediately detect this and it signals low motivation.",
          "Arriving late (or joining a video call late) — it wastes everyone's time and creates an immediate bad impression.",
          "Not testing your tech setup for virtual interviews — audio/video issues derail your focus.",
          "Forgetting to bring copies of your resume and a notepad to in-person interviews.",
          "Not preparing questions to ask — 'I don't have any questions' is a red flag."
        ]
      },
      {
        heading: "During the Interview",
        icon: <XCircle className="w-3.5 h-3.5" />,
        items: [
          "Rambling without structure — every answer needs a beginning, middle, and end.",
          "Speaking negatively about former employers, managers, or teammates.",
          "Lying or exaggerating — interviewers often probe deeper; fabrications unravel fast.",
          "Interrupting the interviewer — always let them finish their full question.",
          "Appearing arrogant — confidence is great, but 'I already know everything' is a dealbreaker.",
          "Discussing salary too early before demonstrating your value.",
          "Not asking for clarification when unsure — guessing leads to off-target answers."
        ]
      },
      {
        heading: "Technical Interview Specific",
        icon: <Code className="w-3.5 h-3.5" />,
        items: [
          "Jumping into code without planning — always discuss your approach first.",
          "Going silent for long periods — narrate your thinking even when stuck.",
          "Not considering edge cases — interviewers specifically watch for this.",
          "Giving up when stuck instead of breaking the problem into smaller parts.",
          "Not testing your own code with a walkthrough before declaring it done."
        ]
      },
      {
        heading: "After the Interview",
        icon: <CheckCircle className="w-3.5 h-3.5" />,
        items: [
          "Not sending a follow-up thank-you email within 24 hours — this is standard professional etiquette.",
          "Ghosting the recruiter after receiving an offer (even if declining).",
          "Not reflecting on what went wrong to improve for the next round.",
          "Accepting an offer under pressure without reviewing all terms carefully.",
          "Burning bridges if you decline — job markets are small and people remember."
        ]
      }
    ]
  },
  {
    id: "daily",
    title: "Daily Interview Challenge",
    subtitle: "Build interview fitness through daily practice",
    icon: <CalendarCheck2 className="w-4 h-4 text-pink-400" />,
    iconBg: "bg-pink-500/10",
    iconBorder: "border-pink-500/20",
    accentColor: "text-pink-400",
    badgeBg: "bg-pink-500/10",
    badgeBorder: "border-pink-500/20",
    preview: "Each day, solve a short coding puzzle or answer a behavioral scenario. Consistency beats cramming.",
    sections: [
      {
        heading: "The Daily Practice System (30 min/day)",
        icon: <CalendarCheck2 className="w-3.5 h-3.5" />,
        items: [
          "10 min: Solve one LeetCode Easy/Medium problem — focus on pattern recognition, not memorization.",
          "10 min: Answer one behavioral question aloud, record yourself on your phone and review it.",
          "5 min: Read one engineering blog post (Netflix Tech Blog, Stripe, Airbnb Engineering).",
          "5 min: Review one concept card from your notes (data structures, system design patterns).",
          "Weekend: Do one full 45-minute mock interview session end-to-end."
        ]
      },
      {
        heading: "Weekly Practice Schedule",
        icon: <Target className="w-3.5 h-3.5" />,
        items: [
          "Monday: Arrays, Strings, Two Pointers patterns.",
          "Tuesday: Hash Maps, Stacks, Queues.",
          "Wednesday: Trees, BFS/DFS traversals.",
          "Thursday: Dynamic Programming foundations.",
          "Friday: Behavioral STAR story practice — 2 stories.",
          "Saturday: Full mock interview (technical or behavioral).",
          "Sunday: Review weak areas from the week; update your STAR story bank."
        ]
      },
      {
        heading: "Tracking Your Progress",
        icon: <Star className="w-3.5 h-3.5" />,
        items: [
          "Keep an interview journal — note what questions came up and how you answered them.",
          "Rate yourself after every mock session on: clarity, pacing, structure, confidence.",
          "Track problem-solving patterns — which categories are you consistently weak in?",
          "Set weekly goals: '5 LeetCode problems + 3 behavioral stories this week'.",
          "Celebrate small wins — progress compounds over time."
        ]
      },
      {
        heading: "Motivation Tips",
        icon: <Zap className="w-3.5 h-3.5" />,
        items: [
          "Treat preparation like training for a sport — daily reps build real fluency.",
          "Join an accountability group or find a practice partner for mock sessions.",
          "Visualize the outcome you want — a strong offer, a role you're proud of.",
          "Accept that rejection is data, not failure — each 'no' sharpens your skills.",
          "Reward yourself after each full practice week — rest is part of performance."
        ]
      }
    ]
  },
  {
    id: "career",
    title: "AI Career Advice",
    subtitle: "Use AI tools to accelerate your job search",
    icon: <Lightbulb className="w-4 h-4 text-orange-400" />,
    iconBg: "bg-orange-500/10",
    iconBorder: "border-orange-500/20",
    accentColor: "text-orange-400",
    badgeBg: "bg-orange-500/10",
    badgeBorder: "border-orange-500/20",
    preview: "Leverage AI tools for mock interviews, resume parsing, and skill gap analysis to stay ahead in the job market.",
    sections: [
      {
        heading: "AI Tools for Job Seekers",
        icon: <Lightbulb className="w-3.5 h-3.5" />,
        items: [
          "HireMirror AI (this platform): Real-time mock interviews with vocal analysis and performance scores.",
          "ChatGPT / Gemini: Generate tailored resume bullet points, cover letters, and STAR story drafts.",
          "Jobscan / ResumeWorded: ATS match scoring — optimize your resume per job description.",
          "LinkedIn AI features: Job Match scores, profile optimization suggestions, connection recommendations.",
          "Otter.ai / Fireflies: Record and transcribe mock interview sessions for review.",
          "Grammarly: Proofread emails, cover letters, and LinkedIn messages before sending."
        ]
      },
      {
        heading: "Skill Gap Analysis",
        icon: <Target className="w-3.5 h-3.5" />,
        items: [
          "Step 1: Take 5 target job descriptions and highlight every required and preferred skill.",
          "Step 2: Honestly rate yourself on each skill (1–5 scale).",
          "Step 3: Identify your top 3 gaps — these become your learning priorities.",
          "Step 4: Build a 90-day skill acquisition plan with one course per gap.",
          "Step 5: Add the new skill to your resume only after you can demonstrate it in a project."
        ]
      },
      {
        heading: "Building Your Personal Brand",
        icon: <Star className="w-3.5 h-3.5" />,
        items: [
          "LinkedIn: Post one insight or project update per week — recruiters notice active profiles.",
          "GitHub: Keep your pinned repos updated, documented, and with README files.",
          "Portfolio site: A simple site with 3–5 projects and a bio converts much better than just a PDF.",
          "Thought leadership: Share your learnings publicly (articles, short videos, threads) — it builds credibility.",
          "Referrals: 40–60% of hires come through internal referrals — maintain and grow your network consistently."
        ]
      },
      {
        heading: "The Long-Game Career Strategy",
        icon: <CheckCircle className="w-3.5 h-3.5" />,
        items: [
          "Interview every 18–24 months even when employed — it keeps skills sharp and reveals market value.",
          "Build a 'Board of Advisors' — 3–5 mentors in different industries who can guide your career.",
          "Invest in learning at the edge of your comfort zone — that's where career growth accelerates.",
          "Contribute to open source or side projects — they demonstrate initiative beyond job descriptions.",
          "Track your wins in a career brag document — update it monthly so reviews and applications are easy."
        ]
      }
    ]
  }
];

// ─────────────────────────────────────────────
//  GUIDE CARD (grid view)
// ─────────────────────────────────────────────
const GuideCard = ({ item, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="
      group w-full text-left
      glass-panel glass-panel-hover rounded-xl p-5
      border border-white/10
      backdrop-blur-md transition-shadow
      flex flex-col gap-3
    "
  >
    {/* Icon + Title Row */}
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-lg border ${item.iconBorder} ${item.iconBg} shrink-0`}>
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xs font-bold text-white leading-tight">{item.title}</h3>
        <p className="text-[10px] text-gray-400 mt-0.5">{item.subtitle}</p>
      </div>
    </div>

    {/* Preview text */}
    <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-2 flex-1">
      {item.preview}
    </p>

    {/* CTA */}
    <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity mt-auto">
      <span className={`text-[10px] font-bold ${item.accentColor}`}>Read Guide</span>
      <ArrowRight className={`w-3 h-3 ${item.accentColor} group-hover:translate-x-0.5 transition-transform`} />
    </div>
  </motion.button>
);

// ─────────────────────────────────────────────
//  DETAIL VIEW (single guide expanded)
// ─────────────────────────────────────────────
const GuideDetail = ({ item, onBack }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.35 }}
    className="space-y-5"
  >
    {/* Back button */}
    <button
      onClick={onBack}
      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors font-semibold group"
    >
      <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
      Back to Interview Guide
    </button>

    {/* Hero header */}
    <div className={`rounded-xl border ${item.iconBorder} ${item.iconBg} p-5 flex items-start gap-4`}>
      <div className={`p-3 rounded-xl border ${item.iconBorder} bg-white/5 shrink-0`}>
        {React.cloneElement(item.icon, { className: `w-5 h-5 ${item.accentColor.replace('text-', 'text-')}` })}
      </div>
      <div>
        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md ${item.badgeBg} border ${item.badgeBorder} mb-2`}>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${item.accentColor}`}>
            Interview Guide
          </span>
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight">{item.title}</h2>
        <p className="text-xs text-gray-400 mt-1">{item.subtitle}</p>
      </div>
    </div>

    {/* Content sections */}
    <div className="space-y-4">
      {item.sections.map((section, si) => (
        <motion.div
          key={si}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: si * 0.07, duration: 0.3 }}
          className="rounded-xl border border-white/8 bg-white/[0.02] p-5 space-y-3"
        >
          {/* Section heading */}
          <div className="flex items-center gap-2 pb-2 border-b border-white/8">
            <span className={item.accentColor}>{section.icon}</span>
            <h3 className="text-xs font-bold text-white tracking-wide">{section.heading}</h3>
          </div>

          {/* Bullet items */}
          <ul className="space-y-2">
            {section.items.map((item_text, ii) => (
              <li key={ii} className="flex items-start gap-2.5">
                <div className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${item.accentColor.replace('text-', 'bg-')}`} />
                <span className="text-[11px] text-gray-300 leading-relaxed">{item_text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────
//  MAIN EXPORT
// ─────────────────────────────────────────────
export const InterviewGuide = () => {
  const [activeGuide, setActiveGuide] = useState(null);

  const selectedItem = guideData.find(g => g.id === activeGuide);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <AnimatePresence mode="wait">
        {/* ── GRID VIEW ── */}
        {!activeGuide && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Header */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase">
                Resource Library
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">Interview Guide</h2>
              <p className="text-xs text-gray-400">
                Click any card to explore in-depth interview preparation content.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {guideData.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.3 }}
                >
                  <GuideCard
                    item={item}
                    onClick={() => setActiveGuide(item.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── DETAIL VIEW ── */}
        {activeGuide && selectedItem && (
          <motion.div
            key={`detail-${activeGuide}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <GuideDetail
              item={selectedItem}
              onBack={() => setActiveGuide(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
