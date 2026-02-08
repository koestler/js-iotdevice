import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    babel: {
      plugins: ['macros']
    }
  })],
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      // Fix for Node.js modules being imported in browser context
      path: false,
      fs: false,
      os: false,
    }
  },
  optimizeDeps: {
    exclude: ['@lingui/macro']
  }
});