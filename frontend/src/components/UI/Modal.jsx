// src/components/UI/Select.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Select
 *
 * A reusable select dropdown component.
 * Props:
 *  - id: string (for labeling)
 *  - label: string (text for the select label)
 *  - options: array of { value: string, label: string }
 *  - value: string
 *  - onChange: function
 *  - className: additional Tailwind classes
 */
const Select = ({
  id,
  label,
  options,
  value,
  onChange,
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
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-fortino-goldSoft bg-white text-black border border-transparent"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string.isRequired, label: PropTypes.string.isRequired })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Select;
