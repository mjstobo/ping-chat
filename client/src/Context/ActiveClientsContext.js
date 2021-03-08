import React, { useState, useContext, useEffect } from "react";
import SocketContext from "./SocketContext";

export const ActiveClientsContext = React.createContext();

export const ActiveClientsProvider = ({ children }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("clients", (userList) => {
      let users = Object.entries(userList).map((user) => ({
        id: user[0],
      }));
      setActiveUsers(users);
    });

    socket.on("USER_DISCONNECT", ([socketId, reason_code]) => {
      let remainingcurrentUsers = activeUsers.filter(
        (user) => user.id !== socketId
      );
      setActiveUsers(remainingcurrentUsers);
    });

    socket.on("USER_UPDATE", ([socketId, socketName]) => {
      let updatedUsers = activeUsers.map((user) =>
        user.id === socketId ? { ...user, name: socketName } : user
      );
      console.log(updatedUsers);
      setActiveUsers(updatedUsers);
    });

    socket.on("USER_CONNECT", () => {
      getClients();
    });
  }, []);

  const getClients = () => {
    socket.emit("GET_CLIENTS", (clientsList) => {
      let users = Object.entries(clientsList).map((user) => ({
        id: user[0],
      }));

      setActiveUsers(users);
    });
  };
  return (
    <ActiveClientsContext.Provider value={[activeUsers, setActiveUsers]}>
      {children}
    </ActiveClientsContext.Provider>
  );
};
