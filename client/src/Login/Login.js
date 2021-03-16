import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import "./Login.scss";
import axios from "axios";
import SocketContext from "../Context/SocketContext";

function LoginModal() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [authUser, setAuthUser] = useContext(UserContext);
  const socket = useContext(SocketContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.id]: value,
    });
  };
  const handleSubmit = async (e) => {
    if (!user.username || !user.password) {
      console.log("no username or password");
    } else {
      e.preventDefault();
      await userLogin();
    }
  };
  const userLogin = async () => {
    await axios
      .post("/users/login", user)
      .then((response) => {
        if (response.status === 200) {
          let userObj = {
            socket_id: socket.id,
            name: response.data.user,
            hasUsername: true,
            isLoggedIn: true,
          };
          socket.emit("USER_UPDATE", userObj);
          setAuthUser({
            ...authUser,
            ...userObj,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  //add handlers for auth
  //update usercontext on success
  //redirect on success
  //error state on fail
  //field validation
  //set as auth entry

  return (
    <div className="login-modal">
      <div className="login-container">
        <div className="login-intro">
          <h1>
            Welcome to <span className="login-title">ping.</span>
          </h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            id="username"
            type="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
