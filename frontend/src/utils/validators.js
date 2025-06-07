// src/utils/validators.js

/**
 * isValidEmail
 *
 * Basic email format validation using regex.
 *
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const re =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

/**
 * isValidPassword
 *
 * Checks for minimum length (8), at least one letter and one number.
 *
 * @param {string} password
 * @returns {boolean}
 */
export function isValidPassword(password) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
}

/**
 * isValidUsername
 *
 * Allows alphanumerics and underscores, length between 3 and 20.
 *
 * @param {string} username
 * @returns {boolean}
 */
export function isValidUsername(username) {
  const re = /^[A-Za-z0-9_]{3,20}$/;
  return re.test(username);
}

/**
 * isPositiveNumber
 *
 * Checks that a value is a number > 0.
 *
 * @param {any} value
 * @returns {boolean}
 */
export function isPositiveNumber(value) {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
}

/**
 * isNonEmptyString
 *
 * Checks that a string is not empty or whitespace only.
 *
 * @param {string} str
 * @returns {boolean}
 */
export function isNonEmptyString(str) {
  return typeof str === 'string' && str.trim().length > 0;
}
