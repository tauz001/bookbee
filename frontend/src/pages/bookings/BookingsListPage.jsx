/**
 * Page displaying user's bookings (both seat and cab bookings)
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingService } from '../../services/bookingService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const BookingsListPage = () => {
  const [seatBookings, setSeatBookings] = useState([]);
  const [cabBookings, setCabBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Fetch all bookings
   */
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [seatData, cabData] = await Promise.all([
        BookingService.getSeatBookings(),
        BookingService.getCabBookings()
      ]);
      
      setSeatBookings(seatData);
      setCabBookings(cabData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle booking details navigation
   */
  const handleViewDetails = (bookingId, type) => {
    navigate(`/bookings/${type}/${bookingId}`);
  };

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // Loading State
  if (loading) {
    return <LoadingSpinner text="Loading your bookings..." />;
  }

  // Error State
  if (error) {
    return <ErrorMessage message={error} onRetry={fetchBookings} />;
  }

  // Empty State
  if (!seatBookings.length && !cabBookings.length) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m4-8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-4-6h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
          <p className="text-gray-500 mb-6">You haven't made any bookings yet. Start by browsing available trips.</p>
          <Button onClick={() => navigate('/trips')}>
            Browse Trips
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">
          {seatBookings.length + cabBookings.length} total booking{seatBookings.length + cabBookings.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Seat Bookings Section */}
      {seatBookings.length > 0 && (
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Shared Ride Bookings</h2>
            <p className="text-gray-600">{seatBookings.length} seat booking{seatBookings.length !== 1 ? 's' : ''}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seatBookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                type="seat"
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>
      )}

      {/* Cab Bookings Section */}
      {cabBookings.length > 0 && (
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Private Cab Bookings</h2>
            <p className="text-gray-600">{cabBookings.length} cab booking{cabBookings.length !== 1 ? 's' : ''}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cabBookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                type="cab"
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/**
 * Individual booking card component
 */
const BookingCard = ({ booking, type, onViewDetails }) => {
  const isSeatBooking = type === 'seat';
  const trip = booking.tripId;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card hover className="relative">
      {/* Vehicle Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg mb-4 flex items-center justify-center">
        <div className="text-yellow-600 opacity-50">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 002 0v-1h14v1a1 1 0 102 0V7.618a1 1 0 00-.553-.894L16 5.118V5a1 1 0 00-1-1H3z"/>
          </svg>
        </div>
      </div>

      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(booking.status)}`}>
          {booking.status || 'confirmed'}
        </span>
      </div>

      {/* Route */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 capitalize">
          {booking.pickupCity}
          {isSeatBooking && (
            <>
              <span className="text-gray-400 mx-2">→</span>
              {booking.dropCity}
            </>
          )}
        </h3>
      </div>

      {/* Pickup/Drop Details */}
      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Pickup:</span> {booking.exactPickup}
        </div>
        {isSeatBooking && booking.exactDrop && (
          <div>
            <span className="font-medium">Drop:</span> {booking.exactDrop}
          </div>
        )}
      </div>

      {/* Trip Details */}
      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Trip Date:</span>{' '}
          {formatDate(isSeatBooking ? booking.tripDate : booking.dateTime)}
        </div>
        <div>
          <span className="font-medium">Booked On:</span> {formatDate(booking.createdAt)}
        </div>
      </div>

      {/* Vehicle Info */}
      {trip && (
        <div className="mb-4 text-sm text-gray-600">
          <div className="font-medium mb-1">Vehicle Details:</div>
          <div>{trip.vehicle?.model || 'N/A'} • {trip.vehicle?.type || 'N/A'}</div>
        </div>
      )}

      {/* Pricing */}
      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {isSeatBooking ? 'Seat Fare' : 'Rate per KM'}
          </span>
          <span className="font-bold text-lg text-yellow-600">
            ₹{isSeatBooking ? trip?.seatFare : trip?.kmRate}/
            {isSeatBooking ? 'seat' : 'km'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <Button
        onClick={() => onViewDetails(booking._id, type)}
        variant="outline"
        size="sm"
        className="w-full"
      >
        View Details
      </Button>
    </Card>
  );
};

export default BookingsListPage