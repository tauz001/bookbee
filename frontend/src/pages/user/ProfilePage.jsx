import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BookingService } from '../../services/bookingService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [bookingsData, setBookingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchBookingsData();
    }
  }, [isAuthenticated, user]);

  const fetchBookingsData = async () => {
    try {
      setLoading(true);
      const data = await BookingService.getAllBookings();
      setBookingsData(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatBookingForDisplay = (booking, type) => {
    const trip = booking.tripId;
    return {
      id: booking._id,
      type,
      tripDate: booking.tripDate || booking.dateTime,
      from: booking.pickupCity,
      to: booking.dropCity || 'Destination',
      status: booking.status,
      vehicle: trip?.vehicle ? `${trip.vehicle.model} (${trip.vehicle.type})` : 'N/A',
      price: trip?.seatFare ? `₹${trip.seatFare}` : 'N/A',
      hostName: trip?.hostName || trip?.hostId?.name || 'Host',
      seats: booking.numberOfSeats || 1,
      createdAt: booking.createdAt
    };
  };

  const getAllBookings = () => {
    if (!bookingsData) return [];
    
    const seatBookings = bookingsData.seatBookings?.map(booking => 
      formatBookingForDisplay(booking, 'Seat')
    ) || [];
    
    const cabBookings = bookingsData.cabBookings?.map(booking => 
      formatBookingForDisplay(booking, 'Cab')
    ) || [];
    
    return [...seatBookings, ...cabBookings].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'confirmed': 'bg-green-100 text-green-700',
      'cancelled': 'bg-red-100 text-red-700',
      'completed': 'bg-blue-100 text-blue-700'
    };
    
    return statusStyles[status] || 'bg-gray-100 text-gray-700';
  };

  const getStats = () => {
    const allBookings = getAllBookings();
    return {
      totalBookings: allBookings.length,
      completedTrips: allBookings.filter(b => b.status === 'completed').length,
      upcomingTrips: allBookings.filter(b => b.status === 'confirmed').length,
      cancelledTrips: allBookings.filter(b => b.status === 'cancelled').length
    };
  };

  if (authLoading) {
    return <LoadingSpinner text="Loading profile..." />;
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
        <p className="text-gray-600 mb-6">You need to be logged in to view your profile.</p>
        <Link 
          to="/" 
          className="bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner text="Loading your profile data..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchBookingsData} />;
  }

  const stats = getStats();
  const recentBookings = getAllBookings().slice(0, 5); // Show last 5 bookings

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative">
            <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center">
              <span className="text-4xl font-bold text-yellow-600">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white">{user?.name || 'User'}</h1>
            <p className="text-yellow-100 capitalize">
              {user?.userType || 'Member'} • Member since {new Date(user?.createdAt).toLocaleDateString() || 'N/A'}
            </p>
            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-4">
              <div className="bg-yellow-400/20 px-4 py-2 rounded-full">
                <span className="text-white">{stats.totalBookings} Total Bookings</span>
              </div>
              <div className="bg-yellow-400/20 px-4 py-2 rounded-full">
                <span className="text-white">{stats.completedTrips} Completed</span>
              </div>
              <div className="bg-yellow-400/20 px-4 py-2 rounded-full">
                <span className="text-white">{stats.upcomingTrips} Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
              <button 
                onClick={() => setEditMode(!editMode)}
                className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
              >
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <p className="text-gray-800">{user?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Mobile</label>
                <p className="text-gray-800">{user?.mobile || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Account Type</label>
                <p className="text-gray-800 capitalize">{user?.userType || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Member Since</label>
                <p className="text-gray-800">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Account Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user?.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {user?.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              {editMode && (
                <div className="mt-6">
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-lg transition duration-150">
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Quick Stats</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Bookings</span>
                <span className="font-semibold text-gray-800">{stats.totalBookings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completed Trips</span>
                <span className="font-semibold text-green-600">{stats.completedTrips}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Upcoming Trips</span>
                <span className="font-semibold text-blue-600">{stats.upcomingTrips}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cancelled</span>
                <span className="font-semibold text-red-600">{stats.cancelledTrips}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
            </div>
            
            {recentBookings.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-6">Start exploring available trips and make your first booking!</p>
                <Link 
                  to="/trips" 
                  className="inline-block bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Browse Trips
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {booking.tripDate ? new Date(booking.tripDate).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div>
                            <div className="font-medium capitalize">{booking.from}</div>
                            {booking.to && <div className="text-gray-500">→ {booking.to}</div>}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {booking.type} {booking.seats > 1 ? `(${booking.seats} seats)` : ''}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {booking.hostName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusBadge(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Link
                            to={`/bookings/${booking.type.toLowerCase()}/${booking.id}`}
                            className="text-yellow-600 hover:text-yellow-700 font-medium"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {recentBookings.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100">
                <Link 
                  to="/bookings"
                  className="text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  View All Bookings →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;