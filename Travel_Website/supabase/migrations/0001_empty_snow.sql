/*
 # Initial Schema Setup for Travel Booking Platform
 
 1. New Tables
 - users (extends auth.users)
 - id (uuid, references auth.users)
 - role (enum: user, organizer, admin)
 - full_name (text)
 - avatar_url (text)
 - created_at (timestamp)
 
 - trips
 - id (uuid)
 - organizer_id (uuid, references users)
 - title (text)
 - description (text)
 - image_url (text)
 - start_date (date)
 - end_date (date)
 - price (numeric)
 - available_slots (integer)
 - location (text)
 - itinerary (jsonb)
 - inclusions (jsonb)
 - created_at (timestamp)
 
 - bookings
 - id (uuid)
 - trip_id (uuid, references trips)
 - user_id (uuid, references users)
 - status (enum: pending, confirmed, cancelled)
 - total_amount (numeric)
 - booking_date (timestamp)
 - cancellation_date (timestamp)
 
 - payments
 - id (uuid)
 - booking_id (uuid, references bookings)
 - amount (numeric)
 - status (enum: pending, completed, refunded)
 - stripe_payment_id (text)
 - created_at (timestamp)
 
 2. Security
 - Enable RLS on all tables
 - Add policies for each table based on user roles
 */
-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'organizer', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'refunded');

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users,
  role user_role DEFAULT 'user',
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);
-- Create trips table
CREATE TABLE trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organizer_id uuid REFERENCES users NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  available_slots integer NOT NULL CHECK (available_slots >= 0),
  location text NOT NULL,
  itinerary jsonb NOT NULL DEFAULT '[]'::jsonb,
  inclusions jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
  updated_at timestamptz DEFAULT now()
);
-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips NOT NULL,
  user_id uuid REFERENCES users NOT NULL,
  status booking_status DEFAULT 'pending',
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  refund_amount decimal,
  booking_date timestamptz DEFAULT now(),
  cancellation_date timestamptz,
  created_at timestamptz DEFAULT now()
);
-- Create payments table
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings NOT NULL,
  amount numeric NOT NULL CHECK (amount >= 0),
  status payment_status DEFAULT 'pending',
  stripe_payment_id text,
  payment_method text NOT NULL,
  created_at timestamptz DEFAULT now()
);
-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
-- Users policies
CREATE POLICY "Users can view their own profile" ON users FOR
SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON users FOR
UPDATE USING (auth.uid() = id);
-- Trips policies
CREATE POLICY "Anyone can view trips" ON trips FOR
SELECT TO authenticated USING (true);
CREATE POLICY "Organizers can create trips" ON trips FOR
INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1
      FROM users
      WHERE users.id = auth.uid()
        AND users.role = 'organizer'
    )
  );
CREATE POLICY "Organizers can update their own trips" ON trips FOR
UPDATE TO authenticated USING (
    organizer_id = auth.uid()
    OR EXISTS (
      SELECT 1
      FROM users
      WHERE users.id = auth.uid()
        AND users.role = 'admin'
    )
  );
-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON bookings FOR
SELECT TO authenticated USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1
      FROM trips
      WHERE trips.id = trip_id
        AND trips.organizer_id = auth.uid()
    )
  );
CREATE POLICY "Users can create bookings" ON bookings FOR
INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
-- Payments policies
CREATE POLICY "Users can view their own payments" ON payments FOR
SELECT TO authenticated USING (
    EXISTS (
      SELECT 1
      FROM bookings
      WHERE bookings.id = booking_id
        AND bookings.user_id = auth.uid()
    )
  );