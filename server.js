const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const session = require("express-session");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require("uuid");
//Env variables
const port = process.env.PORT || 3000;
//SocketIO Handlers
const chatHandler = require("./api/SocketHandlers/Chat");
const userStatusHandler = require("./api/SocketHandlers/UserStatus");
// Routes
const routes = require("./api/routes");

app.use(express.static(path.join(__dirname, "/client/build")));
app.use(bodyParser.json());
app.use(
  session({
    genid: (req) => {
      return uuidv4(); // use UUIDs for session IDs
    },
    secret: "hsfd543hsfh",
    resave: false,
    saveUninitialized: true,
    userLoggedIn: false,
    name: "pingchat",
  })
);
app.use("/users", routes.users);

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
