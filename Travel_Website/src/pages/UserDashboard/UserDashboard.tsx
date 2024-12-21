import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BookingCard } from './BookingCard';
import { Settings } from 'lucide-react';

// Temporary mock data until we integrate with Supabase
const MOCK_BOOKINGS = [
  {
    id: '1',
    tripTitle: 'Swiss Alps Adventure',
    location: 'Switzerland',
    startDate: '2024-07-15',
    endDate: '2024-07-22',
    status: 'confirmed' as const,
    totalAmount: 2499,
  },
  {
    id: '2',
    tripTitle: 'Tokyo Explorer',
    location: 'Japan',
    startDate: '2024-08-01',
    endDate: '2024-08-10',
    status: 'pending' as const,
    totalAmount: 3299,
  },
];

export function UserDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);

  const handleCancelBooking = async (bookingId: string) => {
    // TODO: Implement cancellation logic with Supabase
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <Settings className="h-5 w-5 mr-2" />
            Account Settings
          </button>
        </div>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              {...booking}
              onCancel={handleCancelBooking}
            />
          ))}
        </div>
      </div>
    </div>
  );
}