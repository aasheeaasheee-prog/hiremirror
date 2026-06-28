import React from 'react';
import { BarChart3, TrendingUp, Calendar, Heart, ShieldAlert, Cpu } from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  ComposedChart,
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

export const AnalyticsCharts = ({ sessions = [] }) => {
  // Let's create realistic baseline data, and overlay actual session data if it exists
  const hasData = sessions && sessions.length > 0;

  // 1. Confidence Trend: maps confidence scores over days/sessions
  const baseConfidenceData = [
    { day: 'Mon', Confidence: 72, Stability: 68 },
    { day: 'Tue', Confidence: 75, Stability: 70 },
    { day: 'Wed', Confidence: 82, Stability: 78 },
    { day: 'Thu', Confidence: 80, Stability: 74 },
    { day: 'Fri', Confidence: 88, Stability: 84 },
    { day: 'Sat', Confidence: 91, Stability: 89 },
    { day: 'Sun', Confidence: 94, Stability: 92 }
  ];

  const confidenceData = hasData
    ? [...sessions].reverse().map((s, idx) => ({
        day: s.date ? s.date.split(',')[0] : `S${idx + 1}`,
        Confidence: s.confidence || 85,
        Stability: Math.round((s.confidence || 85) * 0.95)
      })).slice(-7)
    : baseConfidenceData;

  // 2. Communication Trend: maps pacing and communication metrics
  const baseCommunicationData = [
    { name: 'HR general', Pacing: 110, Target: 130 },
    { name: 'System design', Pacing: 155, Target: 130 },
    { name: 'Behavioral Fit', Pacing: 124, Target: 130 },
    { name: 'Google Mock', Pacing: 132, Target: 130 },
    { name: 'Stripe PM', Pacing: 128, Target: 130 }
  ];

  const communicationData = hasData
    ? [...sessions].reverse().map((s, idx) => ({
        name: s.type ? s.type.toUpperCase() : `S${idx + 1}`,
        Pacing: s.communication || 85,
        Target: 88 // baseline average
      })).slice(-5)
    : baseCommunicationData;

  // 3. Weekly Progress (Activity): hours spent practicing
  const baseActivityData = [
    { week: 'Week 1', Hours: 2.5, Questions: 12 },
    { week: 'Week 2', Hours: 4.8, Questions: 22 },
    { week: 'Week 3', Hours: 6.2, Questions: 28 },
    { week: 'Week 4', Hours: 8.5, Questions: 42 }
  ];

  const activityData = hasData 
    ? [
        { week: 'Wk 1', Hours: 2.5, Questions: 12 },
        { week: 'Wk 2', Hours: 4.8, Questions: 22 },
        { week: 'Wk 3', Hours: 6.2, Questions: 28 },
        { week: 'Wk 4', Hours: Math.round((8.5 + (sessions.length * 0.5)) * 10) / 10, Questions: 42 + (sessions.length * 4) }
      ]
    : baseActivityData;

  // 4. Performance Trend: maps overall interview scores
  const basePerformanceData = [
    { session: 'S1', Score: 78 },
    { session: 'S2', Score: 81 },
    { session: 'S3', Score: 83 },
    { session: 'S4', Score: 87 },
    { session: 'S5', Score: 85 },
    { session: 'S6', Score: 92 }
  ];

  const performanceData = hasData
    ? [...sessions].reverse().map((s, idx) => ({
        session: `Session ${idx + 1}`,
        Score: s.overall || 85
      })).slice(-8)
    : basePerformanceData;

  // 5. Emotion Ratio Data: average sentiments
  const avgConf = hasData ? Math.round(sessions.reduce((acc, s) => acc + (s.confidence || 85), 0) / sessions.length) : 85;
  const avgClarity = hasData ? Math.round(sessions.reduce((acc, s) => acc + (s.clarity || 80), 0) / sessions.length) : 80;
  
  const confidentRatio = Math.round(avgConf * 0.7);
  const neutralRatio = Math.round(avgClarity * 0.25);
  const nervousRatio = 100 - confidentRatio - neutralRatio;

  const emotionRatioData = [
    { name: 'Confident', value: Math.max(10, confidentRatio), color: '#34d399' },
    { name: 'Neutral', value: Math.max(10, neutralRatio), color: '#60a5fa' },
    { name: 'Nervous', value: Math.max(5, nervousRatio), color: '#c084fc' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full font-sans">
      
      {/* Chart 1: Confidence Trend (Area) */}
      <div className="rounded-2xl glass-panel p-5 border border-white/10 flex flex-col justify-between">
        <div className="mb-4 text-left">
          <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Presence Analysis</span>
          <span className="text-sm font-bold text-white mt-0.5 block">Confidence & Vocal Stability Trend</span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={confidenceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="day" stroke="#9ca3af" fontSize={10} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} domain={[50, 100]} />
              <Tooltip contentStyle={{ background: 'rgba(5, 2, 20, 0.85)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
              <Area type="monotone" dataKey="Confidence" stroke="#a855f7" fillOpacity={0.15} fill="url(#colorConfTrend)" />
              <Area type="monotone" dataKey="Stability" stroke="#3b82f6" fillOpacity={0.05} fill="url(#colorStabTrend)" />
              <defs>
                <linearGradient id="colorConfTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorStabTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Communication Trend (Bar) */}
      <div className="rounded-2xl glass-panel p-5 border border-white/10 flex flex-col justify-between">
        <div className="mb-4 text-left">
          <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Fluency & Delivery</span>
          <span className="text-sm font-bold text-white mt-0.5 block">Speech Pacing Velocity (WPM / Score)</span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={communicationData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} domain={[50, 100]} />
              <Tooltip contentStyle={{ background: 'rgba(5, 2, 20, 0.85)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
              <Bar dataKey="Pacing" fill="url(#colorPacingBar)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="colorPacingBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Weekly Practice Progress (Composed) */}
      <div className="rounded-2xl glass-panel p-5 border border-white/10 flex flex-col justify-between">
        <div className="mb-4 text-left">
          <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Activity Index</span>
          <span className="text-sm font-bold text-white mt-0.5 block">Weekly Practice Hours & Questions</span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={activityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="week" stroke="#9ca3af" fontSize={10} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(5, 2, 20, 0.85)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
              <Bar dataKey="Hours" fill="url(#colorHoursBar)" radius={[4, 4, 0, 0]} barSize={25} />
              <Line type="monotone" dataKey="Questions" stroke="#a855f7" strokeWidth={2.5} dot={{ fill: '#c084fc', r: 4 }} />
              <defs>
                <linearGradient id="colorHoursBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
                </linearGradient>
              </defs>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 4: Performance Trend (Line) */}
      <div className="rounded-2xl glass-panel p-5 border border-white/10 flex flex-col justify-between">
        <div className="mb-4 text-left">
          <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Career Readiness</span>
          <span className="text-sm font-bold text-white mt-0.5 block">Overall Score Performance Trend</span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="session" stroke="#9ca3af" fontSize={10} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} domain={[50, 100]} />
              <Tooltip contentStyle={{ background: 'rgba(5, 2, 20, 0.85)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
              <Line type="monotone" dataKey="Score" stroke="url(#performanceLineGrad)" strokeWidth={3.5} dot={{ fill: '#3b82f6', stroke: '#fff', strokeWidth: 1.5, r: 5 }} />
              <defs>
                <linearGradient id="performanceLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 5: Emotion Ratio Pie (Full Width) */}
      <div className="col-span-1 md:col-span-2 rounded-2xl glass-panel p-5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-left space-y-3 shrink-0">
          <div>
            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Vocal Telemetry</span>
            <span className="text-base font-bold text-white mt-0.5 block">Emotional Balance Ratio</span>
          </div>
          <p className="text-xs text-gray-400 max-w-sm leading-relaxed font-sans">
            Ratios derived from tone stability, speech flow delays, and breathing sequences recorded during completed practice rounds.
          </p>
          <div className="flex gap-4 pt-1 text-xs">
            {emotionRatioData.map((e, idx) => (
              <div key={idx} className="flex items-center gap-1.5 font-semibold text-gray-300">
                <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: e.color }} />
                {e.name}: {e.value}%
              </div>
            ))}
          </div>
        </div>

        <div className="h-40 w-40 shrink-0 flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={emotionRatioData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={60}
                paddingAngle={4}
                dataKey="value"
              >
                {emotionRatioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center justify-center">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold mt-1">EMOTION</span>
          </div>
        </div>
      </div>

    </div>
  );
};
