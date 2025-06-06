// backend/src/routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

/**
 * GET /api/events/:sportKey
 * e.g. GET /api/events/soccer_epl
 */
router.get('/:sportKey', eventController.getEventsBySport);

module.exports = router;
