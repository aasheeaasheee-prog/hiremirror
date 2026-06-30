import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, googleLogin } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public auth endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);

// Protected candidate profile endpoints
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
