import game from './game'

const GAME = game()

const joinSocketRoom = (socket, roomId, username) => {
  socket.join(roomId)
  socket['currentRoom'] = { roomId, username }
}

export default (io, LOGGER) => {
  io.on('connection', socket => {
    LOGGER.debug(socket.id + ' connected')

    socket.on('new-game', username => {
			socket.username = username
      LOGGER.debug(username + ' creating a new game') 

			const game = GAME.newGame(username)

			joinSocketRoom(socket, game.gameId, username)

      const response = { game, username }

      socket.emit('new-game-response', response)
    })

    socket.on('join-game', (gameId, username) => {
      LOGGER.debug(`${username} joining game ${gameId} `) 
      const game = GAME.joinGame(gameId.toUpperCase(), username)

      if (game) {
			  joinSocketRoom(socket, game.gameId, username)
        
        const response = { game, username }

        socket.emit('join-game-response', response)
        socket.to(game.gameId).emit('player-joined', username)
      } else {
        LOGGER.debug(`${gameId} does not exist.`)
        socket.emit('join-game-response', null, 'Game ID does not exist.') 
      } 
    })

    socket.on('disconnect', reason => {
      LOGGER.debug(socket.id + ' disconnected')
    
      const room = socket['currentRoom']
      if (room) {
        GAME.leaveGame(room.roomId, room.username)
        io.to(room.roomId).emit('player-left', room.username)
      }
    })
  })
}

