import React from 'react'
import { Block, Button, Progress, Box } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

export const AutoplayContext = React.createContext({ play: false, refreshIntervalMs: 0 })

const Autoplay = ({ play, setPlay, refreshIntervalMs }) => {
  const playButton = (
    <Button onClick={() => setPlay(!play)}>
      <FontAwesomeIcon icon={play ? faStop : faPlay} />
    </Button>
  )

  let isPlaying = null
  if (play) {
    isPlaying = (
      <Block>
        <p>images are automatically reloaded every {refreshIntervalMs} ms</p>
        <Progress />
      </Block>
    )
  }

  return (
    <Box>
      {playButton}
      {isPlaying}
    </Box>
  )
}

export default Autoplay
