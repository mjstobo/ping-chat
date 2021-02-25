import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import LoginModal from "./Login/Login";
import { UserProvider } from "./Context/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <LoginModal />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
