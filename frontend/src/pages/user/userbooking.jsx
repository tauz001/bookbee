import {useState} from "react"
import CabBookingUi from "../../drilledComponent-level01/cabBookingUi"
import SeatBookingUi from "../../drilledComponent-level01/seatBookingUi"

const Userbooking = () => {
  const [bookingType, setBookingType] = useState("")

  const handleBookingType = event => {
    setBookingType(event.target.value)
  }

  return (
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
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Submit
      </button>
    </form>
  )
}

export default Userbooking
