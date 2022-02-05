import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import JoinPage from "./components/Join/JoinPage"
import ChatPage from "./components/Chat/ChatPage"
import "./App.css"
import UserContextProvider from "./Context/UserContext"
import RequireInfo from "./RequireInfo"

const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Route path="/" exact>
          <JoinPage />
        </Route>

        <Route path="/room/:roomName">
          <RequireInfo>
            <ChatPage />
          </RequireInfo>
        </Route>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
