import { useEffect, useState } from "react";
import { Calendar, DollarSign, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { Booking, Trip } from "../../types";

export default function BookingManagement() {
  const [bookings, setBookings] = useState<(Booking & { trip: Trip })[]>([]);

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("bookings")
      .select(
        `
        *,
        trip:trips(*)
      `
      )
      .eq("user_id", user.id)
      .order("booking_date", { ascending: false });

    if (data) setBookings(data);
  };

  const handleCancelBooking = async (bookingId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking? Refund amount will be calculated based on cancellation policy."
    );
    if (!confirmed) return;

    const { data: booking } = await supabase
      .from("bookings")
      .update({
        status: "cancelled",
        cancellation_date: new Date().toISOString(),
      })
      .eq("id", bookingId)
      .select()
      .single();

    if (booking) {
      // Calculate refund amount
      const { data: refundAmount } = await supabase.rpc(
        "calculate_refund_amount",
        {
          booking_id: bookingId,
        }
      );

      if (refundAmount > 0) {
        await supabase
          .from("bookings")
          .update({ refund_amount: refundAmount })
          .eq("id", bookingId);

        await supabase.from("payments").insert({
          booking_id: bookingId,
          amount: refundAmount,
          status: "refunded",
          payment_method: "refund",
        });
      }

      loadUserBookings();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {booking.trip.title}
                </h3>
                <p className="text-gray-600">{booking.trip.description}</p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span>
                  {new Date(booking.trip.start_date).toLocaleDateString()} -{" "}
                  {new Date(booking.trip.end_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-5 h-5 mr-2" />
                <span>Price: ${booking.trip.price}</span>
              </div>
              {booking.refund_amount && (
                <div className="flex items-center text-green-600">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <span>Refunded: ${booking.refund_amount}</span>
                </div>
              )}
            </div>

            {booking.status === "confirmed" && (
              <div className="mt-6">
                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Cancel Booking
                </button>
                <p className="mt-2 text-sm text-gray-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Cancellation policy: Full refund 15+ days before, 50% refund
                  7-14 days before, no refund within 7 days
                </p>
              </div>
            )}
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            You haven't made any bookings yet.
          </div>
        )}
      </div>
    </div>
  );
}
