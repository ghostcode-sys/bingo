import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SocketContext from "./socket";

const Filler = () => {
  const socket = useContext(SocketContext);
  const playerInfo = useSelector((state) => state.player);
  const [count, setCount] = useState(0);
  const [turn, setTurn] = useState(false);
  useEffect(() => {
    setCount(playerInfo.count);
    setTurn(playerInfo.myTurn)
    socket.emit("bingo-status", {
      count: playerInfo.count,
      username: playerInfo.playername,
    });
  }, [playerInfo, socket]);

  return (
    <div className="my-bingo-container">
      {turn ?<p className="bingo-my-move">Your Turn</p> :<p className="bingo-other-move">Opponent Turn</p>}
      <p>You</p>
      <div className="my-bingo-meter">
        <div
          className="my-bingo-box"
          style={{
            backgroundColor: count >= 1 ? "orange" : "rgba(255, 255, 255, 0.4)",
          }}
        >
          B
        </div>
        <div
          className="my-bingo-box"
          style={{
            backgroundColor: count >= 2 ? "orange" : "rgba(255, 255, 255, 0.4)",
          }}
        >
          I
        </div>
        <div
          className="my-bingo-box"
          style={{
            backgroundColor: count >= 3 ? "orange" : "rgba(255, 255, 255, 0.4)",
          }}
        >
          N
        </div>
        <div
          className="my-bingo-box"
          style={{
            backgroundColor: count >= 4 ? "orange" : "rgba(255, 255, 255, 0.4)",
          }}
        >
          G
        </div>
        <div
          className="my-bingo-box"
          style={{
            backgroundColor: count >= 5 ? "orange" : "rgba(255, 255, 255, 0.4)",
          }}
        >
          O
        </div>
      </div>
    </div>
  );
};

export default Filler;
