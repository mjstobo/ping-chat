import React, { useState } from "react";
import "./index.scss";
import ChatContainer from "./Chat/ChatContainer";
import SocketContext from "./Context/SocketContext";
import UserModal from "./UserModal/UserModal";
import { MessageHistoryProvider } from "./Context/MessageHistoryContext";
import * as io from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [username, setUsername] = useState();
  const [hasUsername, setHasUsername] = useState(false);

  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <MessageHistoryProvider>
          {hasUsername ? (
            ""
          ) : (
            <UserModal
              setUsername={setUsername}
              username={username}
              setHasUsername={setHasUsername}
            />
          )}
          <ChatContainer username={username} hasUsername={hasUsername} />
        </MessageHistoryProvider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
