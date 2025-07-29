import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yellow-600">
          BookBee
        </Link>
        <div className="space-x-6 text-sm font-medium text-gray-700">
          {/*there will be only option for users and that is triplist ,mybooking */}
          <Link to="/trips" className="hover:text-yellow-600">
            Available Trips
          </Link>
          <Link to="/bookings" className="hover:text-yellow-600">
            My Bookings
          </Link>
          {/*there will be only option for host and that is hosttriplist , host new trip */}
          <Link to="/host/trips" className="hover:text-yellow-600">
            Host-Trip-List
          </Link>
          <Link to="/host/new" className="hover:text-yellow-600">
            Host-New-Trip
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

// <nav className="bg-white shadow-md p-4">
//       <div className="container mx-auto flex gap-4">
//         <Link to="/" className="hover:text-blue-600">
//           Home
//         </Link>
//         <Link to="/book" className="hover:text-blue-600">
//           Book Trip
//         </Link>
//         <Link to="/trips" className="hover:text-blue-600">
//           Available Trips
//         </Link>
//         <Link to="/host/new" className="hover:text-blue-600">
//           Host Trip
//         </Link>
//         <Link to="/host/trips" className="hover:text-blue-600">
//           Your Trips
//         </Link>
//       </div>
//     </nav>
