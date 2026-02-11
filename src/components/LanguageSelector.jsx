import React from 'react'
import { Field, Control, Select } from '@allxsmith/bestax-bulma'
import { activateLanguage, getLanguage, locales } from '../i18n'

const LanguageSelector = () => {
  return (
    <Field>
      <Control>
        <Select
          onChange={event => { activateLanguage(event.target.value) }}
          value={getLanguage()}
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
