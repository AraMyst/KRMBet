// src/pages/VerificationPage.jsx
import React from 'react';
import Verification from '../Account/Verification';

/**
 * VerificationPage
 *
 * Wrapper page for account verification functionality.
 * Renders the Verification component inside a centered layout.
 */
const VerificationPage = () => {
  return (
    <div className="max-w-md mx-auto mt-8">
      <Verification />
    </div>
  );
};

export default VerificationPage;
