import React, { useState, useContext } from 'react';
import './Chat.scss';
import SocketContext from '../Context/SocketContext';
import { MessageHistoryContext } from '../Context/MessageHistoryContext';

function ChatBar(props) {

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useContext(MessageHistoryContext)
  const socket = useContext(SocketContext);

  const sendMessage = (msg) => {

    const newMessage = {
      content: msg,
      author: props.username,
      count: messages.length + 1
    }

    socket.emit('chat message', newMessage);
    setMessages(messages => [...messages, newMessage])
  }

  const handleChange = (event) => {
    setMessageInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(messageInput);
    setMessageInput('');
  }



  return (
    <div className="chat-bar">
        <h1 className="chat-bar-heading">ping</h1>
        <form className="chat-message">
        <h3 className="username-label">{props.hasUsername ? props.username : '' }</h3>
        <input onChange={handleChange} value={messageInput} placeholder="Enter your message" className="chat-message-input"></input>
        <button onClick={handleSubmit} className="chat-message-submit">SEND</button>
        </form>
    </div>
  );
}

export default ChatBar;