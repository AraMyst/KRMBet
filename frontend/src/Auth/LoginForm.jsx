// src/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';
import AuthError from './AuthError';

const LoginForm = () => {
  // Local state for form fields, loading, and local error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Use navigate to redirect after successful login
  const navigate = useNavigate();

  // Access loginUser and any existing authError from AuthContext
  const { loginUser, authError, setAuthError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous auth error
    setAuthError('');

    // Basic client-side validation
    if (!email || !password) {
      setAuthError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      // Call the service to perform login
      const { token, user } = await authService.login({ email, password });

      // Store token and user in context (and possibly localStorage)
      loginUser(token, user);

      // Redirect to the dashboard or home page
      navigate('/dashboard');
    } catch (err) {
      // If login fails, display the error message
      const serverMsg =
        err.response?.data?.message || 'Login failed. Please try again.';
      setAuthError(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-fortino-darkGreen rounded-lg text-fortino-softWhite">
      <h2 className="text-2xl font-semibold mb-6 text-center">Log In</h2>

      {/* Display authentication error (if any) */}
      <AuthError message={authError} />

      <form onSubmit={handleSubmit} className="space-y-4">
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
            autoComplete="current-password"
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
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>

      {/* Link to Registration Page */}
      <p className="mt-6 text-center text-sm">
        Don’t have an account?{' '}
        <button
          onClick={() => navigate('/register')}
          className="text-fortino-goldSoft hover:underline focus:outline-none"
        >
          Register here
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
