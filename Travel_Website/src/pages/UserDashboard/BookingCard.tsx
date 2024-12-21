import { format } from 'date-fns';
import { Calendar, MapPin, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookingCardProps {
  id: string;
  tripTitle: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalAmount: number;
  onCancel: (id: string) => void;
}

export function BookingCard({
  id,
  tripTitle,
  location,
  startDate,
  endDate,
  status,
  totalAmount,
  onCancel,
}: BookingCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{tripTitle}</h3>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="flex items-center text-gray-600 mb-4">
        <Calendar className="h-4 w-4 mr-1" />
        {format(new Date(startDate), 'MMM d')} - {format(new Date(endDate), 'MMM d, yyyy')}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-600">
          Total: <span className="font-semibold">${totalAmount}</span>
        </span>
        <div className="space-x-3">
          <Link
            to={`/trips/${id}`}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View Trip
          </Link>
          {status !== 'cancelled' && (
            <button
              onClick={() => onCancel(id)}
              className="text-red-600 hover:text-red-700 font-medium text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}