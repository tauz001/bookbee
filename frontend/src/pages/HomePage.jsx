import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../config/constants';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const HomePage = () => {
  const navigate = useNavigate();

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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Travel Smart with{' '}
              <span className="text-yellow-100">BookBee</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-yellow-100">
              Share rides, save money, and connect with fellow travelers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate(APP_ROUTES.TRIPS)}
                variant="secondary"
                size="lg"
                className="bg-white text-yellow-600 hover:bg-yellow-50"
              >
                Find a Ride
              </Button>
              <Button
                onClick={() => navigate(APP_ROUTES.HOST_NEW)}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-yellow-600"
              >
                Host a Trip
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How BookBee Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're looking to share a ride or host one, BookBee makes travel affordable and convenient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} hover className="text-center">
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <Button
                  onClick={feature.action}
                  variant="outline"
                  className="w-full"
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of travelers who trust BookBee for their daily commute and long-distance trips
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate(APP_ROUTES.TRIPS)}
                size="lg"
                className="px-8"
              >
                Browse Available Trips
              </Button>
              <Button
                onClick={() => navigate(APP_ROUTES.BOOKINGS)}
                variant="outline"
                size="lg"
                className="px-8"
              >
                View My Bookings
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
