import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/userReducer";
const Signup = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
    name: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/user/signup", {
        ...user,
      });
      if (res.status === 200) {
        dispatch(setUserInfo({ username: user.username, name: user.name }));
        navigate("/");
      } else if (res.status === 204) {
        setErrorMsg("Username already exists!!");
      }
    } catch (error) {
      setErrorMsg("Username already exists!!");
    }
  };

  return (
    <div className="form-container">
      <div className="form-div">
        <p className="form-heading">SIGN UP</p>
        <form onSubmit={handleSubmit}>
          <div className="input-div">
            <label htmlFor="name">NAME</label>
            <input
              placeholder="name"
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-div">
            <label htmlFor="username">USERNAME</label>
            <input
              placeholder="Username"
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-div">
            <label htmlFor="password">PASSWORD</label>
            <input
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <input type="submit" value="Signup" className="sub-btn" />
          </div>
        </form>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <div>
          <button onClick={() => navigate("/login")} className="change-user">Already user</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
