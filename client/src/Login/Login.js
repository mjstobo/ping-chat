import React, { useContext, useState } from "react";
import SocketContext from "../Context/SocketContext";
import { UserContext } from "../Context/UserContext";
import "./Login.scss";
import axios from "axios";

function LoginModal() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.id]: value,
    });
  };
  const handleSubmit = (e) => {};
  const userLogin = () => {};
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
        <form className="login-form">
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
          <button type="submit" onSubmit={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
