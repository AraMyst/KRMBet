module.exports = {
  // Autenticação
  AUTH_MISSING_FIELDS: 'Nome, e-mail, senha e data de nascimento são obrigatórios.',
  AUTH_UNDERAGE: 'Você deve ter pelo menos 18 anos para se registrar.',
  AUTH_EMAIL_EXISTS: 'E-mail já cadastrado.',
  AUTH_INVALID_CREDENTIALS: 'E-mail ou senha inválidos.',
  AUTH_MISSING_AUTH_HEADER: 'Cabeçalho de Autorização ausente.',
  AUTH_INVALID_AUTH_FORMAT: 'Formato de Autorização inválido.',
  AUTH_INVALID_TOKEN: 'Token inválido ou expirado.',
  AUTH_USER_NOT_FOUND: 'Usuário não encontrado.',
  
  // Apostas / Odds
  BET_SPORT_REQUIRED: 'A chave do esporte é obrigatória.',
  BET_RATE_LIMIT: 'Limite de requisições da API de odds atingido. Tente novamente mais tarde.',
  BET_MISSING_FIELDS: 'eventId, market, stake, selectedOutcome e oddsValue são obrigatórios.',
  BET_INSUFFICIENT_FUNDS: 'Saldo insuficiente para fazer esta aposta.',
  BET_NOT_FOUND_CANCEL: 'Aposta não encontrada ou não pode ser cancelada.',
  
  // Pagamento
  PAYMENT_INVALID_DEPOSIT_AMOUNT: 'Um valor válido para depósito é necessário.',
  PAYMENT_DEPOSIT_SUCCESS: 'Depósito realizado com sucesso.',
  PAYMENT_INVALID_WITHDRAWAL_AMOUNT: 'Um valor válido para saque é necessário.',
  PAYMENT_INSUFFICIENT_FUNDS: 'Saldo insuficiente para saque.',
  PAYMENT_WITHDRAWAL_SUCCESS: 'Saque realizado com sucesso.',
  
  // Promoções
  PROMO_ID_REQUIRED: 'O parâmetro promotionId é obrigatório.',
  PROMO_NOT_FOUND: 'Promoção não encontrada.',
  
  // Perfil de Usuário
  USER_UPDATE_NO_FIELDS: 'É necessário pelo menos um campo (nome, e-mail, data de nascimento).',
  USER_UPDATE_UNDERAGE: 'Você deve ter pelo menos 18 anos.',
  USER_EMAIL_EXISTS: 'E-mail já em uso por outra conta.',
  USER_VERIFY_DATA_REQUIRED: 'Dados de verificação são obrigatórios.',
  
  // Limitador de Requisições
  RATE_LIMIT_MESSAGE: 'Muitas requisições deste IP. Por favor, tente novamente mais tarde.',
};
