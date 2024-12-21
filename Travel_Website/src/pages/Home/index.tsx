import { useState } from 'react';
import { TripCard } from './TripCard';
import { TripFilters } from './TripFilters';
import { Compass, Map } from 'lucide-react';

// Temporary mock data until we integrate with Supabase
const MOCK_TRIPS = [
  {
    id: '1',
    title: 'Explore the Swiss Alps',
    location: 'Switzerland',
    imageUrl: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86',
    startDate: '2024-07-15',
    endDate: '2024-07-22',
    price: 2499,
    availableSlots: 8,
  },
  {
    id: '2',
    title: 'Japanese Cherry Blossom Tour',
    location: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    startDate: '2024-04-01',
    endDate: '2024-04-10',
    price: 3299,
    availableSlots: 5,
  },
  {
    id: '3',
    title: 'Greek Islands Adventure',
    location: 'Greece',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077',
    startDate: '2024-06-01',
    endDate: '2024-06-08',
    price: 1899,
    availableSlots: 12,
  },
];

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
            alt="Travel background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Explore handcrafted trips to the world's most beautiful destinations
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold flex items-center hover:bg-blue-50">
                <Compass className="h-5 w-5 mr-2" />
                Browse Trips
              </button>
              <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold flex items-center hover:bg-white/10">
                <Map className="h-5 w-5 mr-2" />
                View Destinations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TripFilters
          onSearch={setSearchQuery}
          onSortChange={setSortBy}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TRIPS.map((trip) => (
            <TripCard key={trip.id} {...trip} />
          ))}
        </div>
      </div>
    </div>
  );
}