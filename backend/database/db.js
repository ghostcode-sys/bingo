const mongoose  = require('mongoose')

mongoose.connect('mongodb://0.0.0.0:27017/bingodb');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Database Connected successfully");
});
// here we change in comment
