/**
 * Page for hosts to create new trips
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripService } from '../../services/tripService';
import { APP_ROUTES } from '../../config/constants';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const CreateTripPage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    pickupCity: '',
    exactPickup: '',
    dropCity: '',
    exactDrop: '',
    seatFare: '',
    kmRate: '',
    date: '',
    model: '',
    number: '',
    type: '',
    seats: ''
  });
  
  const [errors, setErrors] = useState({});

  // Form configuration
  const cities = ['Shahganj', 'Lucknow'];
  const vehicleModels = ['Toyota Innova', 'Maruti Ertiga', 'Mahindra XUV'];
  const vehicleTypes = ['SUV', 'Sedan', 'Hatchback'];
  const seatOptions = ['4', '5', '6', '7'];

  /**
   * Handle input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert vehicle number to uppercase
    const newValue = name === 'number' ? value.toUpperCase() : value;
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      // Prepare data for API
      const tripData = {
        ...formData,
        exactPickup: formData.exactPickup.trim().split(/\s+/),
        exactDrop: formData.exactDrop.trim().split(/\s+/),
        seatFare: parseInt(formData.seatFare),
        kmRate: parseInt(formData.kmRate),
        seats: parseInt(formData.seats),
        number: formData.number.toUpperCase() // Ensure number is uppercase when submitting
      };

      await TripService.createTrip(tripData);
      navigate(APP_ROUTES.HOST_TRIPS);
    } catch (err) {
      alert(`Failed to create trip: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Host a New Trip</h1>
          <p className="text-gray-600">Create a new trip listing for other travelers</p>
        </div>

        {/* Form Card */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Route Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Route Information</h3>
              </div>

              {/* Pickup City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup City *
                </label>
                <select
                  name="pickupCity"
                  value={formData.pickupCity}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                >
                  {cities.map(city => (
                    <option key={city.toLowerCase()} value={city.toLowerCase()}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Drop City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Drop City *
                </label>
                <select
                  name="dropCity"
                  value={formData.dropCity}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                >
                  {cities.map(city => (
                    <option key={city.toLowerCase()} value={city.toLowerCase()}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Exact Pickup Locations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Locations *
                </label>
                <input
                  type="text"
                  name="exactPickup"
                  value={formData.exactPickup}
                  onChange={handleInputChange}
                  placeholder="Enter pickup points separated by spaces"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Example: "Railway Station Bus Stand Airport"
                </p>
              </div>

              {/* Exact Drop Locations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Drop Locations *
                </label>
                <input
                  type="text"
                  name="exactDrop"
                  value={formData.exactDrop}
                  onChange={handleInputChange}
                  placeholder="Enter drop points separated by spaces"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Example: "Mall Road Hazratganj Gomti Nagar"
                </p>
              </div>

              {/* Pricing Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">Pricing Information</h3>
              </div>

              {/* Seat Fare */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seat Fare (₹) *
                </label>
                <input
                  type="number"
                  name="seatFare"
                  value={formData.seatFare}
                  onChange={handleInputChange}
                  placeholder="e.g., 500"
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">Fixed price for shared rides</p>
              </div>

              {/* KM Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate per KM (₹) *
                </label>
                <input
                  type="number"
                  name="kmRate"
                  value={formData.kmRate}
                  onChange={handleInputChange}
                  placeholder="e.g., 15"
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">Rate for private cab bookings</p>
              </div>

              {/* Trip Date */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trip Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>

              {/* Vehicle Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">Vehicle Information</h3>
              </div>

              {/* Vehicle Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Model *
                </label>
                <select
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                >
                  {vehicleModels.map(model => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                >
                  {vehicleTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Number *
                </label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  placeholder="e.g., UP65 AB 1234"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent uppercase"
                  style={{ textTransform: 'uppercase' }}
                  autoCapitalize="characters"
                  required
                />
              </div>

              {/* Total Seats */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Seats *
                </label>
                <select
                  name="seats"
                  value={formData.seats}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                >
                  {seatOptions.map(seat => (
                    <option key={seat} value={seat}>
                      {seat} seats
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(APP_ROUTES.HOST_TRIPS)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={submitting}
                className="flex-1"
              >
                {submitting ? 'Creating Trip...' : 'Create Trip'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateTripPage;