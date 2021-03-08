import React, { useContext } from "react";
import "./SocialPanel.scss";
import SocialTile from "./SocialTile";
import SocketContext from "../Context/SocketContext";
import { ActiveClientsContext } from "../Context/ActiveClientsContext";

function SocialPanel() {
  const [activeUsers] = useContext(ActiveClientsContext);
  const socket = useContext(SocketContext);
  return (
    <div className="social-bar-container">
      <h2>Online Users</h2>
      {activeUsers.map((user) => (
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
