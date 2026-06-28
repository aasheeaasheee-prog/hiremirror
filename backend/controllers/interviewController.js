import Interview from '../models/Interview.js';
import { callLLM, prompts } from '../services/aiService.js';

/**
 * @desc    Get user's mock interview sessions logs
 * @route   GET /api/interviews
 */
export const getInterviews = async (req, res, next) => {
  try {
    const sessions = await Interview.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: sessions.length, sessions });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Save a new completed mock session evaluation
 * @route   POST /api/interviews
 */
export const createInterview = async (req, res, next) => {
  const {
    type,
    date,
    overall,
    communication,
    confidence,
    clarity,
    technicalDepth,
    problemSolving,
    strengths,
    weaknesses,
    suggestions,
    history
  } = req.body;

  try {
    const session = await Interview.create({
      user: req.user.id,
      type,
      date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      overall,
      communication,
      confidence,
      clarity,
      technicalDepth,
      problemSolving,
      strengths: strengths || [],
      weaknesses: weaknesses || [],
      suggestions: suggestions || [],
      history: history || []
    });

    res.status(201).json({ success: true, session });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single interview session details
 * @route   GET /api/interviews/:id
 */
export const getInterviewById = async (req, res, next) => {
  try {
    const session = await Interview.findOne({ _id: req.params.id, user: req.user.id });
    if (!session) {
      return res.status(404).json({ success: false, message: 'Mock session report not found.' });
    }
    res.status(200).json({ success: true, session });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a saved mock session report log
 * @route   DELETE /api/interviews/:id
 */
export const deleteInterview = async (req, res, next) => {
  try {
    const session = await Interview.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!session) {
      return res.status(404).json({ success: false, message: 'Mock session report not found or unauthorized.' });
    }
    res.status(200).json({ success: true, message: 'Session log deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// Predefined fallback questions dictionary covering all categories, roles, and difficulty levels
const PREDEFINED_QUESTIONS = {
  hr: [
    "Tell me about yourself and your background as a {role}.",
    "Why are you interested in joining our company for the {role} position?",
    "What are your core strengths and areas for improvement as a {role}?",
    "Where do you see yourself in five years in terms of career growth?",
    "How do you handle work pressure and tight deadlines in a team?",
    "Describe your salary expectations and compensation preferences.",
    "What kind of team environment allows you to perform at your best?",
    "Why should we hire you over other candidates for this {role} role?",
    "Tell me about a time you had to learn a new tool or framework quickly.",
    "How do you handle feedback or criticism from your peers or managers?",
    "Describe a situation where you had to align with a company decision you disagreed with.",
    "What motivated you to leave your previous job, or what are you looking for in your next role?",
    "How do you maintain a healthy work-life balance while delivering high-quality results?",
    "What is your approach to professional development and staying updated with industry trends?",
    "Do you have any questions for us regarding the company culture or expectations?"
  ],
  tech: {
    Beginner: [
      "What are the fundamental core concepts of {role} that you use daily?",
      "Explain the difference between value types and reference types in your primary programming language.",
      "How do you structure and organize files/folders in a new project?",
      "Explain how client-server communication works and what REST APIs are.",
      "How do you use Git version control and handle simple merge conflicts?",
      "What is the purpose of database indexing and how does it help?",
      "Describe the life cycle of a component or a request in a typical {role} application.",
      "How do you write unit tests for your code, and why is testing important?",
      "What are some common security practices you apply when writing code?",
      "Describe the difference between SQL and NoSQL databases at a basic level."
    ],
    Intermediate: [
      "How do you optimize performance and control rendering/processing cycles in {role} applications?",
      "Compare relational and non-relational database schemas and outline their scaling properties.",
      "How do you identify and fix memory leaks or CPU bottlenecks in a {role} app?",
      "Explain how caching (e.g. Redis, Browser cache) can be used to optimize system speed.",
      "How do you handle asynchronous operations, concurrency, and race conditions?",
      "Describe how you design and implement error boundary mechanisms in production.",
      "What is your strategy for writing clean, modular, and reusable components or services?",
      "Explain CORS and how you configure secure API communication between origins.",
      "How do you approach database migrations and schema changes with zero downtime?",
      "What is the role of middleware in backend applications, and how do you write custom middleware?"
    ],
    Advanced: [
      "Describe how you would architect a decoupled, real-time notification engine using message brokers like Kafka.",
      "How do you design a high-availability, horizontally-scalable architecture for a {role} platform?",
      "Explain how you would handle microservices orchestration, service discovery, and API gateway routing.",
      "What is your approach to database scaling (e.g., sharding, replication, connection pooling) under high load?",
      "How do you design a secure OAuth2 or JWT-based authentication system across multiple domains?",
      "Explain your strategy for CI/CD pipeline automation, containerization (Docker), and Kubernetes deployment.",
      "How do you optimize database query performance when dealing with millions of records?",
      "Describe how you handle state synchronization across distributed nodes in a real-time environment.",
      "How do you approach refactoring a legacy codebase without breaking existing business logic?",
      "Explain how you would monitor, log, and alert on application failures in a production environment."
    ]
  },
  behavioral: [
    "Tell me about a time you resolved a conflict within your development team.",
    "Describe a project that failed under your watch and details of what you learned.",
    "How do you prioritize deliverables when facing multiple overlapping deadlines?",
    "Give an example of how you explained a complex technical concept to non-technical peers.",
    "Describe a situation where you had to deal with a difficult client or stakeholder and how you resolved it.",
    "Tell me about a time you went above and beyond your standard job description.",
    "Describe a time you had to work with incomplete specifications or ambiguous requirements.",
    "How do you handle situations where a team member is not contributing their fair share?",
    "Describe a time when you received constructive feedback that helped you grow.",
    "Tell me about a time you had to make a quick decision under pressure without consulting your manager."
  ],
  communication: [
    "Explain a complex technical concept you worked on recently in plain, simple terms.",
    "How do you present project progress and metrics to executive stakeholders?",
    "Describe a time you had to persuade a team or manager to adopt a new tool or workflow.",
    "How do you handle communication gaps or misunderstandings in a remote team?",
    "What is your approach to writing clear, comprehensive documentation for a codebase?",
    "Describe a situation where you had to explain a delay in delivery to a client or manager.",
    "How do you facilitate productive conversations during brainstorming or planning sessions?",
    "Tell me about a time you had to deliver a technical presentation to a large audience."
  ],
  aptitude: [
    "If you have a 3-gallon jug and a 5-gallon jug, how can you measure exactly 4 gallons of water?",
    "A train traveling at 60 mph passes a platform in 30 seconds. If the train is 500 feet long, what is the length of the platform?",
    "Explain how you would estimate the number of streetlights in New York City.",
    "If five machines take five minutes to make five widgets, how long would it take 100 machines to make 100 widgets?",
    "A clock shows 3:15. What is the angle between the hour hand and the minute hand?",
    "You are given 8 identical-looking coins, one of which is counterfeit and weighs slightly less. Using a balance scale, how can you find it in 2 weighings?",
    "If it takes 8 workers 10 hours to build a wall, how long would it take 5 workers to build the same wall?"
  ],
  leadership: [
    "Describe your overall leadership philosophy and how you motivate a development team.",
    "How do you handle a high-performing team member who is toxic to the team's culture?",
    "Describe a time you had to make an unpopular strategic decision, and how you communicated it.",
    "How do you align your engineering team's goals with the company's broader business objectives?",
    "Describe a time you mentored someone and helped them transition into a leadership role.",
    "How do you manage resource allocation and budget constraints across multiple projects?",
    "Describe your approach to resolving disputes and conflicts between engineering leads."
  ]
};

export const generateQuestions = async (req, res, next) => {
  const category = req.params.category || req.query.category || 'tech';
  const role = req.query.role || 'Software Engineer';
  const difficulty = req.query.difficulty || 'Intermediate';
  const limit = parseInt(req.query.limit) || 5;
  const isFallback = req.query.fallback === 'true';

  // Helper to resolve localized fallback questions
  const getPredefinedQuestions = () => {
    let list;
    if (category === 'tech') {
      const diffKey = ['Beginner', 'Intermediate', 'Advanced'].includes(difficulty) ? difficulty : 'Intermediate';
      list = PREDEFINED_QUESTIONS.tech[diffKey];
    } else {
      list = PREDEFINED_QUESTIONS[category] || PREDEFINED_QUESTIONS.hr;
    }

    const processed = list.map(q => q.replace(/{role}/g, role));
    const result = [];
    for (let i = 0; i < limit; i++) {
      result.push(processed[i % processed.length]);
    }
    return result;
  };

  // Try LLM call if API key exists and fallback is not explicitly requested
  if (process.env.OPENAI_API_KEY && !isFallback) {
    try {
      const systemPrompt = `You are an expert AI interview coach. Generate exactly ${limit} unique, highly realistic interview questions for a candidate.`;
      const userPrompt = prompts.generateQuestions(category, role, difficulty, limit);
      
      const responseText = await callLLM(systemPrompt, userPrompt);
      let questionsList;
      try {
        const cleaned = responseText.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
        questionsList = JSON.parse(cleaned);
      } catch (e) {
        console.warn("Failed to parse LLM response as JSON array, falling back to line split", e);
        questionsList = responseText.split('\n')
          .map(line => line.replace(/^\d+[\.\)-]\s*/, '').trim())
          .filter(line => line.length > 10);
      }

      if (Array.isArray(questionsList) && questionsList.length > 0) {
        return res.status(200).json({ success: true, questions: questionsList.slice(0, limit) });
      }
    } catch (error) {
      console.warn("AI generation failed or error encountered. Falling back to predefined questions.", error);
    }
  }

  // Fallback path
  const fallbackQuestions = getPredefinedQuestions();
  return res.status(200).json({ success: true, questions: fallbackQuestions });
};
