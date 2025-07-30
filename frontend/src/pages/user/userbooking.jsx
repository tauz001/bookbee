import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import CabBookingUi from "../../drilledComponent-level01/cabBookingUi"
import SeatBookingUi from "../../drilledComponent-level01/seatBookingUi"
import {getHostedTrips} from "../../services/hostService"
import {userBookingOnServer} from "../../services/storeService" // adjust path if needed

const Userbooking = () => {
  const {tripId} = useParams()
  const [bookingType, setBookingType] = useState("reserveSeat")
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTripDetails, setSelectedTripDetails] = useState(null)
  const [formData, setFormData] = useState(null) // 🔄 this will hold the data from SeatBookingUi

  const handleFormDataChange = data => {
    setFormData(data)
  }

  const handleBookingType = event => {
    setBookingType(event.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!formData) {
      alert("Please fill all the required fields.")
      return
    }

    const payload = {
      bookingType,
      tripId,
      ...formData,
    }

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
    const fetchTrips = async () => {
      try {
        const data = await getHostedTrips()
        setTrips(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  useEffect(() => {
    if (tripId && trips.length) {
      const selectedTrip = trips.find(trip => trip._id === tripId)
      setSelectedTripDetails(selectedTrip)
    }
  }, [tripId, trips])

  if (loading) return <div className="p-4">Loading trips...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>
  if (!trips.length) return <div className="p-4">No trips available</div>

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 mt-8">
      <div>
        <label htmlFor="bookingType" className="block text-sm font-medium mb-1">
          Booking Type
        </label>
        <select name="bookingType" id="bookingType" value={bookingType} onChange={handleBookingType} className="w-full border rounded px-3 py-2">
          <option value="reserveSeat">Reserve Seat</option>
          <option value="reserveCab">Reserve Complete</option>
        </select>
      </div>

      <div>
        {bookingType === "reserveSeat" && <SeatBookingUi selectedTripDetails={selectedTripDetails} onFormDataChange={handleFormDataChange} />}
        {bookingType === "reserveCab" && <CabBookingUi selectedTripDetails={selectedTripDetails} onFormDataChange={handleFormDataChange} />}
      </div>

      <button type="submit" className="w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500 transition">
        Submit
      </button>
    </form>
  )
}

export default Userbooking

// further will a unique refrence number for every user booking ---
//further the Vehicle photo that is show to the user also being passed by data to show same image at the userBooking card ---
// further the user info like user name and some also essesntial info also being passed throug data. (when we add authentication and authorization) ---
