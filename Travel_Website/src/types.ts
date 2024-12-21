export interface Trip {
  id: string;
  organizer_id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  price: number;
  capacity: number;
  location: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  trip_id: string;
  user_id: string;
  status: "confirmed" | "cancelled";
  booking_date: string;
  cancellation_date?: string;
  refund_amount?: number;
  created_at: string;
  trip: Trip;
}

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  status: "pending" | "completed" | "refunded";
  payment_method: string;
  created_at: string;
}
