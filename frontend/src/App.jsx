import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import TripsListPage from './pages/trips/TripsListPage';
import BookingsListPage from './pages/bookings/BookingsListPage';
import CreateTripPage from './pages/host/CreateTripPage';
import HostTripsListPage from './pages/host/HostTripsListPage';
import { APP_ROUTES } from './config/constants';
import BookingFormPage from './pages/bookings/BookingsFormPage';
import BookingDetailsPage from './pages/user/BookingDetailsPage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsOfServicePage from './pages/legal/TermsOfServicePage';
import CookiePolicyPage from './pages/legal/CookiePolicyPage';
import ProfilePage from './pages/user/ProfilePage';
import HostDashboard from './pages/host/HostDashboard,';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar setIsLoginModalOpen={setIsLoginModalOpen} setIsSignUpModalOpen={setIsSignUpModalOpen} />
        <main>
          <Routes>
            <Route path={APP_ROUTES.HOME} element={<HomePage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} isSignUpModalOpen={isSignUpModalOpen} setIsSignUpModalOpen={setIsSignUpModalOpen} />} />
            <Route path={APP_ROUTES.TRIPS} element={<TripsListPage />} />
            <Route path={APP_ROUTES.BOOKINGS} element={<BookingsListPage />} />
            <Route path="/book/:tripId" element={<BookingFormPage />} />
            <Route path="/bookings/:type/:id" element={<BookingDetailsPage />} />
            <Route path={APP_ROUTES.HOST_NEW} element={<CreateTripPage />} />
            <Route path={APP_ROUTES.HOST_TRIPS} element={<HostTripsListPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path={APP_ROUTES.HOST_DASHBOARD} element={<HostDashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// 404 Page Component
const NotFoundPage = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-600 mb-6">Oops!, The page you're looking for doesn't exist.</p>
      <a 
        href="/" 
        className="inline-block bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
      >
        Go Home
      </a>
    </div>
  </div>
);

export default App;
