import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './components/App'
import { useProvideAuth } from './hooks/auth'
import TranslationProvider from './i18n'

const root = createRoot(document.getElementById('root'))

function AuthProvider ({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

root.render(
  <React.StrictMode>
    <AuthProvider>
      <TranslationProvider>
        <App />
      </TranslationProvider>
    </AuthProvider>
  </React.StrictMode>
)
