import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES, USER_TYPES } from '../config/constants';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

// Import images
import heroImage from '../assets/vehicleImg01.jpg';
import logo from '../assets/BB-icon.png';
import { HomePageService } from '../services/homePageService';

// Hook for counting animation
const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    let startTime = null;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * (end - start) + start));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, start]);
  
  return count;
};

// Animated counter component
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const count = useCountUp(parseInt(value.replace(/\D/g, '')), duration);
  
  if (value.includes('K+')) {
    return `${count}K+`;
  } else if (value.includes('/')) {
    return value; // Don't animate ratings
  } else if (value.includes('+')) {
    return `${count}+`;
  }
  return count;
};

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
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn" 
         style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)' }}>
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-amber-50 relative transform animate-slideUp">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white border-2 border-gray-100 rounded-full p-2 shadow-lg text-gray-400 hover:text-amber-500 hover:border-amber-200 text-2xl flex items-center justify-center transition-all duration-300 group"
          style={{ width: '44px', height: '44px' }}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500">Sign in to your BookBee account</p>
        </div>
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
            <input 
              type="text" 
              value={loginForm.mobile}
              onChange={(e) => setLoginForm(prev => ({ ...prev, mobile: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300" 
              placeholder="Enter your mobile number"
              required 
            />
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              value={loginForm.password}
              onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300" 
              placeholder="Enter your password"
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={authLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {authLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Don't have an account? </span>
          <button className="text-amber-600 hover:text-amber-700 font-semibold transition-colors" onClick={onSwitchToSignup}>
            Create Account
          </button>
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
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn p-4" 
         style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)' }}>
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-amber-50 relative transform animate-slideUp max-h-screen overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white border-2 border-gray-100 rounded-full p-2 shadow-lg text-gray-400 hover:text-amber-500 hover:border-amber-200 text-2xl flex items-center justify-center transition-all duration-300 group"
          style={{ width: '44px', height: '44px' }}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join BookBee</h2>
          <p className="text-gray-500">Create your account to get started</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              value={signupForm.name}
              onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300" 
              placeholder="Enter your full name"
              required 
            />
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
            <input 
              type="text" 
              value={signupForm.mobile}
              onChange={(e) => setSignupForm(prev => ({ ...prev, mobile: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300" 
              placeholder="Enter your mobile number"
              required 
            />
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">User Type</label>
            <select 
              value={signupForm.userType}
              onChange={(e) => setSignupForm(prev => ({ ...prev, userType: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
            >
              <option value={USER_TYPES.COMMUTER}>Commuter (Book Rides)</option>
              <option value={USER_TYPES.HOST}>Host (Offer Rides)</option>
            </select>
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              value={signupForm.password}
              onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300" 
              placeholder="Create a password (min 6 characters)"
              required 
            />
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
            <input 
              type="password" 
              value={signupForm.confirmPassword}
              onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300" 
              placeholder="Confirm your password"
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={authLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
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
              'Create Account'
            )}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Already have an account? </span>
          <button className="text-amber-600 hover:text-amber-700 font-semibold transition-colors" onClick={onSwitchToLogin}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

const SuccessModal = ({ isOpen, onClose, modalType, modalMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn" 
         style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)' }}>
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4 border border-gray-50 relative transform animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white border-2 border-gray-100 rounded-full p-2 shadow-lg text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-all duration-300 flex items-center justify-center group"
          style={{ width: '44px', height: '44px' }}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
            modalType === 'success' 
              ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-600' 
              : 'bg-gradient-to-br from-red-100 to-red-200 text-red-600'
          }`}>
            {modalType === 'success' ? (
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          
          <h3 className={`text-2xl font-bold mb-3 ${
            modalType === 'success' ? 'text-gray-900' : 'text-red-600'
          }`}>
            {modalType === 'success' ? 'All Set!' : 'Something went wrong'}
          </h3>
          
          <p className="text-gray-600 leading-relaxed">
            {modalMessage}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {modalType === 'success' ? 'Perfect!' : 'Got it'}
        </button>
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
  const [statsVisible, setStatsVisible] = useState(false);
  
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

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

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
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      action: () => navigate(APP_ROUTES.TRIPS)
    },
    {
      title: 'Private Cabs',
      description: 'Reserve entire vehicles for private journeys',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      action: () => navigate(APP_ROUTES.TRIPS)
    },
    {
      title: 'Host Trips',
      description: 'Create trip listings and earn by sharing your ride',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      ),
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50/30 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-amber-100/60 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-200/40 to-transparent rounded-full blur-3xl animate-float-delay"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-amber-50/30 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="space-y-8 animate-slideUp">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium border border-amber-200 animate-fadeIn">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                India's #1 Ride-Sharing Platform
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 tracking-tight">
                Travel Smart with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 inline-block transform hover:scale-105 transition-transform duration-300">
                  BookBee
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                Connect with fellow travelers, share rides, and make every journey affordable while building a sustainable future together
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-8">
                <Button
                  onClick={() => navigate(APP_ROUTES.TRIPS)}
                  className="group bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 px-10 sm:px-14 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-700"
                >
                  <span className="flex items-center justify-center gap-3">
                    Find Your Ride
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
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
                  className="group border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-10 sm:px-14 py-4 text-lg rounded-2xl transition-all duration-300 hover:shadow-xl"
                >
                  <span className="flex items-center justify-center gap-3">
                    {isAuthenticated && isHost ? 'Host a Trip' : 'Become a Host'}
                    <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                </Button>
              </div>
              
              {/* Auth Status Display */}
              {isAuthenticated && (
                <div className="mt-8 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-100 inline-block animate-slideUp">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 font-semibold text-sm">{user?.name?.charAt(0)}</span>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-900 font-semibold">Welcome back, {user?.name}!</p>
                      <p className="text-sm text-gray-600">Logged in as <span className="font-medium text-amber-600 capitalize">{user?.userType}</span></p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/20 via-transparent to-amber-50/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group transform hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="bg-gradient-to-br from-white to-amber-50/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100/50 backdrop-blur-sm">
                    <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 mb-3">
                      {statsVisible ? <AnimatedCounter value={stat.number} /> : stat.number}
                    </div>
                    <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-white via-amber-50/20 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium border border-amber-200 mb-6">
              How it works
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Your Journey,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                Simplified
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              Whether you're looking to share a ride or host one, BookBee makes travel affordable, convenient, and sustainable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group text-center p-10 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600 mb-8 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg font-light">
                    {feature.description}
                  </p>
                  
                  <Button
                    onClick={feature.action}
                    className="group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-amber-600 border-2 border-amber-500 text-amber-600 group-hover:text-white transition-all duration-300 px-8 py-3 rounded-xl font-semibold"
                  >
                    Get Started
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-b from-white to-amber-50/30 overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium border border-amber-200 mb-6">
              Customer Stories
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              Loved by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                Thousands
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Join the community of satisfied travelers who trust BookBee for their daily commute and adventures
            </p>
          </div>

          <div className="relative">
            {/* Gradient masks for infinite scroll effect */}
            <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-marquee space-x-8 py-4">
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <Card 
                  key={index} 
                  className="w-96 flex-shrink-0 p-8 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all rounded-2xl flex flex-col group hover:-translate-y-1"
                >
                  {/* Rating stars */}
                  <div className="flex items-center text-amber-400 mb-6 text-lg">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 mb-8 text-lg leading-relaxed flex-grow font-light">
                    "{testimonial.comment}"
                  </blockquote>
                  
                  <div className="flex items-center mt-auto">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-600 font-bold mr-4 shadow-inner text-xl group-hover:scale-110 transition-transform">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-amber-600 font-medium">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-amber-100/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/80 to-amber-50/50 backdrop-blur-sm rounded-3xl p-16 border border-amber-100 shadow-2xl">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium border border-amber-200 mb-6">
                Ready to start?
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Your Next Adventure{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                  Awaits
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-12 font-light max-w-2xl mx-auto">
                Join thousands of travelers who trust BookBee for safe, affordable, and sustainable journeys every day
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => navigate(APP_ROUTES.TRIPS)}
                className="group bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 px-12 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-3">
                  Browse Available Trips
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
              
              <Button
                onClick={() => {
                  if (isAuthenticated) {
                    navigate(APP_ROUTES.BOOKINGS);
                  } else {
                    setIsLoginModalOpen(true);
                  }
                }}
                className="group border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white px-12 py-4 text-lg rounded-2xl transition-all duration-300 hover:shadow-xl"
              >
                <span className="flex items-center justify-center gap-3">
                  {isAuthenticated ? 'View My Bookings' : 'Login to View Bookings'}
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-32 bg-gradient-to-br from-amber-50 via-white to-amber-50/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-amber-100/40 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium border border-amber-200 mb-6">
                Get in touch
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                Let's{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                  Connect
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                Have questions or feedback? We're here to help. Reach out to our team and we'll get back to you shortly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-amber-100">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h3>
                  <div className="space-y-8">
                    {[
                      {
                        icon: (
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        ),
                        title: 'Phone',
                        primary: '+91 123 456 7890',
                        secondary: 'Monday to Saturday, 9AM to 6PM'
                      },
                      {
                        icon: (
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        ),
                        title: 'Email',
                        primary: 'support@bookbee.com',
                        secondary: "We'll respond within 24 hours"
                      },
                      {
                        icon: (
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        ),
                        title: 'Office',
                        primary: '123 Business Hub, Sector 2',
                        secondary: 'Lucknow, Uttar Pradesh 226001'
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-6 group">
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-gray-700 font-medium">{item.primary}</p>
                          <p className="text-gray-500">{item.secondary}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-amber-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h3>
                <form className="space-y-6" onSubmit={handleSubmitContact}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <input
                        name="firstName"
                        onChange={handleInputChange}
                        value={contactFormData.firstName}
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300"
                        placeholder="John"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <input
                        name="lastName"
                        onChange={handleInputChange}
                        value={contactFormData.lastName}
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      name="email"
                      onChange={handleInputChange}
                      value={contactFormData.email}
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input
                      name="subject"
                      onChange={handleInputChange}
                      value={contactFormData.subject}
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      onChange={handleInputChange}
                      value={contactFormData.message}
                      rows="5"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 resize-none group-hover:border-gray-300"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:transform-none"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>
          <div className="absolute top-10 left-20 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-20 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <img src={logo} alt="BookBee Logo" className="h-12 w-auto mr-3" />
                <span className="text-2xl font-bold text-white">BookBee</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                India's most trusted ride-sharing platform. Making travel affordable, comfortable, and sustainable for everyone.
              </p>
              <div className="flex space-x-4">
                {[
                  { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                  { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' }
                ].map((social, index) => (
                  <a key={index} href="#" className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all duration-300 group">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: 'Quick Links',
                links: [
                  { name: 'Find Rides', action: () => navigate(APP_ROUTES.TRIPS) },
                  { name: 'Host a Trip', action: () => {
                    if (isAuthenticated && isHost) {
                      navigate(APP_ROUTES.HOST_NEW);
                    } else {
                      setIsSignUpModalOpen(true);
                    }
                  }},
                  { name: 'My Bookings', action: () => {
                    if (isAuthenticated) {
                      navigate(APP_ROUTES.BOOKINGS);
                    } else {
                      setIsLoginModalOpen(true);
                    }
                  }}
                ]
              },
              {
                title: 'Support',
                links: [
                  { name: 'Help Center', action: () => {} },
                  { name: 'Safety Guidelines', action: () => {} },
                  { name: 'Contact Us', action: () => document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' }) }
                ]
              },
              {
                title: 'Legal',
                links: [
                  { name: 'Terms of Service', action: () => navigate('/terms-of-service') },
                  { name: 'Privacy Policy', action: () => navigate('/privacy-policy') },
                  { name: 'Cookie Policy', action: () => navigate('/cookie-policy') }
                ]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-bold text-white mb-6 text-lg">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button 
                        onClick={link.action}
                        className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Bottom section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} BookBee. All rights reserved. Made with ❤️ for travelers.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>Connecting cities:</span>
                {['Lucknow', 'Delhi', 'Prayagraj', 'Mumbai', 'Bangalore'].map((city, index) => (
                  <button 
                    key={index}
                    className="hover:text-amber-400 transition-colors duration-300"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            #developed by <a href="https://tauz001.github.io/PortfolioTauz/" className="text-amber-400 hover:underline" target="_blank" rel="noopener noreferrer">Mohammad Tauz</a>
              </p>
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

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-3deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.05); }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #fbbf24;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #f59e0b;
        }
        
        /* Backdrop blur fallback */
        @supports not (backdrop-filter: blur(12px)) {
          .backdrop-blur-sm {
            background-color: rgba(255, 255, 255, 0.9);
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;