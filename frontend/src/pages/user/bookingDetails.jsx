import {useParams, Link} from "react-router-dom"
import vehicleImg from "../../assets/vehicleImg01.jpg"
import {useEffect, useState} from "react"
import {getCabBookingById, getSeatBookingById} from "../../services/storeService"

const BookingDetails = () => {
  const {id} = useParams()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true)

        // Try to fetch from both databases
        const [cabResponse, seatResponse] = await Promise.allSettled([getCabBookingById(id), getSeatBookingById(id)])

        if (cabResponse.status === "fulfilled") {
          setBooking(cabResponse.value)
        } else if (seatResponse.status === "fulfilled") {
          setBooking(seatResponse.value)
        } else {
          setError("Booking not found")
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchBookingData()
    }
  }, [id])

  if (loading) return <div className="container mx-auto p-4">Loading booking details...</div>
  if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>
  if (!booking) return <div className="container mx-auto p-4">No booking found</div>

  console.log("Booking ID from URL:", id)
  console.log("Fetched booking data:", booking)

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white border border-blue-200 rounded-xl shadow-md overflow-hidden flex flex-col lg:flex-row">
        {/* LEFT SIDE: Vehicle Image + Trip Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="relative w-full h-48 lg:h-64">
            <img src={vehicleImg} alt="Vehicle" className="w-full h-full object-cover rounded-t-xl lg:rounded-tl-xl lg:rounded-tr-none" />
            <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 text-sm rounded shadow">Confirmed</div>
          </div>

          <div className="p-6 border-t border-blue-200 lg:border-t-0 lg:border-l">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {booking.pickupCity || "Pickup City"} → {booking.dropCity || "Drop City"}
            </h2>

            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Trip Date:</span> {booking.dateTime ? new Date(booking.dateTime).toLocaleDateString() : booking.onDate ? new Date(booking.onDate).toLocaleDateString() : "2025-08-10"}
              </p>
              <p>
                <span className="font-semibold">Booked On:</span> {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "2025-07-20"}
              </p>
              <p>
                <span className="font-semibold">Reservation Type:</span> <span className="text-gray-800">{booking.dropCity ? "Seat Booking" : "Cab Booking"}</span>
              </p>
            </div>

            {/* Fare Summary - Hardcoded */}
            <div className="bg-blue-50 rounded-lg p-4 mt-4 text-sm text-gray-700 space-y-1">
              <h4 className="font-semibold text-gray-800 mb-2">Fare Summary</h4>
              <div className="flex justify-between">
                <span>Base Fare</span>
                <span>₹{booking.hostedTripId?.fare || 1500}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax & Charges</span>
                <span>₹120</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-gray-900 pt-1">
                <span>Total</span>
                <span>₹{booking.hostedTripId?.fare + 120 || 1620}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Full Booking Details */}
        <div className="w-full lg:w-1/2 p-6 space-y-6">
          {/* Pickup & Drop */}
          <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Pickup Location</h4>
              <p>{booking.exactPickup || "Pickup Location"}</p>
              <p className="text-xs text-gray-500">City: {booking.pickupCity || "Pickup City"}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Drop Location</h4>
              <p>{booking.exactDrop || "Charbagh Railway Station"}</p>
              <p className="text-xs text-gray-500">City: {booking.dropCity || "Lucknow"}</p>
            </div>
          </div>

          {/* Vehicle Info - Hardcoded */}

          <div className="text-sm text-gray-700">
            <h4 className="font-semibold text-gray-800 mb-1">Vehicle Details</h4>
            <p>Model: {booking.hostedTripId?.model || "Toyota Innova"}</p>
            <p>Number: {booking.hostedTripId?.number || "UP65 AB 1234"}</p>
            <p>Type: {booking.hostedTripId?.type || "SUV"}</p>
            <p>Seats: {booking.hostedTripId?.seats || "6"}</p>
          </div>

          {/* Passenger Info - Hardcoded */}
          <div className="text-sm text-gray-700">
            <h4 className="font-semibold text-gray-800 mb-1">Passenger Info</h4>
            <p>Name: Mohammad Tauz</p>
            <p>Phone: +91 95559 09575</p>
            <p>Email: tauzans609@gmail.com</p>
          </div>

          {/* Host Info - Hardcoded */}
          <div className="flex items-center justify-between text-sm text-gray-700 border-t pt-4">
            <p>
              Listed by <span className="font-semibold text-gray-900">@user01</span>
            </p>
            <p className="text-yellow-500 font-semibold flex items-center">
              <span className="mr-1">★</span> 4.9
            </p>
          </div>

          {/* Meta Info */}
          <div className="text-xs text-gray-500 pt-2">
            <p>Booking ID: {booking._id || "CAB123456"}</p>
          </div>

          {/* Back Link */}
          <div>
            <Link to="/bookings" className="inline-block px-5 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition">
              ← Back to Bookings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingDetails
