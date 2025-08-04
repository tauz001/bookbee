import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CabBookingForm from "../../components/booking/CabBookingForm";
import SeatBookingForm from "../../components/booking/SeatBookingForm";
import { getHostedTrip } from "../../services/hostService";
import { userBookingOnServer } from "../../services/storeService";
import { BOOKING_TYPES } from "../../config/constants";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

const UserBooking = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  
  const [bookingType, setBookingType] = useState(BOOKING_TYPES.SEAT);
  const [selectedTripDetails, setSelectedTripDetails] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleBookingTypeChange = (event) => {
    setBookingType(event.target.value);
    setFormData(null); // Reset form data when changing booking type
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData) {
      alert("Please fill all the required fields.");
      return;
    }

    const payload = {
      bookingType,
      tripId,
      ...formData
    };

    try {
      setSubmitting(true);
      await userBookingOnServer(payload);
      navigate("/bookings");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to book: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchTripDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const trip = await getHostedTrip(tripId);
      setSelectedTripDetails(trip);
    } catch (err) {
      setError("Failed to load trip details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tripId) {
      fetchTripDetails();
    }
  }, [tripId]);

  // Loading State
  if (loading) {
    return <LoadingSpinner text="Loading trip details..." />;
  }

  // Error State
  if (error) {
    return <ErrorMessage message={error} onRetry={fetchTripDetails} />;
  }

  // No trip found
  if (!selectedTripDetails) {
    return <ErrorMessage message="Trip not found" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Trip</h1>
          <p className="text-gray-600">
            {selectedTripDetails.pickupCity} → {selectedTripDetails.dropCity}
          </p>
        </div>

        {/* Trip Summary */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Trip Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Vehicle:</span>
              <p>{selectedTripDetails.vehicle?.model} • {selectedTripDetails.vehicle?.type}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Seats:</span>
              <p>{selectedTripDetails.vehicle?.seats} available</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Seat Fare:</span>
              <p className="text-yellow-600 font-bold">₹{selectedTripDetails.seatFare}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Rate per KM:</span>
              <p className="text-yellow-600 font-bold">₹{selectedTripDetails.kmRate}</p>
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
                onChange={handleBookingTypeChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value={BOOKING_TYPES.SEAT}>Shared Ride (Book Seat)</option>
                <option value={BOOKING_TYPES.CAB}>Private Ride (Reserve Cab)</option>
              </select>
            </div>

            {/* Dynamic Form Content */}
            {bookingType === "reserveSeat" ? (
              <SeatBookingForm 
                selectedTripDetails={selectedTripDetails} 
                onFormDataChange={setFormData} 
              />
            ) : (
              <CabBookingForm 
                selectedTripDetails={selectedTripDetails} 
                onFormDataChange={setFormData} 
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
                  disabled={!formData}
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