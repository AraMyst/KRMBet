// src/Account/AccountDetails.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/userService';

const AccountDetails = () => {
  // Get the current authenticated user (basic info, token, etc.)
  const { user } = useAuth();

  // Local state for full account details, loading flag, and potential errors
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch detailed user information (e.g. balance, createdAt, etc.) on component mount
    const fetchDetails = async () => {
      try {
        const data = await userService.getUserDetails();
        setDetails(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load account details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return <div>Loading account details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-fortino-darkGreen rounded-lg text-fortino-softWhite">
      <h1 className="text-2xl font-semibold mb-4">Account Details</h1>

      <div className="space-y-2">
        {/* Username (from payload or fetched details) */}
        <p>
          <span className="font-medium">Username:</span> {details.username}
        </p>

        {/* Email */}
        <p>
          <span className="font-medium">Email:</span> {details.email}
        </p>

        {/* Registration date */}
        <p>
          <span className="font-medium">Registered On:</span>{' '}
          {new Date(details.createdAt).toLocaleDateString()}
        </p>

        {/* Current account balance */}
        <p>
          <span className="font-medium">Account Balance:</span> $
          {details.balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default AccountDetails;
