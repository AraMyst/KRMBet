// src/Common/LoadingSpinner.jsx
import React from 'react';

/**
 * LoadingSpinner
 *
 * A simple spinning loader using an SVG circle. The spinner
 * uses the Fortino gold color by default but can be overridden
 * via className prop if needed.
 *
 * Props:
 *   - className (optional): Additional Tailwind classes to apply.
 */
const LoadingSpinner = ({ className = '' }) => {
  return (
    <div className="flex justify-center items-center">
      <svg
        className={`animate-spin h-8 w-8 text-fortino-goldSoft ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
