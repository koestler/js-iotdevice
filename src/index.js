import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import config from 'react-global-configuration'

config.set({
    apiUrl: process.env.REACT_APP_API_URL,
})

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
