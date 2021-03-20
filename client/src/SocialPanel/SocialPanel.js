import React, { useContext, useEffect, useState } from "react";
import "./SocialPanel.scss";
import SocialTile from "./SocialTile";
import { ActiveClientsContext } from "../Context/ActiveClientsContext";
import SocketContext from "../Context/SocketContext";

const SocialPanel = () => {
  const [activeUsers, setActiveUsers] = useContext(ActiveClientsContext);
  const [usersRetrieved, setUsersRetrieved] = useState(false);
  const [userTiles, setUserTiles] = useState();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("USER_CONNECT");
    if (!usersRetrieved) {
      socket.emit("USER_CONNECT");
      socket.on("USER_CONNECT_RESPONSE", (userList) => {
        console.log("retrieved users from user connect, ", userList);
        setActiveUsers(userList);
      });
      setUsersRetrieved(true);
    }

    return () => {
      socket.off("USER_CONNECT_RESPONSE");
    };
  }, []);

  useEffect(() => {
    if (usersRetrieved) {
      let currentUsers = activeUsers.map((user) => (
        <SocialTile
          key={user._id}
          name={user.name ? user.name : "Unknown"}
          id={user.socket_id}
          status={socket.connect ? "online" : "offline"}
        />
      ));

      setUserTiles(currentUsers);
    }
  }, [activeUsers]);

  return (
    <div className="social-bar-container">
      <h2>Online Users</h2>
      {userTiles}
    </div>
  );
};

export default SocialPanel;
