const jwt = require('jsonwebtoken');
const config = require('../utils/config');

/**
 * Authenticate requests using JWT.
 * Expects header "Authorization: Bearer <token>".
 * If valid, attaches decoded payload to req.user.
 * If missing or invalid, returns 401 Unauthorized.
 */
module.exports = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing Authorization header.' });
  }

  // Format must be "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid Authorization format.' });
  }

  const token = parts[1];
  try {
    // Verify token using secret from config
    const decoded = jwt.verify(token, config.JWT_SECRET);
    // Attach user info (e.g., { id, email }) to request object
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
