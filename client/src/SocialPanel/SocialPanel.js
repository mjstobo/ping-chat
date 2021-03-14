import React, { useContext, useEffect, useState } from "react";
import "./SocialPanel.scss";
import SocialTile from "./SocialTile";
import SocketContext from "../Context/SocketContext";
import { ActiveClientsContext } from "../Context/ActiveClientsContext";

function SocialPanel() {
  const [activeUsers, setActiveUsers] = useContext(ActiveClientsContext);
  const [userTiles, setUserTiles] = useState();
  const socket = useContext(SocketContext);

  useEffect(() => {
    console.log(activeUsers);
    let currentUsers = activeUsers.map((user) => (
      <SocialTile
        key={user.id}
        name={user.name ? user.name : "Unknown"}
        id={user.id}
        status={socket.connected ? "online" : "offline"}
      />
    ));

    setUserTiles(currentUsers);
  }, [activeUsers]);

  return (
    <div className="social-bar-container">
      <h2>Online Users</h2>
      {userTiles}
    </div>
  );
}

export default SocialPanel;
