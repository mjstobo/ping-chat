import React, { useState, useContext } from "react";
import "./Chat.scss";
import SocketContext from "../Context/SocketContext";
import { MessageHistoryContext } from "../Context/MessageHistoryContext";
import { UserContext } from "../Context/UserContext";

function ChatBar(props) {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useContext(MessageHistoryContext);
  const [user, setUser] = useContext(UserContext);

  const socket = useContext(SocketContext);

  const sendMessage = (msg) => {
    const newMessage = {
      content: msg,
      author: user.name,
      count: messages.length + 1,
    };

    socket.emit("chat message", newMessage);
    setMessages((messages) => [...messages, newMessage]);
  };

  const handleChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(messageInput);
    setMessageInput("");
  };

  return (
    <div className="chat-bar">
      <h1 className="chat-bar-heading">ping.</h1>
      <form className="chat-message">
        <input
          onChange={handleChange}
          value={messageInput}
          placeholder="Enter your message"
          className="chat-message-input"
        ></input>
        <button onClick={handleSubmit} className="chat-message-submit">
          SEND
        </button>
      </form>
      <div className="username-div">
        <h3 className="username-label">{user.hasUsername ? user.name : ""}</h3>
      </div>
    </div>
  );
}

export default ChatBar;
