const User = require('../models/User');

/**
 * Update user profile fields: name, email, birthdate.
 * Steps:
 * 1) If email is provided, check for uniqueness (another user must not have it).
 * 2) Update only the fields that are not undefined.
 * 3) Save and return updated user.
 */
async function updateUser(userId, { name, email, birthdate }) {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found.');
    error.code = 'UserNotFound';
    throw error;
  }

  // 1) If email changed, ensure no other user has that email
  if (email && email !== user.email) {
    const existing = await User.findOne({ email });
    if (existing) {
      const error = new Error('Email already in use by another account.');
      error.code = 'EmailExists';
      throw error;
    }
  }

  // 2) Update fields if provided
  if (name !== undefined) {
    user.name = name;
  }
  if (email !== undefined) {
    user.email = email;
  }
  if (birthdate !== undefined) {
    user.birthdate = new Date(birthdate);
  }

  await user.save();
  return user;
}

/**
 * Verify a user's account.
 * Steps:
 * 1) Store or process verificationData in user.verificationData.
 * 2) Set user.isVerified = true (or leave false if manual review needed).
 * 3) Save and return updated user.
 */
async function verifyAccount(userId, verificationData) {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found.');
    error.code = 'UserNotFound';
    throw error;
  }

  // 1) Store verificationData (e.g., ID document URL)
  user.verificationData = verificationData;

  // 2) Automatically mark as verified (or change logic if manual review required)
  user.isVerified = true;

  await user.save();
  return user;
}

module.exports = {
  updateUser,
  verifyAccount,
};
