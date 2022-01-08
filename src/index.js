import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './components/App'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './hooks/auth'
import TranslationProvider from './i18n'

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <TranslationProvider>
          <App />
        </TranslationProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
