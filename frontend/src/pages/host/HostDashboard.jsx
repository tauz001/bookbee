import React, { useState, useEffect } from 'react';
import { Calendar, Users, Car, Clock, MapPin, Filter, Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const HostDashboard = () => {
    const { user, isAuthenticated, isHost } = useAuth();
  const [seatBookings, setSeatBookings] = useState([]);
  const [cabBookings, setCabBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterType, setFilterType] = useState('week'); // 'week', 'date', 'all'
  const [searchTerm, setSearchTerm] = useState('');
  const [updating, setUpdating] = useState(null);

  // API base URL
  const API_BASE_URL = "http://localhost:3000/api";

  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
  setLoading(true);
  setError(null);
  
  try {
    console.log('🔄 Starting to fetch bookings for host dashboard...');
    
    // First, get the host's trips
    const myTripsResponse = await fetch(`${API_BASE_URL}/trips/my-trips`, {
      credentials: 'include'
    });
    
    console.log('📋 My trips response status:', myTripsResponse.status);
    
    if (!myTripsResponse.ok) {
      const errorText = await myTripsResponse.text();
      console.error('❌ My trips error:', errorText);
      throw new Error(`Failed to fetch your trips: ${myTripsResponse.status}`);
    }
    
    const myTripsResult = await myTripsResponse.json();
    console.log('✅ My trips data:', myTripsResult);
    
    const myTripIds = myTripsResult.data.map(trip => trip._id);
    console.log('🔑 My trip IDs:', myTripIds);
    
    if (myTripIds.length === 0) {
      console.log('ℹ️ No trips found for host, setting empty bookings');
      setSeatBookings([]);
      setCabBookings([]);
      return;
    }
    
    // Fetch all bookings
    console.log('🔄 Fetching all bookings...');
    const [seatResponse, cabResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/bookings/host/seats`, { credentials: 'include' }),
      fetch(`${API_BASE_URL}/bookings/host/cabs`, { credentials: 'include' })
    ]);

    console.log('📊 Seat bookings response status:', seatResponse.status);
    console.log('🚗 Cab bookings response status:', cabResponse.status);

    if (!seatResponse.ok || !cabResponse.ok) {
      throw new Error('Failed to fetch bookings');
    }

    const [seatResult, cabResult] = await Promise.all([
      seatResponse.json(),
      cabResponse.json()
    ]);

    console.log('📊 All seat bookings:', seatResult.data);
    console.log('🚗 All cab bookings:', cabResult.data);

    // Filter bookings to only include ones for host's trips
    const hostSeatBookings = (seatResult.data || []).filter(booking => {
      console.log('🔍 Checking seat booking:', booking._id, 'tripId:', booking.tripId?._id);
      return booking.tripId && myTripIds.includes(booking.tripId._id);
    });
    
    const hostCabBookings = (cabResult.data || []).filter(booking => {
      console.log('🔍 Checking cab booking:', booking._id, 'tripId:', booking.tripId?._id);
      return booking.tripId && myTripIds.includes(booking.tripId._id);
    });

    console.log('✅ Filtered seat bookings for host:', hostSeatBookings);
    console.log('✅ Filtered cab bookings for host:', hostCabBookings);

    setSeatBookings(hostSeatBookings);
    setCabBookings(hostCabBookings);
  } catch (error) {
    console.error('❌ Error fetching bookings:', error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

    fetchBookings();
  }, []);


  //tem func
  // Add this useEffect to check raw data
useEffect(() => {
  const checkDatabase = async () => {
    try {
      // Check what's actually in the database
      const response = await fetch(`${API_BASE_URL}/bookings/seats`, { 
        credentials: 'include' 
      });
      const result = await response.json();
      
      console.log('🗃️ Raw database seat bookings:');
      result.data?.forEach((booking, index) => {
        console.log(`📋 Booking ${index + 1}:`, {
          id: booking._id,
          tripId: booking.tripId,
          userId: booking.userId,
          pickupCity: booking.pickupCity,
          createdAt: booking.createdAt
        });
      });
      
    } catch (error) {
      console.error('Database check error:', error);
    }
  };
  
  checkDatabase();
}, []);

  // Update booking status
  const updateBookingStatus = async (bookingId, newStatus, bookingType) => {
    setUpdating(bookingId);
    
    try {
      const endpoint = bookingType === 'seat' ? 'seats' : 'cabs';
      const response = await fetch(`${API_BASE_URL}/bookings/${endpoint}/${bookingId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // ADD THIS LINE
  body: JSON.stringify({ status: newStatus }),
});

      if (!response.ok) {
        throw new Error(`Failed to update booking status: ${response.status}`);
      }

      const result = await response.json();
      
      // Update local state
      if (bookingType === 'seat') {
        setSeatBookings(prev => 
          prev.map(booking => 
            booking._id === bookingId 
              ? { ...booking, status: newStatus }
              : booking
          )
        );
      } else {
        setCabBookings(prev => 
          prev.map(booking => 
            booking._id === bookingId 
              ? { ...booking, status: newStatus }
              : booking
          )
        );
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  // Add this useEffect to debug auth
useEffect(() => {
  console.log('🔐 Current user from context:', user);
  console.log('🏠 Is host?', isHost);
  console.log('🔓 Is authenticated?', isAuthenticated);
}, [user, isHost, isAuthenticated]);

  // Filter functions
  const getThisWeekBookings = (bookings) => {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(today.setDate(weekStart.getDate() + 6));
    
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.tripDate || booking.dateTime);
      return bookingDate >= weekStart && bookingDate <= weekEnd;
    });
  };

  const getBookingsByDate = (bookings, date) => {
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.tripDate || booking.dateTime).toISOString().split('T')[0];
      return bookingDate === date;
    });
  };

  const getFilteredBookings = (bookings) => {
    let filtered = bookings;
    
    if (filterType === 'week') {
      filtered = getThisWeekBookings(bookings);
    } else if (filterType === 'date') {
      filtered = getBookingsByDate(bookings, selectedDate);
    }

    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.pickupCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.dropCity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.exactPickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.exactDrop?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200'
    };

    const statusIcons = {
      confirmed: <CheckCircle className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />,
      cancelled: <XCircle className="w-3 h-3" />,
      completed: <CheckCircle className="w-3 h-3" />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}>
        {statusIcons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Generate initials from pickup city and drop city for now (until auth is implemented)
  const generateInitials = (booking) => {
  if (booking.userId?.name) {
    const names = booking.userId.name.split(' ');
    return names.length > 1 
      ? names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase()
      : names[0].charAt(0).toUpperCase() + names[0].charAt(1).toUpperCase();
  }
  return 'UN'; // Unknown
};

  // Generate display name for now (until auth is implemented)
  const getDisplayName = (booking) => {
  return booking.userId?.name || `User from ${booking.pickupCity}`;
};

const getContactInfo = (booking) => {
  return booking.userId?.mobile || 'Contact info not available';
};

  const filteredSeatBookings = getFilteredBookings(seatBookings);
  const filteredCabBookings = getFilteredBookings(cabBookings);

  if (loading) {
     return <LoadingSpinner text="Loading your dashboard..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <XCircle className="w-12 h-12 mx-auto mb-2" />
            <p className="text-lg font-semibold">Error loading bookings</p>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookings Dashboard</h1>
          <p className="text-gray-600">Manage all your seat and cab bookings in one place</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Seat Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{seatBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Car className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cab Reservations</p>
                <p className="text-2xl font-bold text-gray-900">{cabBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-900">
                  {[...seatBookings, ...cabBookings].filter(b => b.status === 'pending' || b.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getThisWeekBookings([...seatBookings, ...cabBookings]).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-700">Filter by:</span>
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">All Bookings</option>
                <option value="week">This Week</option>
                <option value="date">Specific Date</option>
              </select>

              {filterType === 'date' && (
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent w-64"
              />
            </div>
          </div>
        </div>

        {/* Seat Bookings Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Seat Bookings 
              <span className="text-lg font-normal text-gray-500 ml-2">
                ({filteredSeatBookings.length})
              </span>
            </h2>
          </div>

          {filteredSeatBookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No seat bookings found</h3>
              <p className="text-gray-500">
                {filterType === 'week' ? 'No seat bookings this week' : 
                 filterType === 'date' ? `No seat bookings on ${formatDate(selectedDate)}` :
                 'No seat bookings match your search criteria'}
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredSeatBookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {generateInitials(booking)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {getDisplayName(booking)}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Booked on {formatDate(booking.createdAt)}
                        </p>
                        <p className="text-gray-500 text-sm">
    📞 {getContactInfo(booking)}
  </p>
                      </div>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">From</p>
                        <p className="text-sm text-gray-600">{booking.exactPickup}, {booking.pickupCity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">To</p>
                        <p className="text-sm text-gray-600">{booking.exactDrop}, {booking.dropCity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Travel Date</p>
                        <p className="text-sm text-gray-600">{formatDate(booking.tripDate)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {booking.numberOfSeats} seat{booking.numberOfSeats > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {booking.tripId?.vehicle?.model || 'N/A'} ({booking.tripId?.vehicle?.number || 'N/A'})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ₹{booking.tripId?.seatFare ? booking.tripId.seatFare * booking.numberOfSeats : 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₹{booking.tripId?.seatFare || 'N/A'}/seat
                        </p>
                      </div>
                      {(booking.status === 'pending' || booking.status === 'confirmed') && (
                        <div className="flex gap-2">
                          {booking.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => updateBookingStatus(booking._id, 'confirmed', 'seat')}
                                disabled={updating === booking._id}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                              >
                                {updating === booking._id ? 'Updating...' : 'Accept'}
                              </button>
                              <button 
                                onClick={() => updateBookingStatus(booking._id, 'cancelled', 'seat')}
                                disabled={updating === booking._id}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                              >
                                {updating === booking._id ? 'Updating...' : 'Decline'}
                              </button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <button 
                              onClick={() => updateBookingStatus(booking._id, 'completed', 'seat')}
                              disabled={updating === booking._id}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                              {updating === booking._id ? 'Updating...' : 'Mark Complete'}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cab Reservations Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Car className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Cab Reservations 
              <span className="text-lg font-normal text-gray-500 ml-2">
                ({filteredCabBookings.length})
              </span>
            </h2>
          </div>

          {filteredCabBookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
              <Car className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No cab reservations found</h3>
              <p className="text-gray-500">
                {filterType === 'week' ? 'No cab reservations this week' : 
                 filterType === 'date' ? `No cab reservations on ${formatDate(selectedDate)}` :
                 'No cab reservations match your search criteria'}
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredCabBookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold text-sm">
                          {generateInitials(booking)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {getDisplayName(booking)}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Requested on {formatDate(booking.createdAt)}
                        </p>
                        <p className="text-gray-500 text-sm">
    📞 {getContactInfo(booking)}
  </p>
                      </div>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Pickup Location</p>
                        <p className="text-sm text-gray-600">{booking.exactPickup}, {booking.pickupCity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Date & Time</p>
                        <p className="text-sm text-gray-600">
                          {formatDate(booking.dateTime)} at {formatTime(booking.dateTime)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Vehicle</p>
                        <p className="text-sm text-gray-600">
                          {booking.tripId?.vehicle?.model || 'N/A'} ({booking.tripId?.vehicle?.number || 'N/A'})
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Rate:</span> ₹{booking.tripId?.kmRate || 'N/A'}/km
                    </div>
                    {(booking.status === 'pending' || booking.status === 'confirmed') && (
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => updateBookingStatus(booking._id, 'confirmed', 'cab')}
                              disabled={updating === booking._id}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                            >
                              {updating === booking._id ? 'Updating...' : 'Accept'}
                            </button>
                            <button 
                              onClick={() => updateBookingStatus(booking._id, 'cancelled', 'cab')}
                              disabled={updating === booking._id}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                              {updating === booking._id ? 'Updating...' : 'Decline'}
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button 
                            onClick={() => updateBookingStatus(booking._id, 'completed', 'cab')}
                            disabled={updating === booking._id}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                          >
                            {updating === booking._id ? 'Updating...' : 'Mark Complete'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;