// src/utils/errorParser.js

/**
 * parseError
 *
 * Given an error thrown by axios or a generic Error, returns
 * a user-friendly message string.
 *
 * @param {any} error - The error object caught in a try/catch
 * @returns {string} - Parsed error message
 */
export function parseError(error) {
  // Axios error with response payload
  if (error.response && error.response.data) {
    const data = error.response.data;
    // Try common fields
    if (data.message) return data.message;
    if (data.error) return data.error;
  }

  // Network or other error
  if (error.message) {
    return error.message;
  }

  // Fallback generic message
  return 'An unexpected error occurred. Please try again.';
}
