const express = require("express");
const path = require("path");
const { emit } = require("process");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

const chatHandler = require("./api/Handlers/Chat");
const userStatusHandler = require("./api/Handlers/UserStatus");

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

const userConnect = (socket) => {
  console.log("user connected", socket.id);
  socket.join("chat");
  let clients = io.sockets.adapter.rooms["chat"].sockets;
  socket.emit("clients", clients);
  socket.broadcast.emit("USER_CONNECT", clients);
};

const onConnection = (socket) => {
  userConnect(socket);
  chatHandler(io, socket);
  userStatusHandler(io, socket);
};

io.on("connection", onConnection);

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
