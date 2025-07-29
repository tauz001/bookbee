import {useState, useEffect} from "react"
import {getHostedTrips} from "../../services/hostService"
import {LuArrowRightLeft} from "react-icons/lu"
import {FaUser} from "react-icons/fa" // Import user icon
import productionImage from "../../assets/production.jpg"
import {useNavigate} from "react-router-dom"

const TripsList = () => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate() // Move this to top

  const handleBooking = tripId => {
    // Move this to top
    navigate(`/book/${tripId}`)
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

  // Conditional returns after hooks and function declarations
  if (loading) return <div className="container mx-auto p-4">Loading trips...</div>
  if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>
  if (!trips.length) return <div className="container mx-auto p-4">No trips available</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map(trip => (
          <div key={trip._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Image Container */}
            <div className="relative h-48">
              <img src={productionImage} alt="Vehicle" className="w-full h-full object-cover" />
            </div>

            {/* Content Container */}
            <div className="p-5 space-y-4">
              {/* Trip Route */}
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span className="truncate">{trip.pickupCity}</span>
                <LuArrowRightLeft className="flex-shrink-0 text-gray-500" />
                <span className="truncate">{trip.dropCity}</span>
              </h3>

              {/* Host Info */}
              <div className="flex items-center gap-2 text-gray-600">
                <FaUser className="text-gray-400" />
                <span className="text-sm">Hosted by @user123</span>
                <span className="ml-auto text-blue-600">★ 4.5</span>
              </div>

              {/* Price and Book Button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Price per seat</p>
                  <p className="font-bold text-xl text-yellow-600">₹{trip.fare}</p>
                </div>
                <button
                  className="bg-yellow-400 text-white font-bold hover:text-black hover:font-bold px-4 py-2 rounded-lg 
                           hover:bg-yellow-500 transition-colors duration-200"
                  onClick={() => handleBooking(trip._id)}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TripsList
