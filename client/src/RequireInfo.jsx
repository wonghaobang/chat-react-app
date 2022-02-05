import React, { useContext } from "react"
import { Redirect } from "react-router-dom"
import { UserContext } from "./Context/UserContext"

const RequireInfo = ({ children }) => {
  const { name, room } = useContext(UserContext)

  if (!name || !room) {
    return <Redirect to="/" />
  }

  return children
}

export default RequireInfo
