const generateGameId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomChar = () => characters.charAt(Math.floor(Math.random() * characters.length))
  const idChars = [...Array(4)].map(x => randomChar())

  return idChars.join('')
}

const createNewGame = (player) => {
  const state = {
    gameId: generateGameId(),
    messageHistory: [
      {id: 0, username: 'Bot1', text: 'Hello, how are you?'},
      {id: 1, username: 'Bot2', text: 'Hi! I am well.'},
      {id: 2, username: 'Bot1', text: 'Good. I will now leave.'}
    ],
    players: [player]
  }

  function addPlayer(playerName) {
    state.players.push(playerName)
  }

  function removePlayer(playerName) {
    const newList = state.players.filter(x => x != player)
    state.players = newList
  }

  return {
    addPlayer,
    removePlayer,
    state
  }
}

export default () => {
  const games = {}

  function newGame(playerName) {
    const game = createNewGame(playerName)
    games[game.state.gameId] = game

    return game.state
  }

  function leaveGame(gameId, playerName) {
    const game = games[gameId] 
    if (!game) { return false }

    game.removePlayer(playerName)
    return game.state
  }

  function joinGame(gameId, playerName) {
    const game = games[gameId]
    if (!game) { return false }

    game.addPlayer(playerName)
    return game.state
  }

  return {
    newGame,
    leaveGame,
    joinGame
  }
}
