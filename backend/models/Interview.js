import mongoose from 'mongoose';

const QuestionResponseSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  timestamp: { type: String }
});

const InterviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['hr', 'tech', 'behavioral'],
    required: true
  },
  date: {
    type: String,
    required: true
  },
  overall: { type: Number, required: true },
  communication: { type: Number, required: true },
  confidence: { type: Number, required: true },
  clarity: { type: Number, required: true },
  technicalDepth: { type: Number, required: true },
  problemSolving: { type: Number, required: true },
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  suggestions: [{ type: String }],
  history: [QuestionResponseSchema]
}, {
  timestamps: true
});

const Interview = mongoose.model('Interview', InterviewSchema);
export default Interview;
