// src/components/UI/Card.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card
 *
 * A generic card container with padding, rounded corners, and shadow.
 * Props:
 *  - className: additional Tailwind classes
 *  - children: content inside the card
 */
const Card = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`bg-fortino-darkGreen text-fortino-softWhite p-4 rounded-lg shadow-md ${
        className
      }`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Card;