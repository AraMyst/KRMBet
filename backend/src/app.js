// backend/src/app.js

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

// ← ADICIONE ESTAS DUAS LINHAS:
const oddsRoutes = require('./routes/oddsRoutes');
const eventRoutes = require('./routes/eventRoutes');
// ↑──────────────────────────────────────────────────────────────────

const { connectDatabase } = require('./utils/database');
const config = require('./utils/config');

const app = express();

// Conectar ao MongoDB (Atlas ou local)
connectDatabase();

// Segurança (headers)
app.use(helmet());

// Logger HTTP
app.use(morgan('dev'));

// Rate limiting (global)
app.use(rateLimiter);

// Body parser JSON
app.use(express.json());

// Internacionalização
app.use(i18nMiddleware);

// Montar rotas existentes
app.use('/api/auth', authRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/casino', casinoRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/user', userRoutes);

// ← MONTE AS ROTAS DE ODDS E EVENTS AQUI:
// Rota pública para odds (sports, todos os eventos, evento específico)
app.use('/api/odds', oddsRoutes);

// Rota pública para eventos (lista de eventos)
app.use('/api/events', eventRoutes);

// Global error handler (deve ficar por último)
app.use(errorHandler);

module.exports = app;
