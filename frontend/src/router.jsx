import {createBrowserRouter} from "react-router-dom"
import App from "./App"
import Userbooking from "./pages/user/userbooking"
import UserBookingsList from "./pages/user/userBookingsList"
import TripsList from "./pages/user/userTripList"
import HostingTrip from "./pages/host/hostingTrip"
import HostTripList from "./pages/host/hostTripList"
import EditTrip from "./pages/host/editTrip"
import Homepage from "./pages/common/homePage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "book",
        element: <Userbooking />,
      },
      {
        path: "bookings",
        element: <UserBookingsList />,
      },
      {
        path: "trips",
        element: <TripsList />,
      },
      {
        path: "book/:tripId/",
        element: <Userbooking />,
      },
      {
        path: "host",
        children: [
          {
            path: "new",
            element: <HostingTrip />,
          },
          {
            path: "trips",
            element: <HostTripList />,
          },
          {
            path: "trips/:tripId/edit",
            element: <EditTrip />,
          },
        ],
      },
    ],
  },
])
