const paymentService = require('../services/paymentService');

// Deposit funds into the user's account
// POST /api/payment/deposit
exports.deposit = async (req, res, next) => {
  try {
    const userId = req.user.id; // Populated by authMiddleware
    const { amount } = req.body;

    // Validate request body
    if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'A valid deposit amount is required.' });
    }

    // paymentService.deposit should:
    // 1) Create a transaction record { userId, type: 'deposit', amount, date }
    // 2) Increase user.balance by amount
    // 3) Return the updated user balance or transaction object
    const result = await paymentService.deposit({ userId, amount });

    res.status(200).json({
      message: 'Deposit successful.',
      newBalance: result.newBalance,
      transaction: result.transaction,
    });
  } catch (err) {
    next(err);
  }
};

// Withdraw funds from the user's account
// POST /api/payment/withdraw
exports.withdraw = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;

    // Validate request body
    if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'A valid withdrawal amount is required.' });
    }

    // paymentService.withdraw should:
    // 1) Check if user.balance >= amount; if not, throw error with code 'InsufficientFunds'
    // 2) Deduct amount from user.balance
    // 3) Create a transaction record { userId, type: 'withdrawal', amount, date }
    // 4) Return the updated user balance or transaction object
    const result = await paymentService.withdraw({ userId, amount });

    res.status(200).json({
      message: 'Withdrawal successful.',
      newBalance: result.newBalance,
      transaction: result.transaction,
    });
  } catch (err) {
    if (err.code === 'InsufficientFunds') {
      return res.status(402).json({ message: 'Insufficient balance for withdrawal.' });
    }
    next(err);
  }
};

// Get user's transaction history (deposits and withdrawals)
// GET /api/payment/history
exports.getHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // paymentService.getTransactionHistory should:
    // Return an array of transaction objects sorted by date desc
    const history = await paymentService.getTransactionHistory(userId);

    res.status(200).json(history);
  } catch (err) {
    next(err);
  }
};
