const io = require("socket.io")
module.exports = function(server) {
  io(server).on("connection", (socket) => {
    console.log("a user connected")

    socket.on("newUser", (username) => {
      console.log(`${username} has joined the party.`)
    })

    socket.on("disconnect", () => {
      console.log("user disconnected")
    })
  })
}
