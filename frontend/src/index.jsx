// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';       // Tailwind base/components/utilities
import App from './App.jsx';

/**
 * Entry point
 *
 * Renders the <App /> into the root DOM element.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
