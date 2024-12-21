import React, { useEffect, useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { Trip } from "../../types";
import TripForm from "./TripForm";

export default function OrganizerDashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showTripForm, setShowTripForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

  useEffect(() => {
    loadOrganizerTrips();
  }, []);

  const loadOrganizerTrips = async () => {
    const { data: profile } = await supabase
      .from("organizer_profiles")
      .select("id")
      .single();

    if (profile) {
      const { data: trips } = await supabase
        .from("trips")
        .select("*")
        .eq("organizer_id", profile.id)
        .order("start_date", { ascending: true });

      if (trips) setTrips(trips);
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip?"
    );
    if (!confirmed) return;

    await supabase.from("trips").delete().eq("id", tripId);
    loadOrganizerTrips();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Trip Organizer Dashboard</h1>
        <button
          onClick={() => setShowTripForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusCircle size={20} />
          Add New Trip
        </button>
      </div>

      {showTripForm && (
        <TripForm
          trip={editingTrip}
          onClose={() => {
            setShowTripForm(false);
            setEditingTrip(null);
          }}
          onSave={() => {
            loadOrganizerTrips();
            setShowTripForm(false);
            setEditingTrip(null);
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
            <p className="text-gray-600 mb-4">{trip.description}</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">
                  {new Date(trip.start_date).toLocaleDateString()} -{" "}
                  {new Date(trip.end_date).toLocaleDateString()}
                </p>
                <p className="text-lg font-bold">${trip.price}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingTrip(trip);
                    setShowTripForm(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteTrip(trip.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
