import React, { useState, useContext } from 'react'
import { Message, Notification, Table, Control, Radio } from '@allxsmith/bestax-bulma'
import HideableMessage from './HideableMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../hooks/auth'
import { unauthApi, useCategories, useValues } from '../hooks/unauthApi'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import './Device.scss'
import { AutoplayContext } from './AutoplayContext'
import { toast } from 'bulma-toast'

const Device = ({ viewName, viewIsPublic, deviceName, deviceTitle }) => {
  const { values: autoPlayValues, play } = useContext(AutoplayContext)
  const { api, isLoggedIn } = useAuth()
  const { categories, success: cSuccess, error: cError } = useCategories(viewIsPublic ? unauthApi : api, viewName, deviceName)
  const { values: staticValues, success: vSuccess, error: vError } = useValues(viewIsPublic ? unauthApi : api, viewName, deviceName)
  let values = staticValues

  if (autoPlayValues) {
    values = autoPlayValues[deviceName] ?? {}
  }

  let changeValue
  if (isLoggedIn()) {
    changeValue = (e) => api.patch(
      `/views/${viewName}/devices/${deviceName}/values`,
      { [e.target.name]: parseInt(e.target.value) }
    ).then(() => {
      if (play) {
        toast({ message: t`Output successfully set.`, type: 'is-success' })
      } else {
        toast({ message: t`Output successfully set. Reloading...`, type: 'is-success' })
        setTimeout(() => window.location.reload(), 1000)
      }
    }
    ).catch(() => toast({ message: t`Cannot change output.`, type: 'is-danger' }))
  }

  return (
    <HideableMessage header={<><p>{deviceTitle}</p></>}>
      <Message.Body>
        {cError && <Notification color='danger'><Trans>Cannot load device registers.</Trans></Notification>}
        {vError && <Notification color='danger'><Trans>Cannot load device values.</Trans></Notification>}
        {cSuccess && vSuccess && <ConfiguredDevice categories={categories} values={values} changeValue={changeValue} />}
      </Message.Body>
    </HideableMessage>
  )
}

const ConfiguredDevice = ({ categories, values, changeValue }) => {
  return (
    <form>
      <Table className='device'>
        <tbody>
          {categories.map(c => <Category key={c.category} category={c.category} registers={c.registers} values={values} changeValue={changeValue} />)}
        </tbody>
      </Table>
    </form>
  )
}

const Category = ({ category, registers, values, changeValue }) => {
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
          changeValue={changeValue}
        />)}
    </>
  )
}

const Line = ({ register, value, changeValue }) => {
  return (
    <tr>
      <td>{register.description}</td>
      <Value register={register} value={value} changeValue={changeValue} />
    </tr>
  )
}

const Value = ({ register, value, changeValue }) => {
  if (register.type === 'number') {
    return <NumberValue value={value} unit={register.unit} />
  }

  if (register.type === 'enum') {
    if (changeValue !== undefined && register.commandable) {
      return <EnumControl registerName={register.name} value={value} enumDefinition={register.enum} changeValue={changeValue} />
    }
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

const EnumControl = ({ registerName, value, enumDefinition, changeValue }) => {
  return (
    <td colSpan={3}>
      <Control>
        {Object.keys(enumDefinition).sort().map((idx) => (
          <Radio
            key={idx}
            name={registerName}
            value={idx}
            checked={value === parseInt(idx)}
            onChange={changeValue}
          >
            {enumDefinition[idx] ?? ''}
          </Radio>
        )
        )}
      </Control>
    </td>
  )
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
