import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { removePlayerName, setPlayerCount } from "../redux/playerReducer";
import SocketContext from "./socket";

const PlayerFiller = () => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)
    const myCount = useSelector(state => state.player.count);
    const navigate = useNavigate();
    const socket = useContext(SocketContext)

    const handleCount = useCallback((data) => {
        setCount(data.count)
        dispatch(setPlayerCount(data.count))
    }, [])

    useEffect(() => {
        if(count == 5 && myCount == 5){
            alert("Tied");
            dispatch(removePlayerName())
            navigate("/")
        }
        else if(myCount == 5){
            alert("Win")
            dispatch(removePlayerName())
            navigate("/")
        }
        else if(count == 5){
            alert("Lose")
            dispatch(removePlayerName())
            navigate("/")
        }

    }, [count, myCount])
    useEffect(() => {
      socket.on("bingo-status", handleCount)
      return () => {
          socket.off("bingo-status", handleCount)
      }
    }, [socket])
    
    return (

      <div className="my-bingo-container">
        <p>Other Player</p>
        <div className="my-bingo-meter">
        <div
        className="my-bingo-box"
          style={{
            backgroundColor: count >= 1 ? "pink" : "#e5d5134d",
          }}
          >
          B
        </div>
        <div
        className="my-bingo-box"
          style={{
            backgroundColor: count >= 2 ? "pink" : "#e5d5134d",
          }}
          >
          I
        </div>
        <div
        className="my-bingo-box"
          style={{
            backgroundColor: count >= 3 ? "pink" : "#e5d5134d",
          }}
        >
          N
        </div>
        <div
        className="my-bingo-box"
          style={{
            backgroundColor: count >= 4 ? "pink" : "#e5d5134d",
          }}
          >
          G
        </div>
        <div
        className="my-bingo-box"
          style={{
            backgroundColor: count >= 5 ? "pink" : "#e5d5134d",
          }}
        >
          O
        </div>
          </div>
      </div>
    );
}

export default PlayerFiller