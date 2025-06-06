// src/controllers/authController.js

const authService = require('../services/authService');

/**
 * Register a new user
 * POST /api/auth/register
 */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, birthDate } = req.body;

    // Basic field validation
    if (!name || !email || !password || !birthDate) {
      return res
        .status(400)
        .json({ message: 'Name, email, password and birthDate are required.' });
    }

    // Validate date format (YYYY-MM-DD)
    // Opcional: se quiser usar a função isValidDateString do utils/validators.js:
    // const { isValidDateString } = require('../utils/validators');
    // if (!isValidDateString(birthDate)) {
    //   return res.status(400).json({ message: 'birthDate must be in YYYY-MM-DD format.' });
    // }

    // Check if user is at least 18 years old
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    const ageDifMs = today - birthDateObj;
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (age < 18) {
      return res
        .status(403)
        .json({ message: 'You must be at least 18 years old to register.' });
    }

    // Attempt to create new user via authService
    // Passando birthDate (camelCase) para o serviço como "birthdate" (lowercase),
    // já que é assim que o model espera.
    const { user, token } = await authService.register({
      name,
      email,
      password,
      birthdate: birthDate,
    });

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

/**
 * Log in existing user
 * POST /api/auth/login
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Basic field validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' });
    }

    // Attempt to authenticate via authService
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
      return res
        .status(401)
        .json({ message: 'Invalid email or password.' });
    }
    next(err);
  }
};

/**
 * Get current user profile
 * GET /api/auth/profile
 * Requires valid JWT; authMiddleware must populate req.user = { id, email }
 */
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
