// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../../Common/LanguageSwitcher';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Fortino Logo" className="logo" />
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sports">Sports</Link>
          </li>
          <li>
            <Link to="/casino">Casino</Link>
          </li>
          <li>
            <Link to="/promotions">Promotions</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <LanguageSwitcher />

        {user ? (
          <div className="auth-buttons">
            <Link to="/account/details">Account</Link>
            <button onClick={logoutUser} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="auth-button">Log In</Link>
            <Link to="/register" className="auth-button">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
