const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../utils/config');

/**
 * Register a new user.
 * Steps:
 * 1) Check if email already exists.
 * 2) Hash the password.
 * 3) Create and save the User document.
 * 4) Generate a JWT token for the new user.
 * Returns: { user, token }
 */
async function register({ name, email, password, birthdate }) {
  // 1) Check for existing email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email already registered.');
    error.code = 'EmailExists';
    throw error;
  }

  // 2) Hash the password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // 3) Create User document
  const user = new User({
    name,
    email,
    passwordHash,
    birthdate: new Date(birthdate),
    balance: 0,
    isVerified: false,
    verificationData: null,
  });

  await user.save();

  // 4) Generate JWT token
  const tokenPayload = { id: user._id.toString(), email: user.email };
  const token = jwt.sign(tokenPayload, config.JWT_SECRET, { expiresIn: '7d' });

  // Return user (without passwordHash) and token
  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      balance: user.balance,
      isVerified: user.isVerified,
    },
    token,
  };
}

/**
 * Log in an existing user.
 * Steps:
 * 1) Find user by email.
 * 2) Compare provided password with stored hash.
 * 3) If valid, generate a JWT token and return user + token.
 * Otherwise, throw InvalidCredentials error.
 * Returns: { user, token }
 */
async function login({ email, password }) {
  // 1) Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('Invalid email or password.');
    error.code = 'InvalidCredentials';
    throw error;
  }

  // 2) Compare password
  const passwordValid = await bcrypt.compare(password, user.passwordHash);
  if (!passwordValid) {
    const error = new Error('Invalid email or password.');
    error.code = 'InvalidCredentials';
    throw error;
  }

  // 3) Generate JWT token
  const tokenPayload = { id: user._id.toString(), email: user.email };
  const token = jwt.sign(tokenPayload, config.JWT_SECRET, { expiresIn: '7d' });

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      balance: user.balance,
      isVerified: user.isVerified,
    },
    token,
  };
}

/**
 * Retrieve a user by ID.
 * Returns the User document (excluding passwordHash).
 */
async function getUserById(userId) {
  const user = await User.findById(userId).select('-passwordHash');
  return user;
}

module.exports = {
  register,
  login,
  getUserById,
};
