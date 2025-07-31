import {useState, useEffect} from "react"

const CabBookingUi = ({selectedTripDetails, onFormDataChange}) => {
  const [selectedPickup, setSelectedPickup] = useState("")
  const [dateTime, setDateTime] = useState("")

  if (!selectedTripDetails) return <p>Loading trip details...</p>

  // Change this line - destructure kmRate instead of fare
  const {pickupCity, dropCity, exactPickup, exactDrop, kmRate} = selectedTripDetails

  useEffect(() => {
    if (!selectedPickup || !dateTime) return

    const pickupCityOrigin = exactPickup.includes(selectedPickup) ? pickupCity : dropCity

    onFormDataChange({
      pickupCity: pickupCityOrigin,
      exactPickup: selectedPickup,
      dateTime,
      hostedTripId: selectedTripDetails._id,
    })
  }, [selectedPickup, dateTime, selectedTripDetails])

  return (
    <div className="flex flex-col gap-4">
      {/* Rate Information Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Cab Reservation Pricing</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                This vehicle charges <strong>₹{kmRate || "N/A"} per km</strong>. Final fare will be calculated based on actual distance traveled.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pickup Selection */}
      <div>
        <label htmlFor="pickUp" className="block text-sm font-medium mb-1">
          Choose Pick-Up
        </label>
        <select name="pickUp" id="pickUp" value={selectedPickup} onChange={e => setSelectedPickup(e.target.value)} className="w-full border rounded px-3 py-2">
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

      {/* Date & Time */}
      <div>
        <label className="block text-sm font-medium mb-1">Date & Time</label>
        <input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} className="w-full border rounded px-3 py-2" />
      </div>
    </div>
  )
}

export default CabBookingUi