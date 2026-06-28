import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, VideoOff, Award, Mic, MicOff, RefreshCw, Send, Loader2 } from 'lucide-react';
import { AIAvatar } from '../components/AIAvatar';
import { InterviewPanel } from '../components/InterviewPanel';
import { TranscriptPanel } from '../components/TranscriptPanel';
import { SpeechRecognitionService } from '../services/speechRecognition';
import { generateInterviewFeedback } from '../services/gemini';

export const InterviewRoom = ({ onComplete }) => {
  const [sessionConfig, setSessionConfig] = useState(null); // null | { category, role, difficulty, questionsCount }
  const [sessionType, setSessionType] = useState(null); // null | 'hr' | 'tech' | 'behavioral' | 'communication' | 'aptitude' | 'leadership'
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [transcriptHistory, setTranscriptHistory] = useState([]);
  const [miraState, setMiraState] = useState('idle'); // 'idle' | 'listening' | 'speaking'
  const [customInput, setCustomInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [fetchError, setFetchError] = useState(null);

  const timerRef = useRef(null);
  const simulationIntervalRef = useRef(null);
  const speechServiceRef = useRef(null);

  const loadingMessages = [
    "Preparing interview...",
    "Generating AI questions...",
    "Optimizing session...",
    "Almost ready..."
  ];

  // Cycling message loader hook
  useEffect(() => {
    if (!isLoadingQuestions) return;
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isLoadingQuestions]);

  // Fetch AI-generated questions when sessionConfig is established
  useEffect(() => {
    if (!sessionConfig) return;
    const fetchQuestions = async () => {
      setIsLoadingQuestions(true);
      setFetchError(null);
      try {
        const { category, role, difficulty, questionsCount } = sessionConfig;
        const res = await fetch(`http://127.0.0.1:5000/api/interviews/generate?category=${encodeURIComponent(category)}&role=${encodeURIComponent(role)}&difficulty=${encodeURIComponent(difficulty)}&limit=${questionsCount}`);

        if (!res.ok) {
          throw new Error(`Failed to generate AI questions (Status ${res.status})`);
        }

        const data = await res.json();

        if (data && data.success && Array.isArray(data.questions)) {
          setQuestions(data.questions);
        } else if (Array.isArray(data)) {
          setQuestions(data);
        } else if (data && Array.isArray(data.questions)) {
          setQuestions(data.questions);
        } else {
          throw new Error("Invalid or empty questions payload from backend.");
        }
      } catch (e) {
        console.error('Error fetching AI questions', e);
        setFetchError(e.message || "Could not connect to AI question generator.");
      } finally {
        setIsLoadingQuestions(false);
      }
    };
    fetchQuestions();
  }, [sessionConfig]);

  const selectedQuestions = Array.isArray(questions) ? questions : [];

  // Offline fallback question provider to ensure high availability and never crash
  const getLocalHardcodedFallbackQuestions = (category, role, difficulty, count) => {
    const genericQuestions = {
      hr: [
        `Tell me about yourself and your background as a ${role}.`,
        `Why are you interested in joining our company for the ${role} position?`,
        `What are your core strengths and areas for improvement as a ${role}?`,
        `Where do you see yourself in five years in terms of career growth?`,
        `How do you handle work pressure and tight deadlines in a team?`,
        `Describe your salary expectations and compensation preferences.`,
        `What kind of team environment allows you to perform at your best?`,
        `Why should we hire you over other candidates for this ${role} role?`
      ],
      tech: [
        `What are the core concepts and technologies of ${role} that you use daily?`,
        `How do you optimize performance and control rendering or processing cycles in ${role} applications?`,
        `Compare database schemas (relational vs. non-relational) and outline their scaling properties.`,
        `How do you identify and resolve memory leaks or CPU bottlenecks?`,
        `Describe a challenging technical project you led or worked on, and how you managed it.`,
        `What is your strategy for writing clean, modular, and reusable code?`,
        `Explain CORS and how you configure secure API communication between origins.`,
        `How do you handle asynchronous operations, concurrency, and race conditions?`
      ],
      behavioral: [
        `Tell me about a time you resolved a conflict within your development team.`,
        `Describe a project that failed under your watch and details of what you learned.`,
        `How do you prioritize deliverables when facing multiple overlapping deadlines?`,
        `Give an example of how you explained a complex technical concept to non-technical peers.`,
        `Describe a situation where you had to deal with a difficult client or stakeholder and how you resolved it.`,
        `Tell me about a time you went above and beyond your standard job description.`,
        `Describe a time you had to work with incomplete specifications or ambiguous requirements.`,
        `How do you handle situations where a team member is not contributing their fair share?`
      ],
      communication: [
        `Explain a complex technical concept you worked on recently in plain, simple terms.`,
        `How do you present project progress and metrics to executive stakeholders?`,
        `Describe a time you had to persuade a team or manager to adopt a new tool or workflow.`,
        `How do you handle communication gaps or misunderstandings in a remote team?`,
        `What is your approach to writing clear, comprehensive documentation for a codebase?`
      ],
      aptitude: [
        `If you have a 3-gallon jug and a 5-gallon jug, how can you measure exactly 4 gallons of water?`,
        `A train traveling at 60 mph passes a platform in 30 seconds. If the train is 500 feet long, what is the length of the platform?`,
        `Explain how you would estimate the number of streetlights in New York City.`,
        `If five machines take five minutes to make five widgets, how long would it take 100 machines to make 100 widgets?`,
        `A clock shows 3:15. What is the angle between the hour hand and the minute hand?`
      ],
      leadership: [
        `Describe your overall leadership philosophy and how you motivate a development team.`,
        `How do you handle a high-performing team member who is toxic to the team's culture?`,
        `Describe a time you had to make an unpopular strategic decision, and how you communicated it.`,
        `How do you align your engineering team's goals with the company's broader business objectives?`,
        `Describe a time you mentored someone and helped them transition into a leadership role.`
      ]
    };

    const list = genericQuestions[category] || genericQuestions['hr'];
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(list[i % list.length]);
    }
    return result;
  };
  // Simulated Speech Templates (in case mic is unsupported or blocked)
  const speechTemplates = {
    "Tell me about yourself.":
      "Sure, I'd love to! I am a passionate software engineer specializing in frontend architectures. Over the past three years, I have built web applications using React, Vite, and Tailwind CSS. I excel at converting complex requirements into responsive, premium user interfaces with rich animations. Recently, I engineered a high-throughput dashboard that reduced time-to-interactive by 35% through modular lazy loading.",
    "Why should we hire you?":
      "You should hire me because I bring a unique combination of technical expertise and user-experience intuition. I don't just write functional code; I focus heavily on performance, accessibility, and clean design structures. I adapt quickly, collaborate effectively across teams, and am excited to help job seekers reflect and improve using HireMirror AI.",
    "What are your strengths and weaknesses?":
      "My greatest strength is my rapid technical adaptation. For example, I mastered Tailwind CSS v4 in a single afternoon. On the weakness side, I occasionally suffer from 'perfectionism,' spending too much time polishing micro-interactions. However, I have developed strict timebox frameworks to ensure pixel-perfect quality is balanced against fast delivery.",
    "Where do you see yourself in five years?":
      "In five years, I see myself taking on architectural leadership roles, designing robust platform ecosystems that serve millions of active users. I also plan to mentor junior engineers and advocate for frontend performance standards.",
    "Explain a challenging technical project you led and how you managed it.":
      "One of my most challenging projects was building a real-time streaming charts widget. Sockets were pushing updates every 100 milliseconds, causing severe browser sluggishness. I solved this by implementing a throttle buffer in memory to batch the data before triggering state updates, which stabilized the render rate at 60 FPS and dropped CPU usage by 60%.",
    "How do you optimize performance and control rendering cycles in React 19?":
      "React performance optimization starts with rendering analysis. I use memoized nodes to prevent unnecessary child rerenders, useMemo and useCallback to cache expensive computations and functions, and apply lazy route-based bundle splitting to minimize initial payload sizes.",
    "Compare SQL and NoSQL database schemas and outline their scaling properties.":
      "SQL databases are relational, table-based, and enforce a strict schema, making them ideal for complex queries and transaction-heavy applications. NoSQL databases are non-relational, document-based, and highly flexible, which allows them to scale horizontally and handle massive semi-structured datasets.",
    "Describe how you would architect a decoupled, real-time notification engine using Kafka.":
      "I would design a decoupled, event-driven architecture using a message broker like RabbitMQ or Kafka. When an event fires, a publisher pushes a payload to a queue. Worker nodes pull messages and route them to email, SMS, or socket microservices. I would cache user preference parameters in Redis to maintain low latency.",
    "Tell me about a time you resolved a conflict within your development team.":
      "During a project cycle, a conflict arose regarding state management libraries. The team was divided between Redux and Zustand. I organized a brief benchmarking session where we built a mini-prototype with both tools. We compared setup speed, bundle impact, and learning curves. The objective data cleared the air, and we aligned on Zustand, completing the deliverable a week early.",
    "Describe a project that failed under your watch and details of what you learned.":
      "Early in my career, I led a database migration that went overtime because of unexpected schema mismatches. The rollback caused two hours of platform downtime. This taught me the critical value of rigorous staging testing, staging on identical production configurations, and having a detailed rollback checklist before deploying changes.",
    "How do you prioritize deliverables when facing multiple overlapping product deadlines?":
      "I prioritize using the Eisenhower Matrix. I categorize tasks by urgency and impact. I focus on critical path features that block other teams first, delegate secondary configuration where possible, and actively coordinate with product managers to reset expectations on low-impact requests.",
    "Give an example of how you explained a complex database indexing concept to non-technical peers.":
      "I had to explain how database caching works to a marketing specialist. I used a restaurant analogy: the server checking the kitchen for every drink order is a standard database fetch. If the server keeps a cooler of water bottles right next to the tables for immediate distribution, that is a cache. It reduced roundtrip delays and satisfied customers much faster."
  };

  // Initialize speech recognition wrapper on mount
  useEffect(() => {
    speechServiceRef.current = new SpeechRecognitionService();
    return () => {
      if (speechServiceRef.current) speechServiceRef.current.stop();
      clearInterval(timerRef.current);
      clearInterval(simulationIntervalRef.current);
    };
  }, []);

  // Timer Effect
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const handleStartRecording = () => {
    setTranscript('');
    setIsRecording(true);
    setMiraState('listening');

    if (speechServiceRef.current && speechServiceRef.current.isSupported()) {
      speechServiceRef.current.start(
        (final, interim) => {
          setTranscript(final + (interim ? ' ' + interim : ''));
        },
        (error) => {
          console.warn("Speech recognition error hook:", error);
          startSimulationFallback();
        },
        () => {
          setIsRecording(false);
          setMiraState('idle');
        }
      );
    } else {
      startSimulationFallback();
    }
  };

  const startSimulationFallback = () => {
    const qText = selectedQuestions[currentIdx] || '';
    const fullSpeech = speechTemplates[qText] || "From my perspective, using AI frameworks in mock scenarios yields incredible performance reflection and establishes vocal confidence.";
    const words = fullSpeech.split(' ');
    let wordIdx = 0;

    clearInterval(simulationIntervalRef.current);
    simulationIntervalRef.current = setInterval(() => {
      if (wordIdx < words.length) {
        setTranscript((prev) => prev ? prev + ' ' + words[wordIdx] : words[wordIdx]);
        wordIdx++;
      } else {
        clearInterval(simulationIntervalRef.current);
      }
    }, 300);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setMiraState('speaking');
    clearInterval(simulationIntervalRef.current);

    if (speechServiceRef.current) {
      speechServiceRef.current.stop();
    }

    // Save answer to queue
    if (transcript.trim()) {
      saveAnswer(transcript);
    }
  };

  const saveAnswer = (ans) => {
    const questionText = selectedQuestions[currentIdx];
    setTranscriptHistory((prev) => {
      // Avoid duplicate logs if they click stop multiple times
      const filtered = prev.filter(h => h.question !== questionText);
      return [
        ...filtered,
        {
          question: questionText,
          answer: ans,
          timestamp: formatTime(timer)
        }
      ];
    });
  };

  const handleNextQuestion = () => {
    // If recording, stop and save answer
    if (isRecording || transcript.trim()) {
      const finalAnswer = transcript;
      handleStopRecording();
      saveAnswer(finalAnswer || transcript);
    }

    setTranscript('');

    if (currentIdx < selectedQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setMiraState('idle');
      setTimer(0);
    } else {
      // Finished all questions! Trigger evaluation
      handleEndInterview();
    }
  };

  const handleEndInterview = async () => {
    setIsRecording(false);
    clearInterval(simulationIntervalRef.current);
    if (speechServiceRef.current) {
      speechServiceRef.current.stop();
    }

    // Capture the last question answer if present
    const finalHistory = [...transcriptHistory];
    if (transcript.trim() && !finalHistory.some(h => h.question === selectedQuestions[currentIdx])) {
      finalHistory.push({
        question: selectedQuestions[currentIdx],
        answer: transcript,
        timestamp: formatTime(timer)
      });
    }

    if (finalHistory.length === 0) {
      alert("Please record an answer for at least one question before evaluating.");
      return;
    }

    setIsAnalyzing(true);
    setMiraState('speaking');

    try {
      // Evaluate transcript using Gemini API / local fallback
      const feedbackReport = await generateInterviewFeedback(sessionType, finalHistory);

      // Delay slightly for smooth transitions
      setTimeout(() => {
        setIsAnalyzing(false);
        onComplete({
          type: sessionType,
          history: finalHistory,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          ...feedbackReport
        });
      }, 1000);
    } catch (e) {
      console.error(e);
      setIsAnalyzing(false);
    }
  };

  const handleSendCustomText = () => {
    if (customInput.trim()) {
      setTranscript((prev) => prev ? prev + ' ' + customInput.trim() : customInput.trim());
      setCustomInput('');
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // 1. SETUP CONFIGURATION SCREEN (NEW FLOW)
  if (!sessionConfig) {
    return (
      <InterviewPanel
        onStartSession={(config) => {
          setSessionConfig(config);
          setSessionType(config.category);
        }}
      />
    );
  }

  // 2. CYCLING MESSAGE QUESTION LOADING SCREEN
  if (isLoadingQuestions) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 text-center space-y-6 font-sans">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl animate-pulse" />
          <Loader2 className="w-16 h-16 text-purple-400 animate-spin relative z-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white tracking-tight">
            {loadingMessages[loadingStep]}
          </h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
            Please wait while Mira AI configures the environment, selects customized questions, and optimizes your virtual interview session.
          </p>
        </div>
      </div>
    );
  }

  // 3. SAFE ERROR HANDLING & RETRY SCREEN
  if (fetchError) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-16 text-center space-y-6 font-sans glass-panel p-8 rounded-3xl border border-red-500/30">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl animate-pulse" />
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center relative z-10">
            <span className="text-2xl text-red-400 font-bold">⚠️</span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white tracking-tight">AI Question Generation Failed</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            {fetchError}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
          <button
            onClick={() => {
              setFetchError(null);
              setSessionConfig({ ...sessionConfig });
            }}
            className="flex-grow py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-colors cursor-pointer"
          >
            Retry AI Generation
          </button>
          <button
            onClick={() => {
              setFetchError(null);
              const offlineQuestions = getLocalHardcodedFallbackQuestions(
                sessionConfig.category,
                sessionConfig.role,
                sessionConfig.difficulty,
                sessionConfig.questionsCount
              );
              setQuestions(offlineQuestions);
            }}
            className="flex-grow py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            Use Fallback Questions
          </button>
        </div>
        <button
          onClick={() => {
            setSessionConfig(null);
            setSessionType(null);
            setQuestions([]);
            setFetchError(null);
          }}
          className="text-xs text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
        >
          Back to Categories
        </button>
      </div>
    );
  }

  // 4. LOADING ASSESSMENT SPLASH SCREEN
  if (isAnalyzing) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 text-center space-y-6 font-sans">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl animate-pulse" />
          <Loader2 className="w-16 h-16 text-purple-400 animate-spin relative z-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white tracking-tight">Compiling AI Feedback...</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
            Mira AI is scanning vocal stability values, checking technical schema definitions, and preparing strengths, weaknesses, and improvement checklists.
          </p>
        </div>
      </div>
    );
  }

  // 3. INTERVIEW GAMEPLAY SCREEN
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 text-left select-none relative z-10 font-sans">

      {/* AI Assistant & Question Board (7 Cols) */}
      <div className="lg:col-span-7 space-y-6">

        {/* Breathing Mira AI Module */}
        <div className="rounded-2xl glass-panel p-6 border border-white/10 relative overflow-hidden flex flex-col items-center text-center justify-center h-72">
          <div className="absolute top-3 right-3 text-[9px] font-bold text-purple-300 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
            Mira AI Active
          </div>
          <AIAvatar state={miraState} size={150} />

          <div className="mt-4">
            <h4 className="text-sm font-semibold text-white">Mira AI</h4>
            <p className="text-[9px] text-purple-300 uppercase tracking-widest mt-1">
              {miraState === 'listening' ? 'Listening to your response...' : miraState === 'speaking' ? 'Analyzing metrics...' : 'Awaiting Speech Start'}
            </p>
          </div>
        </div>

        {/* Question Panel */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-900/15 via-indigo-900/5 to-blue-900/15 border border-white/10 p-6 relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase">
              Question {currentIdx + 1} of {selectedQuestions.length}
            </span>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>{formatTime(timer)}</span>
            </div>
          </div>

          <h3 className="text-base font-bold text-white tracking-tight leading-relaxed min-h-[48px]">
            {selectedQuestions[currentIdx] ? `"${selectedQuestions[currentIdx]}"` : "Preparing question..."}
          </h3>

          {/* Symmetrical progress nodes */}
          <div className="flex items-center gap-1.5 mt-5">
            {selectedQuestions.map((_, i) => (
              <div
                key={i}
                className={`flex-grow h-1.5 rounded-full transition-all duration-500 ${i === currentIdx
                  ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                  : i < currentIdx
                    ? "bg-emerald-500"
                    : "bg-white/10"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Transcript & Recording Room (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between">
        <TranscriptPanel
          transcript={transcript}
          isRecording={isRecording}
          customInput={customInput}
          setCustomInput={setCustomInput}
          onSendCustomText={handleSendCustomText}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          onNextQuestion={handleNextQuestion}
          onEndInterview={handleEndInterview}
          isLastQuestion={currentIdx === selectedQuestions.length - 1}
        />
      </div>

    </div>
  );
};
