// backend/src/routes/oddsRoutes.js

const express = require('express');
const router = express.Router();
const oddsController = require('../controllers/oddsController');

/**
 * ROTA PÚBLICA: Lista todos os sport keys disponíveis.
 * GET /api/odds/sports
 */
router.get('/sports', oddsController.getAllSports);

/**
 * ROTA PÚBLICA: Busca odds agregadas (bestOdds) para todos os eventos de um sportKey.
 * GET /api/odds/:sportKey
 *
 * Query params (opcionais):
 *   regions: ex.: "us,uk"
 *   markets: ex.: "h2h,spreads"
 *   oddsFormat: ex.: "american"
 *   dateFormat: ex.: "iso"
 */
router.get('/:sportKey', oddsController.getOddsBySport);

/**
 * ROTA PÚBLICA: Busca mercados (odds completos) de um evento específico.
 * GET /api/odds/:sportKey/events/:eventId
 *
 * Query params (opcionais):
 *   regions: ex.: "us,uk"
 *   markets: ex.: "h2h,spreads"
 *   oddsFormat: ex.: "american"
 *   dateFormat: ex.: "iso"
 */
router.get(
  '/:sportKey/events/:eventId',
  oddsController.getEventOdds
);

module.exports = router;
