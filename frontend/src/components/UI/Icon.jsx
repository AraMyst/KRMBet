// src/components/UI/Icon.jsx
import React from 'react';
import * as Icons from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Icon
 *
 * Renders a lucide-react icon by name.
 * Props:
 *  - name: the icon component name (e.g. 'User', 'Home')
 *  - size: number (icon size in pixels)
 *  - className: additional Tailwind classes or custom styles
 */
const Icon = ({ name, size = 24, className = '', ...props }) => {
  // Dynamically select the icon component from lucide-react
  const Component = Icons[name];

  if (!Component) {
    console.warn(`Icon \"${name}\" not found in lucide-react.`);
    return null;
  }

  return <Component size={size} className={className} {...props} />;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string
};

export default Icon;
