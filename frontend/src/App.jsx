import {useState} from "react"
import {Link, Outlet} from "react-router-dom"
import "./App.css"
import {hostTripToServer} from "./services/hostService"
import Navbar from "./components/navbar"

function App() {
  const [hostedTrips, setHostedTrip] = useState([])

  const handleNewTripHostings = async (pickupCity, exactPickup, exactDrop, dropCity, fare) => {
    try {
      const item = await hostTripToServer(pickupCity, exactPickup, exactDrop, dropCity, fare)
      setHostedTrip([...hostedTrips, item])
    } catch (error) {
      console.error("Error hosting trip:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />
      {/* Main Content */}
      <main className="container mx-auto py-8">
        <Outlet context={{handleNewTripHostings}} />
      </main>
    </div>
  )
}

export default App

// some changes and mostly mess --will have to clean code and fix tons of wirings and bugs
