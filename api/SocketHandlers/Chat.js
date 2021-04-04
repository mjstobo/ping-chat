module.exports = (io, socket) => {
  const chatMessage = (message) => {
    const author = message.author;
    console.log("Broadcasting ", message, author);
    socket.to("chat").emit("SERVER_MESSAGE", message);
  };

  const userTyping = (name) => {
    socket.to("chat").emit("USER_TYPING", name);
  };

  socket.on("chat message", chatMessage);
  socket.on("USER_TYPE", userTyping);
};
