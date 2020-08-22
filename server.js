const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log(message);
  });
});

io.on("message", (message) => {
  console.log(message);
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
