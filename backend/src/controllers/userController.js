// src/controllers/userController.js

const userService = require('../services/userService');

/**
 * Update the authenticated user's profile information
 * PUT /api/user/profile
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; // Populated by authMiddleware
    const { name, email, birthDate } = req.body;

    // Validate that at least one updatable field is provided
    if (!name && !email && !birthDate) {
      return res
        .status(400)
        .json({ message: 'At least one field (name, email, birthDate) is required.' });
    }

    // If birthDate is provided, validate that user is at least 18 years old
    if (birthDate) {
      const birthDateObj = new Date(birthDate);
      if (isNaN(birthDateObj.getTime())) {
        return res
          .status(400)
          .json({ message: 'birthDate must be a valid date in YYYY-MM-DD format.' });
      }
      const today = new Date();
      const ageDiffMs = today - birthDateObj;
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (age < 18) {
        return res
          .status(403)
          .json({ message: 'You must be at least 18 years old.' });
      }
    }

    // Build an object containing only the fields to update
    const updates = {};
    if (name) {
      updates.name = name;
    }
    if (email) {
      updates.email = email;
    }
    if (birthDate) {
      updates.birthdate = birthDate; // Pass as "birthdate" (lowercase) to match the schema
    }

    // Call the service layer to perform the update
    // userService.updateUser should:
    //   1) Check if email (if provided) is not already taken by another user
    //   2) Update the fields (name, email, birthdate) on the User record
    //   3) Return the updated user object
    const updatedUser = await userService.updateUser(userId, updates);

    // Respond with the updated user (excluding sensitive fields)
    return res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      birthdate: updatedUser.birthdate,
      balance: updatedUser.balance,
      isVerified: updatedUser.isVerified,
    });
  } catch (err) {
    // If userService.updateUser throws an "EmailExists" error, catch it here
    if (err.code === 'EmailExists') {
      return res
        .status(409)
        .json({ message: 'Email already in use by another account.' });
    }
    // Otherwise, delegate to the global error handler
    return next(err);
  }
};

/**
 * Verify the authenticated user's account
 * POST /api/user/verify
 */
exports.verifyAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { verificationData } = req.body;

    // Require verificationData in the body
    if (!verificationData) {
      return res
        .status(400)
        .json({ message: 'Verification data is required.' });
    }

    // userService.verifyAccount should:
    //   1) Process or store the verification data (e.g., ID document URL)
    //   2) Mark user.isVerified = true (or pending if manual review required)
    //   3) Return the updated user object
    const verifiedUser = await userService.verifyAccount(userId, verificationData);

    return res.status(200).json({
      message: 'Account verification submitted successfully.',
      isVerified: verifiedUser.isVerified,
    });
  } catch (err) {
    return next(err);
  }
};
