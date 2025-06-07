// src/components/UI/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button
 *
 * A reusable button component with variant support.
 * Variants:
 *  - primary: gold background, dark text
 *  - secondary: red background, white text
 *  - warning: olive background, white text
 *
 * Props:
 *  - variant: one of 'primary' | 'secondary' | 'warning'
 *  - disabled: boolean
 *  - onClick: function
 *  - className: additional Tailwind classes
 *  - children: button content
 */
const Button = ({
  variant = 'primary',
  disabled = false,
  onClick,
  className = '',
  children,
  ...props
}) => {
  // Map variants to Tailwind classes
  const variantClasses = {
    primary: 'bg-fortino-goldSoft text-black hover:bg-fortino-goldSoft/90',
    secondary: 'bg-fortino-darkRed text-white hover:bg-fortino-darkRed/90',
    warning: 'bg-fortino-oliveGreen text-white hover:bg-fortino-oliveGreen/90'
  };

  const baseClasses =
    'font-medium rounded-md px-4 py-2 transition duration-150';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        `${baseClasses} ${variantClasses[variant]} ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`
      }
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'warning']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Button;