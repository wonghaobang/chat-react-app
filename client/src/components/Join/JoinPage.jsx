import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"
import "./JoinPage.css"

const Join = () => {
  const { name, setName, room, setRoom } = useContext(UserContext)
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name || !room) {
      return
    }
    console.log(name, room)
    history.push(`/room/${room}`)
  }

  return (
    <div className="join__outerContainer">
      <div className="join__innerContainer">
        <h1 className="join__heading">Join</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            required
            placeholder="Name"
            className="join__input"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            value={room}
            required
            placeholder="Room"
            className="join__input mb-1 "
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button className="join__btn mb-1">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default Join
