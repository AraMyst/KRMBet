const mongoose = require('mongoose');

const { Schema, model } = mongoose;

/**
 * User schema represents a registered user on the betting site.
 * - name: full name of the user
 * - email: unique email address, used for login
 * - passwordHash: bcrypt-hashed password
 * - birthdate: Date object, must be at least 18 years old
 * - balance: current account balance (in site currency units)
 * - isVerified: boolean flag indicating if user completed verification
 * - verificationData: optional object or URL storing verification documents/info
 * - createdAt & updatedAt: timestamps for record auditing
 */
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationData: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = model('User', userSchema);
