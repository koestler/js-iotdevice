import React from 'react'
import { Field, Control, Select } from '@allxsmith/bestax-bulma'
import { useLingui } from '@lingui/react'
import { activateLanguage, locales } from '../i18n'

const LanguageSelector = () => {
  const { i18n } = useLingui()

  return (
    <Field>
      <Control>
        <Select
          onChange={event => { activateLanguage(event.target.value) }}
          value={i18n.locale}
        >
          {locales.map(({ code, name }) =>
            <option key={code} value={code}>
              {name}
            </option>)}
        </Select>
      </Control>
    </Field>
  )
}

export default LanguageSelector
