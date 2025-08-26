import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHostedTrips, deleteTrip } from '../../services/hostService';
import HostTripCard from '../../components/trip/HostTripCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const HostTripList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHostedTrips();
      setTrips(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleEdit = tripId => {
    navigate(`/host/trips/${tripId}/edit`)
  }

  const handleDelete = tripId => {
    console.log("Delete trip:", tripId)
    // Will implement delete functionality later
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Hosted Trips</h2>
        <button
          onClick={() => navigate('/host/trips/create')}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Create New Trip
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No trips available</p>
          <button
            onClick={() => navigate('/host/trips/create')}
            className="text-yellow-500 hover:text-yellow-600"
          >
            Create your first trip
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <HostTripCard
              key={trip._id}
              trip={trip}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default HostTripList
