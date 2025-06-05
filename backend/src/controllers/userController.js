const userService = require('../services/userService');

// Update the authenticated user's profile information
// PUT /api/user/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; // Populated by authMiddleware
    const { name, email, birthdate } = req.body;

    // Validate at least one field to update
    if (!name && !email && !birthdate) {
      return res.status(400).json({ message: 'At least one field (name, email, birthdate) is required.' });
    }

    // If birthdate is provided, validate age >= 18
    if (birthdate) {
      const birthDateObj = new Date(birthdate);
      const today = new Date();
      const ageDifMs = today - birthDateObj;
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (age < 18) {
        return res.status(403).json({ message: 'You must be at least 18 years old.' });
      }
    }

    // userService.updateUser should:
    // 1) Check if email (if provided) is not already taken by another user
    // 2) Update the fields (name, email, birthdate) on the User record
    // 3) Return the updated user object
    const updatedUser = await userService.updateUser(userId, { name, email, birthdate });

    res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      birthdate: updatedUser.birthdate,
      balance: updatedUser.balance,
      isVerified: updatedUser.isVerified,
    });
  } catch (err) {
    // If email is already in use by another user, userService.updateUser may throw err.code = 'EmailExists'
    if (err.code === 'EmailExists') {
      return res.status(409).json({ message: 'Email already in use by another account.' });
    }
    next(err);
  }
};

// Verify the authenticated user's account
// POST /api/user/verify
exports.verifyAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { verificationData } = req.body;

    // Validate request body
    if (!verificationData) {
      return res.status(400).json({ message: 'Verification data is required.' });
    }

    // userService.verifyAccount should:
    // 1) Process or store the verification data (e.g., ID document URL)
    // 2) Mark user.isVerified = true (or pending if manual review required)
    // 3) Return updated user object or a status
    const verifiedUser = await userService.verifyAccount(userId, verificationData);

    res.status(200).json({
      message: 'Account verification submitted successfully.',
      isVerified: verifiedUser.isVerified,
    });
  } catch (err) {
    next(err);
  }
};
