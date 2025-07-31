// import {useOutletContext, useNavigate} from "react-router-dom"
// import {useRef} from "react"

// const HostingTrip = () => {
//   const {handleNewTripHostings} = useOutletContext()
//   const navigate = useNavigate()

//   const pickupCityRef = useRef()
//   const exactPickupRef = useRef()
//   const dropCityRef = useRef()
//   const exactDropRef = useRef()
//   const fareRef = useRef()
//   const dateRef = useRef() // Add ref for date

//   const handleFormSubmissionValues = event => {
//     event.preventDefault() // Prevent default browser POST

//     const pickupCity = pickupCityRef.current.value
//     const exactPickup = exactPickupRef.current.value.trim().split(/\s+/)
//     const dropCity = dropCityRef.current.value
//     const exactDrop = exactDropRef.current.value.trim().split(/\s+/)
//     const fare = fareRef.current.value
//     const date = dateRef.current.value // Get date value

//     // Call parent handler to send data to backend
//     handleNewTripHostings(pickupCity, exactPickup, exactDrop, dropCity, fare)

//     navigate("/host/trips")
//   }

//   return (
//     <form onSubmit={handleFormSubmissionValues} className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold mb-6">Host a New Trip</h2>
//       <div>
//         <label htmlFor="pickup-city" className="block text-sm font-medium mb-1">
//           Pick-Up City
//         </label>
//         <select name="pickup-city" id="pickup-city" className="w-full border rounded px-3 py-2" ref={pickupCityRef}>
//           <option value="shahganj">Shahganj</option>
//           <option value="lucknow">Lucknow</option>
//         </select>
//       </div>
//       <div>
//         <label htmlFor="exact-pickup" className="block text-sm font-medium mb-1">
//           Exact Pick-Up Location
//         </label>
//         <input type="text" name="exact-pickup" id="exact-pickup" placeholder="Enter exact pickup within selected city" className="w-full border rounded px-3 py-2" ref={exactPickupRef} />
//       </div>
//       <div>
//         <label htmlFor="drop-city" className="block text-sm font-medium mb-1">
//           Drop City
//         </label>
//         <select name="drop-city" id="drop-city" className="w-full border rounded px-3 py-2" ref={dropCityRef}>
//           <option value="shahganj">Shahganj</option>
//           <option value="lucknow">Lucknow</option>
//         </select>
//       </div>
//       <div>
//         <label htmlFor="exact-drop" className="block text-sm font-medium mb-1">
//           Exact Drop Location
//         </label>
//         <input type="text" name="exact-drop" id="exact-drop" placeholder="Enter exact drop within selected city" className="w-full border rounded px-3 py-2" ref={exactDropRef} />
//       </div>
//       <div>
//         <label htmlFor="fare" className="block text-sm font-medium mb-1">
//           Fare Per Seat (One Way)
//         </label>
//         <input type="text" name="fare" id="fare" placeholder="Enter fare per seat for one way" className="w-full border rounded px-3 py-2" ref={fareRef} />
//       </div>
//       <div>
//         <label htmlFor="date" className="block text-sm font-medium mb-1">
//           Date
//         </label>
//         <input type="date" name="date" id="date" className="w-full border rounded px-3 py-2" ref={dateRef} />
//       </div>
//       <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
//         Host Your Trip
//       </button>
//     </form>
//   )
// }

// export default HostingTrip

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
      fare: "Fare Per Seat (One Way)",
      date: "Trip Date",
      model: "Vehicle Model",
      number: "Vehicle Number",
      type: "Vehicle Type",
      seats: "Total Seats",
    },
    placeholders: {
      exactPickup: "Enter pickup",
      exactDrop: "Enter drop",
      fare: "e.g., 500",
      number: "e.g., UP65 AB 1234",
    },
  }

  const handleFormSubmissionValues = event => {
    event.preventDefault()

    const pickupCity = pickupCityRef.current.value
    const exactPickup = exactPickupRef.current.value.trim().split(/\s+/)
    const dropCity = dropCityRef.current.value
    const exactDrop = exactDropRef.current.value.trim().split(/\s+/)
    const fare = fareRef.current.value
    const date = dateRef.current.value
    const model = modelRef.current.value
    const number = numberRef.current.value
    const type = typeRef.current.value
    const seats = seatsRef.current.value

    handleNewTripHostings(pickupCity, exactPickup, exactDrop, dropCity, fare, date, model, number, type, seats)

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
        <div>
          <label className="block text-sm font-medium mb-1">{formData.labels.fare}</label>
          <input type="text" ref={fareRef} placeholder={formData.placeholders.fare} className="w-full border rounded px-3 py-2" />
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
