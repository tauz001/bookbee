/**
 * Page displaying all available trips for booking
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripService } from '../../services/tripService';
import { APP_ROUTES } from '../../config/constants';
import TripCard from '../../components/trip/TripCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const TripsListPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Fetch all available trips
   */
  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await TripService.getAllTrips();
      setTrips(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle trip booking navigation
   */
  const handleBookTrip = (tripId) => {
    navigate(`${APP_ROUTES.BOOK_TRIP}/${tripId}`);
  };

  // Fetch trips on component mount
  useEffect(() => {
    fetchTrips();
  }, []);

  // Loading State
  if (loading) {
    return <LoadingSpinner text="Loading available trips..." />;
  }

  // Error State
  if (error) {
    return <ErrorMessage message={error} onRetry={fetchTrips} />;
  }

  // Empty State
  if (!trips.length) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No trips available</h3>
          <p className="text-gray-500 mb-6">There are currently no trips available for booking.</p>
          <button
            onClick={fetchTrips}
            className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Trips</h1>
        <p className="text-gray-600">Choose from {trips.length} available trips</p>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <TripCard
            key={trip._id}
            trip={trip}
            onBook={handleBookTrip}
          />
        ))}
      </div>
    </div>
  );
};

export default TripsListPage;