import React, { useContext } from "react";
import SocketContext from "../Context/SocketContext";
import { UserContext } from "../Context/UserContext";
import "./Login.scss";

function LoginModal() {
  //add login form markup
  //add handlers for auth
  //update usercontext on success
  //redirect on success
  //error state on fail
  //field validation
  //set as auth entry

  return (
    <div className="login-modal">
      <div className="login-intro">
        <h1>Welcome to Ping.</h1>
      </div>
      <form className="login-form">
        <input id="username" type="username" placeholder="Username"></input>
        <input id="password" type="password" placeholder="Password"></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginModal;
