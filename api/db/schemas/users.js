const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  socket_id: String,
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
