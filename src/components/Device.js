import React, { useState, useContext } from 'react'
import { Message, Notification, Table } from 'react-bulma-components'
import HideableMessage from './HideableMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../hooks/auth'
import { unauthApi, useCategories, useValues } from '../hooks/unauthApi'
import { Trans } from '@lingui/macro'
import './Device.scss'
import { AutoplayContext } from './Autoplay'
import Led from './Led'

const Device = ({ viewName, viewIsPublic, deviceName, deviceTitle }) => {
  const { values: autoPlayValues } = useContext(AutoplayContext)
  const { api } = useAuth()
  const { categories, success: cSuccess, error: cError } = useCategories(viewIsPublic ? unauthApi : api, viewName, deviceName)
  const { values: staticValues, success: vSuccess, error: vError } = useValues(viewIsPublic ? unauthApi : api, viewName, deviceName)
  let values = staticValues

  if (autoPlayValues) {
    values = autoPlayValues[deviceName] ?? {}
  }

  return (
    <HideableMessage header={<><p>{deviceTitle}</p></>}>
      <Message.Body>
        <Led blinkOnChange={values} />
        {cError && <Notification color='danger'><Trans>Cannot load device registers.</Trans></Notification>}
        {vError && <Notification color='danger'><Trans>Cannot load device values.</Trans></Notification>}
        {cSuccess && vSuccess && <ConfiguredDevice categories={categories} values={values} />}
      </Message.Body>
    </HideableMessage>
  )
}

const ConfiguredDevice = ({ categories, values }) => {
  return (
    <Table className='device'>
      <tbody>
        {categories.map(c => <Category key={c.category} category={c.category} registers={c.registers} values={values} />)}
      </tbody>
    </Table>
  )
}

const Category = ({ category, registers, values }) => {
  const [hide, setHide] = useState(['Historic', 'Settings'].includes(category))
  return (
    <>
      <tr className='subtitle' onClick={() => setHide(!hide)}>
        <td colSpan={3}>{category}</td>
        <td>
          <FontAwesomeIcon icon={hide ? faEye : faEyeSlash} />
        </td>
      </tr>
      {!hide && registers.map((register, idx) =>
        <Line
          key={idx}
          register={register}
          value={values[register.name]}
        />)}
    </>
  )
}

const Line = ({ register, value }) => {
  return (
    <tr>
      <td>{register.description}</td>
      <Value register={register} value={value} />
    </tr>
  )
}

const Value = ({ register, value }) => {
  if (register.type === 'number') {
    return <NumberValue value={value} unit={register.unit} />
  }

  if (register.type === 'enum') {
    return <EnumValue value={value} enumDefinition={register.enum} />
  }

  return <TextValue value={value} />
}

const TextValue = ({ value }) => {
  return <td colSpan={3}>{value}</td>
}

const NumberValue = ({ value, unit }) => {
  let [hValue, hUnit] = readable(value, unit)

  hValue = Math.round(hValue * 100) / 100
  const strs = hValue.toString().split('.')
  const decimal = strs.length === 2
  return (
    <>
      <td>{strs[0]}</td>
      {decimal && <td>.{strs[1]}</td>}
      {decimal || <td />}
      <td>{hUnit}</td>
    </>
  )
}

const EnumValue = ({ value, enumDefinition }) => {
  return <TextValue value={enumDefinition[value] ?? ''} />
}

const readable = (value, unit) => {
  if (unit === 's' && value > 60) {
    return readable(value / 60, 'min')
  }
  if (unit === 'min' && value > 60) {
    return readable(value / 60, 'h')
  }
  if (unit === 'h' && value > 24) {
    return readable(value / 24, 'd')
  }
  if (['W', 'A', 'V', 'Wh'].includes(unit) && value >= 1000) {
    return [value / 1000, 'k' + unit]
  }
  if (['kW', 'kA', 'kV', 'kWh'].includes(unit) && value >= 1000) {
    return [value / 1000, 'M' + unit.substring(1)]
  }
  if (unit === 'K') { // kelvin
    return [value - 273.15, '°C']
  }

  return [value, unit]
}

export default Device
