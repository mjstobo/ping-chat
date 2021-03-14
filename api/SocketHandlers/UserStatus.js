const db = require("../db/mongodb");
const User = require("../db/schemas/users");

module.exports = (io, socket) => {
  const userIsDisconnecting = async () => {
    let clients = io.sockets.adapter.rooms["chat"].sockets;
    let listOfCurrentSockets = [];
    Object.entries(clients).map((user) => {
      console.log(user);
      listOfCurrentSockets.push(user[0]);
    });
    console.log(listOfCurrentSockets);
    await User.deleteMany({ socket_id: { $nin: [...listOfCurrentSockets] } });
  };

  const userDisconnect = async (reason) => {
    console.log("user leaving", socket.id);
    await User.deleteMany({ socket_id: socket.id });
    socket.to("chat").emit("USER_DISCONNECT", [socket.id, reason]);
  };

  const userUpdate = (user) => {
    console.log("received update for", user);
    const newUser = new User({
      ...user,
      socket_id: user.id,
    });

    newUser.save((err, newUser) => {
      if (err) return console.log(err);
      console.log(newUser);
    });
    socket.to("chat").emit("USER_UPDATE", { id: socket.id, ...user });
  };

  const getClients = () => {
    let clients = io.sockets.adapter.rooms["chat"].sockets;
    console.log(clients);
    socket.emit("clients", clients);
  };

  socket.on("disconnecting", userIsDisconnecting);
  socket.on("disconnect", userDisconnect);
  socket.on("USER_UPDATE", userUpdate);
  socket.on("GET_CLIENTS", getClients);
};
