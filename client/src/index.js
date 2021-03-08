import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as io from "socket.io-client";

import { UserProvider } from "./Context/UserContext";
import SocketContext from "./Context/SocketContext";

const socket = io("http://localhost:3000");

ReactDOM.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <UserProvider>
        <App />
      </UserProvider>
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
