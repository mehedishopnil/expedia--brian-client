import React from 'react';
import {
  FaUtensils,
  FaParking,
  FaSwimmingPool,
  FaShuttleVan,
  FaConciergeBell,
  FaBroom,
  FaMapMarkerAlt,
  FaWifi,
  FaDumbbell,
  FaSpa,
  FaCoffee,
  FaCheck,
} from 'react-icons/fa';
import { MdRestaurant, MdLocalLaundryService } from 'react-icons/md';
import onekeyIcon from '../../../assets/images/onekey__standard__always_light.svg';
import { Link } from 'react-router-dom';

const About = ({ resort }) => {
  const { location, description } = resort;

  // Split location by commas and trim whitespace
  const locationParts = location?.split(',').map(part => part.trim()) || [];

  const features = [
    { icon: <FaUtensils />, text: 'Breakfast included', category: 'dining' },
    { icon: <FaParking />, text: 'Free parking', category: 'parking' },
    { icon: <FaSwimmingPool />, text: 'Outdoor pool', category: 'recreation' },
    { icon: <FaShuttleVan />, text: 'Airport shuttle', category: 'transport' },
    {
      icon: <FaConciergeBell />,
      text: '24/7 Room service',
      category: 'service',
    },
    { icon: <FaBroom />, text: 'Daily housekeeping', category: 'service' },
    { icon: <FaWifi />, text: 'Free WiFi', category: 'amenities' },
    { icon: <FaDumbbell />, text: 'Fitness center', category: 'recreation' },
  ];

  const nearbyAttractions = locationParts.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Main About Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            About this property
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {description ||
              'Experience luxury and comfort at this premier hotel in Orlando. Featuring modern amenities, exceptional service, and convenient access to major attractions, this property offers everything you need for an unforgettable stay.'}
          </p>
        </div>

        {/* Popular Amenities Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            <span className="bg-blue-100 p-2 rounded-lg">
              <FaCheck className="text-blue-600" />
            </span>
            Popular amenities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="text-2xl text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
                  {feature.icon}
                </div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Explore the Area Section */}
        {nearbyAttractions.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="bg-green-100 p-2 rounded-lg">
                <FaMapMarkerAlt className="text-green-600" />
              </span>
              Explore the area
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nearbyAttractions.map((part, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group"
                >
                  <div className="text-green-600 mt-1 flex-shrink-0">
                    <FaMapMarkerAlt className="text-lg" />
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-800 font-medium text-sm sm:text-base">
                      {part}
                    </span>
                    {index === 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Main location
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* View Map Link */}
            <button className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base flex items-center gap-2 group">
              <span>View on map</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* OneKey Rewards Banner */}
      <div className="bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Icon */}
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-4 rounded-2xl shadow-lg flex-shrink-0">
              <img
                src={onekeyIcon}
                alt="OneKey Rewards"
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Earn OneKeyCash on this stay
              </h3>
              <p className="text-blue-100 text-sm sm:text-base mb-4 leading-relaxed">
                Sign in and book to earn rewards on this property. More rewards
                for more adventures! Members save an average of 10% or more.
              </p>

              {/* Benefits List */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <div className="bg-green-500 rounded-full p-1">
                    <FaCheck className="text-white text-xs" />
                  </div>
                  <span className="text-blue-100 text-sm">Free to join</span>
                </div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <div className="bg-green-500 rounded-full p-1">
                    <FaCheck className="text-white text-xs" />
                  </div>
                  <span className="text-blue-100 text-sm">Instant rewards</span>
                </div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <div className="bg-green-500 rounded-full p-1">
                    <FaCheck className="text-white text-xs" />
                  </div>
                  <span className="text-blue-100 text-sm">Member prices</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/signin" className="flex-1 sm:flex-initial">
                  <button className="w-full px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl">
                    Sign in to earn rewards
                  </button>
                </Link>
                <Link to="/register" className="flex-1 sm:flex-initial">
                  <button className="w-full px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-200">
                    Join free
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Dining Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <MdRestaurant className="text-orange-600 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Dining options</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Enjoy complimentary breakfast daily and explore on-site dining
            options featuring international cuisine and local specialties.
          </p>
        </div>

        {/* Services Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <MdLocalLaundryService className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Guest services</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            24-hour front desk, concierge services, laundry facilities, and
            luggage storage available for your convenience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
