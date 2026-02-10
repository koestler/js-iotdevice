import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './components/App'
import { AuthProvider } from './hooks/auth'
import TranslationProvider from './i18n'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <AuthProvider>
      <TranslationProvider>
        <App />
      </TranslationProvider>
    </AuthProvider>
  </React.StrictMode>
)
