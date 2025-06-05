const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

// All payment routes require authentication
router.use(authMiddleware);

/**
 * Deposit funds into the user's account
 * POST /api/payment/deposit
 */
router.post('/deposit', paymentController.deposit);

/**
 * Withdraw funds from the user's account
 * POST /api/payment/withdraw
 */
router.post('/withdraw', paymentController.withdraw);

/**
 * Get transaction history for the authenticated user
 * GET /api/payment/history
 */
router.get('/history', paymentController.getHistory);

module.exports = router;
