import React, { useState, useContext, useEffect } from 'react';
import './Chat.scss';
import ChatBar from  './ChatBar';
import SocketContext from './Socket';


function ChatContainer() {
  const [messageHistory, setMessageHistory] = useState("");
  const socket = useContext(SocketContext);

    socket.on("SERVER_MESSAGE", message => {
      console.log(socket.id);
      setMessageHistory(message);
    })

   
  return (
    <div className="chat-container">
        <h1>Chat Container!</h1>
        <div className="chat-window">
          <p>{messageHistory}</p>
        </div>
        <ChatBar />
    </div>
  );
}

export default ChatContainer;