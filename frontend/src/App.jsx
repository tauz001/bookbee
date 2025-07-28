import {useState} from "react"
import {Link, Outlet} from "react-router-dom"
import "./App.css"
import {hostTripToServer} from "./services/hostService"

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
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex gap-4">
          <Link to="/book" className="hover:text-blue-600">
            Book Trip
          </Link>
          <Link to="/trips" className="hover:text-blue-600">
            Available Trips
          </Link>
          <Link to="/host/new" className="hover:text-blue-600">
            Host Trip
          </Link>
          <Link to="/host/trips" className="hover:text-blue-600">
            Your Trips
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        <Outlet context={{handleNewTripHostings}} />
      </main>
    </div>
  )
}

export default App
