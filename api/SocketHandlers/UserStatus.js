const db = require("../db/mongodb");
const User = require("../db/schemas/users");

module.exports = (io, socket) => {
  const userIsDisconnecting = async () => {
    console.log("user leaving", socket.id);
    await User.deleteMany({ socket_id: socket.id }).then((response) => {
      console.log(response);
    });
    removeInactiveUsersFromStore().then(async () => {
      let currentUsers = await getCurrentClients();
      console.log("users after disconnecting a user, ", currentUsers);
      console.log("end current users");
      socket.to("chat").emit("USER_DISCONNECT", [socket.id, currentUsers]);
    });
  };

  const userUpdate = async (user) => {
    console.log("received update for", user);
    await saveUser(user);
    let currentUsers = await getCurrentClients();
    console.log("users after updating another user, ", currentUsers);
    console.log("end current users");
    socket.to("chat").emit("USER_UPDATE_RESPONSE", currentUsers);
  };

  const getCurrentClients = async () => {
    try {
      return User.find();
    } catch (e) {
      return e;
    }
  };

  const removeInactiveUsersFromStore = async (userSocketIds) => {
    return User.deleteMany({
      $or: [{ socket_id: { $nin: userSocketIds } }],
    });
  };

  const saveUser = async (user) => {
    const newUser = new User({
      ...user,
    });

    try {
      return newUser.save((err, newUser) => {
        if (err) return console.log(err);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const userConnect = async () => {
    let currentUsers = await getCurrentClients();
    console.log("users after connecting a user, ", currentUsers);
    console.log("end current users");
    io.in("chat").emit("USER_CONNECT_RESPONSE", currentUsers);
  };

  socket.on("disconnecting", userIsDisconnecting);
  socket.on("USER_UPDATE", userUpdate);
  socket.on("USER_CONNECT", userConnect);
};
