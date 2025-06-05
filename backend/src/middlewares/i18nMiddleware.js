const availableLocales = ['en', 'pt', 'es'];
const defaultLocale = 'en';

/**
 * Middleware to detect and set request language based on "Accept-Language" header.
 * Falls back to defaultLocale if no supported language is found.
 * Attaches selected language code to req.language.
 */
module.exports = (req, res, next) => {
  // Get "Accept-Language" header (e.g., "pt-BR,pt;q=0.9,en;q=0.8")
  const acceptLang = req.headers['accept-language'];
  if (!acceptLang) {
    req.language = defaultLocale;
    return next();
  }

  // Extract the primary tag before any semicolon or comma
  const primaryTag = acceptLang.split(',')[0].split(';')[0].trim().toLowerCase();

  // If primaryTag matches availableLocales (e.g., "pt" or "pt-br" => "pt")
  const langCode = primaryTag.split('-')[0];
  if (availableLocales.includes(langCode)) {
    req.language = langCode;
  } else {
    req.language = defaultLocale;
  }

  next();
};
