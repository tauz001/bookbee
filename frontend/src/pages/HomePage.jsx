import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES, USER_TYPES } from '../config/constants';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

// Import images
import heroImage from '../assets/vehicleImg01.jpg';
import logo from '../assets/BB-icon.png';
import { HomePageService } from '../services/homePageService';

// Move modal components outside to prevent recreation on every render
const LoginModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  loginForm, 
  setLoginForm, 
  authLoading,
  onSwitchToSignup 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-amber-100 relative">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white border border-gray-300 rounded-full p-2 shadow-lg text-gray-500 hover:text-amber-600 text-2xl flex items-center justify-center"
          style={{ width: '40px', height: '40px' }}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-4 text-amber-600 text-center">Login</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input 
              type="text" 
              value={loginForm.mobile}
              onChange={(e) => setLoginForm(prev => ({ ...prev, mobile: e.target.value }))}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
              placeholder="Enter your mobile number"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={loginForm.password}
              onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
              placeholder="Enter your password"
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={authLoading}
            className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {authLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <button className="text-amber-600 hover:underline font-semibold" onClick={onSwitchToSignup}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

const SignUpModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  signupForm, 
  setSignupForm, 
  authLoading,
  onSwitchToLogin 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-amber-100 relative">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white border border-gray-300 rounded-full p-2 shadow-lg text-gray-500 hover:text-amber-600 text-2xl flex items-center justify-center"
          style={{ width: '40px', height: '40px' }}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-4 text-amber-600 text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              value={signupForm.name}
              onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
              placeholder="Enter your full name"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input 
              type="text" 
              value={signupForm.mobile}
              onChange={(e) => setSignupForm(prev => ({ ...prev, mobile: e.target.value }))}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
              placeholder="Enter your mobile number"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
            <select 
              value={signupForm.userType}
              onChange={(e) => setSignupForm(prev => ({ ...prev, userType: e.target.value }))}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value={USER_TYPES.COMMUTER}>Commuter (Book Rides)</option>
              <option value={USER_TYPES.HOST}>Host (Offer Rides)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={signupForm.password}
              onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
              placeholder="Create a password (min 6 characters)"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input 
              type="password" 
              value={signupForm.confirmPassword}
              onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
              placeholder="Confirm your password"
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={authLoading}
            className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {authLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <button className="text-amber-600 hover:underline font-semibold" onClick={onSwitchToLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

const SuccessModal = ({ isOpen, onClose, modalType, modalMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4 border border-gray-100 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white border-2 border-gray-200 rounded-full p-2 shadow-lg text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-all duration-200 flex items-center justify-center"
          style={{ width: '44px', height: '44px' }}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            modalType === 'success' 
              ? 'bg-green-100 text-green-600' 
              : 'bg-red-100 text-red-600'
          }`}>
            {modalType === 'success' ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          
          <h3 className={`text-2xl font-bold mb-2 ${
            modalType === 'success' ? 'text-gray-900' : 'text-red-600'
          }`}>
            {modalType === 'success' ? 'Success!' : 'Oops! Something went wrong'}
          </h3>
          
          <p className="text-gray-600 leading-relaxed">
            {modalMessage}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-amber-500 text-white py-3 px-6 rounded-xl hover:bg-amber-600 transition-colors font-semibold shadow-sm"
          >
            {modalType === 'success' ? 'Great!' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { user, login, signup, logout, isAuthenticated, isHost } = useAuth();
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Auth modal states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({
    mobile: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    name: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    userType: USER_TYPES.COMMUTER
  });

  const [contactFormData, setContactFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      await login({
        mobile: loginForm.mobile,
        password: loginForm.password
      });
      
      setIsLoginModalOpen(false);
      setLoginForm({ mobile: '', password: '' });
      
      // Show success message
      setModalType('success');
      setModalMessage('Welcome back! You have successfully logged in.');
      setShowSuccessModal(true);
      
    } catch (error) {
      setModalType('error');
      setModalMessage(error.message || 'Login failed. Please try again.');
      setShowSuccessModal(true);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);

    // Validate passwords match
    if (signupForm.password !== signupForm.confirmPassword) {
      setModalType('error');
      setModalMessage('Passwords do not match');
      setShowSuccessModal(true);
      setAuthLoading(false);
      return;
    }

    // Validate password length
    if (signupForm.password.length < 6) {
      setModalType('error');
      setModalMessage('Password must be at least 6 characters long');
      setShowSuccessModal(true);
      setAuthLoading(false);
      return;
    }

    try {
      await signup({
        name: signupForm.name,
        mobile: signupForm.mobile,
        password: signupForm.password,
        userType: signupForm.userType
      });
      
      setIsSignUpModalOpen(false);
      setSignupForm({
        name: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        userType: USER_TYPES.COMMUTER
      });
      
      // Show success message
      setModalType('success');
      setModalMessage('Account created successfully! Welcome to BookBee.');
      setShowSuccessModal(true);
      
    } catch (error) {
      setModalType('error');
      setModalMessage(error.message || 'Signup failed. Please try again.');
      setShowSuccessModal(true);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setModalType('success');
      setModalMessage('You have been logged out successfully.');
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      const contactData = {
        firstName: contactFormData.firstName.trim(),
        lastName: contactFormData.lastName.trim(),
        email: contactFormData.email.trim(),
        subject: contactFormData.subject.trim(),
        message: contactFormData.message.trim(),
      };
      
      await HomePageService.submitContactForm(contactData);
      
      setModalType('success');
      setModalMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
      setShowSuccessModal(true);
      
      setContactFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
      });
      
    } catch (err) {
      console.error('Contact form error:', err);
      setModalType('error');
      setModalMessage(`Sorry, there was an error sending your message: ${err.message}`);
      setShowSuccessModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  const stats = [
    { number: '10K+', label: 'Happy Travelers' },
    { number: '500+', label: 'Daily Rides' },
    { number: '50+', label: 'Cities Covered' },
    { number: '4.8/5', label: 'Average Rating' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Regular Commuter',
      comment: 'BookBee has transformed my daily commute. It\'s reliable, affordable, and I\'ve met great people!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Business Traveler',
      comment: 'The cab booking service is top-notch. Clean vehicles and professional drivers every time.',
      rating: 5
    },
    {
      name: 'Priya Patel',
      role: 'Host Driver',
      comment: 'As a host, I love how easy it is to manage my trips. Great platform for extra income!',
      rating: 4
    }
  ];

  const features = [
    {
      title: 'Share Rides',
      description: 'Book individual seats on shared trips and save money',
      icon: '🚗',
      action: () => navigate(APP_ROUTES.TRIPS)
    },
    {
      title: 'Private Cabs',
      description: 'Reserve entire vehicles for private journeys',
      icon: '🚕',
      action: () => navigate(APP_ROUTES.TRIPS)
    },
    {
      title: 'Host Trips',
      description: 'Create trip listings and earn by sharing your ride',
      icon: '🎯',
      action: isAuthenticated && isHost 
        ? () => navigate(APP_ROUTES.HOST_NEW)
        : () => {
          if (!isAuthenticated) {
            setModalType('error');
            setModalMessage('Please sign up as a Host to create trips');
            setShowSuccessModal(true);
          } else {
            setModalType('error');
            setModalMessage('You need to be registered as a Host to create trips');
            setShowSuccessModal(true);
          }
        }
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Mobile Navigation */}
      

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100/50 overflow-hidden pt-16 md:pt-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQ4YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnptMzYtMTJjMy4zMSAwIDYgMi42OSA2IDZzLTIuNjkgNi02IDYtNi0yLjY5LTYtNiAyLjY5LTYgNi02eiIgc3Ryb2tlPSIjRkNEMzREIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 tracking-tight">
                Travel Smart with{' '}
                <span className="text-amber-500 inline-block transform hover:scale-105 transition-transform duration-300">BookBee</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Share rides, save money, and connect with fellow travelers on India's most trusted ride-sharing platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-6">
                <Button
                  onClick={() => navigate(APP_ROUTES.TRIPS)}
                  variant="secondary"
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-900 px-8 sm:px-12 py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Find a Ride
                </Button>
                <Button
                  onClick={() => {
                    if (isAuthenticated && isHost) {
                      navigate(APP_ROUTES.HOST_NEW);
                    } else if (!isAuthenticated) {
                      setIsSignUpModalOpen(true);
                    } else {
                      setModalType('error');
                      setModalMessage('You need to be registered as a Host to create trips');
                      setShowSuccessModal(true);
                    }
                  }}
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 sm:px-12 py-4 text-base sm:text-lg transition-all duration-300"
                >
                  {isAuthenticated && isHost ? 'Host a Trip' : 'Become a Host'}
                </Button>
              </div>
              
              {/* Auth Status Display */}
              {isAuthenticated && (
                <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm inline-block">
                  <p className="text-sm text-gray-600">
                    Welcome back, <span className="font-semibold text-amber-600">{user?.name}</span>! 
                    You're logged in as a <span className="font-semibold capitalize">{user?.userType}</span>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-amber-50 hover:bg-amber-100 transition-all">
                <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-amber-50/70 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              How BookBee Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Whether you're looking to share a ride or host one, BookBee makes travel affordable and convenient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center p-6 sm:p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 text-4xl mb-6 shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
                <Button
                  onClick={feature.action}
                  variant="outline"
                  className="w-full border-2 border-amber-500 text-amber-500 hover:bg-amber-50 transition-colors duration-300"
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-white to-amber-50/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              What Our Users Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who trust BookBee for their daily commute and long-distance trips
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
            
            <div className="flex animate-marquee space-x-8 whitespace-nowrap py-4">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <Card 
                  key={index} 
                  className="w-[340px] sm:w-[400px] flex-shrink-0 p-6 sm:p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-xl flex flex-col"
                >
                  <div className="flex items-center text-amber-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 text-sm sm:text-base whitespace-normal min-h-[72px]">"{testimonial.comment}"</p>
                  <div className="flex items-center mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-600 font-semibold mr-4 shadow-inner text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-base">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-amber-50 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Join thousands of travelers who trust BookBee for their daily commute and long-distance trips
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => navigate(APP_ROUTES.TRIPS)}
                size="lg"
                className="px-12 py-4 text-lg bg-amber-500 text-white hover:bg-amber-600 shadow-lg"
              >
                Browse Available Trips
              </Button>
              <Button
                onClick={() => {
                  if (isAuthenticated) {
                    navigate(APP_ROUTES.BOOKINGS);
                  } else {
                    setIsLoginModalOpen(true);
                  }
                }}
                variant="outline"
                size="lg"
                className="px-12 py-4 text-lg border-2 border-amber-500 text-amber-500 hover:bg-amber-50"
              >
                {isAuthenticated ? 'View My Bookings' : 'Login to View Bookings'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have questions or feedback? We're here to help. Reach out to our team and we'll get back to you shortly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Phone</h4>
                        <p className="text-gray-600">+91 123 456 7890</p>
                        <p className="text-gray-600">Monday to Saturday, 9AM to 6PM</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-600">support@bookbee.com</p>
                        <p className="text-gray-600">We'll respond within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Office</h4>
                        <p className="text-gray-600">123 Business Hub, Sector 2</p>
                        <p className="text-gray-600">Lucknow, Uttar Pradesh 226001</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                <form className="space-y-6" onSubmit={handleSubmitContact}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        name="firstName"
                        onChange={handleInputChange}
                        value={contactFormData.firstName}
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        name="lastName"
                        onChange={handleInputChange}
                        value={contactFormData.lastName}
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      name="email"
                      onChange={handleInputChange}
                      value={contactFormData.email}
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      name="subject"
                      onChange={handleInputChange}
                      value={contactFormData.subject}
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      onChange={handleInputChange}
                      value={contactFormData.message}
                      rows="4"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            <div>
              <img src={logo} alt="BookBee Logo" className="h-12 w-auto mb-4" />
              <p className="text-sm leading-relaxed">
                India's most trusted ride-sharing platform. Making travel affordable, comfortable, and sustainable.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigate(APP_ROUTES.TRIPS)} className="hover:text-yellow-400">Find Rides</button></li>
                <li><button onClick={() => {
                  if (isAuthenticated && isHost) {
                    navigate(APP_ROUTES.HOST_NEW);
                  } else {
                    setIsSignUpModalOpen(true);
                  }
                }} className="hover:text-yellow-400">Host a Trip</button></li>
                <li><button onClick={() => {
                  if (isAuthenticated) {
                    navigate(APP_ROUTES.BOOKINGS);
                  } else {
                    setIsLoginModalOpen(true);
                  }
                }} className="hover:text-yellow-400">My Bookings</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-yellow-400">Help Center</a></li>
                <li><a href="#" className="hover:text-yellow-400">Safety Guidelines</a></li>
                <li><a href="#contact-section" className="hover:text-yellow-400">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/terms-of-service" className="hover:text-yellow-400">Terms of Service</a></li>
                <li><a href="/privacy-policy" className="hover:text-yellow-400">Privacy Policy</a></li>
                <li><a href="/cookie-policy" className="hover:text-yellow-400">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">We are connecting cities</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-yellow-400">Lucknow</a></li>
                <li><a href="#" className="hover:text-yellow-400">Delhi</a></li>
                <li><a href="#" className="hover:text-yellow-400">Prayagraj</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} BookBee. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSubmit={handleLoginSubmit}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        authLoading={authLoading}
        onSwitchToSignup={() => {
          setIsLoginModalOpen(false);
          setIsSignUpModalOpen(true);
        }}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSubmit={handleSignupSubmit}
        signupForm={signupForm}
        setSignupForm={setSignupForm}
        authLoading={authLoading}
        onSwitchToLogin={() => {
          setIsSignUpModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        modalType={modalType}
        modalMessage={modalMessage}
      />

      {/* Styles */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HomePage;