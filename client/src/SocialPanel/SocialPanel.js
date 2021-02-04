import React, { useState, useEffect, useContext } from "react";
import "./SocialPanel.scss";
import SocialTile from "./SocialTile";
import SocketContext from "../Context/SocketContext";

function SocialPanel(props) {
  const [users, setUsers] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("clients", (userList) => {
      setUsers(Object.keys(userList));
    });

    socket.on("USER_DISCONNECT", ([socketId, reason_code]) => {
      let remainingUsers = users.filter((user) => user.id !== socketId);
      setUsers([remainingUsers]);
    });

    socket.on("USER_CONNECT", (userList) => {
      setUsers(Object.keys(userList));
    });
  }, []);

  return (
    <div className="social-bar-container">
      <h2>Online Users</h2>
      {users.map((user) => (
        <SocialTile
          name={user.name ? user.name : "User"}
          id={user.id}
          status={socket.connected ? "online" : "offline"}
        />
      ))}
    </div>
  );
}

export default SocialPanel;
