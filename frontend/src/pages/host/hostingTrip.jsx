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
  const dateRef = useRef()
  const modelRef = useRef()
  const numberRef = useRef()
  const typeRef = useRef()
  const seatsRef = useRef()
  const seatFareRef = useRef()
  const kmRateRef = useRef()

  // ✅ Centralized Form Data Config
  const formData = {
    cities: ["Shahganj", "Lucknow"],
    models: ["Toyota Innova", "Maruti Ertiga", "Mahindra XUV"],
    types: ["SUV", "Sedan", "Hatchback"],
    seats: ["4", "5", "6", "7"],
    labels: {
      pickupCity: "Pick-Up City",
      exactPickup: "Exact Pick-Up Location",
      dropCity: "Drop City",
      exactDrop: "Exact Drop Location",
      seatFare: "Fare Per Seat (Shared Rides)", // New
      kmRate: "Rate Per KM (Cab Bookings)", // New
      date: "Trip Date",
      model: "Vehicle Model",
      number: "Vehicle Number",
      type: "Vehicle Type",
      seats: "Total Seats",
    },
    placeholders: {
      exactPickup: "Enter pickup",
      exactDrop: "Enter drop",
      seatFare: "e.g., 500", // New
      kmRate: "e.g., 15", // New
      number: "e.g., UP65 AB 1234",
    },
  }

  const handleFormSubmissionValues = event => {
    event.preventDefault()

    const pickupCity = pickupCityRef.current.value
    const exactPickup = exactPickupRef.current.value.trim().split(/\s+/)
    const dropCity = dropCityRef.current.value
    const exactDrop = exactDropRef.current.value.trim().split(/\s+/)
    const seatFare = seatFareRef.current.value // New
    const kmRate = kmRateRef.current.value // New
    const date = dateRef.current.value
    const model = modelRef.current.value
    const number = numberRef.current.value
    const type = typeRef.current.value
    const seats = seatsRef.current.value

    handleNewTripHostings(pickupCity, exactPickup, exactDrop, dropCity, seatFare, kmRate, date, model, number, type, seats)

    navigate("/host/trips")
  }

  return (
    <form onSubmit={handleFormSubmissionValues} className="mx-auto bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl lg:max-w-3xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Host a New Trip</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pickup City */}
        <div>
          <label className="block text-sm font-medium mb-1">{formData.labels.pickupCity}</label>
          <select ref={pickupCityRef} className="w-full border rounded px-3 py-2">
            {formData.cities.map(city => (
              <option key={city.toLowerCase()} value={city.toLowerCase()}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Exact Pickup */}
        <div>
          <label className="block text-sm font-medium mb-1">{formData.labels.exactPickup}</label>
          <input type="text" ref={exactPickupRef} placeholder={formData.placeholders.exactPickup} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Drop City */}
        <div>
          <label className="block text-sm font-medium mb-1">{formData.labels.dropCity}</label>
          <select ref={dropCityRef} className="w-full border rounded px-3 py-2">
            {formData.cities.map(city => (
              <option key={city.toLowerCase()} value={city.toLowerCase()}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Exact Drop */}
        <div>
          <label className="block text-sm font-medium mb-1">{formData.labels.exactDrop}</label>
          <input type="text" ref={exactDropRef} placeholder={formData.placeholders.exactDrop} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Fare */}
        {/* Seat Fare */}
        <div>
          <label className="block text-sm font-medium mb-1">{formData.labels.seatFare}</label>
          <input type="text" ref={seatFareRef} placeholder={formData.placeholders.seatFare} className="w-full border rounded px-3 py-2" />
        </div>

        {/* KM Rate */}
        <div>
          <label className="block text-sm font-medium mb-1">{formData.labels.kmRate}</label>
          <input type="text" ref={kmRateRef} placeholder={formData.placeholders.kmRate} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">{formData.labels.date}</label>
          <input type="date" ref={dateRef} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium mb-1">{formData.labels.model}</label>
          <select ref={modelRef} className="w-full border rounded px-3 py-2">
            {formData.models.map(model => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {/* Number */}
        <div>
          <label className="block text-sm font-medium mb-1">{formData.labels.number}</label>
          <input type="text" ref={numberRef} placeholder={formData.placeholders.number} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium mb-1">{formData.labels.type}</label>
          <select ref={typeRef} className="w-full border rounded px-3 py-2">
            {formData.types.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Seats */}
        <div>
          <label className="block text-sm font-medium mb-1">{formData.labels.seats}</label>
          <select ref={seatsRef} className="w-full border rounded px-3 py-2">
            {formData.seats.map(seat => (
              <option key={seat} value={seat}>
                {seat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Host Your Trip
      </button>
    </form>
  )
}

export default HostingTrip
