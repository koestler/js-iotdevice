import React from 'react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { detect, fromStorage, fromNavigator } from '@lingui/detect-locale'
import { messages as en } from './locales/en/messages'
import { messages as de } from './locales/de/messages'

export const locales = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' }
]

i18n.load('en', en)
i18n.load('de', de)
i18n.loadLocaleData({
  en: { plurals: en },
  de: { plurals: de }
})

let initialLang = detect(
  fromStorage('lang'),
  fromNavigator().substr(0, 2),
  () => 'en'
)

// make sure initialLang exists; use en otherwise
if (locales.find(({ code }) => code === initialLang) === undefined) {
  initialLang = 'en'
}

i18n.activate(initialLang)

export const activateLanguage = async (locale) => {
  window.localStorage.setItem('lang', locale)
  i18n.activate(locale)
}

export const getLanguage = () => {
  return i18n.locale
}

const TranslationProvider = ({ children }) => {
  return (
    <I18nProvider i18n={i18n}>
      {children}
    </I18nProvider>
  )
}

export default TranslationProvider
