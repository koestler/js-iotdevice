import React, { useState, useEffect } from 'react'
import Device from './Device'
import Autoplay from './Autoplay'
import { AutoplayContext } from './AutoplayContext'
import { Buttons, Columns, Title, Section } from '@allxsmith/bestax-bulma'
import { Column } from '@allxsmith/bestax-bulma'
import { Trans } from '@lingui/react/macro'

const View = (view) => {
  const { title, name, devices, autoplay } = view
  const [play, setPlay] = useState(autoplay)
  const [updated, setUpdated] = useState(Date.now())
  const [values, setValues] = useState(null)
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const ago = formatTimeAgo(updated, currentTime)

  return (
    <Section>
      <Columns>
        <Column>
          <Title size='4' as='h2'>{title}</Title>
        </Column>
        <Column>
            <Buttons isRight>
              <p><Trans>Last updated {ago} ago</Trans></p>
              <Autoplay viewName={name} play={play} setPlay={setPlay} setValues={setValues} setUpdated={setUpdated} />
            </Buttons>
        </Column>
      </Columns>
      <AutoplayContext.Provider value={{ play, values }}>
        <Columns isMultiline>
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

const formatTimeAgo = (timestamp, currentTime) => {
    const diffMs = currentTime - timestamp
    const diffSeconds = Math.floor(diffMs / 1000)

    if (diffSeconds < 1) {
        return '< 1s'
    } else if (diffSeconds < 60) {
        return `${diffSeconds}s`
    } else if (diffSeconds < 3600) {
        const minutes = Math.floor(diffSeconds / 60)
        return `${minutes}min`
    } else {
        const hours = Math.floor(diffSeconds / 3600)
        return `${hours}h`
    }
}

export default View
