import React, { useState } from "react";
import "./index.scss";
import ChatContainer from "./Chat/ChatContainer";
import SocketContext from "./Chat/SocketContext";
import {MessageHistoryProvider} from "./Chat/MessageHistoryContext";
import * as io from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [colour] = useState("#FFF000");

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: colour }}>Hello world!</h1>
      </header>
      <SocketContext.Provider value={socket}>
        <MessageHistoryProvider>
          <ChatContainer />
        </MessageHistoryProvider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
