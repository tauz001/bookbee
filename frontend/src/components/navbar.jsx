import {NavLink} from "react-router-dom"
import "./Navbar.css" // ✅ import the custom CSS

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-yellow-600">
          BookBee
        </NavLink>

        {/* Tabs */}
        <div className="flex gap-6 text-sm font-medium items-center">
          <NavLink to="/trips" className={({isActive}) => `nav-link ${isActive ? "active" : ""} text-gray-700`}>
            Available Trips
          </NavLink>
          <NavLink to="/bookings" className={({isActive}) => `nav-link ${isActive ? "active" : ""} text-gray-700`}>
            My Bookings
          </NavLink>
          <NavLink to="/host/trips" className={({isActive}) => `nav-link ${isActive ? "active" : ""} text-gray-700`}>
            Host Trip List
          </NavLink>
          <NavLink to="/host/new" className={({isActive}) => `nav-link ${isActive ? "active" : ""} text-gray-700`}>
            Host New Trip
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
