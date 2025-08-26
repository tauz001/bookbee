import React from 'react';
import PropTypes from 'prop-types';
import { LuArrowRightLeft } from 'react-icons/lu';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';

const HostTripCard = ({ trip, onEdit, onDelete }) => {
  const {
    _id,
    pickupCity,
    dropCity,
    exactPickup,
    exactDrop,
    seatFare,
    vehicle = {},
    createdAt,
    updatedAt,
    isActive
  } = trip;

  return (
    <Card className="overflow-hidden">
      {/* Image Container */}
      <div className="relative h-48">
        {vehicle.image ? (
          <img 
            src={vehicle.image} 
            alt={vehicle.model || 'Vehicle'} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
            <div className="text-yellow-600 opacity-50">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 002 0v-1h14v1a1 1 0 102 0V7.618a1 1 0 00-.553-.894L16 5.118V5a1 1 0 00-1-1H3z"/>
              </svg>
            </div>
          </div>
        )}
        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            variant="light"
            size="sm"
            onClick={() => onEdit(_id)}
            className="flex items-center gap-1"
          >
            <FaEdit className="text-blue-600" />
            <span>Edit</span>
          </Button>
          <Button
            variant="light"
            size="sm"
            onClick={() => onDelete(_id)}
            className="flex items-center gap-1"
          >
            <FaTrash className="text-red-600" />
            <span>Delete</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Route */}
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg capitalize flex items-center gap-2">
            <span className="truncate">{pickupCity}</span>
            <LuArrowRightLeft className="flex-shrink-0 text-gray-400" />
            <span className="truncate">{dropCity}</span>
          </h3>
          <span className={`ml-auto px-2 py-1 rounded text-xs font-medium ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Pickup Points */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Pickup Points:</p>
          <div className="flex flex-wrap gap-1">
            {exactPickup.map((point, idx) => (
              <span
                key={idx}
                className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full"
              >
                {point}
              </span>
            ))}
          </div>
        </div>

        {/* Drop Points */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Drop Points:</p>
          <div className="flex flex-wrap gap-1">
            {exactDrop.map((point, idx) => (
              <span
                key={idx}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {point}
              </span>
            ))}
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="text-sm text-gray-600">
          <p><span className="font-medium">Vehicle:</span> {vehicle.model || 'N/A'}</p>
          <p><span className="font-medium">Type:</span> {vehicle.type || 'N/A'} • {vehicle.seats || 'N/A'} seats</p>
        </div>

        {/* Dates */}
        <div className="text-sm text-gray-500 space-y-1">
          <p>Created: {new Date(createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(updatedAt).toLocaleDateString()}</p>
        </div>

        {/* Price */}
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500">Price per seat</p>
          <p className="font-bold text-lg text-yellow-600">₹{seatFare}</p>
        </div>
      </div>
    </Card>
  );
};

HostTripCard.propTypes = {
  trip: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    pickupCity: PropTypes.string.isRequired,
    dropCity: PropTypes.string.isRequired,
    exactPickup: PropTypes.arrayOf(PropTypes.string).isRequired,
    exactDrop: PropTypes.arrayOf(PropTypes.string).isRequired,
    seatFare: PropTypes.number.isRequired,
    vehicle: PropTypes.shape({
      model: PropTypes.string,
      type: PropTypes.string,
      seats: PropTypes.number
    }),
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default HostTripCard;
