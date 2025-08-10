import React from 'react';

const ProfilePage = () => {
  // Hardcoded user data - to be replaced with real data later
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '+1 (555) 123-4567',
    joinedDate: 'August 2023',
    profileImage: 'https://via.placeholder.com/150',
    totalTrips: 15,
    totalBookings: 8,
    preferences: {
      preferredSeats: 'Window',
      preferredPayment: 'Credit Card',
      communicationPrefs: ['Email', 'SMS']
    },
    recentBookings: [
      {
        id: 1,
        tripDate: '2025-08-15',
        from: 'New York',
        to: 'Boston',
        status: 'Upcoming',
        vehicle: 'Toyota Innova',
        price: '$45.00'
      },
      {
        id: 2,
        tripDate: '2025-08-01',
        from: 'Boston',
        to: 'Washington DC',
        status: 'Completed',
        vehicle: 'Maruti Dzire',
        price: '$55.00'
      },
      {
        id: 3,
        tripDate: '2025-07-25',
        from: 'Washington DC',
        to: 'Philadelphia',
        status: 'Completed',
        vehicle: 'Toyota Innova',
        price: '$40.00'
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative">
            <img
              src={userData.profileImage}
              alt={userData.name}
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
            <p className="text-yellow-100">Member since {userData.joinedDate}</p>
            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-4">
              <div className="bg-yellow-400/20 px-4 py-2 rounded-full">
                <span className="text-white">{userData.totalTrips} Trips</span>
              </div>
              <div className="bg-yellow-400/20 px-4 py-2 rounded-full">
                <span className="text-white">{userData.totalBookings} Bookings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="text-gray-800">{userData.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <p className="text-gray-800">{userData.phoneNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Preferred Seat</label>
                <p className="text-gray-800">{userData.preferences.preferredSeats}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Payment Method</label>
                <p className="text-gray-800">{userData.preferences.preferredPayment}</p>
              </div>
              <button className="mt-4 w-full bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 px-4 rounded-lg transition duration-150">
                Edit Information
              </button>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(booking.tripDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {booking.from} → {booking.to}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {booking.vehicle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {booking.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'Upcoming' 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-100">
              <button className="text-yellow-600 hover:text-yellow-700 font-medium">
                View All Bookings →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
