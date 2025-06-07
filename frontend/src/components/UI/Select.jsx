// src/components/UI/Modal.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Modal
 *
 * A reusable modal component that renders children in a centered overlay.
 * Props:
 *  - isOpen: boolean (controls visibility)
 *  - onClose: function (called when modal requests to close)
 *  - children: content inside the modal
 */
const Modal = ({ isOpen, onClose, children }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-fortino-darkGreen text-fortino-softWhite rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-fortino-softWhite hover:text-fortino-goldSoft focus:outline-none"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
