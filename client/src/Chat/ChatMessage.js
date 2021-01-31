import React, { useState, useEffect } from "react";
import "./Chat.scss";

function ChatMessage(props) {
  const [message, setMessage] = useState(props.message);

  useEffect(() => {
    setMessage(props.message);
  }, [props.message]);

  return (
    <div className={`chat-window-content ${props.type}`}>
      <p className="chat-window-text">{message.content}</p>
      <span className="chat-window-author">{message.author}</span>
    </div>
  );
}

export default ChatMessage;
