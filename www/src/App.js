import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import JoinGamePage from './components/JoinGamePage'
import ChatSection from './components/ChatSection'
import * as API from './api'

const GameIdMonitor = (props) => {
  const [isConnected, setIsConnected] = useState(false)

  const gameIdTagClass = 'tag is-large ' + (isConnected ? 'is-primary' : 'is-danger')

  useEffect(() => {
    function handleOnConnect() { setIsConnected(true) }
    function handleOnDisconnect() { setIsConnected(false) }

    API.subscribeToConnection(handleOnConnect, handleOnDisconnect)

    return function cleanup() {
      API.unsubscribeFromConnection(handleOnConnect, handleOnDisconnect)
    }
  })

  return (
    <div className='tags has-addons'>
      <span className='tag is-large'>Game ID</span>
      <span className={gameIdTagClass}>{props.gameId}</span>
    </div>
  )
}

GameIdMonitor.propTypes = { gameId: PropTypes.string }

const TopNav = (props) => {
  const logoSrc = 'https://image.flaticon.com/icons/svg/1137/1137046.svg'

  return (
    <nav className='navbar is-dark'>
      <div className='container'>
        <div className='navbar-brand'>
          <div className='navbar-item'>
            <figure className='image is-48x48'>
              <img className='is-48x48' src={logoSrc} style={{maxHeight: '100%'}} />
            </figure>
          </div>
        </div>
        { props.gameId &&
          <div className='navbar-menu'>
            <div className='navbar-end'>
              <div className='navbar-item'>
                <GameIdMonitor gameId={props.gameId} />
              </div>
            </div>
          </div>
        } 
      </div>
    </nav>
  ) 
}

TopNav.propTypes = { gameId: PropTypes.string }

const GameSection = (props) => {
  return (
    <div className='section is-large' style={{backgroundColor: '#91c9cf'}}>
      <div className='container'>
       GAME 
      </div>
    </div>
  )
}

const App = (props) => {
  const [gameId, setGameId] = useState(null)
  const [messageList, setMessageList] = useState([])
  const [playerList, setPlayerList] = useState([])
  const [appScene, setAppScene] = useState('JOIN_GAME')

	const handleGameJoined = (data, err) => {
    setGameId(data.game.gameId)
    setMessageList(data.game.messageHistory)
    setPlayerList(data.game.players)
	}

  useEffect(() => {
    function handlePlayerJoined(player) { setPlayerList([...playerList, player]) }
    function handlePlayerLeft(player) { setPlayerList(playerList.filter(x => x != player)) }

    API.subscribeToPlayerList(handlePlayerJoined, handlePlayerLeft)

    return function cleanup() {
      API.unsubscribeFromPlayerList(handlePlayerJoined, handlePlayerLeft)
    }
  }, [playerList])

  const APP_SCENE = {
    'JOIN_GAME':
      <JoinGamePage
        onGameJoined={handleGameJoined}
        onStartPlaying={ () => setAppScene('PLAY_GAME') } />
    ,
    'PLAY_GAME':
      <>
        <GameSection />
        <ChatSection messageList={messageList} players={playerList}/>
      </>
  }

  return (
    <>
      <TopNav gameId={gameId}/>
      { APP_SCENE[appScene] }
    </>
  )
}

export default App
