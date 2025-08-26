import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import { APP_ROUTES } from './config/constants';

// Lazy load components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const TripsListPage = React.lazy(() => import('./pages/trips/TripsListPage'));
const BookingsListPage = React.lazy(() => import('./pages/bookings/BookingsListPage'));
const CreateTripPage = React.lazy(() => import('./pages/host/CreateTripPage'));
const HostTripsListPage = React.lazy(() => import('./pages/host/HostTripsListPage'));
const BookingFormPage = React.lazy(() => import('./pages/bookings/BookingsFormPage'));
const BookingDetailsPage = React.lazy(() => import('./pages/user/BookingDetailsPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/legal/PrivacyPolicyPage'));
const TermsOfServicePage = React.lazy(() => import('./pages/legal/TermsOfServicePage'));
const CookiePolicyPage = React.lazy(() => import('./pages/legal/CookiePolicyPage'));
const ProfilePage = React.lazy(() => import('./pages/user/ProfilePage'));
const HostDashboard = React.lazy(() => import('./pages/host/HostDashboard'));
const ProtectedRoute = React.lazy(() => import('./components/auth/ProtectedRoute'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="py-4">
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              }>
                <Routes>
                  <Route path={APP_ROUTES.HOME} element={<HomePage />} />
                  <Route path={APP_ROUTES.TRIPS} element={<TripsListPage />} />
                  <Route 
                    path={APP_ROUTES.BOOKINGS} 
                    element={
                      <ProtectedRoute requireAuth={true}>
                        <BookingsListPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/book/:tripId" 
                    element={
                      <ProtectedRoute requireAuth={true}>
                        <BookingFormPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/bookings/:type/:id" 
                    element={
                      <ProtectedRoute requireAuth={true}>
                        <BookingDetailsPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path={APP_ROUTES.HOST_NEW} 
                    element={
                      <ProtectedRoute requireAuth={true} requireHost={true}>
                        <CreateTripPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute requireAuth={true}>
                        <ProfilePage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path={APP_ROUTES.HOST_TRIPS} 
                    element={
                      <ProtectedRoute requireAuth={true} requireHost={true}>
                        <HostTripsListPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path={APP_ROUTES.HOST_DASHBOARD} 
                    element={
                      <ProtectedRoute requireAuth={true} requireHost={true}>
                        <HostDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

// 404 Page Component
const NotFoundPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Log the 404 error for monitoring
    console.error('404 Error: Page not found');
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/')}
          className="inline-block bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
          aria-label="Go to home page"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default App;