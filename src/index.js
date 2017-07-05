import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import config from 'react-global-configuration';

config.set({
    //apiUrl: 'http://localhost:8000/api/v0/'
    apiUrl: '/api/v0/'
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
