import {useState} from "react"

const SeatBookingUi = ({selectedTripDetails, onFormDataChange}) => {
  const [selectedPickup, setSelectedPickup] = useState("")
  const [selectedDrop, setSelectedDrop] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  if (!selectedTripDetails) return <p>Loading trip details...</p>

  const {pickupCity, dropCity, exactPickup, exactDrop} = selectedTripDetails

  const updateParent = (pickup, drop, date) => {
    // Only update if all values are filled
    if (pickup && drop && date) {
      const pickupCityOrigin = exactPickup.includes(pickup) ? pickupCity : dropCity
      const dropCityDestination = exactPickup.includes(drop) ? pickupCity : dropCity

      onFormDataChange({
        pickupCity: pickupCityOrigin,
        exactPickup: pickup,
        dropCity: dropCityDestination,
        exactDrop: drop,
        onDate: date,
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
