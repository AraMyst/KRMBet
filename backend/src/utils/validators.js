// utils/validators.js

const validator = require('validator');

/**
 * Check if the provided email is in a valid format.
 * Returns true if valid, false otherwise.
 */
function isValidEmail(email) {
  return typeof email === 'string' && validator.isEmail(email);
}

/**
 * Check if the provided password meets strength requirements.
 * Requirements:
 *  - Minimum length of 8 characters
 *  - At least one lowercase letter
 *  - At least one uppercase letter
 *  - At least one number
 *  - At least one symbol
 * Returns true if strong, false otherwise.
 */
function isStrongPassword(password) {
  return (
    typeof password === 'string' &&
    validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  );
}

/**
 * Validate a date string in YYYY-MM-DD format.
 * Returns true if valid date string, false otherwise.
 */
function isValidDateString(dateStr) {
  return typeof dateStr === 'string' && validator.isDate(dateStr, { format: 'YYYY-MM-DD', strictMode: true });
}

/**
 * Check if the provided value is a positive number greater than 0.
 * Accepts numeric strings or numbers.
 * Returns true if positive, false otherwise.
 */
function isPositiveNumber(value) {
  if (typeof value === 'number') {
    return value > 0;
  }
  if (typeof value === 'string' && validator.isNumeric(value, { no_symbols: true })) {
    return Number(value) > 0;
  }
  return false;
}

module.exports = {
  isValidEmail,
  isStrongPassword,
  isValidDateString,
  isPositiveNumber,
};
