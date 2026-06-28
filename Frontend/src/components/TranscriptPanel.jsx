import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Send, Play, Square, ArrowRight } from 'lucide-react';

export const TranscriptPanel = ({
  transcript,
  isRecording,
  customInput,
  setCustomInput,
  onSendCustomText,
  onStartRecording,
  onStopRecording,
  onNextQuestion,
  onEndInterview,
  isLastQuestion
}) => {
  const transcriptEndRef = useRef(null);

  // Auto-scroll transcript container to bottom
  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcript]);

  return (
    <div className="rounded-2xl glass-panel p-5 border border-white/10 flex-grow flex flex-col justify-between min-h-[380px] h-[380px]">
      
      {/* Header Info */}
      <div className="border-b border-white/10 pb-3 mb-3 flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase flex items-center gap-1.5">
          <Mic className={`w-3.5 h-3.5 ${isRecording ? 'text-red-400 animate-pulse' : 'text-purple-400'}`} />
          Speech-To-Text Console
        </span>
        {isRecording ? (
          <span className="text-[9px] bg-red-500/10 border border-red-500/20 text-red-400 font-extrabold px-2.5 py-0.5 rounded uppercase animate-pulse flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Recording
          </span>
        ) : (
          <span className="text-[9px] bg-white/5 border border-white/10 text-gray-400 font-semibold px-2 py-0.5 rounded uppercase">
            Mic Standby
          </span>
        )}
      </div>

      {/* Live Text Field */}
      <div className="flex-grow overflow-y-auto text-xs leading-relaxed text-gray-300 space-y-3 pr-2 scroll-smooth">
        {transcript ? (
          <div className="font-sans relative whitespace-pre-wrap">
            {transcript}
            {isRecording && (
              <motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 h-4 bg-purple-400 ml-0.5 -mb-0.5"
              />
            )}
            <div ref={transcriptEndRef} />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-3 py-12">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-12 h-12 rounded-full border border-purple-500/10 animate-ping" />
              <MicOff className="w-8 h-8 text-purple-400/40 relative z-10" />
            </div>
            <p className="text-[11px] max-w-[240px] leading-relaxed">
              Click <span className="text-purple-300 font-bold">"Start Recording"</span> and begin speaking. Real-time transcriptions will populate here.
            </p>
          </div>
        )}
      </div>

      {/* Simulated Live Audio Sound Waves (visual micro-animation) */}
      {isRecording && (
        <div className="flex items-center justify-center gap-0.5 py-2.5 border-t border-white/5">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-purple-400 rounded-full"
              animate={{
                height: [4, [16, 24, 12, 20][i % 4], 4]
              }}
              transition={{
                duration: 0.5 + (i % 3) * 0.15,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ height: 4 }}
            />
          ))}
        </div>
      )}

      {/* Manual Input typing box for testing or fallback */}
      {isRecording && (
        <div className="flex gap-2 border-t border-white/5 pt-3 mt-1">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Tweak or type speech manually if mic is blocked..."
            className="glass-input px-3 py-2 text-xs rounded-xl w-full text-white placeholder-gray-600 focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && onSendCustomText()}
          />
          <button 
            type="button"
            onClick={onSendCustomText}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shrink-0 transition-colors shadow-lg shadow-purple-500/10"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 mt-3">
        {!isRecording ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartRecording}
            className="col-span-2 py-3 px-4 rounded-xl font-bold text-xs tracking-wider text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 shadow-md transition-all flex items-center justify-center gap-2 group"
          >
            <Mic className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            Start Voice Recording
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStopRecording}
            className="col-span-2 py-3 px-4 rounded-xl font-bold text-xs tracking-wider text-white bg-red-600 hover:bg-red-500 shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Square className="w-3.5 h-3.5 fill-white" />
            Pause Recording
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNextQuestion}
          className="py-2.5 px-3 rounded-xl font-bold text-[10px] tracking-wider text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
        >
          {isLastQuestion ? 'Evaluate Final' : 'Next Question'} <ArrowRight className="w-3 h-3" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEndInterview}
          className="py-2.5 px-3 rounded-xl font-bold text-[10px] tracking-wider text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors flex items-center justify-center gap-1.5"
        >
          Force Evaluate
        </motion.button>
      </div>

    </div>
  );
};
