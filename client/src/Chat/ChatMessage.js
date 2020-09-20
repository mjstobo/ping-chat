import React, { useState, useEffect } from 'react';
import './Chat.scss';

function ChatMessage(props) {

  const [message, setMessage] = useState(props.message);
  const [type] = useState(props.messageType)

  useEffect(() => {
      setMessage(props.message)
  }, [props.message])

  return (
    <div className={`chat-window-content ${type}`}>
        <p className="chat-window-text">{message.content} from {message.author}</p>
    </div>
  );
}

export default ChatMessage;