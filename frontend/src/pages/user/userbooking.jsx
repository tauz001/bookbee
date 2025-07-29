import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import CabBookingUi from "../../drilledComponent-level01/cabBookingUi"
import SeatBookingUi from "../../drilledComponent-level01/seatBookingUi"
import {getHostedTrips} from "../../services/hostService"

const Userbooking = () => {
  const {tripId} = useParams()
  const [bookingType, setBookingType] = useState("")
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleBookingType = event => {
    setBookingType(event.target.value)
  }

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getHostedTrips()
        console.log("Fetched trips:", data) // Debug log
        setTrips(data)
      } catch (err) {
        console.error("Error:", err) // Debug log
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  useEffect(() => {
    if (tripId) {
      // Fetch trip details using tripId
      // Pre-fill booking form
    }
  }, [tripId])

  if (loading) return <div className="p-4">Loading trips...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>
  if (!trips.length) return <div className="p-4">No trips available</div>

  return (
    <>
      <form action="/booking" method="post" className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 mt-8">
        <div>
          <label htmlFor="bookingType" className="block text-sm font-medium mb-1">
            Booking Type
          </label>
          <select name="bookingType" id="bookingType" onChange={handleBookingType} className="w-full border rounded px-3 py-2">
            {/* <option value="">Select Booking Type</option> */}
            <option value="reserveSeat">Reserve Seat</option>
            <option value="reserveCab">Reserve Complete</option>
          </select>
        </div>
        <div>
          {bookingType === "reserveSeat" && <SeatBookingUi />}
          {bookingType === "reserveCab" && <CabBookingUi />}
        </div>
        <button type="submit" className="w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500 transition">
          Submit
        </button>
      </form>
    </>
  )
}

export default Userbooking
