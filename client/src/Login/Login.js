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
  const [validationMessage, setValidationMessage] = useState("");
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
    setValidationMessage("");
    let validationResult = validateFormInputs();
    if (validationResult) {
      if (e.nativeEvent.submitter.id === "register") {
        try {
          console.log("reaching this");
          setIsSubmitting(true);
          await userRegister();
        } catch (e) {
          setValidationMessage("Error registering account. Please try again");
          console.log(e);
        }
      } else {
        try {
          setIsSubmitting(true);
          await userLogin();
        } catch (e) {
          console.log(e);
        }
      }
    }
    setIsSubmitting(false);
  };

  const validateFormInputs = () => {
    if (!user.username && !user.password) {
      setValidationMessage("Please enter a username & password");
      return false;
    }
    if (!user.username) {
      setValidationMessage("Please enter a username");
      return false;
    }

    if (!user.password) {
      setValidationMessage("Please enter a password");
      return false;
    }

    if (user.username && user.password) {
      setValidationMessage("");
      return true;
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
        } else {
          setValidationMessage(
            "Error logging in with account. Please try again"
          );
        }
      })
      .catch((error) =>
        setValidationMessage("Error registering this account. Please try again")
      );
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
        } else {
          setValidationMessage(
            "Error registering this account. Please try again"
          );
        }
      })
      .catch((error) =>
        setValidationMessage("Error registering this account. Please try again")
      );
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
          <span class="form-error">{validationMessage}</span>
          <button
            type="submit"
            id="login"
            disabled={isSubmitting ? true : false}
            class="primary"
          >
            {isSubmitting ? (
              <span class="material-icons">pending</span>
            ) : (
              "Login"
            )}
          </button>
          <button
            type="submit"
            id="register"
            disabled={isSubmitting ? true : false}
          >
            {isSubmitting ? (
              <span class="material-icons">pending</span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
