import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { TripDetails } from "./pages/TripDetails";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UserDashboard } from "./pages/UserDashboard";
// import { OrganizerDashboard } from "./pages/OrganizerDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import OrganizerRegistration from "./components/organizer/OrganizerRegistration";
import OrganizerDashboard from "./components/organizer/OrganizerDashboard";
import BookingManagement from "./components/booking/BookingManagement";
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trips/:id" element={<TripDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route
                path="/organizer/register"
                element={<OrganizerRegistration />}
              />
              <Route
                path="/organizer/dashboard"
                element={<OrganizerDashboard />}
              />
              <Route path="/bookings" element={<BookingManagement />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
