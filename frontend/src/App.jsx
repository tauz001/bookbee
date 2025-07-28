import {useState} from "react"
import "./App.css"
import Userbooking from "./components/user/userbooking"
import UserBookingsList from "./components/user/userBookingsList"
import HostingTrip from "./components/host/hostingTrip"
import {hostTripToServer} from "./services/hostService"

function App() {
  const [hostedTrips, setHostedTrip] = useState([])
  const handleNewTripHostings = async (pickupCity, exactPickup, exactDrop, dropCity, fare) => {
    console.log(pickupCity, exactPickup, exactDrop, dropCity, fare)
    const item = await hostTripToServer(pickupCity, exactPickup, exactDrop, dropCity, fare)
    const newHostedTrips = [...hostedTrips, item] // Remove unnecessary {item} wrapper
    setHostedTrip(newHostedTrips)
  }

  // const handleNewItem = async (itemName, itemDueDate) => {
  //   console.log(`New Item Added: ${itemName} Date:${itemDueDate}`)
  //   const item = await addItemToServer(itemName, itemDueDate)
  //   // Add completed property
  //   const newItem = {...item, completed: false}
  //   const newTodoItems = [...todoItems, newItem]
  //   setTodoItems(newTodoItems)
  // }
  return (
    <>
      <Userbooking />
      <UserBookingsList />
      <HostingTrip onNewhostings={handleNewTripHostings} />
    </>
  )
}

export default App
