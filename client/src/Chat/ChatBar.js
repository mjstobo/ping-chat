import React, { useState, useContext } from 'react';
import './Chat.scss';
import SocketContext from './SocketContext';
import { MessageHistoryContext } from './MessageHistoryContext';



function ChatBar() {

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useContext(MessageHistoryContext)
  const socket = useContext(SocketContext);

  const sendMessage = (msg) => {
    socket.emit('chat message', msg);

    const newMessage = {
      content: msg,
      count: messages.length + 1
    }

    console.log(newMessage);

    setMessages(messages => [...messages, newMessage])
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