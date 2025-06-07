// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../../Common/LanguageSwitcher';
import { useAuth } from '../../hooks/useAuth';
import Button from '../UI/Button';
import './Navbar.css';

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          {/* Replace the src with the correct path to your logo file */}
          <img src="/assets/images/logo.png" alt="Fortino Logo" className="logo" />
        </Link>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sports">Sports</Link></li>
          <li><Link to="/casino">Casino</Link></li>
          <li><Link to="/promotions">Promotions</Link></li>
        </ul>
      </div>

      <div className="navbar-right">
        <LanguageSwitcher />

        {user ? (
          <div className="auth-buttons">
            <Link to="/account/details">
              <Button variant="primary">Account</Button>
            </Link>
            <Button variant="primary" onClick={logoutUser}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login">
              <Button variant="primary">Log In</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
