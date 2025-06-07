// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Tell esbuild to treat .js files as JSX so any JS file with JSX parses correctly
  esbuild: {
    loader: {
      '.js': 'jsx'
    }
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
