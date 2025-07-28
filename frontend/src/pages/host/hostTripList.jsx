import {useState, useEffect} from "react"
import {getHostedTrips} from "../../services/hostService"
import {LuArrowRightLeft} from "react-icons/lu"
import {FaEdit, FaTrash} from "react-icons/fa" // Import edit and delete icons
import productionImage from "../../assets/production.jpg"
import {useNavigate} from "react-router-dom"

const HostTripList = () => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

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

  const handleEdit = tripId => {
    navigate(`/host/trips/${tripId}/edit`)
  }

  const handleDelete = tripId => {
    console.log("Delete trip:", tripId)
    // Will implement delete functionality later
  }

  if (loading) return <div className="container mx-auto p-4">Loading trips...</div>
  if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>
  if (!trips.length) return <div className="container mx-auto p-4">No trips available</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Hosted Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map(trip => (
          <div key={trip._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Image Container */}
            <div className="relative h-48">
              <img src={productionImage} alt="Vehicle" className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => handleEdit(trip._id)} className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                  <FaEdit className="text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">Edit</span>
                </button>
                <button onClick={() => handleDelete(trip._id)} className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                  <FaTrash className="text-red-600" />
                  <span className="text-sm text-red-600 font-medium">Delete</span>
                </button>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-5 space-y-4">
              {/* Trip Route */}
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span className="truncate">{trip.pickupCity}</span>
                <LuArrowRightLeft className="flex-shrink-0 text-gray-500" />
                <span className="truncate">{trip.dropCity}</span>
              </h3>

              {/* Trip Details */}
              <div className="space-y-2 text-sm text-gray-600">
                <p className="truncate">Pickup: {trip.exactPickup}</p>
                <p className="truncate">Drop: {trip.exactDrop}</p>
                <p>Date: {new Date().toLocaleDateString()}</p> {/* Replace with actual trip date */}
              </div>

              {/* Status and Price */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Price per seat</p>
                  <p className="font-bold text-xl text-blue-600">₹{trip.fare}</p>
                </div>
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">Active</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HostTripList
