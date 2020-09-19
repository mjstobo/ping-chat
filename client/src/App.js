import React, { useState } from "react";
import "./index.scss";
import ChatContainer from "./Chat/ChatContainer";
import SocketContext from "./Context/SocketContext";
import UserModal from "./UserModal/UserModal";
import {MessageHistoryProvider} from "./Context/MessageHistoryContext";
import * as io from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [colour] = useState("#FFF000");
  const [username, setUsername] = useState();
  const [hasUsername, setHasUsername] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: colour }}>Hello world!</h1>
      </header>
      <SocketContext.Provider value={socket}>
        <MessageHistoryProvider>
          { hasUsername ? <ChatContainer /> : <UserModal setUsername={setUsername} username={username} setHasUsername={setHasUsername} /> }
          <ChatContainer username={username} hasUsername={hasUsername} />
        </MessageHistoryProvider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
