import {useState, useEffect} from "react"
import {getHostedTrips} from "../../services/hostService"

const TripsList = () => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) return <div className="p-4">Loading trips...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>
  if (!trips.length) return <div className="p-4">No trips available</div>

  return (
    <div className="grid gap-4 p-4">
      {trips.map(trip => (
        <div key={trip._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg">
            {trip.pickupCity} to {trip.dropCity}
          </h3>
          <p className="text-sm text-gray-600">Pickup: {trip.exactPickup}</p>
          <p className="text-sm text-gray-600">Drop: {trip.exactDrop}</p>
          <p className="font-medium mt-2">Fare: ₹{trip.fare}</p>
        </div>
      ))}
    </div>
  )
}

export default TripsList
