// src/components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import LanguageSwitcher from '../../Common/LanguageSwitcher';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>&copy; {new Date().getFullYear()} Fortino Casino. All rights reserved.</p>
      </div>

      <div className="footer-links">
        <Link to="/terms">Terms of Service</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="footer-right">
        <LanguageSwitcher />
      </div>
    </footer>
  );
};

export default Footer;
