module.exports = {
  // Authentication
  AUTH_MISSING_FIELDS: 'Name, email, password and birthdate are required.',
  AUTH_UNDERAGE: 'You must be at least 18 years old to register.',
  AUTH_EMAIL_EXISTS: 'Email already registered.',
  AUTH_INVALID_CREDENTIALS: 'Invalid email or password.',
  AUTH_MISSING_AUTH_HEADER: 'Missing Authorization header.',
  AUTH_INVALID_AUTH_FORMAT: 'Invalid Authorization format.',
  AUTH_INVALID_TOKEN: 'Invalid or expired token.',
  AUTH_USER_NOT_FOUND: 'User not found.',
  
  // Betting / Odds
  BET_SPORT_REQUIRED: 'Sport key is required.',
  BET_RATE_LIMIT: 'Odds API rate limit exceeded. Try again later.',
  BET_MISSING_FIELDS: 'eventId, market, stake, selectedOutcome and oddsValue are required.',
  BET_INSUFFICIENT_FUNDS: 'Insufficient balance to place this bet.',
  BET_NOT_FOUND_CANCEL: 'Bet not found or cannot be cancelled.',
  
  // Payment
  PAYMENT_INVALID_DEPOSIT_AMOUNT: 'A valid deposit amount is required.',
  PAYMENT_DEPOSIT_SUCCESS: 'Deposit successful.',
  PAYMENT_INVALID_WITHDRAWAL_AMOUNT: 'A valid withdrawal amount is required.',
  PAYMENT_INSUFFICIENT_FUNDS: 'Insufficient balance for withdrawal.',
  PAYMENT_WITHDRAWAL_SUCCESS: 'Withdrawal successful.',
  
  // Promotions
  PROMO_ID_REQUIRED: 'promotionId parameter is required.',
  PROMO_NOT_FOUND: 'Promotion not found.',
  
  // User Profile
  USER_UPDATE_NO_FIELDS: 'At least one field (name, email, birthdate) is required.',
  USER_UPDATE_UNDERAGE: 'You must be at least 18 years old.',
  USER_EMAIL_EXISTS: 'Email already in use by another account.',
  USER_VERIFY_DATA_REQUIRED: 'Verification data is required.',
  
  // Rate Limiter
  RATE_LIMIT_MESSAGE: 'Too many requests from this IP, please try again later.',
};
