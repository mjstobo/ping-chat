module.exports = (io, socket) => {
  const chatMessage = (message) => {
    const author = message.author;
    console.log("Broadcasting ", message, author);
    socket.to("chat").emit("SERVER_MESSAGE", message);
  };
  socket.on("chat message", chatMessage);
};
