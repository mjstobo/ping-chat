const db = require("../db");

module.exports = (io, socket) => {
  socket.on("disconnect", userDisconnect);
};
