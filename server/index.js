const express = require("express")
const socketio = require("socket.io")
const http = require("http")
const moment = require("moment")
const cors = require("cors")
const PORT = process.env.PORT || 5000
const router = require("./router")
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users")

const app = express()
// app.use(cors())
app.use(
  cors({
    origin: "*",
  })
)
const server = http.createServer(app)
const io = socketio(server)

app.use(router)

// sockets
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.join(user.room)
    console.log("new user joined!")

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
      currentTime: moment().format("LT"),
    })

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name}, has joined!`,
      currentTime: moment().format("LT"),
    })

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    })

    console.log(getUsersInRoom(user.room))
    callback()
  })

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      currentTime: moment().format("LT"),
    })

    callback()
  })

  // doesn't work perfectly in group chat, need to think of another way
  socket.on("typing", (message) => {
    const user = getUser(socket.id)
    socket.broadcast.to(user.room).emit("typing", {
      typingStatus: message.length !== 0,
    })
  })

  socket.on("disconnect", () => {
    console.log("disconnect fired")
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
        currentTime: moment().format("LT"),
      })
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      })
    }

    try {
      console.log(getUsersInRoom(user.room))
    } catch (error) {
      console.log("something went wrong") // this will run when last user exists room, for my own debugging purpose only
    }
  })
})

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
