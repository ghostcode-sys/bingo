import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPlayerName } from "../redux/playerReducer";
import Card from "./Card";
import RequestCard from "./RequestCard";
import SocketContext from "./socket";
const UserLobby = () => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username]);

  const socket = useContext(SocketContext);
  const [allActiveUser, setAllActiveUser] = useState([]);
  const [requestArr, setRequestArr] = useState([]);
  const getAllUser = useCallback((data) => {
    const arr = data.user.filter((val) => {
      if (username !== val[0] && val[1].engage === false) {
        return true;
      }
      return false;
    });
    setAllActiveUser([...arr]);
  }, []);

  const addRequestUser = useCallback((data) => {
    setRequestArr([...requestArr, data]);
  }, []);

  const ackRequest = useCallback((data) => {
    if (data.msg === "approved") {
      const playername =
        data.data.playername === username
          ? data.data.username
          : data.data.playername;
      dispatch(setPlayerName({ playername, playerTurn: data.turn }));
      navigate("/game");
    }
  }, []);

  useEffect(() => {
    socket.on("all-active-user", getAllUser);
    socket.on("pending-request", addRequestUser);
    socket.on("ack-request", ackRequest);
    return () => {
      socket.off("all-active-user", getAllUser);
      socket.off("pending-request", addRequestUser);
      socket.off("ack-request", ackRequest);
    };
  }, [socket, getAllUser, addRequestUser]);

  const removeUser = (username) => {
    const arr = requestArr.filter(data => {
      return data.username !== username
    })
    setRequestArr([...arr])
  }

  return (
    <div className="lobby-box">
      <div className="lobby-activeUser">
        <p className="lobby-heading">Active User List</p>
        {allActiveUser.map((val, index) => {
          return <Card username={val[0]} name={val[1].name} key={val[0]} />;
        })}
      </div>
      <div className="lobby-requestUser">
        <p className="lobby-heading"> Request List</p>
        {requestArr.map((val, index) => {
          return <RequestCard info={val} key={`request-${index}`} declineCall={removeUser} />;
        })}
      </div>
    </div>
  );
};

export default UserLobby;
