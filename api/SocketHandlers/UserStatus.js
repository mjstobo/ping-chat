module.exports = (io, socket) => {
  const userDisconnect = (reason) => {
    console.log("user leaving", socket.id);
    socket.to("chat").emit("USER_DISCONNECT", [socket.id, reason]);
  };

  const userUpdate = (user) => {
    console.log("received update for", user);
    socket.username = user.name;
    socket.to("chat").emit("USER_UPDATE", [socket.id, socket.username]);
  };

  socket.on("disconnect", userDisconnect);
  socket.on("USER_UPDATE", userUpdate);
};
