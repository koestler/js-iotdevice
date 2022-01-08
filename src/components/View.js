import React, { useState } from 'react'

import Camera from './Camera'
import Autoplay, { AutoplayContext } from './Autoplay'
import { Columns, Heading, Section } from 'react-bulma-components'
import { useAuth } from '../hooks/auth'
import { Redirect } from 'react-router-dom'

const View = (view) => {
  const { title, name, cameras, refreshIntervalMs, autoplay } = view
  const [play, setPlay] = useState(autoplay)
  const { isViewAllowed } = useAuth()

  if (!isViewAllowed(view)) {
    return <Redirect to='/login' />
  }

  return (
    <Section>
      <Heading renderAs='h2'>{title}</Heading>
      <Autoplay play={play} setPlay={setPlay} refreshIntervalMs={refreshIntervalMs} />
      <AutoplayContext.Provider value={{ play: play, setPlay: setPlay, refreshIntervalMs: refreshIntervalMs }}>
        <Columns>
          {cameras.map(camera =>
            <Columns.Column key={camera.name}>
              <Camera viewName={name} viewIsPublic={view.isPublic} cameraName={camera.name} cameraTitle={camera.title} />
            </Columns.Column>
          )}
        </Columns>
      </AutoplayContext.Provider>
    </Section>
  )
}

export default View
