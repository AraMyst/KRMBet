// src/Common/LanguageSwitcher.jsx
import React from 'react';
import { useI18n } from '../hooks/useI18n';

/**
 * LanguageSwitcher
 *
 * Displays a dropdown menu allowing the user to switch between
 * English, Spanish, and Portuguese. It uses the useI18n hook
 * to get the current language and a method to change the language.
 */
const LanguageSwitcher = () => {
  const { lang, changeLanguage } = useI18n();

  const handleChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <div className="inline-block">
      <select
        value={lang}
        onChange={handleChange}
        className="bg-fortino-darkGreen text-fortino-softWhite border border-fortino-goldSoft px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-fortino-goldSoft"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="pt">Português</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
