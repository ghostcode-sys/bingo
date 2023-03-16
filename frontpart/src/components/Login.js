import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/userReducer";
const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/user/login', {...user});
      if(res.status === 200){
        dispatch(setUserInfo({name:res.data.name, username: user.username}))
        navigate('/');
      }
      if(res.status === 204){
        console.log("error ")
        setErrorMsg("Error while login in please try again");
      }
    } catch (error) {
      console.log(error)
      setErrorMsg("Error while login in please try again");
    }
  }
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
       <div className="form-div">
       <p className="form-heading">LOGIN</p>
      <form onSubmit={handleSubmit}>
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
          <input type="submit" value="Login" className="sub-btn"/>
        </div>
      </form>
      {errorMsg && <p className="error-msg"> {errorMsg}</p>}
      <div>
        <button onClick={() => navigate('/signup')} className="change-user" >Not registered yet?</button>
      </div>
    </div>
    </div>
  );
};

export default Login;
