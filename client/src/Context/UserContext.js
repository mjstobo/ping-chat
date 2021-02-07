import React, { useState, useContext, useEffect } from "react";
import SocketContext from "./SocketContext";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(0);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
