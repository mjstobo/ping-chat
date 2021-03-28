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
  }, []);

  useEffect(() => {
    if (!usersRetrieved || user.isLoggedIn) {
      socket.on("USER_CONNECT_RESPONSE", (userList) => {
        let uniqueActiveUsers = filterUsers(userList);
        setActiveUsers(uniqueActiveUsers);
      });
      setUsersRetrieved(true);
    }

    return () => {
      socket.off("USER_CONNECT_RESPONSE");
    };
  });

  useEffect(() => {
    if (usersRetrieved) {
      let filteredUsers = filterUsers(activeUsers);
      let currentUsers = filteredUsers.map((userRecord) => (
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

  const filterUsers = (userList) => {
    let uniqueUsers = [...new Set(userList.map((user) => user.name))];
    let uniqueActiveUsers = [];

    userList.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    uniqueUsers.forEach((user) => {
      let newUser = userList.find((el) => el.name === user);
      uniqueActiveUsers.push(newUser);
    });

    return uniqueActiveUsers;
  };

  return (
    <div className="social-bar-container">
      <h2>Online Users</h2>
      {userTiles}
    </div>
  );
};

export default SocialPanel;
