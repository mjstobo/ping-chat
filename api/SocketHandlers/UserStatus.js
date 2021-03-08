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

  const getClients = () => {
    let clients = io.sockets.adapter.rooms["chat"].sockets;
    console.log(clients);
    socket.emit("clients", clients);
  };

  socket.on("disconnect", userDisconnect);
  socket.on("USER_UPDATE", userUpdate);
  socket.on("GET_CLIENTS", getClients);
};
