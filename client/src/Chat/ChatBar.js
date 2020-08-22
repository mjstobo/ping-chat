import React, { useState } from 'react';
import './Chat.scss';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

function ChatBar() {

  const [colour, setColour] = useState("#FFF000");

  const sendMessage = () => {
    console.log("message sent");
    socket.emit('message', "new message");
  }



  return (
    <div className="chat-bar">
        <h1>Chat bar!</h1>
    </div>
  );
}

export default ChatBar;