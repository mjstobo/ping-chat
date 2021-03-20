import React from "react";
import * as io from "socket.io-client";

const socket = io("http://localhost:3000");

const SocketContext = React.createContext(socket);

export default SocketContext;
