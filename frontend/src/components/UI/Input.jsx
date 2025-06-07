// src/components/UI/Input.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Input
 *
 * A reusable input component with label support and error display.
 * Props:
 *  - id: string (for associating label and input)
 *  - label: string (text for the input label)
 *  - type: string (input type, e.g. 'text', 'email', 'password')
 *  - value: string
 *  - onChange: function
 *  - placeholder: string
 *  - error: string (error message to display)
 *  - className: additional Tailwind classes
 */
const Input = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col ${className}`}>  
      {label && (
        <label htmlFor={id} className="text-sm font-medium mb-1 text-fortino-softWhite">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-fortino-goldSoft bg-white text-black ${
          error ? 'border border-red-500' : 'border border-transparent'
        }`}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500 mt-1">{error}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string
};

export default Input;