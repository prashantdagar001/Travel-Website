import { useState } from 'react';
import { TripForm } from './TripForm';
import { PlusCircle, BarChart2 } from 'lucide-react';

// Temporary mock data until we integrate with Supabase
const MOCK_TRIPS = [
  {
    id: '1',
    title: 'Swiss Alps Adventure',
    location: 'Switzerland',
    startDate: '2024-07-15',
    bookings: 12,
    revenue: 29988,
    status: 'active',
  },
  {
    id: '2',
    title: 'Tokyo Explorer',
    location: 'Japan',
    startDate: '2024-08-01',
    bookings: 8,
    revenue: 26392,
    status: 'active',
  },
];

export function OrganizerDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [trips] = useState(MOCK_TRIPS);

  const handleCreateTrip = (tripData: any) => {
    // TODO: Implement trip creation with Supabase
    console.log('Creating trip:', tripData);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trip Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Create and manage your travel experiences
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create New Trip
          </button>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Total Revenue</h3>
              <BarChart2 className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              ${trips.reduce((sum, trip) => sum + trip.revenue, 0).toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Active Trips</h3>
              <BarChart2 className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {trips.length}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Total Bookings</h3>
              <BarChart2 className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {trips.reduce((sum, trip) => sum + trip.bookings, 0)}
            </p>
          </div>
        </div>

        {/* Trip Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Trip</h2>
            <TripForm onSubmit={handleCreateTrip} />
          </div>
        )}

        {/* Trip List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trip
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trips.map((trip) => (
                <tr key={trip.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{trip.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{trip.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{trip.startDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{trip.bookings}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${trip.revenue.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}