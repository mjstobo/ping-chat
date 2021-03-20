import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import ChatContainer from "./Chat/ChatContainer";
import SocialPanel from "./SocialPanel/SocialPanel";
import UtilityPanel from "./UtilityPanel/UtilityPanel";
import UserModal from "./UserModal/UserModal";
import { MessageHistoryProvider } from "./Context/MessageHistoryContext";
import { UserContext } from "./Context/UserContext";
import LoginModal from "./Login/Login";
import axios from "axios";
import SocketContext from "./Context/SocketContext";
import { ActiveClientsProvider } from "./Context/ActiveClientsContext";

function App() {
  const [user, setUser] = useContext(UserContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!user.isLoggedIn) {
      checkLoggedInState();
    }
  }, []);

  const checkLoggedInState = () => {
    try {
      axios.get("/users/me").then((response) => {
        if (response.status === 200) {
          console.log("Logged in!");
          let userObj = {
            socket_id: socket.id,
            name: response.data.user,
            isLoggedIn: true,
            hasUsername: true,
          };
          socket.emit("USER_UPDATE", userObj);
          setUser(userObj);
        } else {
          console.log("I need to log in");
          setUser(0);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {user.isLoggedIn ? (
        <div className="App">
          <SocketContext.Provider value={socket}>
            <ActiveClientsProvider>
              <MessageHistoryProvider>
                {user.hasUsername ? "" : <UserModal user={user} />}
                <SocialPanel />
                <ChatContainer />
                <UtilityPanel />
              </MessageHistoryProvider>
            </ActiveClientsProvider>
          </SocketContext.Provider>
        </div>
      ) : (
        <LoginModal />
      )}
    </React.Fragment>
  );
}

export default App;
