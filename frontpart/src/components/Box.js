import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alterTurn, setPlayerCount } from "../redux/playerReducer";
import SocketContext from "./socket";

const Box = ({ initialValue, sendToParent, index, currentCount }) => {
  const [value, setValue] = useState(initialValue);
  const [myTurn, setMyTurn] = useState(false);
  const playerInfo = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    setMyTurn(playerInfo.myTurn);
  }, [playerInfo]);

  const handleValueFromPlayer = useCallback((data) => {
    if (data.value === value.value) {
      // console.log("ha ha value from other user");
      sendToParent(index, { ...value, visited: true, otherPlayer: true });
      setValue({ ...value, visited: true, otherPlayer: true });
      dispatch(alterTurn());
    }
  }, []);
  
  useEffect(() => {
    socket.on("user-turn-value", handleValueFromPlayer);
    return () => {
      socket.off("user-turn-value", handleValueFromPlayer);
    };
  }, [socket, handleValueFromPlayer]);

  const handleClick = () => {
    if (myTurn && value.visited === false) {
      // console.log("ha ha value sent to other user");
      sendToParent(index, { ...value, visited: true});
      setValue({ ...value, visited: true });
      dispatch(alterTurn());
      socket.emit("user-turn-value", {
        playername: playerInfo.playername,
        value: value.value,
      });
    }
  };

  return (
    <button
      className={`bingo-box ${!value.visited ? "active-box" : "passive-box"}`}
      onClick={handleClick}
    >
      {value.value}
    </button>
  );
};

export default Box;
