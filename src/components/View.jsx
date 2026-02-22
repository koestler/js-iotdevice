import React, { useState } from 'react'

import Device from './Device'
import Autoplay from './Autoplay'
import { AutoplayContext } from './AutoplayContext'
import { Columns, Title, Section } from '@allxsmith/bestax-bulma'
import { Column } from '@allxsmith/bestax-bulma'

const View = (view) => {
  const { title, name, devices, autoplay } = view
  const [play, setPlay] = useState(autoplay)
  const [values, setValues] = useState(null)

  return (
    <Section>
      <Columns>
        <Column>
          <Title as='h2'>{title}</Title>
        </Column>
        <Column size={2}>
          <Autoplay viewName={name} play={play} setPlay={setPlay} setValues={setValues} />
        </Column>
      </Columns>
      <AutoplayContext.Provider value={{ play, values }}>
        <Columns>
          {devices.map(device =>
            <Column key={device.name} isNarrow>
              <Device viewName={name} viewIsPublic={view.isPublic} deviceName={device.name} deviceTitle={device.title} />
            </Column>
          )}
        </Columns>
      </AutoplayContext.Provider>
    </Section>
  )
}

export default View
