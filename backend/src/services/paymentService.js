const User = require('../models/User');
const Transaction = require('../models/Transaction');

/**
 * Deposit funds into a user's account.
 * Steps:
 * 1) Create a Transaction record of type 'deposit'.
 * 2) Increase user.balance by amount.
 * 3) Return { newBalance, transaction }.
 */
async function deposit({ userId, amount }) {
  // 1) Create transaction record
  const transaction = new Transaction({
    userId,
    type: 'deposit',
    amount,
    status: 'completed',
    date: new Date(),
  });
  await transaction.save();

  // 2) Update user balance
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found.');
    error.code = 'UserNotFound';
    throw error;
  }
  user.balance += amount;
  await user.save();

  // 3) Return updated balance and transaction
  return {
    newBalance: user.balance,
    transaction,
  };
}

/**
 * Withdraw funds from a user's account.
 * Steps:
 * 1) Verify user.balance >= amount. If not, throw 'InsufficientFunds'.
 * 2) Deduct amount from user.balance.
 * 3) Create a Transaction record of type 'withdrawal'.
 * 4) Return { newBalance, transaction }.
 */
async function withdraw({ userId, amount }) {
  // 1) Find user and check balance
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found.');
    error.code = 'UserNotFound';
    throw error;
  }
  if (user.balance < amount) {
    const error = new Error('Insufficient balance.');
    error.code = 'InsufficientFunds';
    throw error;
  }

  // 2) Deduct amount
  user.balance -= amount;
  await user.save();

  // 3) Create transaction record
  const transaction = new Transaction({
    userId,
    type: 'withdrawal',
    amount,
    status: 'completed',
    date: new Date(),
  });
  await transaction.save();

  // 4) Return updated balance and transaction
  return {
    newBalance: user.balance,
    transaction,
  };
}

/**
 * Get transaction history for a user.
 * Returns an array of Transaction documents sorted by date descending.
 */
async function getTransactionHistory(userId) {
  const history = await Transaction.find({ userId }).sort({ date: -1 });
  return history;
}

module.exports = {
  deposit,
  withdraw,
  getTransactionHistory,
};
