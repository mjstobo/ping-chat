import { set } from "mongoose";
import React, { useState, useContext, useEffect } from "react";
import SocketContext from "./SocketContext";

export const ActiveClientsContext = React.createContext();

export const ActiveClientsProvider = ({ children }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("USER_DISCONNECT", ([socketId, reason_code]) => {
      let remainingcurrentUsers = activeUsers.filter(
        (user) => user.id !== socketId
      );
      setActiveUsers(remainingcurrentUsers);
    });

    return () => {
      socket.off("USER_DISCONNECT");
    };
  }, []);

  useEffect(() => {
    socket.on("USER_UPDATE", (socketObj) => {});

    return () => {
      socket.off("USER_UPDATE");
    };
  });

  useEffect(() => {
    socket.on("USER_CONNECT", (listOfClients) => {
      console.log(listOfClients);
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
