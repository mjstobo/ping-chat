import React, { useContext, useEffect } from "react";
import "./Chat.scss";
import ChatBar from "./ChatBar";
import ChatMessage from "./ChatMessage";
import SocketContext from "../Context/SocketContext";
import { MessageHistoryContext } from "../Context/MessageHistoryContext";
import { UserContext, UserProvider } from "../Context/UserContext";

function ChatContainer(props) {
  const [messages, setMessages] = useContext(MessageHistoryContext);
  const [user, setUser] = useContext(UserContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
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

  useEffect(() => {
    let chatWindow = document.getElementById("chat");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });

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
      <ChatBar />
    </div>
  );
}

export default ChatContainer;
