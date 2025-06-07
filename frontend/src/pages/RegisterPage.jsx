// src/pages/RegisterPage.jsx
import React from 'react';
import RegisterForm from '../Auth/RegisterForm';

/**
 * RegisterPage
 *
 * Renders the registration form.
 */
const RegisterPage = () => {
  return (
    <div className="max-w-md mx-auto mt-12">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
