import {useState} from "react"
import "./App.css"
import Userbooking from "./components/user/userbooking"
import UserBookingsList from "./components/user/userBookingsList"

function App() {
  return (
    <>
      <Userbooking />
      <UserBookingsList/>
    </>
  )
}

export default App
