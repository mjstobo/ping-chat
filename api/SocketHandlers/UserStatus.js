const db = require("../db/mongodb");
const User = require("../db/schemas/users");

module.exports = (io, socket) => {
  const userIsDisconnecting = async () => {
    let clients = io.sockets.adapter.rooms["chat"].sockets;
    let listOfCurrentSockets = [];
    Object.entries(clients).forEach((user) => {
      listOfCurrentSockets.push(user[0]);
    });
    removeInactiveUsersFromStore().then((response) => {
      console.log("users removed, ", response);
    });
    console.log("user leaving", socket.id);
    await User.deleteMany({ socket_id: socket.id });
    socket.to("chat").emit("USER_DISCONNECT", socket.id);
  };

  const userUpdate = async (user) => {
    console.log("received update for", user);
    const newUser = new User({
      ...user,
    });

    newUser.save((err, newUser) => {
      if (err) return console.log(err);
      console.log(newUser);
    });
    let currentUsers = await getCurrentClients();
    console.log(currentUsers);
    socket.to("chat").emit("USER_UPDATE", currentUsers);
  };

  const getCurrentClients = async () => {
    return await User.find();
  };

  const removeInactiveUsersFromStore = async (userSocketIds) => {
    return User.deleteMany({
      $or: [
        { socket_id: { $nin: userSocketIds } },
        { socket_id: { $exists: false } },
      ],
    });
  };

  socket.on("disconnecting", userIsDisconnecting);
  socket.on("USER_UPDATE", userUpdate);
};
