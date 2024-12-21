import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Check } from 'lucide-react';

// Temporary mock data
const MOCK_TRIP = {
  id: '1',
  title: 'Explore the Swiss Alps',
  location: 'Switzerland',
  imageUrl: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86',
  startDate: '2024-07-15',
  endDate: '2024-07-22',
  price: 2499,
  availableSlots: 8,
  description: 'Experience the breathtaking beauty of the Swiss Alps on this week-long adventure. From scenic hikes to charming mountain villages, this trip offers the perfect blend of outdoor activities and cultural experiences.',
  itinerary: [
    'Day 1: Arrival in Zurich, Welcome Dinner',
    'Day 2: Transfer to Zermatt, Mountain Tour',
    'Day 3: Hiking in the Alps',
    'Day 4: Visit to Glacier Paradise',
    'Day 5: Mountain Biking Adventure',
    'Day 6: Swiss Chocolate Workshop',
    'Day 7: Free Day for Shopping',
    'Day 8: Departure'
  ],
  inclusions: [
    'All accommodations',
    'Daily breakfast and dinner',
    'Professional guide',
    'All transportation',
    'Equipment rental',
    'Welcome and farewell dinners',
    'Emergency support'
  ]
};

export function TripDetails() {
  const { id } = useParams<{ id: string }>();
  const [selectedSlots, setSelectedSlots] = useState(1);

  const handleBook = () => {
    // TODO: Implement booking logic
    console.log('Booking trip:', id, 'slots:', selectedSlots);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="h-96 relative">
        <img
          src={MOCK_TRIP.imageUrl}
          alt={MOCK_TRIP.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            {MOCK_TRIP.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">About This Trip</h2>
              <p className="text-gray-600">{MOCK_TRIP.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
              <div className="space-y-4">
                {MOCK_TRIP.itinerary.map((day, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-4">
                      {index + 1}
                    </div>
                    <p className="text-gray-600">{day}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_TRIP.inclusions.map((inclusion, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">{inclusion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">${MOCK_TRIP.price}</span>
                  <span className="text-gray-500">per person</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  {MOCK_TRIP.location}
                </div>

                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  {MOCK_TRIP.startDate} - {MOCK_TRIP.endDate}
                </div>

                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  {MOCK_TRIP.availableSlots} spots left
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <select
                    value={selectedSlots}
                    onChange={(e) => setSelectedSlots(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {[...Array(Math.min(MOCK_TRIP.availableSlots, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Total</span>
                    <span className="font-bold">
                      ${MOCK_TRIP.price * selectedSlots}
                    </span>
                  </div>
                  <button
                    onClick={handleBook}
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}