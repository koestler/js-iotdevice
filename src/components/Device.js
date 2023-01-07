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
          description={register.description}
          value={values[register.name]}
          unit={register.unit}
        />)}
    </>
  )
}

const Line = ({ description, value, unit }) => {
  const [hValue, hUnit] = readable(value, unit)
  return (
    <tr>
      <td>{description}</td>
      <Value value={hValue} />
      <td>{hUnit}</td>
    </tr>
  )
}

const Value = ({ value }) => {
  if (typeof value === 'number') {
    value = Math.round(value * 100) / 100
    const strs = value.toString().split('.')
    const decimal = strs.length === 2
    return (
      <>
        <td>{strs[0]}</td>
        {decimal && <td>.{strs[1]}</td>}
        {decimal || <td />}
      </>
    )
  }

  return <td colSpan={3}>{value}</td>
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
