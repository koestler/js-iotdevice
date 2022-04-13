import React, { useState, useEffect } from 'react'
import { Block, Button, Box } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useAuth } from '../hooks/auth'


export const AutoplayContext = React.createContext({ play: false, values: null })

const Autoplay = ({ viewName, play, setPlay, updateValues }) => {
  const [connectionState, setConnectionState] = useState('never started')
  return (
    <>
      <AutoplayBox play={play} setPlay={setPlay} connectionState={connectionState} />
      {play && <Websocket viewName={viewName} setConnectionState={setConnectionState} updateValues={updateValues} />}
    </>
  )
}

const Websocket = ({ viewName, setConnectionState, updateValues }) => {
  const { isLoggedIn, getToken } = useAuth()
  const { lastJsonMessage, readyState, sendJsonMessage } = useWebSocket(websocketUrl(`values/${viewName}/ws`))

  // update values
  useEffect(() => {
    if (lastJsonMessage) {
      updateValues(lastJsonMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage])

  // send authentication message after connect when logged in
  useEffect(() => {
    if (readyState === ReadyState.OPEN && isLoggedIn()) {
      sendJsonMessage({ authToken: getToken() })
    }
  }, [readyState, isLoggedIn, getToken, sendJsonMessage])

  // update connectionState
  useEffect(() => {
    setConnectionState(readyStateToString(readyState))
    return () => {
      setConnectionState('closed')
    }
  }, [readyState, setConnectionState])

  return <></>
}

const websocketUrl = (endpoint) => {
  const loc = window.location
  let uri
  if (loc.protocol === 'https:') {
    uri = 'wss:'
  } else {
    uri = 'ws:'
  }
  uri += '//' + loc.host
  uri += '/api/v1/'
  uri += endpoint
  return uri
}

const readyStateToString = (readyState) => {
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
  }
  return connectionStatus[readyState]
}

const AutoplayBox = ({ play, setPlay, connectionState }) => {
  const playButton = (
    <Button onClick={() => setPlay(!play)}>
      <FontAwesomeIcon icon={play ? faStop : faPlay} />
    </Button>
  )

  return (
    <Box>
      {playButton}
      <Block>{connectionState}</Block>
    </Box>
  )
}

export default Autoplay
