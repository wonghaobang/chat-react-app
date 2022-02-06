import React, { useContext } from "react"
import ReactEmoji from "react-emoji"
import { UserContext } from "../../Context/UserContext"
import "./IndividualMessage.css"

const IndividualMessage = ({ message }) => {
  const { name } = useContext(UserContext)

  const trimmedName = name.trim().toLowerCase()

  if (trimmedName === message.user) {
    return (
      <div className="messageContainer justify-end">
        <div className="messageBubble bg-blue color-white">
          <p className="messageText">{ReactEmoji.emojify(message.text)}</p>
          <p className="messageTime color-lightblue">{message.currentTime}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="messageContainer flex-dir-col align-items-start">
        <p
          className={`messageSender ${
            message.user === "admin" ? "color-pale" : ""
          }`}
        >
          {message.user}
        </p>
        <div className="messageBubble bg-lightgrey color-black">
          <p className="messageText">{ReactEmoji.emojify(message.text)}</p>
          <p className="messageTime color-lightgrey">{message.currentTime}</p>
        </div>
      </div>
    )
  }
}

export default IndividualMessage
