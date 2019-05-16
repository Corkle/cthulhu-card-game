import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as API from '../api'


/*

const UserLogin = (props) => {
	const [loginState, setLoginState] = useState('INITIAL')
  const [usernameText, setUsernameText] = useState('')
  const [usernameTextError, setUsernameTextError] = useState(null)
  const [gameIdText, setGameIdText] = useState('')
  const [gameIdTextError, setGameIdTextError] = useState(null)
  const [gameId, setGameId] = useState('')

  const handleUsernameTextChange = (e) => {
    setUsernameText(e.target.value)
    setUsernameTextError(null)
  }

  const handleGameIdTextChange = (e) => {
    setGameIdText(e.target.value)
    setGameIdTextError(null)
  }

  const handleNewGameClick = (e) => {
    if (usernameText != '') {
      API.createNewGame(usernameText, (data, err) => {
        if (!err) {
          props.onGameJoined(data)
          setGameId(data.game.gameId)
          setLoginState('NEW_GAME_SUCCESS')
        }
      })
    }
  }

  const handleJoinGameClick = (e) => {
    if (gameIdText != '') {
      API.joinGameById(gameIdText, usernameText, (data, err) => {
        if (!err) {
          props.onGameJoined(data)
          props.onStartPlaying()
        } else {
          setGameIdTextError(err)
        }
      })
    } else {
      setGameIdTextError('Enter a valid Game ID') 
    }
  }

  const handleStartClick = (e) => {
    usernameText != '' ?
      setLoginState('CONNECT_TYPE') :
      setUsernameTextError('Enter a valid username')
  }

	const LOGIN_STATES = {
		'LOADING':
			<div className='has-text-centered'>
				Loading...
			</div>
		,
		'INITIAL':
      <> 
        <BigTextbox
          placeholder={'Username'}
          error={usernameTextError}
          onChange={handleUsernameTextChange}
          onPressEnter={handleStartClick} />
        <BigButton text={'Start'} onClick={handleStartClick} />
      </>,
		'CONNECT_TYPE':
      <>
        <BigButton text={'New Game'} onClick={handleNewGameClick} />
        <BigButton text={'Join Game'} onClick={ (e) => setLoginState('JOIN_GAME') } />
      </>,
    'JOIN_GAME':
      <>
        <BigTextbox
          placeholder={'Game ID'}
          error={gameIdTextError}
          onChange={handleGameIdTextChange}
          onPressEnter={handleJoinGameClick} />
        <BigButton text={'Join'} onClick={handleJoinGameClick}/>
      </>,
    'NEW_GAME_SUCCESS':
      <>
        <div className='box has-text-centered'>
          <p>Friends can join using this Game ID:</p>
          <h1 className='content is-large'>{ gameId }</h1>
        </div>
        <BigButton text={'OK'} onClick={props.onStartPlaying} />
      </>
	}

  return (
    <div className='section is-large'>
      <div className='column is-4 is-offset-4'>
				<div className='box'>
          { LOGIN_STATES[loginState] }
        </div>
      </div>
    </div>
  )
}
*/

const BigInputText = (props) => {
  return (
    <div className='field'>
      <div className='control'>
        <input
          className='input is-large'
          type='text'
          placeholder={ props.placeholder }
          onChange={ props.onChange }
          onKeyDown={ (e) => { if (e.keyCode == 13) { props.onPressEnter() }} }
        />
      </div>
      {props.error &&
        <p className='help is-danger'>{props.error}</p>
      } 
    </div>
  )
}

BigInputText.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onPressEnter: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
}

const BigButton = (props) => {
  return (
    <div className='field'>
      <button
        className={ 'button is-info is-large is-outlined is-fullwidth' }
        onClick={ props.onClick }>
        { props.text }
      </button>
    </div>
  )
}

BigButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string
}

const JoinGamePage = (props) => {
  const [nicknameText, setNicknameText] = useState('')
  const [nicknameTextError, setNicknameTextError] = useState(null)

  const handleNextClick = (e) => {
    if (nicknameText == '') {
      setNicknameTextError('Please enter a valid nickname')
    }
  }

  return (
    <div className='section is-large'>
      <div className='column is-4 is-offset-4'>
				<div className='box has-text-centered'>
          <h3 className='subtitle is-4'>Choose a nickname</h3>
          <BigInputText
            placeholder='Nickname'
            onChange={(e) => {console.log(e)}}
            onPressEnter={() => {}}
            error={nicknameTextError} />
          <BigButton text='Next' onClick={handleNextClick} />
        </div>
      </div>
    </div>
  )
}

JoinGamePage.propTypes = {
  //onGameJoined: PropTypes.func.isRequired,
  //onStartPlaying: PropTypes.func.isRequired
}

export default JoinGamePage
