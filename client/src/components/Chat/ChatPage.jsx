import React, { useContext, useEffect, useState } from "react"
import "./ChatPage.css"
import io from "socket.io-client"
import { UserContext } from "../../Context/UserContext"
import { useHistory } from "react-router-dom"
import ScrollToBottom from "react-scroll-to-bottom"
import IndividualMessage from "../IndividualMessage/IndividualMessage"

let socket

const Chat = () => {
  const { name, setName, room, setRoom } = useContext(UserContext)
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [isCurrentlyTyping, setIsCurrentlyTyping] = useState(false)
  const ENDPOINT = "localhost:5000"
  const history = useHistory()

  useEffect(() => {
    console.log("ChatPage mounted")
    socket = io(ENDPOINT)

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        setName("")
        setRoom("")
        history.push("/")
        alert(error)
      }
    })

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message])
    })

    socket.on("roomData", ({ users }) => {
      setUsers(users)
    })

    socket.on("typing", ({ typingStatus }) => {
      setIsCurrentlyTyping(typingStatus)
    })

    return () => {
      console.log("unmounting chatPage component")
      socket.disconnect()
      setName("")
      setRoom("")
      setMessages([])
      setMessage("")
    }
  }, [])

  const handleTyping = (e) => {
    setMessage(e.target.value)
    socket.emit("typing", e.target.value)
  }

  const handleMessageSubmit = (e) => {
    e.preventDefault()
    if (!message) return
    socket.emit("sendMessage", message, () => {
      setMessage("")
    })
    socket.emit("typing", "") // kind of like a workaround, any better way?
  }

  const handleLeaveRoom = (e) => {
    history.push("/")
  }

  console.log(messages)

  return (
    <div className="container">
      <div className="chat__outercontainer">
        <main className="chatbox__section">
          {/* infobar */}
          <div className="chatbox__infobar">
            <span>
              <i className="fas fa-circle"></i>
              <h2 className="chatbox__infobar__roomName">{room}</h2>
            </span>
            <i className="fas fa-times" onClick={handleLeaveRoom}></i>
          </div>

          <ScrollToBottom className="messages">
            {messages.map((value, index) => (
              <IndividualMessage key={index} message={value} />
            ))}
          </ScrollToBottom>

          {isCurrentlyTyping ? (
            <p className="currentlyTypingMessage">
              User is typing a message...
            </p>
          ) : (
            ""
          )}

          {/* form */}
          <form onSubmit={handleMessageSubmit} className="chatbox__form">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={handleTyping}
              className="chatbox__input"
            />
            <button className="sendButton" type="submit">
              Send
            </button>
          </form>
        </main>

        {/* list users in chat */}
        <aside className="users__section">
          <h1 className="users__heading">
            Use Emoticons such as {"<"}3 for ❤️, =) for 😁, :=( for 😭
          </h1>
          <h1 className="users__heading mb-0">People currently chatting:</h1>
          <ul className="users__list">
            {users.map((u, index) => (
              <li key={index} className="users__item">
                {u.name}
                <i className="fas fa-circle ml-1"></i>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default Chat
