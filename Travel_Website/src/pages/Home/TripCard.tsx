import { format } from 'date-fns';
import { MapPin, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TripCardProps {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  price: number;
  availableSlots: number;
}

export function TripCard({
  id,
  title,
  location,
  imageUrl,
  startDate,
  endDate,
  price,
  availableSlots,
}: TripCardProps) {
  return (
    <Link to={`/trips/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-[1.02]">
        <div className="relative h-48">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
            ${price}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {location}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {format(new Date(startDate), 'MMM d')} - {format(new Date(endDate), 'MMM d, yyyy')}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              {availableSlots} spots left
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}