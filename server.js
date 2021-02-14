const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { emit } = require("process");
const app = express();
const server = require("http").createServer(app);
const { createUser, checkUserExists, logUserIn } = require("./api/db/User");
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

const chatHandler = require("./api/SocketHandlers/Chat");
const userStatusHandler = require("./api/SocketHandlers/UserStatus");
const { parse } = require("path");

app.use(express.static(path.join(__dirname, "/client/build")));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.post("/user", async (req, res) => {
  await createUser(req.body.username, req.body.password);
  res.status(200).send("Done");
});

app.post("/login", async (req, res) => {
  let user = await checkUserExists(req.body.username);
  let parsedUser = user.rows[0];
  let canUserLogIn = await logUserIn(parsedUser.username, req.body.password);
  console.log(canUserLogIn);

  res.status(200).send("User found");
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
