const CabBookingUi = ({selectedTripDetails}) => {
  console.log("props data", selectedTripDetails)

  if (!selectedTripDetails) return <p>Loading trip details...</p>

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="pickUp" className="block text-sm font-medium mb-1">
          Choose Pick-Up
        </label>
        <select name="pickUp" id="pickUp" className="w-full border rounded px-3 py-2">
          <optgroup label={selectedTripDetails.pickupCity}>
            <option value={selectedTripDetails.exactPickup}>{selectedTripDetails.exactPickup}</option>
          </optgroup>
          <optgroup label={selectedTripDetails.dropCity}>
            <option value={selectedTripDetails.exactDrop}>{selectedTripDetails.exactDrop}</option>
          </optgroup>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date & Time</label>
        <input type="datetime-local" className="w-full border rounded px-3 py-2" />
      </div>
    </div>
  )
}

export default CabBookingUi
