/**
 * Reusable trip card component
 */
import React from 'react';
import { LuArrowRightLeft } from 'react-icons/lu';
import { FaUser } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';

const TripCard = ({ trip, onBook, onEdit, onDelete, showActions = false }) => {
  const {
    pickupCity,
    dropCity,
    exactPickup = [],
    exactDrop = [],
    seatFare,
    kmRate,
    vehicle = {},
    createdAt
  } = trip;

  return (
    <Card hover className="overflow-hidden">
      {/* Vehicle Image */}
      <div className="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg mb-4 flex items-center justify-center">
        <div className="text-yellow-600 opacity-50">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 002 0v-1h14v1a1 1 0 102 0V7.618a1 1 0 00-.553-.894L16 5.118V5a1 1 0 00-1-1H3z"/>
          </svg>
        </div>
      </div>

      {/* Trip Route */}
      <div className="flex items-center gap-3 mb-4">
        <h3 className="font-bold text-lg capitalize flex items-center gap-2">
          <span className="truncate">{pickupCity}</span>
          <LuArrowRightLeft className="flex-shrink-0 text-gray-400" />
          <span className="truncate">{dropCity}</span>
        </h3>
      </div>

      {/* Pickup Points */}
      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-2">Pickup Points:</p>
        <div className="flex flex-wrap gap-1">
          {exactPickup.slice(0, 3).map((point, idx) => (
            <span key={idx} className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
              {point}
            </span>
          ))}
          {exactPickup.length > 3 && (
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              +{exactPickup.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Drop Points */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Drop Points:</p>
        <div className="flex flex-wrap gap-1">
          {exactDrop.slice(0, 3).map((point, idx) => (
            <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {point}
            </span>
          ))}
          {exactDrop.length > 3 && (
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              +{exactDrop.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="text-sm text-gray-600 mb-4">
        <p><span className="font-medium">Vehicle:</span> {vehicle.model || 'N/A'}</p>
        <p><span className="font-medium">Type:</span> {vehicle.type || 'N/A'} • {vehicle.seats || 'N/A'} seats</p>
      </div>

      {/* Host Info */}
      <div className="flex items-center gap-2 text-gray-600 mb-4">
        <FaUser className="text-gray-400" />
        <span className="text-sm">Hosted by @user123</span>
        <span className="ml-auto text-yellow-500 text-sm">★ 4.5</span>
      </div>

      {/* Pricing and Actions */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-gray-500">Seat Fare</p>
                <p className="font-bold text-lg text-yellow-600">₹{seatFare || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Per KM</p>
                <p className="font-bold text-lg text-yellow-600">₹{kmRate || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {onBook && (
            <Button 
              onClick={() => onBook(trip._id)} 
              className="flex-1"
              variant="primary"
            >
              Book Now
            </Button>
          )}
          
          {showActions && (
            <>
              {onEdit && (
                <Button 
                  onClick={() => onEdit(trip._id)} 
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button 
                  onClick={() => onDelete(trip._id)} 
                  variant="danger"
                  size="sm"
                >
                  Delete
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TripCard;