// src/components/Navbar/Navbar.jsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
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
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/sports" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
            Sports
          </NavLink>
        </li>
        <li>
          <NavLink to="/casino" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
            Casino
          </NavLink>
        </li>
        <li>
          <NavLink to="/promotions" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
            Promotions
          </NavLink>
        </li>
      </ul>

      <div className="navbar-right">

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
