import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // ADD THIS
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
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider> {/* WRAP WITH AUTH PROVIDER */}
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path={APP_ROUTES.HOME} element={<HomePage />} />
              
<Route path={APP_ROUTES.TRIPS} element={<TripsListPage />} />    
<Route path={APP_ROUTES.BOOKINGS} element={
  <ProtectedRoute requireAuth={true}>
    <BookingsListPage />
  </ProtectedRoute>
} />           
<Route path="/book/:tripId" element={
  <ProtectedRoute requireAuth={true}>
    <BookingFormPage />
  </ProtectedRoute>
} />
<Route path="/bookings/:type/:id" element={
  <ProtectedRoute requireAuth={true}>
    <BookingDetailsPage />
  </ProtectedRoute>
} />
<Route path={APP_ROUTES.HOST_NEW} element={
  <ProtectedRoute requireAuth={true} requireHost={true}>
    <CreateTripPage />
  </ProtectedRoute>
} />
<Route path="/profile" element={
  <ProtectedRoute requireAuth={true}>
    <ProfilePage />
  </ProtectedRoute>
} />
<Route path={APP_ROUTES.HOST_TRIPS} element={
  <ProtectedRoute requireAuth={true} requireHost={true}>
    <HostTripsListPage />
  </ProtectedRoute>
} />
<Route path={APP_ROUTES.HOST_DASHBOARD} element={
  <ProtectedRoute requireAuth={true} requireHost={true}>
    <HostDashboard />
  </ProtectedRoute>
} />
              
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="*" element={<NotFoundPage />} />
              
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
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