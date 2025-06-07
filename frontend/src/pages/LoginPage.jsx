// src/pages/LoginPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../Auth/LoginForm';

/**
 * LoginPage
 *
 * Wraps LoginForm and displays a success message if
 * the user arrived here after registration.
 */
const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromRegistration = location.state?.fromRegistration;

  // If user just registered successfully, show a brief message
  React.useEffect(() => {
    if (fromRegistration) {
      // After 3 seconds, clear the message (optional)
      const timer = setTimeout(() => {
        navigate('/login', { replace: true, state: {} });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [fromRegistration, navigate]);

  return (
    <div className="max-w-md mx-auto mt-12">
      {fromRegistration && (
        <div className="bg-fortino-goldSoft text-black p-4 rounded-md mb-6 text-center">
          Registration successful! Please log in.
        </div>
      )}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
