import React, { useState, useEffect } from 'react'

import './Les.scss'

const Led = ({ blinkOnChange }) => {
  const [key, setKey] = useState(0)
  useEffect(() => {
    setKey(key => key + 1)
  }, [blinkOnChange, setKey])
  // key is changed in order to re-create the dom element and thereby restart the css animation
  return <div key={key} className='led' />
}

export default Led
