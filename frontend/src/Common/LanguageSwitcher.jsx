// src/Common/LanguageSwitcher.jsx
import React from 'react';
import { useI18n } from '../hooks/useI18n';
import './LanguageSwitcher.css';

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
    <div className="language-switcher">
      <select
        value={lang}
        onChange={handleChange}
        className="language-select"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="pt">Português</option>
      </select>
      <svg
        className="select-arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default LanguageSwitcher;
