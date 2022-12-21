// Global imports

// storage imports
const {
  addActiveUser,
  removeActiveUser,
  getAllUser,
  isUserEngage,
  setUserToEngage,
  setUserToUnengage,
} = require("./storage");

// Main socket Function
const socketFunctions = (socket) => {
  console.log("connection established", socket.id);
  // disconnect client a
  socket.on("disconnecting", (e) => {
    for (const item of socket.rooms) {
      removeActiveUser(item);
      console.log("disconnected emit msg");
      socket.emit("all-active-user", { user: getAllUser() });
      socket.broadcast.emit("all-active-user", { user: getAllUser() });
    }
    // console.log(e, "disconnected", socket.id)
  });

  // disconnect server part ends------

  // join-room
  socket.on("join-room", (data) => {
    socket.join(data.id);
    addActiveUser(data.id, data.name);

    // whenever a user join a room emit message to all
    socket.emit("all-active-user", { user: getAllUser() });
    socket.broadcast.emit("all-active-user", { user: getAllUser() });
  });
  // join- room ends------

  // requesting user to for a match
  socket.on("request-match", (data) => {
    // username, playername
    socket.to(data.playername).emit("pending-request", { ...data });
  });
  // requesting user to for a match ends ------------

  // on approving request
  socket.on("approve-request", (data) => {
    // username, playername
    if (!isUserEngage(data.username) && !isUserEngage(data.playername)) {
      setUserToEngage(data.username);
      setUserToEngage(data.playername);

      // whenever a user join a room emit message to all
      // socket.emit("all-active-user", { user: getAllUser() });
      socket.broadcast.emit("all-active-user", { user: getAllUser() });
      const val = Math.floor(Math.random() * 10);
      let turn = data.playername;
      if (val % 2 === 0) {
        turn = data.username;
      }
      socket.to(data.playername).emit("ack-request", { data, msg: "approved", turn:turn });
      socket.emit("ack-request", { data, msg: "approved", turn:turn });
    } else {
      socket
        .to(data.playername)
        .emit("ack-request", { data, msg: "disapproved" });
      socket
        .to(data.username)
        .emit("ack-request", { data, msg: "disapproved" });
    }
  });

  // approval over --------------

  // disapproval of request --------------
  socket.on("disapprove-request", (data) => {
    socket
      .to(data.playername)
      .emit("ack-request", { data, msg: "disapproved" });
  });
  // disapproval over --------------

  // message between users
  socket.on("user-turn-value", (data) => {
    socket.to(data.playername).emit("user-turn-value", { ...data });
  });
  // message between users over----------------

  // match over player disengage
  socket.on("match-over", (data) => {
    setUserToUnengage(data.username);
  });
  // match over player disengage over---------------

  // status from both sides---------
  socket.on('bingo-status', (data) => {
    socket.to(data.username).emit('bingo-status', data);
  })
};

module.exports = socketFunctions;
