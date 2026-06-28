import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Protect routes: verifies authentication tokens.
 */
export const protect = async (req, res, next) => {
  let token;

  // Read JWT from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authorization token is missing. Access denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_fallback_key');
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(404).json({ success: false, message: 'No user associated with this token.' });
    }
    next();
  } catch (error) {
    console.error("JWT Verification error:", error);
    return res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
};
