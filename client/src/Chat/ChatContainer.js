import React, { useState } from 'react';
import './Chat.scss';
import ChatBar from  './ChatBar';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

function ChatContainer() {

  const [colour, setColour] = useState("#FFF000");

  const sendMessage = () => {
    console.log("message sent");
    socket.emit('message', "new message");
  }



  return (
    <div className="chat-container">
        <h1>Chat Container!</h1>
        <ChatBar />
    </div>
  );
}

export default ChatContainer;