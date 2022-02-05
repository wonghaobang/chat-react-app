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
          <p>{ReactEmoji.emojify(message.text)}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="messageContainer justify-start">
        <div className="messageBubble bg-lightgrey color-black">
          <p
            className={message.user === "admin" ? "color-purple" : "color-pale"}
          >
            {message.user}
          </p>
          <p>{ReactEmoji.emojify(message.text)}</p>
        </div>
      </div>
    )
  }
}

export default IndividualMessage
