const mongoose = require('mongoose');

const { Schema, model } = mongoose;

/**
 * Bet schema represents a single bet placed by a user on a sports event.
 */
const betSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventId: {
    type: String,
    required: true,
    index: true,
  },
  market: {
    type: String,
    required: true,
  },
  stake: {
    type: Number,
    required: true,
    min: 0,
  },
  selectedOutcome: {
    type: String,
    required: true,
  },
  oddsValue: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'won', 'lost', 'cancelled'],
    default: 'pending',
  },
  placedAt: {
    type: Date,
    default: Date.now,
  },
  settledAt: {
    type: Date,
  },
  payout: {
    type: Number,
    default: 0,
    min: 0,
  },
});

module.exports = model('Bet', betSchema);
