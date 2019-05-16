import React from 'react'
import PropTypes from 'prop-types'

const Message = (props) => {
  const msg = props.message
  return (
    <li><strong>{msg.username}:</strong> {msg.text}</li>
  )
}

Message.propTypes = { message: PropTypes.object }

const MessageList = (props) => {
  const styles = {
    flex: '1 0 auto',
  }

  const listStyles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }

  return (
    <div className='tile is-child' style={styles} >
      <ul style={listStyles}>
        {props.messages.map(msg => <Message key={msg.id.toString()} message={msg} />)}
      </ul>
    </div>
  )
}

MessageList.propTypes = { messages: PropTypes.arrayOf(PropTypes.object) }

const SendForm = (props) => {
  const styles = {
  }

  return (
    <div className='field' style={styles} >
      <input className='input' type='text' placeholder='Message' />
    </div>
  )
}

const Chat = (props) => {
  return (
    <div className='content' style={{backgroundColor: '#fff'}} >
      <div className='tile is-vertical is-parent'>
        <h3 className='subtitle'>Chat</h3>
        <MessageList messages={props.messageList} />
        <SendForm />
      </div>
    </div>
  )
}

Chat.propTypes = { messageList: PropTypes.arrayOf(PropTypes.object) }

const PlayerTag = (props) => {
  const columnStyle = {paddingTop: '.25rem', paddingBottom: '.25rem'}

  return (
    <div className='column is-full-desktop' style={columnStyle}>
      <span className='tag is-white'>
        { props.username }
      </span>
    </div>
  )
}

PlayerTag.propTypes = { username: PropTypes.string }

const PlayerList = (props) => {
  const columnStyle = {paddingTop: '.25rem', paddingBottom: '.25rem'}

  return (
    <div className='columns is-multiline is-mobile'>
      <div className='column is-full-desktop has-text-centered-touch' style={columnStyle}>
        <h3 className='is-size-6-touch is-size-4 has-text-weight-bold'>Players</h3>
      </div>
      { props.players.map(player => <PlayerTag key={player} username={player} />) }
    </div>
  )
}

PlayerList.propTypes = { players: PropTypes.arrayOf(PropTypes.string) }

const ChatSection = (props) => {
  return (
    <div className='section'>
      <div className='container'> 
        <div className='columns is-multiline'>
          <div className='column is-four-fifths-desktop is-full-tablet'>
            <Chat messageList={props.messageList} />
          </div>
          <div className='column is-one-fifth-desktop'>
            <PlayerList players={props.players}/>
          </div>
        </div>
      </div>
    </div>
  )
}

ChatSection.propTypes = {
  messageList: PropTypes.arrayOf(PropTypes.object),
  players: PropTypes.arrayOf(PropTypes.string)
}

export default ChatSection
