import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './components/App'
import { useProvideAuth } from './hooks/auth'
import { i18n } from '@lingui/core'

const root = createRoot(document.getElementById('root'))

function AuthProvider ({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

const TranslationProvider = ({ children }) => {
    return (
        <I18nProvider i18n={i18n}>
            {children}
        </I18nProvider>
    )
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
