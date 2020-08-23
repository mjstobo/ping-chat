import React, { useState, useEffect } from 'react';
import './Chat.scss';

function ChatMessage(props) {

  const [message, setMessage] = useState(props.message);
  const [type, setType] = useState(props.messageType)

  useEffect(() => {
      setMessage(props.message)
  }, [props.message])

  return (
    <div className={`chat-window-content ${type}`}>
        <p className="chat-window-text">{message}</p>
    </div>
  );
}

export default ChatMessage;