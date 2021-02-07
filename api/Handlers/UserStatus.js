module.exports = (io, socket) => {
  const userDisconnect = (reason) => {
    socket.to("chat").emit("USER_DISCONNECT", [socket.id, reason]);
  };
  socket.on("disconnect", userDisconnect);
};
