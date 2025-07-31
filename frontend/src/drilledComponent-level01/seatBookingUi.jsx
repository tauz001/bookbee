import {useState} from "react"

const SeatBookingUi = ({selectedTripDetails, onFormDataChange}) => {
  const [selectedPickup, setSelectedPickup] = useState("")
  const [selectedDrop, setSelectedDrop] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  if (!selectedTripDetails) return <p>Loading trip details...</p>

  // Add seatFare to the destructuring
  const {pickupCity, dropCity, exactPickup, exactDrop, seatFare} = selectedTripDetails

  const updateParent = (pickup, drop, date) => {
    if (pickup && drop && date) {
      const pickupCityOrigin = exactPickup.includes(pickup) ? pickupCity : dropCity
      const dropCityDestination = exactPickup.includes(drop) ? pickupCity : dropCity

      onFormDataChange({
        pickupCity: pickupCityOrigin,
        exactPickup: pickup,
        dropCity: dropCityDestination,
        exactDrop: drop,
        onDate: date,
        hostedTripId: selectedTripDetails._id,
      })
    }
  }

  const handlePickup = e => {
    const val = e.target.value
    setSelectedPickup(val)
    updateParent(val, selectedDrop, selectedDate)
  }

  const handleDrop = e => {
    const val = e.target.value
    setSelectedDrop(val)
    updateParent(selectedPickup, val, selectedDate)
  }

  const handleDate = e => {
    const val = e.target.value
    setSelectedDate(val)
    updateParent(selectedPickup, selectedDrop, val)
  }

  const isPickupFromPickupCity = exactPickup.includes(selectedPickup)
  const isPickupFromDropCity = exactDrop.includes(selectedPickup)

  return (
    <div className="flex flex-col gap-4">
      {/* Fare Information Alert */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Seat Booking Pricing</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                Fixed fare: <strong>₹{seatFare || "N/A"} per seat</strong>. This is the total cost for your seat on this shared ride.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pickup */}
      <div>
        <label htmlFor="pickup" className="block text-sm font-medium mb-1">
          Choose Pick-Up
        </label>
        <select id="pickup" value={selectedPickup} onChange={handlePickup} className="w-full border rounded px-3 py-2">
          <option value="">-- Select Pick-Up --</option>
          <optgroup label={pickupCity}>
            {exactPickup.map((point, idx) => (
              <option key={idx} value={point}>
                {point}
              </option>
            ))}
          </optgroup>
          <optgroup label={dropCity}>
            {exactDrop.map((point, idx) => (
              <option key={idx} value={point}>
                {point}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Drop */}
      <div>
        <label htmlFor="drop" className="block text-sm font-medium mb-1">
          Choose Drop
        </label>
        <select id="drop" value={selectedDrop} onChange={handleDrop} disabled={!selectedPickup} className="w-full border rounded px-3 py-2 disabled:bg-gray-100">
          <option value="">-- Select Drop --</option>
          {isPickupFromPickupCity &&
            exactDrop.map((point, idx) => (
              <option key={idx} value={point}>
                {point}
              </option>
            ))}
          {isPickupFromDropCity &&
            exactPickup.map((point, idx) => (
              <option key={idx} value={point}>
                {point}
              </option>
            ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input type="date" value={selectedDate} onChange={handleDate} className="w-full border rounded px-3 py-2" />
      </div>
    </div>
  )
}

export default SeatBookingUi
