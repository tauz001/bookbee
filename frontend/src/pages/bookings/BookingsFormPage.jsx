/**
 * Page for booking a specific trip (seat or cab)
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TripService } from '../../services/tripService';
import { userBookingOnServer } from '../../services/storeService';
import { BOOKING_TYPES, APP_ROUTES } from '../../config/constants';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const BookingFormPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [trip, setTrip] = useState(null);
  const [bookingType, setBookingType] = useState(BOOKING_TYPES.SEAT);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch trip details
   */
  const fetchTrip = async () => {
    try {
      setLoading(true);
      setError(null);
      const tripData = await TripService.getTripById(tripId);
      setTrip(tripData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);

      if (!formData) {
        throw new Error('Please fill in the booking details');
      }

      const response = await userBookingOnServer({
        ...formData,
        hostedTripId: tripId,
        bookingType
      });

      navigate(APP_ROUTES.BOOKINGS_LIST);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
    
    if (!formData) {
      alert('Please fill all required fields.');
      return;
    }
    
    // Validate all required fields have values
    const hasEmptyFields = Object.values(formData).some(value => 
      value === null || value === undefined || value === ''
    );
    
    if (hasEmptyFields) {
      alert('Please fill all required fields.');
      return;
    }

    // Additional validation based on booking type
    if (bookingType === BOOKING_TYPES.SEAT) {
      if (!formData.pickupCity || !formData.dropCity || !formData.exactPickup || 
          !formData.exactDrop || !formData.onDate || formData.onDate.trim() === '') {
        alert('Please fill all required fields for seat booking.');
        return;
      }
    } else if (bookingType === BOOKING_TYPES.CAB) {
      if (!formData.pickupCity || !formData.exactPickup || 
          !formData.dateTime || formData.dateTime.trim() === '') {
        alert('Please fill all required fields for cab booking.');
        return;
      }
    }

    try {
      setSubmitting(true);
      
      console.log('Form Data before submission:', formData);
      
      const bookingData = {
        ...formData,
        bookingType,
        hostedTripId: tripId
      };

      console.log('Booking Data being sent:', bookingData);
      await userBookingOnServer(bookingData);
      navigate(APP_ROUTES.BOOKINGS);
    } catch (err) {
      alert(`Booking failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Fetch trip on component mount
  useEffect(() => {
    if (tripId) {
      fetchTrip();
    }
  }, [tripId]);

  // Loading State
  if (loading) {
    return <LoadingSpinner text="Loading trip details..." />;
  }

  // Error State
  if (error) {
    return <ErrorMessage message={error} onRetry={fetchTrip} />;
  }

  // Trip not found
  if (!trip) {
    return <ErrorMessage message="Trip not found" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Trip</h1>
          <p className="text-gray-600">
            {trip.pickupCity} → {trip.dropCity}
          </p>
        </div>

        {/* Trip Summary Card */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Trip Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Vehicle:</span>
              <p>{trip.vehicle?.model} • {trip.vehicle?.type}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Seats:</span>
              <p>{trip.vehicle?.seats} available</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Seat Fare:</span>
              <p className="text-yellow-600 font-bold">₹{trip.seatFare}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Rate per KM:</span>
              <p className="text-yellow-600 font-bold">₹{trip.kmRate}</p>
            </div>
          </div>
        </Card>

        {/* Booking Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Booking Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Booking Type
              </label>
              <select
                value={bookingType}
                onChange={(e) => {
                  console.log('Selected booking type:', e.target.value);
                  setBookingType(e.target.value);
                  setFormData(null); // Reset form data when changing booking type
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="reserveSeat">Shared Ride (Book Seat)</option>
                <option value="reserveCab">Private Ride (Reserve Cab)</option>
              </select>
            </div>

            {/* Dynamic Form Content */}
            {bookingType === BOOKING_TYPES.SEAT ? (
              <SeatBookingForm 
                key="seat-form"
                selectedTripDetails={trip} 
                onFormDataChange={(data) => {
                  console.log('Seat Form Data:', data);
                  setFormData(data);
                }} 
              />
            ) : (
              <CabBookingForm 
                key="cab-form"
                selectedTripDetails={trip} 
                onFormDataChange={(data) => {
                  console.log('Cab Form Data:', data);
                  setFormData(data);
                }} 
              />
            )}

            {/* Submit Button */}
            <div className="pt-4 border-t">
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!formData || Object.keys(formData).length === 0}
                  loading={submitting}
                  className="flex-1"
                >
                  {submitting ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

/**
 * Seat booking form component
 */
const SeatBookingForm = ({ selectedTripDetails, onFormDataChange }) => {
  const [formData, setFormData] = useState({
    selectedPickup: '',
    selectedDrop: '',
    selectedDate: '',
    numberOfSeats: '1'
  });

  const { pickupCity, dropCity, exactPickup = [], exactDrop = [], seatFare } = selectedTripDetails || {};

  // Update parent component when form data changes
  useEffect(() => {
    // Create form data object with all fields, even if some are empty
    const pickupCityOrigin = exactPickup.includes(formData.selectedPickup) ? pickupCity : dropCity;
    const dropCityDestination = exactPickup.includes(formData.selectedDrop) ? pickupCity : dropCity;

    const outputData = {
      pickupCity: formData.selectedPickup ? pickupCityOrigin : '',
      exactPickup: formData.selectedPickup || '',
      dropCity: formData.selectedDrop ? dropCityDestination : '',
      exactDrop: formData.selectedDrop || '',
      onDate: formData.selectedDate || '',
      numberOfSeats: formData.numberOfSeats
    };
    
    // Log the form data being sent up
    console.log('SeatBookingForm data:', outputData);
    onFormDataChange(outputData);
    
  }, [formData, exactPickup, pickupCity, dropCity]);

  if (!selectedTripDetails) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-500">Loading trip details...</div>
      </div>
    );
  }

  const isPickupFromPickupCity = exactPickup.includes(formData.selectedPickup);
  const isPickupFromDropCity = exactDrop.includes(formData.selectedPickup);

  return (
    <div className="space-y-6">
      {/* Fare Information */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-green-800">Shared Ride Pricing</h4>
            <p className="mt-1 text-sm text-green-700">
              Fixed fare: <strong>₹{seatFare}</strong> per seat. This covers your entire journey.
            </p>
          </div>
        </div>
      </div>

      {/* Pickup Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pickup Location *
        </label>
        <select
          value={formData.selectedPickup}
          onChange={(e) => setFormData({ ...formData, selectedPickup: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          required
        >
          <option value="">Select pickup location</option>
          <optgroup label={`${pickupCity} (Pickup City)`}>
            {exactPickup.map((point, idx) => (
              <option key={`pickup-${idx}`} value={point}>
                {point}
              </option>
            ))}
          </optgroup>
          <optgroup label={`${dropCity} (Drop City)`}>
            {exactDrop.map((point, idx) => (
              <option key={`drop-${idx}`} value={point}>
                {point}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Drop Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Drop Location *
        </label>
        <select
          value={formData.selectedDrop}
          onChange={(e) => setFormData({ ...formData, selectedDrop: e.target.value })}
          disabled={!formData.selectedPickup}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
        >
          <option value="">Select drop location</option>
          {isPickupFromPickupCity && exactDrop.map((point, idx) => (
            <option key={`drop-option-${idx}`} value={point}>
              {point}
            </option>
          ))}
          {isPickupFromDropCity && exactPickup.map((point, idx) => (
            <option key={`pickup-option-${idx}`} value={point}>
              {point}
            </option>
          ))}
        </select>
        {!formData.selectedPickup && (
          <p className="mt-1 text-sm text-gray-500">Please select pickup location first</p>
        )}
      </div>

      {/* Travel Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Travel Date *
        </label>
        <input
          type="date"
          value={formData.selectedDate}
          onChange={(e) => setFormData({ ...formData, selectedDate: e.target.value })}
          min={new Date().toISOString().split('T')[0]}
          max={new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          required
        />
      </div>

      {/* Number of Seats */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Seats *
        </label>
        <select
          value={formData.numberOfSeats}
          onChange={(e) => setFormData({ ...formData, numberOfSeats: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          required
        >
          {[...Array(selectedTripDetails.vehicle?.seats || 0)].map((_, idx) => {
            const num = idx + 1;
            return (
              <option key={num} value={num}>{num} {num === 1 ? 'Seat' : 'Seats'}</option>
            );
          })}
        </select>
        <p className="mt-1 text-sm text-gray-500">Select the number of seats you want to book</p>
      </div>
    </div>
  );
};

/**
 * Cab booking form component
 */
const CabBookingForm = ({ selectedTripDetails, onFormDataChange }) => {
  const [selectedPickup, setSelectedPickup] = useState('');
  const [dateTime, setDateTime] = useState('');

  const { pickupCity, dropCity, exactPickup = [], exactDrop = [], kmRate } = selectedTripDetails || {};

  // Update parent component when form data changes
  useEffect(() => {
    // Only update if we have values
    if (selectedPickup && dateTime) {
      const pickupCityOrigin = exactPickup.includes(selectedPickup) ? pickupCity : dropCity;

      const formData = {
        pickupCity: pickupCityOrigin,
        exactPickup: selectedPickup,
        dateTime,
      };
      
      // Only update if values have actually changed
      onFormDataChange(formData);
    }
  }, [selectedPickup, dateTime]); // Only depend on the selected values

  if (!selectedTripDetails) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-500">Loading trip details...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rate Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800">Private Cab Pricing</h4>
            <p className="mt-1 text-sm text-blue-700">
              Rate: <strong>₹{kmRate} per km</strong>. Final fare calculated based on actual distance traveled.
            </p>
          </div>
        </div>
      </div>

      {/* Pickup Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pickup Location *
        </label>
        <select
          value={selectedPickup}
          onChange={(e) => setSelectedPickup(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          required
        >
          <option value="">Select pickup location</option>
          <optgroup label={`${pickupCity} (Pickup City)`}>
            {exactPickup.map((point, idx) => (
              <option key={`pickup-${idx}`} value={point}>
                {point}
              </option>
            ))}
          </optgroup>
          <optgroup label={`${dropCity} (Drop City)`}>
            {exactDrop.map((point, idx) => (
              <option key={`drop-${idx}`} value={point}>
                {point}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Date and Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pickup Date & Time *
        </label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          required
        />
      </div>
    </div>
  );
};

export default BookingFormPage;
