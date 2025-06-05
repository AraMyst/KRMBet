module.exports = {
  // Autenticación
  AUTH_MISSING_FIELDS: 'Nombre, correo electrónico, contraseña y fecha de nacimiento son obligatorios.',
  AUTH_UNDERAGE: 'Debes tener al menos 18 años para registrarte.',
  AUTH_EMAIL_EXISTS: 'Correo electrónico ya registrado.',
  AUTH_INVALID_CREDENTIALS: 'Correo electrónico o contraseña inválidos.',
  AUTH_MISSING_AUTH_HEADER: 'Falta el encabezado de Autorización.',
  AUTH_INVALID_AUTH_FORMAT: 'Formato de Autorización inválido.',
  AUTH_INVALID_TOKEN: 'Token inválido o expirado.',
  AUTH_USER_NOT_FOUND: 'Usuario no encontrado.',
  
  // Apuestas / Odds
  BET_SPORT_REQUIRED: 'La clave del deporte es obligatoria.',
  BET_RATE_LIMIT: 'Límite de peticiones de la API de odds excedido. Intenta de nuevo más tarde.',
  BET_MISSING_FIELDS: 'eventId, market, stake, selectedOutcome y oddsValue son obligatorios.',
  BET_INSUFFICIENT_FUNDS: 'Saldo insuficiente para realizar esta apuesta.',
  BET_NOT_FOUND_CANCEL: 'Apuesta no encontrada o no se puede cancelar.',
  
  // Pago
  PAYMENT_INVALID_DEPOSIT_AMOUNT: 'Se requiere un monto de depósito válido.',
  PAYMENT_DEPOSIT_SUCCESS: 'Depósito realizado con éxito.',
  PAYMENT_INVALID_WITHDRAWAL_AMOUNT: 'Se requiere un monto de retiro válido.',
  PAYMENT_INSUFFICIENT_FUNDS: 'Saldo insuficiente para retiro.',
  PAYMENT_WITHDRAWAL_SUCCESS: 'Retiro realizado con éxito.',
  
  // Promociones
  PROMO_ID_REQUIRED: 'El parámetro promotionId es obligatorio.',
  PROMO_NOT_FOUND: 'Promoción no encontrada.',
  
  // Perfil de Usuario
  USER_UPDATE_NO_FIELDS: 'Se requiere al menos un campo (nombre, correo electrónico, fecha de nacimiento).',
  USER_UPDATE_UNDERAGE: 'Debes tener al menos 18 años.',
  USER_EMAIL_EXISTS: 'Correo electrónico ya en uso por otra cuenta.',
  USER_VERIFY_DATA_REQUIRED: 'Se requieren datos de verificación.',
  
  // Limitador de Solicitudes
  RATE_LIMIT_MESSAGE: 'Demasiadas solicitudes desde esta IP. Por favor, inténtalo más tarde.',
};
