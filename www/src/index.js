import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma/css/bulma.css'
import './index.css'
import App from './App'


/*
const socket = io()

socket.on('connect', () => {
  console.log('connected!')
})

socket.on('disconnect', () => {
  console.log('disconnected!')
})

socket.on('lobby::message', data => {
  console.log(data)
})

socket.emit('lobby::message', 'Hello everyone!')
*/

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
