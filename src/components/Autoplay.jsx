import React, { useState, useEffect } from 'react'
import { Button } from '@allxsmith/bestax-bulma'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useAuth } from '../hooks/auth'

export const AutoplayContext = React.createContext({ play: false, values: null })

const Autoplay = ({ viewName, play, setPlay, setValues }) => {
  const [connectionState, setConnectionState] = useState('never started')

  // set play=false when ws connection was closed
  useEffect(() => {
    if (connectionState === 'Closed') {
      setPlay(false)
    }
  }, [connectionState, setPlay])

  return (
    <>
      <AutoplayBox play={play} setPlay={setPlay} />
      {play && <Websocket viewName={viewName} setConnectionState={setConnectionState} setValues={setValues} />}
    </>
  )
}

const Websocket = ({ viewName, setConnectionState, setValues }) => {
  const { isLoggedIn, getToken } = useAuth()
  const { lastJsonMessage, readyState, sendJsonMessage } = useWebSocket(websocketUrl(`views/${viewName}/ws`))

  // update values
  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.values) {
      Object.entries(lastJsonMessage.values).forEach(([newDeviceName, newDeviceValues]) => {
        setValues(values => {
          return {
            ...values,
            [newDeviceName]: {
              ...((values && newDeviceName in values) ? values[newDeviceName] : {}),
              ...newDeviceValues
            }
          }
        })
      })
    }
  }, [lastJsonMessage, setValues])

  // send authentication message after connect when logged in
  useEffect(() => {
    if (readyState === ReadyState.OPEN && isLoggedIn()) {
      sendJsonMessage({ type: 'auth', authToken: getToken() })
    }
  }, [readyState, isLoggedIn, getToken, sendJsonMessage])

  // update connectionState
  useEffect(() => {
    setConnectionState(readyStateToString(readyState))
    return () => {
      setConnectionState(ReadyState.CLOSED)
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
  uri += '/api/v2/'
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

const AutoplayBox = ({ play, setPlay }) => {
  return (
    <Button.Group align='right'>
      <Button onClick={() => setPlay(!play)}>
        <FontAwesomeIcon icon={play ? faStop : faPlay} />
      </Button>
    </Button.Group>
  )
}

export default Autoplay
