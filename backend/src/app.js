// app.js

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimiter = require('./middlewares/rateLimiter');
const i18nMiddleware = require('./middlewares/i18nMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const betRoutes = require('./routes/betRoutes');
const casinoRoutes = require('./routes/casinoRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const userRoutes = require('./routes/userRoutes');
const { connectDatabase } = require('./utils/database');
const config = require('./utils/config');

const app = express();

// Connect to MongoDB
connectDatabase();

// Security headers
app.use(helmet());

// HTTP request logging
app.use(morgan('dev'));

// Rate limiting (apply globally or to specific routes)
app.use(rateLimiter);

// Parse incoming JSON requests
app.use(express.json());

// Internationalization middleware
app.use(i18nMiddleware);

// Mount route handlers
app.use('/api/auth', authRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/casino', casinoRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/user', userRoutes);

// Global error handler (must be after all routes)
app.use(errorHandler);

module.exports = app;
