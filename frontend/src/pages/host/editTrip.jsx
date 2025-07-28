import {useState} from "react"
import {useNavigate} from "react-router-dom"

const EditTrip = () => {
  const navigate = useNavigate()
  const [tripData, setTripData] = useState({
    pickupCity: "shahganj",
    exactPickup: "",
    dropCity: "lucknow",
    exactDrop: "",
    fare: "",
  })

  const handleChange = e => {
    const {name, value} = e.target
    setTripData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log("Trip Data:", tripData) // For testing
    navigate("/host/trips")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Edit Trip</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          {/* Pickup City */}
          <div>
            <label htmlFor="pickupCity" className="block text-sm font-medium mb-1">
              Pick-Up City
            </label>
            <select id="pickupCity" name="pickupCity" value={tripData.pickupCity} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="shahganj">Shahganj</option>
              <option value="lucknow">Lucknow</option>
            </select>
          </div>

          {/* Exact Pickup */}
          <div>
            <label htmlFor="exactPickup" className="block text-sm font-medium mb-1">
              Exact Pick-Up Location
            </label>
            <input type="text" id="exactPickup" name="exactPickup" value={tripData.exactPickup} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          {/* Drop City */}
          <div>
            <label htmlFor="dropCity" className="block text-sm font-medium mb-1">
              Drop City
            </label>
            <select id="dropCity" name="dropCity" value={tripData.dropCity} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="shahganj">Shahganj</option>
              <option value="lucknow">Lucknow</option>
            </select>
          </div>

          {/* Exact Drop */}
          <div>
            <label htmlFor="exactDrop" className="block text-sm font-medium mb-1">
              Exact Drop Location
            </label>
            <input type="text" id="exactDrop" name="exactDrop" value={tripData.exactDrop} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          {/* Fare */}
          <div>
            <label htmlFor="fare" className="block text-sm font-medium mb-1">
              Fare Per Seat
            </label>
            <input type="number" id="fare" name="fare" value={tripData.fare} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
          <button type="button" onClick={() => navigate("/host/trips")} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditTrip
