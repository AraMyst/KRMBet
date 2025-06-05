const authService = require('../services/authService');

// Register a new user
// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, birthdate } = req.body;

    // Basic field validation
    if (!name || !email || !password || !birthdate) {
      return res.status(400).json({ message: 'Name, email, password and birthdate are required.' });
    }

    // Check if user is at least 18 years old
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    const ageDifMs = today - birthDateObj;
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (age < 18) {
      return res.status(403).json({ message: 'You must be at least 18 years old to register.' });
    }

    // Attempt to create new user via authService
    // authService.register should:
    // 1) Check if email already exists (throw error if so)
    // 2) Hash the password
    // 3) Save user record with name, email, passwordHash, birthdate, initial balance, etc.
    // 4) Generate a JWT token
    const { user, token } = await authService.register({ name, email, password, birthdate });

    // Return basic user info and auth token
    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        birthdate: user.birthdate,
      },
      token,
    });
  } catch (err) {
    // If authService.register throws a "EmailAlreadyExists" error, catch here
    if (err.code === 'EmailExists') {
      return res.status(409).json({ message: 'Email already registered.' });
    }
    next(err);
  }
};

// Log in existing user
// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Basic field validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Attempt to authenticate via authService
    // authService.login should:
    // 1) Find user by email
    // 2) Compare provided password with stored hash
    // 3) If valid, return { user, token }
    // 4) If invalid credentials, throw an "InvalidCredentials" error
    const { user, token } = await authService.login({ email, password });

    // Return user info and auth token
    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        birthdate: user.birthdate,
      },
      token,
    });
  } catch (err) {
    // If invalid credentials
    if (err.code === 'InvalidCredentials') {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    next(err);
  }
};

// Get current user profile
// GET /api/auth/profile
// Requires valid JWT; authMiddleware must populate req.user = { id, email }
exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await authService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Return user profile (excluding sensitive fields)
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      balance: user.balance,
      isVerified: user.isVerified,
    });
  } catch (err) {
    next(err);
  }
};
