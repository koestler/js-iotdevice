import React from 'react'
import { Form } from 'react-bulma-components'
import { activateLanguage, getLanguage, locales } from '../i18n'

const LanguageSelector = () => {
  return (
    <Form.Field>
      <Form.Control>
        <Form.Select
          onChange={event => { activateLanguage(event.target.value) }}
          value={getLanguage()}
        >
          {locales.map(({ code, name }) =>
            <option key={code} value={code}>
              {name}
            </option>)}
        </Form.Select>
      </Form.Control>
    </Form.Field>
  )
}

export default LanguageSelector
