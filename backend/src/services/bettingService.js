const Bet = require('../models/Bet');
const User = require('../models/User');

/**
 * Create a new bet for a user.
 * Steps:
 * 1) Find the user and verify balance >= stake.
 * 2) Deduct stake from user.balance and save user.
 * 3) Create a Bet document with status 'pending'.
 * Returns the created Bet.
 */
async function createBet({ userId, eventId, market, stake, selectedOutcome, oddsValue }) {
  // 1) Verify user balance
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found.');
    error.code = 'UserNotFound';
    throw error;
  }
  if (user.balance < stake) {
    const error = new Error('Insufficient balance.');
    error.code = 'InsufficientFunds';
    throw error;
  }

  // 2) Deduct stake
  user.balance -= stake;
  await user.save();

  // 3) Create Bet document
  const bet = new Bet({
    userId,
    eventId,
    market,
    stake,
    selectedOutcome,
    oddsValue,
    status: 'pending',
    placedAt: new Date(),
  });

  await bet.save();
  return bet;
}

/**
 * Get all bets placed by a specific user.
 * Returns an array of Bet documents sorted by placedAt descending.
 */
async function getBetsByUser(userId) {
  const bets = await Bet.find({ userId }).sort({ placedAt: -1 });
  return bets;
}

/**
 * Cancel a pending bet.
 * Steps:
 * 1) Find bet by ID and verify it belongs to userId.
 * 2) Verify bet.status === 'pending'.
 * 3) Set bet.status = 'cancelled' and record settledAt.
 * 4) Refund stake to user's balance.
 * Returns true if cancelled, false otherwise.
 */
async function cancelBet({ userId, betId }) {
  // 1) Find bet
  const bet = await Bet.findById(betId);
  if (!bet || bet.userId.toString() !== userId) {
    return false;
  }
  // 2) Check status
  if (bet.status !== 'pending') {
    return false;
  }

  // 3) Update status and settledAt
  bet.status = 'cancelled';
  bet.settledAt = new Date();
  await bet.save();

  // 4) Refund stake
  const user = await User.findById(userId);
  if (user) {
    user.balance += bet.stake;
    await user.save();
  }

  return true;
}

module.exports = {
  createBet,
  getBetsByUser,
  cancelBet,
};
