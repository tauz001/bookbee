import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCabBookingById, getSeatBookingById} from "../../services/storeService";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const BookingDetailsPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookingData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let bookingData;
      if (type === 'seat') {
        bookingData = await getSeatBookingById(id);
      } else if (type === 'cab') {
        bookingData = await getCabBookingById(id);
      } else {
        throw new Error('Invalid booking type');
      }
      
      setBooking(bookingData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && type) {
      fetchBookingData();
    }
  }, [id, type]);

  const isCabBooking = (booking) => {
    return type === 'cab' || !booking.dropCity;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-600 text-white';
      case 'cancelled': return 'bg-red-600 text-white';
      case 'completed': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  // Loading State
  if (loading) {
    return <LoadingSpinner text="Loading booking details..." />;
  }

  // Error State
  if (error) {
    return <ErrorMessage message={error} onRetry={fetchBookingData} />;
  }

  // No booking found
  if (!booking) {
    return <ErrorMessage message="Booking not found" />;
  }

  const trip = booking.tripId;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/bookings')}
            className="mb-4"
          >
            ← Back to Bookings
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Trip & Vehicle Info */}
          <div className="space-y-6">
            {/* Vehicle Image Placeholder */}
            <Card className="overflow-hidden">
              <div className="relative h-64 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                <div className="text-yellow-600 opacity-50">
                  <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 002 0v-1h14v1a1 1 0 102 0V7.618a1 1 0 00-.553-.894L16 5.118V5a1 1 0 00-1-1H3z"/>
                  </svg>
                </div>
                <div className={`absolute top-4 left-4 px-3 py-1 text-sm rounded shadow ${getStatusColor(booking.status)}`}>
                  {booking.status || 'Confirmed'}
                </div>
              </div>
            </Card>

            {/* Trip Information */}
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trip Information</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800 text-lg capitalize">
                    {booking.pickupCity} → {booking.dropCity || 'Various Destinations'}
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Trip Date:</span>
                    <p>{formatDate(booking.dateTime || booking.tripDate)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Booked On:</span>
                    <p>{formatDate(booking.createdAt)}</p>
                  </div>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Booking Type:</span>
                  <p className="text-gray-600">
                    {isCabBooking(booking) ? 'Private Cab Reservation' : 'Shared Seat Booking'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Vehicle Details */}
            {trip && (
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Model:</span>
                    <span>{trip.vehicle?.model || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Number:</span>
                    <span>{trip.vehicle?.number || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Type:</span>
                    <span>{trip.vehicle?.type || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Seats:</span>
                    <span>{trip.vehicle?.seats || 'N/A'}</span>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Side - Booking Details */}
          <div className="space-y-6">
            {/* Location Details */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Pickup Location</h4>
                  <p className="text-gray-600">{booking.exactPickup || 'N/A'}</p>
                  <p className="text-xs text-gray-500">City: {booking.pickupCity}</p>
                </div>
                
                {!isCabBooking(booking) && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Drop Location</h4>
                    <p className="text-gray-600">{booking.exactDrop || 'N/A'}</p>
                    <p className="text-xs text-gray-500">City: {booking.dropCity}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Fare Information */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fare Information</h3>
              
              {isCabBooking(booking) ? (
                // Cab booking fare display
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rate per KM</span>
                    <span className="font-medium">₹{trip?.kmRate || 'N/A'}</span>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-800 text-sm">
                      <strong>Note:</strong> Final fare will be calculated based on actual distance traveled at ₹{trip?.kmRate || 'N/A'} per km + applicable taxes.
                    </p>
                  </div>
                </div>
              ) : (
                // Seat booking fare display
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Seat Fare</span>
                    <span className="font-medium">₹{trip?.seatFare || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax & Charges</span>
                    <span className="font-medium">₹{trip?.taxAmount || 0}</span>
                  </div>
                  <hr className="my-2"/>
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Total Amount</span>
                    <span className="text-yellow-600">₹{(trip?.seatFare || 0) + (trip?.taxAmount || 0)}</span>
                  </div>
                </div>
              )}
            </Card>

            {/* Host Information */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Host Information</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Listed by</p>
                  <p className="font-semibold text-gray-900">@{trip?.hostId || 'Unknown Host'}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-yellow-500">
                    <span className="mr-1">★</span>
                    <span className="font-semibold">{trip?.hostRating || 'N/A'}</span>
                  </div>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </div>
            </Card>

            {/* Booking Metadata */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Information</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Booking ID:</span>
                  <span className="font-mono text-xs">{booking._id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status || 'Confirmed'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/bookings')}
                className="flex-1"
              >
                Back to Bookings
              </Button>
              {booking.status === 'confirmed' && (
                <Button
                  variant="danger"
                  // onClick={async () => {
                  //   if (window.confirm('Are you sure you want to cancel this booking?')) {
                  //     try {
                  //       setLoading(true);
                  //       await cancelBooking(type, booking._id);
                  //       await fetchBookingData(); // Refresh booking data
                  //     } catch (err) {
                  //       setError('Failed to cancel booking: ' + err.message);
                  //     } finally {
                  //       setLoading(false);
                  //     }
                  //   }
                  // }}
                  className="flex-1"
                  disabled={loading}
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage