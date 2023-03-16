import {useState, useEffect, useCallback, useContext} from 'react'
import { useSelector } from 'react-redux';
import SocketContext from './socket'
const Card = ({username, name}) => {

    const socket = useContext(SocketContext);
    const ownUserName = useSelector(state => state.user)
    const handleJoinUser = (e) => {
        socket.emit('request-match', {username:ownUserName.username, playername:username, name:ownUserName.name})
    }

  return (
    <div className='join-card'>
        <p className='join-card-username'>{name}</p>
        <button className='join-card-button' onClick={handleJoinUser}>Invite</button>
    </div>
  )
}

export default Card