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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const socket = useContext(SocketContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.id]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username || !user.password) {
      console.log("no username or password");
    } else if (e.nativeEvent.submitter.id === "register") {
      try {
        console.log("reaching this");
        await setIsSubmitting(true);
        await userRegister();
      } catch (e) {
        console.log(e);
        await setIsSubmitting(false);
      }
    } else {
      try {
        await setIsSubmitting(true);
        await userLogin();
      } catch (e) {
        console.log(e);
        await setIsSubmitting(false);
      }
    }
  };
  const userLogin = async () => {
    await axios
      .post("/users/login", user)
      .then((response) => {
        setIsSubmitting(false);
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

  const userRegister = async () => {
    console.log(user);
    await axios
      .post("/users/register", user)
      .then((response) => {
        setIsSubmitting(false);
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
          <button
            type="submit"
            id="login"
            disabled={isSubmitting ? true : false}
          >
            Login
          </button>
          <p>OR</p>
          <button
            type="submit"
            id="register"
            disabled={isSubmitting ? true : false}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
