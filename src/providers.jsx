import React from 'react'
// eslint-disable-next-line no-unused-vars
import { useProvideAuth, authContext } from './hooks/auth'
import { I18nProvider } from '@lingui/react'
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
