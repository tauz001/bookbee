import {useState} from "react"

const SeatBookingUi = () => {
  const [pickupGroup, setPickupGroup] = useState("")

  const handlePickup = event => {
    const value = event.target.value
    if (value === "jci-circle" || value === "bhelara") {
      setPickupGroup("Shahganj")
    } else if (value === "ahmamau" || value === "gomti-nagar") {
      setPickupGroup("Lucknow")
    } else {
      setPickupGroup("")
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="pickUp" className="block text-sm font-medium mb-1">
          Choose Pick-Up
        </label>
        <select name="pickUp" id="pickUp" onChange={handlePickup} className="w-full border rounded px-3 py-2">
          <optgroup label="Shahganj">
            <option value="jci-circle">JCI Circle</option>
            <option value="bhelara">Bhelara</option>
          </optgroup>
          <optgroup label="Lucknow">
            <option value="ahmamau">Ahmamau</option>
            <option value="gomti-nagar">Gomti-nagar</option>
          </optgroup>
        </select>
      </div>
      <div>
        <label htmlFor="drop" className="block text-sm font-medium mb-1">
          Choose Drop
        </label>
        <select name="drop" id="drop" className="w-full border rounded px-3 py-2">
          <optgroup label="Shahganj" disabled={pickupGroup === "Shahganj"}>
            <option value="jci-circle">JCI Circle</option>
            <option value="bhelara">Bhelara</option>
          </optgroup>
          <optgroup label="Lucknow" disabled={pickupGroup === "Lucknow"}>
            <option value="ahmamau">Ahmamau</option>
            <option value="gomti-nagar">Gomti-nagar</option>
          </optgroup>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input type="date" className="w-full border rounded px-3 py-2" />
      </div>
    </div>
  )
}

export default SeatBookingUi
