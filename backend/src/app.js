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

// Add these two lines:
const oddsRoutes = require('./routes/oddsRoutes');
const eventRoutes = require('./routes/eventRoutes');

const { connectDatabase } = require('./utils/database');
const config = require('./utils/config');

const app = express();

// Connect to MongoDB (Atlas or fallback to local)
connectDatabase();

// Security headers
app.use(helmet());

// HTTP request logger
app.use(morgan('dev'));

// Global rate limiting
app.use(rateLimiter);

// JSON body parser
app.use(express.json());

// Internationalization middleware
app.use(i18nMiddleware);

// Mount existing routes
app.use('/api/auth', authRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/casino', casinoRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/user', userRoutes);

// Mount public routes for odds and events
app.use('/api/odds', oddsRoutes);
app.use('/api/events', eventRoutes);

// Global error handler (should be last)
app.use(errorHandler);

module.exports = app;
