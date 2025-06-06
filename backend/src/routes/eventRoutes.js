// backend/src/routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

/**
 * PUBLIC ROUTE: Fetch in-play or upcoming events for a given sportKey.
 * GET /api/events/:sportKey
 *
 * Query parameters (all optional):
 *   - dateFormat: e.g. "iso"
 *   - commenceTimeFrom: e.g. "2023-09-09T00:00:00Z"
 *   - commenceTimeTo: e.g. "2023-09-10T23:59:59Z"
 *   - eventIds: e.g. "evt1,evt2"
 */
router.get('/:sportKey', eventController.getEventsBySport);

module.exports = router;
