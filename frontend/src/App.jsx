import {useState} from "react"
import "./App.css"
import Userbooking from "./pages/user/userbooking"
import UserBookingsList from "./pages/user/userBookingsList"
import HostingTrip from "./pages/host/hostingTrip"
import {hostTripToServer} from "./services/hostService"
import TripsList from "./pages/user/tripList"

function App() {
  const [hostedTrips, setHostedTrip] = useState([])
  const handleNewTripHostings = async (pickupCity, exactPickup, exactDrop, dropCity, fare) => {
    console.log(pickupCity, exactPickup, exactDrop, dropCity, fare)
    const item = await hostTripToServer(pickupCity, exactPickup, exactDrop, dropCity, fare)
    const newHostedTrips = [...hostedTrips, item] // Remove unnecessary {item} wrapper
    setHostedTrip(newHostedTrips)
  }
  return (
    <>
      <Userbooking />
      <UserBookingsList />
      <TripsList />
      <HostingTrip onNewhostings={handleNewTripHostings} />
    </>
  )
}

export default App
