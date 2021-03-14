const mongoose = require("mongoose");
const mongoPassword = process.env.MONGOPWD;
const mongoUser = process.env.MONGOUSER;

mongoose.connect(
  `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPWD}@ledger.pkjc5.mongodb.net/pingchat?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
});

module.exports = db;
