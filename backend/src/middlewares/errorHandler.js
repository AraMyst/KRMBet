/**
 * Global error handler for Express.
 * Catches any error passed via next(err) and returns JSON response.
 * If err has a statusCode property, uses it; otherwise defaults to 500.
 */
module.exports = (err, req, res, next) => {
  // Default to 500 Internal Server Error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error stack in development for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  res.status(statusCode).json({ message });
};
