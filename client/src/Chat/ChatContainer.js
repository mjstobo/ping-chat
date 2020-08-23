import React, { useContext, useEffect, useState } from 'react';
import './Chat.scss';
import ChatBar from  './ChatBar';
import ChatMessage from './ChatMessage';
import SocketContext from './SocketContext';
import { MessageHistoryContext }  from './MessageHistoryContext';


function ChatContainer() {
  const [messages, setMessages] = useContext(MessageHistoryContext)
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("SERVER_MESSAGE", message => {
      console.log("new message");
      const newMessage = {
        content: message,
        count: messages.length + 1
      }
      setMessages(messages => [...messages, newMessage]);
    })
  }, [])



   
  return (
    <div className="chat-container">
        <h1>Chat Container!</h1>
        <div className="chat-window">
          {messages.map(message => {
            return  <ChatMessage key={message.content + message.count} type={""} message={message.content} />
          })}
        </div>
        <ChatBar />
    </div>
  );
}

export default ChatContainer;