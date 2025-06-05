const rateLimit = require('express-rate-limit');

/**
 * Rate limiter middleware to prevent abuse (e.g., brute force login or excessive API calls).
 * Default: max 100 requests per 15 minutes per IP.
 * Customize windowMs and max as needed.
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    message: 'Too many requests from this IP, please try again later.',
  },
  headers: true, // Adds X-RateLimit headers to response
});

module.exports = limiter;
