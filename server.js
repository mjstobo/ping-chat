const express = require("express");
const path = require("path");
const { emit } = require("process");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

io.on("connection", (socket) => {
  let currSocket = socket.id;
  socket.join("chat");
  let clients = io.sockets.adapter.rooms["chat"].sockets;
  socket.emit("clients", clients);
  socket.broadcast.emit("USER_CONNECT", clients);

  socket.on("chat message", (message) => {
    const author = message.author;
    console.log("Broadcasting ", message, author);
    socket.to("chat").emit("SERVER_MESSAGE", message);
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
    socket.to("chat").emit("USER_DISCONNECT", [socket.id, reason]);
  });
});

io.on("message", (message) => {
  console.log(message);
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
