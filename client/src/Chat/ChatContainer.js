import React, { useContext, useEffect, useState } from "react";
import "./Chat.scss";
import ChatBar from "./ChatBar";
import ChatMessage from "./ChatMessage";
import SocketContext from "../Context/SocketContext";
import { MessageHistoryContext } from "../Context/MessageHistoryContext";
import { UserContext } from "../Context/UserContext";

function ChatContainer() {
  const [messages, setMessages] = useContext(MessageHistoryContext);
  const [user, setUser] = useContext(UserContext);
  const [usersTyping, setUsersTyping] = useState("");
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

    return () => {
      socket.off("SERVER_MESSAGE");
    };
  }, [messages]);

  useEffect(() => {
    socket.on("USER_TYPING", (name) => {
      if (name !== user.name) {
        setUsersTyping(name);
        setInterval(() => {
          setUsersTyping("");
        }, 5000);
      }
    });

    return () => {
      socket.off("USER_TYPING");
    };
  });

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
      <div className="chat-currently-typing">
        {usersTyping ? `${usersTyping} is typing...` : ""}
      </div>
      <ChatBar />
    </div>
  );
}

export default ChatContainer;
