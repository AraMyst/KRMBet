import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Treat .js files as JSX so you don’t have to rename them to .jsx
  esbuild: {
    loader: {
      '.js': 'jsx'
    }
  },
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
