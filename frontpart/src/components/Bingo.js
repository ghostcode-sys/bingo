import Box from "./Box";
import Filler from "./Filler";
import { shuffle, countCross } from "./utils";
import "../style/bingo.css";
import { useDispatch, useSelector } from "react-redux";
import { setCount } from "../redux/playerReducer";
import { useRef } from "react";

const Bingo = () => {
  const dispatch = useDispatch();
  const numberArr = [];
  for (let i = 1; i <= 25; i++) {
    numberArr.push({ visited: false, otherPlayer: false, value: i });
  }

  const currentCount = useRef(0);
  shuffle(numberArr);
  const handleCallback = (index, value) => {
    numberArr[index] = value;
    const val = countCross(numberArr);
    currentCount.current = val;
    dispatch(setCount(val));
  };

  const fillerContainer = [];
  for (let i = 0; i < 5; i++) {
    const containerArray = [];
    for (let j = 0; j < 5; j++) {
      containerArray.push(
        <Box
          initialValue={numberArr[i * 5 + j]}
          key={i * 5 + j + 1}
          index={i * 5 + j}
          sendToParent={handleCallback}
          currentCount={currentCount.current}
        />
      );
    }
    fillerContainer.push(
      <div className="bingo-box-row" key={`container${i}`}>
        {containerArray}
      </div>
    );
  }

  return (
    <div className="bingo-box-container">
      <div className="bingo-container">{fillerContainer}</div>;
    </div>
  );
};

export default Bingo;
