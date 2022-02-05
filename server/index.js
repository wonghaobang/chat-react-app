const express = require("express")
const socketio = require("socket.io")
const http = require("http")
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
    })

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` })

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    })

    console.log(getUsersInRoom(user.room))
    callback()
  })

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit("message", { user: user.name, text: message })

    callback()
  })

  socket.on("disconnect", () => {
    console.log("disconnect fired")
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left`,
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
