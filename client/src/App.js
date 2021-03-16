import React, { useContext, useEffect } from "react";
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

function App() {
  const [user, setUser] = useContext(UserContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    checkLoggedInState();
  }, []);

  const checkLoggedInState = () => {
    try {
      axios.get("/users/me").then((response) => {
        if (response.status === 200) {
          if (!user.hasLoggedIn) {
            console.log("Logged in!");
            let userObj = {
              ...user,
              socket_id: socket.id,
              name: response.data.user,
              isLoggedIn: true,
              hasUsername: true,
            };
            socket.emit("USER_UPDATE", userObj);
            setUser(userObj);
          }
        } else {
          console.log("I need to log in");
          setUser({
            ...user,
            socket_id: socket.id,
            isLoggedIn: false,
            hasUsername: false,
          });
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
          <MessageHistoryProvider>
            {user.hasUsername ? "" : <UserModal user={user} />}
            <SocialPanel />
            <ChatContainer />
            <UtilityPanel />
          </MessageHistoryProvider>
        </div>
      ) : (
        <LoginModal />
      )}
    </React.Fragment>
  );
}

export default App;
