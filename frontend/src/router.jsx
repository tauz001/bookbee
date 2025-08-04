import {createBrowserRouter} from "react-router-dom"
import App from "./App"
import BookingsFormPage from "./pages/bookings/BookingsFormPage"
import UserBookingsList from "./pages/user/userBookingsList"
import TripsList from "./pages/user/userTripList"
import HostingTrip from "./pages/host/hostingTrip"
import HostTripList from "./pages/host/hostTripList"
import EditTrip from "./pages/host/editTrip"
import Homepage from "./pages/common/homePage"
import BookingDetails from "./pages/user/BookingDetailsPage"
import HomePage from "./pages/HomePage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "book",
        element: <BookingsFormPage />,
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
        element: <BookingsFormPage />,
      },
      {
        path: "/cabbookings/:id",
        element: <BookingDetails />,
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
