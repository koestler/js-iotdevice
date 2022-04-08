import React, { useState } from 'react'

import Device from './Device'
import Autoplay, { AutoplayContext } from './Autoplay'
import { Columns, Heading, Section } from 'react-bulma-components'
import { useAuth } from '../hooks/auth'
import { Redirect } from 'react-router-dom'

const View = (view) => {
  const { title, name, devices, autoplay } = view
  const [play, setPlay] = useState(autoplay)
  const [values, setValues] = useState(null)
  const { isViewAllowed } = useAuth()

  if (!isViewAllowed(view)) {
    return <Redirect to='/login' />
  }

  return (
    <Section>
      <Heading renderAs='h2'>{title}</Heading>
      <Autoplay viewName={name} play={play} setPlay={setPlay} values={values} setValues={setValues} />
      <AutoplayContext.Provider value={{ play, values }}>
        <Columns>
          {devices.map(device =>
            <Columns.Column key={device.name}>
              <Device viewName={name} viewIsPublic={view.isPublic} deviceName={device.name} deviceTitle={device.title} />
            </Columns.Column>
          )}
        </Columns>
      </AutoplayContext.Provider>
    </Section>
  )
}

export default View
