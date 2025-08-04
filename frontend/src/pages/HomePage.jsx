import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../config/constants';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

// Import images
import heroImage from '../assets/vehicleImg01.jpg';
import logo from '../assets/BB-icon.png';

const HomePage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
      action: () => navigate(APP_ROUTES.HOST_NEW)
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 md:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <img src={logo} alt="BookBee Logo" className="h-8 w-auto" />
            
            {/* Hamburger button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="bg-white border-t border-gray-200 py-2">
              <div className="space-y-1 px-2 pt-2 pb-3">
                <button
                  onClick={() => {
                    navigate(APP_ROUTES.TRIPS);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Find Rides
                </button>
                <button
                  onClick={() => {
                    navigate(APP_ROUTES.HOST_NEW);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Host a Trip
                </button>
                <button
                  onClick={() => {
                    navigate(APP_ROUTES.BOOKINGS);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  My Bookings
                </button>
                <hr className="my-2" />
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Help Center
                </a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Contact Us
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

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
                  onClick={() => navigate(APP_ROUTES.HOST_NEW)}
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-900 px-8 sm:px-12 py-4 text-base sm:text-lg transition-all duration-300"
                >
                  Host a Trip
                </Button>
              </div>
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

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
            &:hover {
              animation-play-state: paused;
            }
          }
        `}</style>
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
                onClick={() => navigate(APP_ROUTES.BOOKINGS)}
                variant="outline"
                size="lg"
                className="px-12 py-4 text-lg border-2 border-amber-500 text-amber-500 hover:bg-amber-50"
              >
                View My Bookings
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100/50 py-16">
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
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-500 text-white hover:bg-amber-600"
                  >
                    Send Message
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
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
                <li><button onClick={() => navigate(APP_ROUTES.HOST_NEW)} className="hover:text-yellow-400">Host a Trip</button></li>
                <li><button onClick={() => navigate(APP_ROUTES.BOOKINGS)} className="hover:text-yellow-400">My Bookings</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-yellow-400">Help Center</a></li>
                <li><a href="#" className="hover:text-yellow-400">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-yellow-400">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-yellow-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-yellow-400">Cookie Policy</a></li>
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
    </div>
  );
};

export default HomePage;
