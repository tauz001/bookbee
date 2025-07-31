import {useParams, Link} from "react-router-dom"
import vehicleImg from "../../assets/vehicleImg01.jpg"
import {useEffect, useState} from "react"

const BookingDetails = () => {
  const {id} = useParams()

  // Mock booking data — replace with actual fetch later
  const booking = {
    bookingId: "CAB123456",
    reservationType: "Cab Booking",
    pickupCity: "Shahganj",
    dropCity: "Lucknow",
    exactPickup: "Shahganj Bus Stand",
    exactDrop: "Charbagh Railway Station",
    tripDate: "2025-08-10",
    createdAt: "2025-07-20",
    user: {
      name: "Mohammad Tauz",
      contact: "+91 95559 09575",
      email: "tauzans609@gmail.com",
    },
    host: {
      name: "@user01",
      rating: 4.9,
    },
    vehicle: {
      model: "Toyota Innova",
      number: "UP65 AB 1234",
      type: "SUV",
      seats: 6,
    },
    fare: {
      baseFare: 1500,
      tax: 120,
      total: 1620,
    },
    status: "Confirmed",
  }

  console.log("Booking ID from URL:", id)

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white border border-blue-200 rounded-xl shadow-md overflow-hidden flex flex-col lg:flex-row">
        {/* LEFT SIDE: Vehicle Image + Trip Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="relative w-full h-48 lg:h-64">
            <img src={vehicleImg} alt="Vehicle" className="w-full h-full object-cover rounded-t-xl lg:rounded-tl-xl lg:rounded-tr-none" />
            <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 text-sm rounded shadow">{booking.status}</div>
          </div>

          <div className="p-6 border-t border-blue-200 lg:border-t-0 lg:border-l">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {booking.pickupCity} → {booking.dropCity}
            </h2>

            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Trip Date:</span> {new Date(booking.tripDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Booked On:</span> {new Date(booking.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Reservation Type:</span> <span className="text-gray-800">{booking.reservationType}</span>
              </p>
            </div>

            {/* Fare Summary */}
            <div className="bg-blue-50 rounded-lg p-4 mt-4 text-sm text-gray-700 space-y-1">
              <h4 className="font-semibold text-gray-800 mb-2">Fare Summary</h4>
              <div className="flex justify-between">
                <span>Base Fare</span>
                <span>₹{booking.fare.baseFare}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax & Charges</span>
                <span>₹{booking.fare.tax}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-gray-900 pt-1">
                <span>Total</span>
                <span>₹{booking.fare.total}</span>
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
              <p>{booking.exactPickup}</p>
              <p className="text-xs text-gray-500">City: {booking.pickupCity}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Drop Location</h4>
              <p>{booking.exactDrop}</p>
              <p className="text-xs text-gray-500">City: {booking.dropCity}</p>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="text-sm text-gray-700">
            <h4 className="font-semibold text-gray-800 mb-1">Vehicle Details</h4>
            <p>Model: {booking.vehicle.model}</p>
            <p>Number: {booking.vehicle.number}</p>
            <p>Type: {booking.vehicle.type}</p>
            <p>Seats: {booking.vehicle.seats}</p>
          </div>

          {/* Passenger Info */}
          <div className="text-sm text-gray-700">
            <h4 className="font-semibold text-gray-800 mb-1">Passenger Info</h4>
            <p>Name: {booking.user.name}</p>
            <p>Phone: {booking.user.contact}</p>
            <p>Email: {booking.user.email}</p>
          </div>

          {/* Host Info */}
          <div className="flex items-center justify-between text-sm text-gray-700 border-t pt-4">
            <p>
              Listed by <span className="font-semibold text-gray-900">{booking.host.name}</span>
            </p>
            <p className="text-yellow-500 font-semibold flex items-center">
              <span className="mr-1">★</span> {booking.host.rating}
            </p>
          </div>

          {/* Meta Info */}
          <div className="text-xs text-gray-500 pt-2">
            <p>Booking ID: {booking.bookingId}</p>
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
