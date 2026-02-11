import React from 'react'
import { useProvideAuth } from './hooks/auth'
import { i18n } from '@lingui/core'

export function AuthProvider ({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const TranslationProvider = ({ children }) => {
    return (
        <I18nProvider i18n={i18n}>
            {children}
        </I18nProvider>
    )
}
