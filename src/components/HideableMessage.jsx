import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Button, Message } from 'react-bulma-components'

const HideableMessage = ({ header, children }) => {
  const [hide, setHide] = useState(false)
  return (
    <Message color='dark'>
      <Message.Header>
        {header}
        <Button onClick={() => setHide(!hide)}>
          <FontAwesomeIcon icon={hide ? faEye : faEyeSlash} />
        </Button>
      </Message.Header>
      {hide || children}
    </Message>
  )
}

export default HideableMessage
