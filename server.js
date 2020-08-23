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
  console.log("user has connected", socket.id)
  socket.on("chat message", (message) => {
    console.log("Broadcasting ", message)
    socket.broadcast.emit("SERVER_MESSAGE", message);
  });
});

io.on("message", (message) => {
  console.log(message);
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
