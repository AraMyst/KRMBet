// src/Auth/AuthError.jsx
import React from 'react';

const AuthError = ({ message }) => {
  // If there is no error message, render nothing
  if (!message) return null;

  return (
    <div className="bg-fortino-darkRed/80 border border-fortino-darkRed text-fortino-softWhite rounded-md px-4 py-2 mb-4">
      {/* Display the provided error message */}
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default AuthError;
