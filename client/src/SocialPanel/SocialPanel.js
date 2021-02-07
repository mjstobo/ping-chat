import React, { useState, useEffect, useContext } from "react";
import "./SocialPanel.scss";
import SocialTile from "./SocialTile";
import SocketContext from "../Context/SocketContext";

function SocialPanel() {
  const [currentUsers, setcurrentUsers] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("clients", (userList) => {
      let users = Object.entries(userList)
        .map((user) => ({
          id: user[0],
        }))
        .filter((user) => user.id !== socket.id);
      setcurrentUsers(users);
    });

    socket.on("USER_DISCONNECT", ([socketId, reason_code]) => {
      let remainingcurrentUsers = currentUsers.filter(
        (user) => user.id !== socketId
      );
      setcurrentUsers(remainingcurrentUsers);
    });

    socket.on("USER_UPDATE", ([socketId, socketName]) => {
      let updatedUsers = currentUsers.map((user) =>
        user.id === socketId ? { ...user, name: socketName } : user
      );
      setcurrentUsers(updatedUsers);
    });

    socket.on("USER_CONNECT", (userList) => {
      let users = Object.entries(userList)
        .map((user) => ({
          id: user[0],
        }))
        .filter((user) => user.id !== socket.id);
      setcurrentUsers(users);
    });
  }, [currentUsers]);

  return (
    <div className="social-bar-container">
      <h2>Online Users</h2>
      {currentUsers.map((user) => (
        <SocialTile
          key={user.id}
          name={user.name ? user.name : "Unknown"}
          id={user.id}
          status={socket.connected ? "online" : "offline"}
        />
      ))}
    </div>
  );
}

export default SocialPanel;
