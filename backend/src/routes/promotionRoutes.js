const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

// Retrieve all active promotions
// GET /api/promotions
router.get('/', promotionController.getAllPromotions);

// Retrieve details for a specific promotion
// GET /api/promotions/:promotionId
router.get('/:promotionId', promotionController.getPromotionById);

module.exports = router;
