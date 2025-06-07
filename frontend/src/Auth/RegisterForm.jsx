// src/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';
import AuthError from './AuthError';

const RegisterForm = () => {
  // Local state for form fields, loading, and local error
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Use navigate to redirect after successful registration
  const navigate = useNavigate();

  // Access setAuthError from AuthContext to display any error
  const { setAuthError, authError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous auth error
    setAuthError('');

    // Basic client-side validation
    if (!username || !email || !password || !confirmPassword) {
      setAuthError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }

    // (Optional) Additional email format or password strength checks could go here

    setLoading(true);
    try {
      // Call the service to register the user
      await authService.register({ username, email, password });

      // After successful registration, redirect to login page
      navigate('/login', { state: { fromRegistration: true } });
    } catch (err) {
      // If registration fails, display the error message
      const serverMsg =
        err.response?.data?.message ||
        'Registration failed. Please try again.';
      setAuthError(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-fortino-darkGreen rounded-lg text-fortino-softWhite">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

      {/* Display authentication error (if any) */}
      <AuthError message={authError} />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Input */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
            className="w-full px-3 py-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-fortino-goldSoft"
            autoComplete="username"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-3 py-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-fortino-goldSoft"
            autoComplete="email"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-fortino-goldSoft"
            autoComplete="new-password"
          />
        </div>

        {/* Confirm Password Input */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-1"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-fortino-goldSoft"
            autoComplete="new-password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center px-4 py-2 rounded-md text-white font-medium transition
            ${
              loading
                ? 'bg-fortino-goldSoft/60 cursor-not-allowed'
                : 'bg-fortino-goldSoft hover:bg-fortino-goldSoft/90'
            }`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {/* Link to Login Page */}
      <p className="mt-6 text-center text-sm">
        Already have an account?{' '}
        <button
          onClick={() => navigate('/login')}
          className="text-fortino-goldSoft hover:underline focus:outline-none"
        >
          Log In here
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
