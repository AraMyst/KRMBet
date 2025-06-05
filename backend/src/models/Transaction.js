const mongoose = require('mongoose');

const { Schema, model } = mongoose;

/**
 * Transaction schema records all deposit and withdrawal actions by users.
 * - userId: reference to the User who performed the transaction
 * - type: 'deposit' or 'withdrawal'
 * - amount: positive number representing the funds involved
 * - date: timestamp when the transaction occurred
 * - status: 'pending', 'completed', or 'failed' (useful if you integrate with external payment processor)
 */
const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed',
  },
});

module.exports = model('Transaction', transactionSchema);
