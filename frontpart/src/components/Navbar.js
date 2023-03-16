import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUserInfo } from "../redux/userReducer";
import "../style/first.css";
const Navbar = () => {
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(removeUserInfo());
    navigate("/");
  };
  return (
    <div className="navbar">
      <div>
        <p className="navbar-logo">BINGO</p>
      </div>
      <div className="navbar-user">
        <span className="navbar-username">{name}</span>
        {name && (
          <button onClick={handleClick} className="navbar-button">
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
