const User = require("../db/schemas/users");
const db = require("../db/mongodb");

module.exports = (io, socket) => {
  const userIsDisconnecting = async () => {
    removeInactiveUsersFromStore();
    await User.deleteMany({ socket_id: socket.id });
    socket.to("chat").emit("USER_DISCONNECT", socket.id);
  };

  const userUpdate = async (user) => {
    await saveUser(user);
    let currentUsers = await getCurrentClients();
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
    let listOfUsersFound = await User.find({
      $or: [{ socket_id: { $nin: userSocketIds } }],
    });

    let uniqueIdsToBeRemoved = [
      ...new Set(listOfUsersFound.map((user) => user.name)),
    ];

    console.log(uniqueIdsToBeRemoved);

    let deleteResult = await User.deleteMany({
      $or: [
        { socket_id: { $nin: userSocketIds } },
        { name: { $in: uniqueIdsToBeRemoved } },
      ],
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
    io.in("chat").emit("USER_CONNECT_RESPONSE", currentUsers);
  };

  socket.on("disconnecting", userIsDisconnecting);
  socket.on("USER_UPDATE", userUpdate);
  socket.on("USER_CONNECT", userConnect);
};
