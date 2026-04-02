import React, { useState, useContext } from 'react'
import { Message, Notification, Table, Control, Radio, Tr, Td} from '@allxsmith/bestax-bulma'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../hooks/auth'
import { unauthApi, useCategories, useValues } from '../hooks/unauthApi'
import { Trans, useLingui } from '@lingui/react/macro'
import './Device.scss'
import { AutoplayContext } from './AutoplayContext'
import { toast } from 'bulma-toast'

const Device = ({ viewName, viewIsPublic, deviceName, deviceTitle }) => {
  const { t } = useLingui()
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

  const unavailable = values && 'Available' in values && values["Available"] == 0

  return (
    <Message color='dark' className='device' title={deviceTitle}>
      {unavailable && <Notification color='warning'><Trans>Device is unavailable.</Trans></Notification>}
      {cError && <Notification color='danger'><Trans>Cannot load device registers.</Trans></Notification>}
      {vError && <Notification color='danger'><Trans>Cannot load device values.</Trans></Notification>}
      {cSuccess && vSuccess && <ConfiguredDevice
          storageKeyPrefix={`view-${viewName}-device-${deviceName}`}
          categories={categories}
          values={values}
          changeValue={changeValue} />}
    </Message>
  )
}

const ConfiguredDevice = ({ storageKeyPrefix, categories, values, changeValue }) => {
  return (
    <form>
      <Table isHoverable isFullwidth isNarrow isResponsive>
        <tbody>
          {categories.filter(c => c.category !== "Available").map(c => <Category
              key={`${storageKeyPrefix}-category-${c.category}`}
              storageKeyPrefix={`${storageKeyPrefix}-category-${c.category}`}
              category={c.category}
              registers={c.registers}
              values={values}
              changeValue={changeValue}
          />)}
        </tbody>
      </Table>
    </form>
  )
}

const Category = ({ storageKeyPrefix, category, registers, values, changeValue }) => {
  const storageKey = `${storageKeyPrefix}-hide`

  const getInitialHideState = () => {
    const savedState = localStorage.getItem(storageKey)
    if (savedState !== null) {
      return savedState === true.toString()
    }
    return ['Historic', 'Settings'].includes(category)
  }

  const [hide, setHide] = useState(getInitialHideState)

  const toggleHide = () => {
    const newHideState = !hide
    setHide(newHideState)
    localStorage.setItem(storageKey, newHideState.toString())
  }

  return (
    <>
      <Tr className='subtitle' onClick={toggleHide}>
        <Td colSpan={2}>{category}</Td>
        <Td colSpan={2}><FontAwesomeIcon icon={hide ? faEye : faEyeSlash} /></Td>
      </Tr>
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
  if (register.type === 'number') {
    return <NumberValue register={register} value={value} />
  }

  if (register.type === 'enum') {
    if (changeValue !== undefined && register.commandable) {
      return <EnumControl register={register} value={value} changeValue={changeValue} />
    }
    return <TextValue register={register} value={register.enum[value] ?? ''} />
  }

  return <TextValue register={register} value={value} />
}

const TextValue = ({ register, value }) => {
  return (
    <Tr className='text'>
      <Td>{register.description}</Td>
      <Td colSpan={3}>{value}</Td>
    </Tr>
  )
}

const NumberValue = ({ register, value }) => {
  let [hValue, hUnit] = readable(value, register.unit)

  hValue = Math.round(hValue * 100) / 100
  const strs = hValue.toString().split('.')
  const decimal = strs.length === 2
  return (
    <Tr className='number'>
      <Td>{register.description}</Td>
      <Td>{strs[0]}</Td>
      {decimal && <Td>.{strs[1]}</Td>}
      {decimal || <Td />}
      <Td>{hUnit}</Td>
    </Tr>
  )
}

const EnumValue = ({ register, value, enumDefinition }) => {
  return
}

const EnumControl = ({ register, value, changeValue }) => {
  return (
    <Tr>
      <Td>{register.description}</Td>
      <Td colSpan={3}>
        <Control>
          {Object.keys(register.enum).sort().map((idx) => (
            <Radio
              key={idx}
              name={register.name}
              value={idx}
              checked={value === parseInt(idx)}
              onChange={changeValue}
            >
              {register.enum[idx] ?? ''}
            </Radio>
          )
          )}
        </Control>
      </Td>
    </Tr>
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
