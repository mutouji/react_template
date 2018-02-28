// @flow

import socketIOClient from 'socket.io-client'

import {
  IO_CONNECT,
  IO_DISCONNECT,
  IO_CLIENT_HELLO,
  IO_CLIENT_JOIN_ROOM,
  IO_SERVER_HELLO,
} from '../shared/config'

// const socket = socketIOClient(window.location.host)
const socket = socketIOClient('http://localhost:8000')
// const socket = socketIOClient(`http://localhost:8000`, {
//   reconnectionDelay: 1000,
//   reconnection: true,
//   reconnectionAttempts: 10,
//   transports: ['websocket'],
//   agent: false, // [2] Please don't set this to true
//   upgrade: false,
//   rejectUnauthorized: false,
// })

/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const setUpSocket = (store: Object) => {
  socket.on(IO_CONNECT, () => {
    console.log('[socket.io] Connected.')
    socket.emit(IO_CLIENT_JOIN_ROOM, 'hello-1234')
    socket.emit(IO_CLIENT_HELLO, 'Hello!')
  })

  socket.on(IO_SERVER_HELLO, (serverMessage) => {
    console.log(`[socket.io] Server: ${serverMessage}`)
  })

  socket.on(IO_DISCONNECT, () => {
    console.log('[socket.io] Disconnected.')
  })
}
/* eslint-enable no-console */

export default setUpSocket
