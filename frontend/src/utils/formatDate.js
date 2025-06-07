// src/utils/formatDate.js

/**
 * formatDate
 *
 * Formats a date string or Date object into a localized date string.
 *
 * @param {string|Date|number} dateInput - Date input (ISO string, timestamp, or Date)
 * @param {string} locale - BCP 47 language tag (defaults to browser locale)
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date string
 */
export function formatDate(
  dateInput,
  locale = navigator.language,
  options = { year: 'numeric', month: '2-digit', day: '2-digit' }
) {
  const date = new Date(dateInput);
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * formatDateTime
 *
 * Formats a date/time into a localized date and time string.
 *
 * @param {string|Date|number} dateInput
 * @param {string} locale
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string}
 */
export function formatDateTime(
  dateInput,
  locale = navigator.language,
  options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }
) {
  const date = new Date(dateInput);
  return new Intl.DateTimeFormat(locale, options).format(date);
}
