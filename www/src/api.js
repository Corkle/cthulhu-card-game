import socket from './socket'

export const createNewGame = (username, cb) => {
  socket.emit('new-game', username)

  socket.on('new-game-response', cb)
}

export const joinGameById = (gameId, username, cb) => {
  socket.emit('join-game', gameId, username)

  socket.on('join-game-response', cb)
}

export const subscribeToConnection = (onConnect, onDisconnect) => {
  socket.connected ? onConnect() : onDisconnect()

  socket.on('connect', () => {
    console.log('connected!')
    onConnect()
  })

  socket.on('disconnect', () => {
    console.log('disconnected!') 
    onDisconnect()
  })
}

export const unsubscribeFromConnection = (onConnect, onDisconnect) => {
  socket.removeListener('connect', onConnect)
  socket.removeListener('disconnect', onDisconnect)
}

export const subscribeToPlayerList = (onPlayerJoin, onPlayerLeave) => {
  socket.on('player-joined', onPlayerJoin)
  socket.on('player-left', onPlayerLeave)
}

export const unsubscribeFromPlayerList = (onPlayerJoin, onPlayerLeave) => {
  socket.removeListener('player-joined', onPlayerJoin)
  socket.removeListener('player-left', onPlayerLeave)
}
