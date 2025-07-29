import {Link, NavLink} from "react-router-dom"

export default function Homepage() {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold text-yellow-600">
            BookBee
          </NavLink>
          <div className="space-x-6 text-sm font-medium text-gray-700">
            <NavLink to="/trips" className="hover:text-yellow-600">
              Book Ride
            </NavLink>
            <NavLink to="/bookings" className="hover:text-yellow-600">
              My Bookings
            </NavLink>
            <NavLink to="/host/trips" className="hover:text-yellow-600">
              Host
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gray-50 flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-0 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Simplifying Intercity Travel, One Ride at a Time</h1>
            <p className="mt-6 text-lg text-gray-600 max-w-md">BookBee connects travelers with reliable, affordable cab options across cities — with the flexibility of shared or private rides.</p>
            <div className="mt-8 flex gap-4">
              <Link to="/book" className="bg-yellow-400 text-white px-6 py-3 rounded-md hover:bg-yellow-500 transition">
                Book a Ride
              </Link>
              <Link to="/host/new" className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
                Become a Host
              </Link>
            </div>
          </div>
          <div className="flex-1 hidden md:block">
            <img src="https://cdn-icons-png.flaticon.com/512/748/748113.png" alt="Cab illustration" className="w-full max-w-md mx-auto" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="min-h-screen bg-white flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Why Choose BookBee?</h2>
            <ul className="space-y-6 text-gray-700 text-base leading-relaxed">
              <li>
                <span className="text-yellow-600 font-semibold">🚕 Fair Pricing:</span> Affordable options for both shared and reserved rides.
              </li>
              <li>
                <span className="text-yellow-600 font-semibold">🧑‍✈️ Trusted Drivers:</span> Every driver is verified and rated for safety.
              </li>
              <li>
                <span className="text-yellow-600 font-semibold">💸 Easy Earnings:</span> Host trips, share rides, and earn with your vehicle.
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-xl p-10 shadow-md h-fit">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Start Hosting Today</h3>
            <p className="text-gray-700 mb-6">Own a car? Start earning by hosting intercity rides. Flexible schedules, full control, and extra income.</p>
            <Link to="/host/new" className="inline-block bg-yellow-400 text-white px-6 py-3 rounded-md hover:bg-yellow-500 transition">
              Become a Host
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen bg-gray-50 flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">About BookBee</h2>
          <p className="text-gray-700 max-w-4xl text-lg leading-relaxed">
            BookBee is built with one mission — to make outstation cab travel smarter, smoother, and more accessible. Whether you're a solo traveler or a group of friends, we let you choose the ride experience you want. By connecting vehicle owners with intercity passengers, we reduce empty rides and maximize value for both.
            <br />
            <br />
            We're not just another cab app. We're a community of travelers and earners moving together.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t text-sm text-gray-600 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-yellow-600">BookBee</h3>
            <p className="text-gray-600">Buzzing your travel experience since 2025.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="#" className="hover:underline">
              Privacy
            </Link>
            <Link to="#" className="hover:underline">
              Terms
            </Link>
            <Link to="#" className="hover:underline">
              Support
            </Link>
          </div>
        </div>
        <div className="text-center py-4 bg-gray-100 text-gray-500">© {new Date().getFullYear()} BookBee. All rights reserved.</div>
      </footer>
    </div>
  )
}
