import React, { useState, useContext } from 'react';
import './Chat.scss';
import SocketContext from './Socket';



function ChatBar() {

  const [messageInput, setMessageInput] = useState("");
  const socket = useContext(SocketContext);

  const sendMessage = (msg) => {
    console.log(socket.id);
    console.log(msg);
    socket.emit('chat message', msg);
  }

  const handleChange = (event) => {
    setMessageInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(messageInput);
  }



  return (
    <div className="chat-bar">
        <h1 className="chat-bar-heading">ping</h1>
        <form className="chat-message">
        <textarea onChange={handleChange}  className="chat-message-input"></textarea>
        <button onClick={handleSubmit} className="chat-message-submit">SEND</button>
        </form>
    </div>
  );
}

export default ChatBar;