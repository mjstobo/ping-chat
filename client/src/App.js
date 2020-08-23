import React, { useState } from "react";
import "./index.scss";
import ChatContainer from "./Chat/ChatContainer";
import SocketContext from "./Chat/Socket";
import * as io from 'socket.io-client'

const socket = io("http://localhost:3000");

function App() {
  const [colour] = useState("#FFF000");

  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <header className="App-header">
          <h1 style={{ color: colour }}>Hello world!</h1>
        </header>
          <ChatContainer />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
