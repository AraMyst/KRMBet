// backend/src/routes/oddsRoutes.js

const express = require('express');
const router = express.Router();
const oddsController = require('../controllers/oddsController');

/**
 * GET /api/odds/:sportKey
 * e.g. GET /api/odds/soccer_epl
 */
router.get('/:sportKey', oddsController.getOddsBySport);

module.exports = router;
