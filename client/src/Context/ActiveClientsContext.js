import React, { useState, useContext, useEffect } from "react";
import SocketContext from "./SocketContext";

export const ActiveClientsContext = React.createContext();

export const ActiveClientsProvider = ({ children }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("USER_DISCONNECT", (socketId) => {
      let filteredUsers = activeUsers.filter(
        (user) => user.socket_id !== socketId
      );

      setActiveUsers(filteredUsers);
    });

    return () => {
      socket.off("USER_DISCONNECT");
    };
  });

  useEffect(() => {
    socket.on("USER_UPDATE_RESPONSE", (updatedUsers) => {
      console.log(updatedUsers, " updated user list");
      setActiveUsers(updatedUsers);
    });

    return () => {
      socket.off("USER_UPDATE_RESPONSE");
    };
  });

  useEffect(() => {
    socket.on("USER_CONNECT", (listOfClients) => {
      console.log("Listing all clients due to a connection", listOfClients);
      setActiveUsers(listOfClients);
    });

    return () => {
      socket.off("USER_CONNECT");
    };
  });

  return (
    <ActiveClientsContext.Provider value={[activeUsers, setActiveUsers]}>
      {children}
    </ActiveClientsContext.Provider>
  );
};
