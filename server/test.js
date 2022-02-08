// socket.on("typing", (typingUser) => {
//   const typingUserExists = currentlyTypingUsers.filter(
//     (v) => v.user === typingUser.user
//   )

//   if (typingUserExists.length > 0) {
//     if (typingUser.typingStatus === false) {
//       console.log("user stopped typing")
//       setCurrentlyTypingUsers((currentlyTypingUsers) =>
//         currentlyTypingUsers.filter((v) => v.user !== typingUser.user)
//       )
//     }
//   } else {
//     setCurrentlyTypingUsers((currentlyTypingUsers) => [
//       ...currentlyTypingUsers,
//       typingUser,
//     ])
//   }
// })
