import {useEffect, useState} from "react"
import vehicleImg from "../../assets/vehicleImg01.jpg"
import {getUserCabBooking, getUserSeatBooking} from "../../services/storeService"

const Booking = () => {
  const [cabBookings, setCabBookings] = useState([])
  const [seatBookings, setSeatBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getUserCabBooking()
        setCabBookings(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getUserSeatBooking()
        setSeatBookings(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  if (loading) return <div className="container mx-auto p-4">Loading bookings...</div>
  if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* CAB BOOKINGS */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Reserve Bookings</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cabBookings.map((booking, index) => (
            <div key={index} className="max-w-md w-full mx-auto bg-white rounded-xl border border-blue-200 shadow-md hover:shadow-lg transition overflow-hidden">
              <div className="h-48 bg-blue-50">
                <img src={vehicleImg} alt="vehicle" className="w-full h-full object-cover" />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {booking.pickupCity} <span className="text-gray-500">→</span> N/A
                </h3>

                <div className="flex justify-between text-sm text-gray-700">
                  <div>
                    <p>
                      <span className="font-semibold">Pickup:</span> {booking.exactPickup}
                    </p>
                    <p>
                      <span className="font-semibold">Drop:</span> N/A
                    </p>
                  </div>
                  <div className="text-right">
                    <p>
                      <span className="font-semibold">Booked On:</span> {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Trip Date:</span> {new Date(booking.dateTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <a href="#" className="text-blue-600 font-medium hover:underline">
                  View booking details
                </a>

                <div className="flex justify-between border-t pt-4 text-sm">
                  <p>
                    Listed by <span className="font-semibold">@user01</span>
                  </p>
                  <p className="text-yellow-500 font-semibold">★ 4.9</p>
                </div>

                <div className="text-center text-green-600 font-semibold text-sm mt-3">
                  Ready for your trip on <span className="underline">{new Date(booking.dateTime).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEAT BOOKINGS */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shared Bookings</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Hardcoded seat booking example */}
          {seatBookings.map((booking, index) => (
            <div key={index} className="max-w-md w-full mx-auto bg-white rounded-xl border border-green-200 shadow-md hover:shadow-lg transition overflow-hidden">
              <div className="h-48 bg-green-50">
                <img src={vehicleImg} alt="vehicle" className="w-full h-full object-cover" />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {booking.pickupCity} <span className="text-gray-500">→</span> {booking.dropCity}
                </h3>

                <div className="flex justify-between text-sm text-gray-700">
                  <div>
                    <p>
                      <span className="font-semibold">Pickup:</span> {booking.exactPickup}
                    </p>
                    <p>
                      <span className="font-semibold">Drop:</span> {booking.exactDrop}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>
                      <span className="font-semibold">Booked On:</span> {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Trip Date:</span> {new Date(booking.onDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <a href="#" className="text-green-600 font-medium hover:underline">
                  View booking details
                </a>

                <div className="flex justify-between border-t pt-4 text-sm">
                  <p>
                    Listed by <span className="font-semibold">@user12</span>
                  </p>
                  <p className="text-yellow-500 font-semibold">★ 4.7</p>
                </div>

                <div className="text-center text-green-700 font-semibold text-sm mt-3">
                  Ready for your trip on <span className="underline">{new Date(booking.onDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Booking
