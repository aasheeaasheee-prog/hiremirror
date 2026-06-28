import express from 'express';
import { getInterviews, createInterview, getInterviewById, deleteInterview, generateQuestions } from '../controllers/interviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public route to generate questions
router.get('/generate', generateQuestions);

// Protect all interview telemetry endpoints
router.use(protect);

router.route('/')
  .get(getInterviews)
  .post(createInterview);

router.route('/:id')
  .get(getInterviewById)
  .delete(deleteInterview);

export default router;
