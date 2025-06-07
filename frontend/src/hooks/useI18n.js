// src/hooks/useI18n.js
import { useState, useEffect } from 'react';
import en from '../i18n/en.json';
import es from '../i18n/es.json';
import pt from '../i18n/pt.json';

const messages = { en, es, pt };

/**
 * useI18n
 *
 * Custom hook for internationalization.
 * Manages the current language, message translations, and provides
 * methods to change language and translate keys.
 *
 * Returns:
 *  - lang: current language code ('en', 'es', 'pt')
 *  - changeLanguage(code): updates the current language
 *  - t: object containing all messages for current language
 *  - translate(key): returns the translated string or the key if not found
 */
export const useI18n = () => {
  const [lang, setLang] = useState(
    localStorage.getItem('lang') || 'en'
  );
  const [t, setT] = useState(messages[lang] || {});

  useEffect(() => {
    localStorage.setItem('lang', lang);
    setT(messages[lang] || {});
  }, [lang]);

  const changeLanguage = (newLang) => {
    if (messages[newLang]) {
      setLang(newLang);
    } else {
      console.warn(`Language '${newLang}' not supported.`);
    }
  };

  const translate = (key) => {
    return t[key] || key;
  };

  return { lang, changeLanguage, t, translate };
};
