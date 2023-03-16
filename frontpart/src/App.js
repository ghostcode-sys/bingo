// Global imports
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

// local imports
import { store } from "./redux/store";
import Error from "./components/Error";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import SocketContext, { socket } from "./components/socket";
import UserLobby from "./components/UserLobby";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const [isAuth, setIsAuth] = useState(true);
  const setAuthentication = () => {
    setIsAuth(true);
    socket.emit("join-room", {
      id: store.getState().user.username,
      name: store.getState().user.name,
    });
  };

  return (
    <div className="App">
      <Provider store={store}>
        <SocketContext.Provider value={socket}>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Welcome changeAuth={setAuthentication} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {isAuth && <Route path="/home" element={<UserLobby />} />}
            {isAuth && <Route path="/game" element={<Home />} />}
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer/>
        </SocketContext.Provider>
      </Provider>
      <div className="wrapper">
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
    </div>
    </div>
  );
}

export default App;
