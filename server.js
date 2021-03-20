const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cookieParser = require("cookie-parser");
require("dotenv").config();
const User = require("./api/db/schemas/users");

//Env variables
const port = process.env.PORT || 4000;

//SocketIO Handlers
const chatHandler = require("./api/SocketHandlers/Chat");
const userStatusHandler = require("./api/SocketHandlers/UserStatus");
// Routes
const routes = require("./api/routes");

app.use(express.static(path.join(__dirname, "/client/build")));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/users", routes.users);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

const userConnect = async (socket) => {
  console.log("user connected", socket.id);
  socket.join("chat");
  let currentUsers = await getCurrentClients();
  console.log("emitting current users", currentUsers);
  socket.to("chat").emit("USER_CONNECT_RESPONSE", currentUsers);
};

const onConnection = (socket) => {
  userConnect(socket);
  chatHandler(io, socket);
  userStatusHandler(io, socket);
};

const getCurrentClients = async () => {
  return User.find();
};

io.on("connection", onConnection);

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
