import React, { useContext, useState } from "react";
import "./index.scss";
import ChatContainer from "./Chat/ChatContainer";
import SocialPanel from "./SocialPanel/SocialPanel";
import UtilityPanel from "./UtilityPanel/UtilityPanel";
import SocketContext from "./Context/SocketContext";
import UserModal from "./UserModal/UserModal";
import { MessageHistoryProvider } from "./Context/MessageHistoryContext";
import * as io from "socket.io-client";
import { UserContext, UserProvider } from "./Context/UserContext";

const socket = io("http://localhost:3000");

function App() {
  const [user, setUser] = useContext(UserContext);
  return (
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
  );
}

export default App;
