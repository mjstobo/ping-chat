import React, { useState } from 'react';

import './index.scss';

import ChatContainer from './Chat/ChatContainer';

import io from 'socket.io-client';
const socket = io('http://localhost:3000');

function App() {

  const [colour, setColour] = useState("#FFF000");

  const sendMessage = () => {
    console.log("message sent");
    socket.emit('message', "new message");
  }



  return (
    <div className="App">
      <header className="App-header">
      <h1 style={{color: colour}}>Hello world!</h1>
      <button onClick={() => setColour(colour === "#EEE555")}>Change colour</button>
      <button onClick={sendMessage}>Send Message</button>
      </header>
      <ChatContainer />
    </div>
  );
}

export default App;
