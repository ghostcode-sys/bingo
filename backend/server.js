// imported files global
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// database connection to server
require("./database/db");

// imported file local
const user = require("./routes/user");
const socketFunctions = require('./sockets')

dotenv.config();
const app = express();

// cors problem resolve
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(express.json());

// socket code
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// socket work
io.on("connection", socketFunctions);

// Port id
const port = process.env.PORT || 8080;

// server code
app.use("/user", user);

// render files
server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
