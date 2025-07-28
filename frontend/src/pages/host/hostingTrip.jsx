import {useOutletContext, useNavigate} from "react-router-dom"
import {useRef} from "react"

const HostingTrip = () => {
  const {handleNewTripHostings} = useOutletContext()
  const navigate = useNavigate()

  const pickupCityRef = useRef()
  const exactPickupRef = useRef()
  const dropCityRef = useRef()
  const exactDropRef = useRef()
  const fareRef = useRef()
  const dateRef = useRef() // Add ref for date

  const handleFormSubmissionValues = event => {
    event.preventDefault() // Prevent default browser POST

    const pickupCity = pickupCityRef.current.value
    const exactPickup = exactPickupRef.current.value
    const dropCity = dropCityRef.current.value
    const exactDrop = exactDropRef.current.value
    const fare = fareRef.current.value
    const date = dateRef.current.value // Get date value

    // Call parent handler to send data to backend
    handleNewTripHostings(pickupCity, exactPickup, exactDrop, dropCity, fare)

    navigate("/host/trips")
  }

  return (
    <form onSubmit={handleFormSubmissionValues} className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Host a New Trip</h2>
      <div>
        <label htmlFor="pickup-city" className="block text-sm font-medium mb-1">
          Pick-Up City
        </label>
        <select name="pickup-city" id="pickup-city" className="w-full border rounded px-3 py-2" ref={pickupCityRef}>
          <option value="shahganj">Shahganj</option>
          <option value="lucknow">Lucknow</option>
        </select>
      </div>
      <div>
        <label htmlFor="exact-pickup" className="block text-sm font-medium mb-1">
          Exact Pick-Up Location
        </label>
        <input type="text" name="exact-pickup" id="exact-pickup" placeholder="Enter exact pickup within selected city" className="w-full border rounded px-3 py-2" ref={exactPickupRef} />
      </div>
      <div>
        <label htmlFor="drop-city" className="block text-sm font-medium mb-1">
          Drop City
        </label>
        <select name="drop-city" id="drop-city" className="w-full border rounded px-3 py-2" ref={dropCityRef}>
          <option value="shahganj">Shahganj</option>
          <option value="lucknow">Lucknow</option>
        </select>
      </div>
      <div>
        <label htmlFor="exact-drop" className="block text-sm font-medium mb-1">
          Exact Drop Location
        </label>
        <input type="text" name="exact-drop" id="exact-drop" placeholder="Enter exact drop within selected city" className="w-full border rounded px-3 py-2" ref={exactDropRef} />
      </div>
      <div>
        <label htmlFor="fare" className="block text-sm font-medium mb-1">
          Fare Per Seat (One Way)
        </label>
        <input type="text" name="fare" id="fare" placeholder="Enter fare per seat for one way" className="w-full border rounded px-3 py-2" ref={fareRef} />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Date
        </label>
        <input type="date" name="date" id="date" className="w-full border rounded px-3 py-2" ref={dateRef} />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Host Your Trip
      </button>
    </form>
  )
}

export default HostingTrip
