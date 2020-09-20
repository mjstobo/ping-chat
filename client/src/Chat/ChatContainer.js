import React, { useContext, useEffect } from 'react';
import './Chat.scss';
import ChatBar from  './ChatBar';
import ChatMessage from './ChatMessage';
import SocketContext from '../Context/SocketContext';
import { MessageHistoryContext }  from '../Context/MessageHistoryContext';


function ChatContainer(props) {
  const [messages, setMessages] = useContext(MessageHistoryContext)
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("SERVER_MESSAGE", message => {
      console.log("new message");
      console.log(message)
      const receivedMessage = {
        content: message.content,
        count: messages.length + 1
      }
      console.log("author", message.author)
      setMessages(messages => [...messages, receivedMessage]);
    })
  }, [])

  return (
    <div className="chat-container">
        <div className="chat-window">
          {messages.map(message => {
            return  <ChatMessage key={message.content + message.count} type={""} message={message} />
          })}
        </div>
        <ChatBar hasUsername={props.hasUsername} username={props.username}/>
    </div>
  );
}

export default ChatContainer;