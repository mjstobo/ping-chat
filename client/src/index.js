import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as io from "socket.io-client";

import { UserProvider } from "./Context/UserContext";
import SocketContext from "./Context/SocketContext";
import { ActiveClientsProvider } from "./Context/ActiveClientsContext";

const socket = io("http://localhost:3000");
socket.emit("connection");

ReactDOM.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <ActiveClientsProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ActiveClientsProvider>
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
