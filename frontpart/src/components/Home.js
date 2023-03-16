import React, { useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SocketContext from "./socket";
import '../style/pregame.css'
import Bingo from "./Bingo";
import Filler from "./Filler";
import PlayerFiller from "./PlayerFiller";


const Home = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);
  const handleConnectSocket = useCallback(() => {
    if (username) {
      socket.emit("join-room", { id: username });
      // console.log("join room send");
    }
  }, []);

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username]);

  useEffect(() => {
    // handleConnectSocket();
    socket.on("connect", handleConnectSocket);
    return () => {
      socket.off("connect", handleConnectSocket);
    };
  }, [socket, handleConnectSocket]);

  return (
    <div>
      <Bingo/>
      <Filler/>
      <PlayerFiller/>
    </div>
  );
};

export default Home;
