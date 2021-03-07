import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import ChatContainer from "./Chat/ChatContainer";
import SocialPanel from "./SocialPanel/SocialPanel";
import UtilityPanel from "./UtilityPanel/UtilityPanel";
import SocketContext from "./Context/SocketContext";
import UserModal from "./UserModal/UserModal";
import { MessageHistoryProvider } from "./Context/MessageHistoryContext";
import * as io from "socket.io-client";
import { UserContext, UserProvider } from "./Context/UserContext";
import LoginModal from "./Login/Login";
import axios from "axios";

const socket = io("http://localhost:3000");

function App() {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    checkLoggedInState();
  }, []);

  const checkLoggedInState = () => {
    axios.get("/users/me").then((response) => {
      if (response.status == 200) {
        if (!user.hasLoggedIn) {
          console.log("Logged in!");
          setUser({
            ...user,
            name: response.data.user,
            isLoggedIn: true,
            hasUsername: true,
          });
        }
      } else {
        console.log("I need to log in");
        setUser({
          ...user,
          isLoggedIn: false,
          hasUsername: false,
        });
      }
    });
  };

  return (
    <React.Fragment>
      {user.isLoggedIn ? (
        <div className="App">
          <SocketContext.Provider value={socket}>
            <MessageHistoryProvider>
              {user.hasUsername ? "" : <UserModal user={user} />}
              <SocialPanel />
              <ChatContainer />
              <UtilityPanel />
            </MessageHistoryProvider>
          </SocketContext.Provider>
        </div>
      ) : (
        <LoginModal />
      )}
    </React.Fragment>
  );
}

export default App;
