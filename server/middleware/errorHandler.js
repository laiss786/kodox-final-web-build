// middleware/errorHandler.js — Global error handler (OWASP: never leak stack traces in production)
const errorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === 'development';

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Only show stack in dev (OWASP A09: Security Logging)
    ...(isDev && { stack: err.stack }),
  });
};

module.exports = errorHandler;
