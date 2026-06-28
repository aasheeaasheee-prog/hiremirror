import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_fallback_key', {
    expiresIn: '30d'
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 */
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email address.' });
    }

    const user = await User.create({
      name,
      email,
      password,
      skills: [],
      projects: []
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Auth user & get token
 * @route   POST /api/auth/login
 */
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      res.status(200).json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          degree: user.degree,
          college: user.college,
          location: user.location,
          skills: user.skills,
          projects: user.projects
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password credentials.' });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user profile data
 * @route   GET /api/auth/profile
 */
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile data
 * @route   PUT /api/auth/profile
 */
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Candidate user not found.' });
    }

    user.name = req.body.name || user.name;
    user.degree = req.body.degree !== undefined ? req.body.degree : user.degree;
    user.college = req.body.college !== undefined ? req.body.college : user.college;
    user.location = req.body.location !== undefined ? req.body.location : user.location;
    user.skills = req.body.skills !== undefined ? req.body.skills : user.skills;
    user.projects = req.body.projects !== undefined ? req.body.projects : user.projects;

    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        degree: updatedUser.degree,
        college: updatedUser.college,
        location: updatedUser.location,
        skills: updatedUser.skills,
        projects: updatedUser.projects
      }
    });
  } catch (error) {
    next(error);
  }
};
