import {useState, useEffect} from "react"

const CabBookingUi = ({selectedTripDetails, onFormDataChange}) => {
  const [selectedPickup, setSelectedPickup] = useState("")
  const [dateTime, setDateTime] = useState("")

  if (!selectedTripDetails) return <p>Loading trip details...</p>

  const {pickupCity, dropCity, exactPickup, exactDrop} = selectedTripDetails

  useEffect(() => {
    if (!selectedPickup || !dateTime) return

    const pickupCityOrigin = exactPickup.includes(selectedPickup) ? pickupCity : dropCity // fallback if pickup point is from drop city

    onFormDataChange({
      pickupCity: pickupCityOrigin,
      exactPickup: selectedPickup,
      dateTime,
    })
  }, [selectedPickup, dateTime])

  return (
    <div className="flex flex-col gap-4">
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
