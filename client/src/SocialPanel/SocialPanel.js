import React, { useContext, useEffect, useState } from "react";
import "./SocialPanel.scss";
import SocialTile from "./SocialTile";
import { ActiveClientsContext } from "../Context/ActiveClientsContext";
import SocketContext from "../Context/SocketContext";
import { UserContext } from "../Context/UserContext";

const SocialPanel = () => {
  const [activeUsers, setActiveUsers] = useContext(ActiveClientsContext);
  const [user, setUser] = useContext(UserContext);
  const [usersRetrieved, setUsersRetrieved] = useState(false);
  const [userTiles, setUserTiles] = useState();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("USER_CONNECT");
    if (!usersRetrieved) {
      socket.on("USER_CONNECT_RESPONSE", (userList) => {
        let uniqueUsers = [...new Set(userList.map((user) => user.name))];
        let uniqueActiveUsers = [];

        userList.forEach((el) => {
          console.log(el);
          if (uniqueUsers.includes(el.name)) {
            uniqueUsers.splice(uniqueUsers.indexOf(el), 1);
            uniqueActiveUsers.push(el);
          }
        });

        setActiveUsers(uniqueActiveUsers);
      });
      setUsersRetrieved(true);
    }

    return () => {
      socket.off("USER_CONNECT_RESPONSE");
    };
  }, []);

  useEffect(() => {
    if (usersRetrieved) {
      let currentUsers = activeUsers.map((userRecord) => (
        <SocialTile
          key={userRecord._id}
          name={
            userRecord.name === user.name
              ? `${userRecord.name} (you)`
              : userRecord.name
          }
          id={userRecord.socket_id}
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
