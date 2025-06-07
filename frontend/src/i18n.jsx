// src/i18n.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import en from './i18n/en.json';
import es from './i18n/es.json';
import pt from './i18n/pt.json';

const resources = { en, es, pt };

/**
 * I18nContext
 *
 * Provides current language, translation function `t`, and method `changeLanguage`.
 */
const I18nContext = createContext({
  lang: 'en',
  t: (key) => key,
  changeLanguage: (lang) => {},
});

/**
 * I18nProvider
 *
 * Wrap your app with this provider to enable translations.
 * It reads/saves the language code to localStorage under 'app_lang'.
 */
export const I18nProvider = ({ children }) => {
  const stored = localStorage.getItem('app_lang');
  const [lang, setLang] = useState(stored || 'en');
  const [messages, setMessages] = useState(resources[stored] || resources.en);

  // Whenever lang changes, update messages and persist
  useEffect(() => {
    const msgs = resources[lang] || resources.en;
    setMessages(msgs);
    localStorage.setItem('app_lang', lang);
  }, [lang]);

  /**
   * t(key)
   *
   * Looks up nested translation by dot-separated key, e.g. 'auth.login'.
   * If not found, returns the key itself.
   */
  const t = (key) => {
    return key.split('.').reduce((obj, part) => {
      return obj && obj[part] != null ? obj[part] : null;
    }, messages) || key;
  };

  const changeLanguage = (newLang) => {
    if (resources[newLang]) setLang(newLang);
  };

  return (
    <I18nContext.Provider value={{ lang, t, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

/**
 * useI18n
 *
 * Custom hook to access i18n functions within components.
 */
export const useI18n = () => useContext(I18nContext);
