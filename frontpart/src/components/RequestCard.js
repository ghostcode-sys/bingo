import { useContext } from "react";
import SocketContext from "./socket";

const RequestCard = ({ info, declineCall }) => {
    const socket = useContext(SocketContext)

    const handleJoinUser = () => {
        socket.emit('approve-request', {username:info.playername, playername:info.username, name:info.name})
    }
    const handleDeclineUser = () => {
        socket.emit('disapprove-request', {username:info.playername, playername:info.username,name:info.name})
      declineCall(info.username)
    }

  return (
    <div className="join-card">
      <p className='join-card-username'>{info.name}</p>
      <button className="join-card-button" onClick={handleJoinUser}>Join</button>
      <button className="join-card-button" onClick={handleDeclineUser}>Decline</button>
    </div>
  );
};

export default RequestCard;
