const currentlyTypingUsers = []

const addCurrentlyTypingUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()

  const existingUser = currentlyTypingUsers.find(
    (ctu) => ctu.id === id && ctu.name === name && ctu.room === room
  )

  if (!existingUser) {
    const currentlyTypingUser = { id, name, room }
    currentlyTypingUsers.push(currentlyTypingUser)
  }

  return currentlyTypingUsers.filter((ctu) => ctu.room === room)
}

const removeCurrentlyTypingUser = ({ id, name, room }) => {
  const index = currentlyTypingUsers.findIndex(
    (ctu) => ctu.id === id && ctu.name === name && ctu.room === room
  )
  if (index !== -1) {
    currentlyTypingUsers.splice(index, 1)
  }
  return currentlyTypingUsers.filter((ctu) => ctu.room === room)
}

module.exports = { addCurrentlyTypingUser, removeCurrentlyTypingUser }
