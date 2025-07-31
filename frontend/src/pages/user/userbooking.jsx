import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import CabBookingUi from "../../drilledComponent-level01/cabBookingUi"
import SeatBookingUi from "../../drilledComponent-level01/seatBookingUi"
import {getHostedTrips} from "../../services/hostService"
import {userBookingOnServer} from "../../services/storeService"

const Userbooking = () => {
  const {tripId} = useParams()
  const [bookingType, setBookingType] = useState("reserveSeat")
  const [selectedTripDetails, setSelectedTripDetails] = useState(null)
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleBookingType = event => setBookingType(event.target.value)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!formData) return alert("Please fill all the required fields.")

    const payload = {bookingType, tripId, ...formData}

    try {
      const result = await userBookingOnServer(payload)
      console.log("Booking success:", result)
      alert("Booking successful!")
    } catch (err) {
      console.error("Submit error:", err)
      alert("Failed to book: " + err.message)
    }
  }

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const trips = await getHostedTrips()
        const trip = trips.find(t => t._id === tripId)
        if (!trip) setError("Trip not found.")
        else setSelectedTripDetails(trip)
      } catch {
        setError("Failed to load trip.")
      } finally {
        setLoading(false)
      }
    }
    fetchTrip()
  }, [tripId])

  if (loading) return <div className="p-4">Loading trip details...</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 mt-8">
      <div>
        <label htmlFor="bookingType" className="block text-sm font-medium mb-1">
          Booking Type
        </label>
        <select id="bookingType" value={bookingType} onChange={handleBookingType} className="w-full border rounded px-3 py-2">
          <option value="reserveSeat">Reserve Seat</option>
          <option value="reserveCab">Reserve Cab</option>
        </select>
      </div>

      {bookingType === "reserveSeat" && <SeatBookingUi selectedTripDetails={selectedTripDetails} onFormDataChange={setFormData} />}
      {bookingType === "reserveCab" && <CabBookingUi selectedTripDetails={selectedTripDetails} onFormDataChange={setFormData} />}

      <button type="submit" disabled={!formData} className={`w-full text-white py-2 rounded transition ${formData ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-300 cursor-not-allowed"}`}>
        Submit
      </button>
    </form>
  )
}

export default Userbooking
