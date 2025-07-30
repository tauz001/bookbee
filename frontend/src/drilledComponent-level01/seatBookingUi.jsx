import {useState} from "react"

const SeatBookingUi = ({selectedTripDetails}) => {
  const [selectedPickup, setSelectedPickup] = useState("")

  if (!selectedTripDetails) return <p>Loading trip details...</p>

  const {pickupCity, dropCity, exactPickup, exactDrop} = selectedTripDetails

  const handlePickup = e => {
    setSelectedPickup(e.target.value)
  }

  const isPickupFromPickupCity = exactPickup.includes(selectedPickup)
  const isPickupFromDropCity = exactDrop.includes(selectedPickup)

  return (
    <div className="flex flex-col gap-4">
      {/* Pickup Select */}
      <div>
        <label htmlFor="pickUp" className="block text-sm font-medium mb-1">
          Choose Pick-Up
        </label>
        <select name="pickUp" id="pickUp" onChange={handlePickup} className="w-full border rounded px-3 py-2">
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

      {/* Drop Select */}
      <div>
        <label htmlFor="drop" className="block text-sm font-medium mb-1">
          Choose Drop
        </label>
        <select name="drop" id="drop" className="w-full border rounded px-3 py-2">
          <option value="">-- Select Drop --</option>

          {isPickupFromPickupCity && (
            <optgroup label={dropCity}>
              {exactDrop.map((point, idx) => (
                <option key={idx} value={point}>
                  {point}
                </option>
              ))}
            </optgroup>
          )}

          {isPickupFromDropCity && (
            <optgroup label={pickupCity}>
              {exactPickup.map((point, idx) => (
                <option key={idx} value={point}>
                  {point}
                </option>
              ))}
            </optgroup>
          )}
        </select>
      </div>

      {/* Date Input */}
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input type="date" className="w-full border rounded px-3 py-2" />
      </div>
    </div>
  )
}

export default SeatBookingUi
