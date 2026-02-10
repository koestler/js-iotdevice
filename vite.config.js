import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { lingui } from '@lingui/vite-plugin'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@lingui/babel-plugin-lingui-macro', 'macros']
      }
    }),
    lingui()
  ],
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: {
      // Fix for Node.js modules being imported in browser context
      path: false,
      fs: false,
      os: false
    }
  },
  optimizeDeps: {
    exclude: ['@lingui/macro']
  }
})
