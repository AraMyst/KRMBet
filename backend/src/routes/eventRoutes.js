// backend/src/routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

/**
 * ROTA PÚBLICA: Busca eventos (in-play e próximos) de um sportKey.
 * GET /api/events/:sportKey
 *
 * Query params (opcionais):
 *   dateFormat: ex.: "iso"
 *   commenceTimeFrom: ex.: "2023-09-09T00:00:00Z"
 *   commenceTimeTo: ex.: "2023-09-10T23:59:59Z"
 *   eventIds: ex.: "evt1,evt2"
 */
router.get('/:sportKey', eventController.getEventsBySport);

module.exports = router;
