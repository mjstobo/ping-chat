import React, { useContext, useEffect } from "react";
import "./Chat.scss";
import ChatBar from "./ChatBar";
import ChatMessage from "./ChatMessage";
import SocketContext from "../Context/SocketContext";
import { MessageHistoryContext } from "../Context/MessageHistoryContext";

function ChatContainer(props) {
  const [messages, setMessages] = useContext(MessageHistoryContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    console.log(messages);
    socket.on("SERVER_MESSAGE", (message) => {
      const receivedMessage = {
        content: message.content,
        author: message.author,
        count: messages.length + 1,
        type: "server",
      };
      setMessages((messages) => [...messages, receivedMessage]);
    });
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-window" id="chat">
        {messages.map((message) => {
          return (
            <ChatMessage
              key={message.content + message.count}
              type={message.type ? "server" : ""}
              message={message}
            />
          );
        })}
      </div>
      <ChatBar hasUsername={props.hasUsername} username={props.username} />
    </div>
  );
}

export default ChatContainer;
