import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSuitcase, FaCreditCard, FaCamera, FaStar, FaTag, FaArrowRight, FaShip } from 'react-icons/fa';
import { GiShipWheel } from 'react-icons/gi';
import CruiseDates from './CruiseDates';

const CruiseSearch = () => {
  const location = useLocation();
  const { destination, duration, departureDate } = location.state || {};
  const [selectedCruise, setSelectedCruise] = useState(null);
  const [cruiseData, setCruiseData] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedCruises, setExpandedCruises] = useState({});

  useEffect(() => {
    // Load cruise data from JSON file
    const fetchCruiseData = async () => {
      try {
        const response = await fetch('/DataInfo/cruiseData.json');
        const data = await response.json();
        setCruiseData(data);
      } catch (error) {
        console.error('Error loading cruise data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCruiseData();
  }, []);

  // Get cruises for the selected destination or show all if no destination
  const cruises = destination 
    ? cruiseData[destination] || [] 
    : Object.values(cruiseData).flat();

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const toggleDates = (cruiseId) => {
    setExpandedCruises(prev => ({
      ...prev,
      [cruiseId]: !prev[cruiseId]
    }));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {destination ? `${destination} Cruise Deals` : 'All Cruise Deals'}
        </h1>
        {departureDate && (
          <p className="text-gray-600">
            Departing {formatDate(departureDate)} • {duration || '7'} nights
          </p>
        )}
      </div>

      {/* Cruise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cruises.map((cruise) => (
          <div key={cruise.id} className="border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            {/* Cruise Image */}
            <div className="h-48 bg-gray-200 flex items-center justify-center relative">
              <span className="text-gray-500">Image of {cruise.name}</span>
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {cruise.line}
              </div>
            </div>

            {/* Cruise Info */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold mb-2">{cruise.name}</h2>
                <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{cruise.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({cruise.reviews})</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-1 flex items-center">
                <FaShip className="mr-2 text-blue-500" />
                {cruise.route}
              </p>
              <p className="text-gray-600 mb-4">{cruise.duration} Nights</p>

              {/* Icons */}
              <div className="flex flex-wrap gap-3 mb-4 text-gray-500">
                <div className="flex items-center gap-1 text-xs">
                  <FaSuitcase />
                  <span>Luggage</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <FaCreditCard />
                  <span>Card</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <FaCamera />
                  <span>Photos</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <GiShipWheel />
                  <span>Cruise</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <FaTag />
                  <span>Deals</span>
                </div>
              </div>

              {/* Itinerary */}
              <div className="mb-4">
                <p className="text-sm font-semibold">Ports of Call:</p>
                <p className="text-sm text-gray-600">
                  {Array.isArray(cruise.itinerary) ? cruise.itinerary.join(', ') : 'No itinerary available'}
                </p>
              </div>

              {/* Pricing */}
              <div className="mt-4 border-t pt-4">
                <p className="text-sm text-gray-600">Per Person From</p>
                <p className="text-2xl font-bold text-blue-600">${cruise.price} USD</p>
                <p className="text-sm text-gray-600">Inside room per traveler</p>
                <p className="text-sm font-semibold mt-1">Includes taxes & fees</p>
                <span className="badge badge-primary mt-2">Member Price</span>
              </div>

              {/* Show/Hide Dates Button */}
              <button 
                onClick={() => toggleDates(cruise.id)}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
              >
                {expandedCruises[cruise.id] ? 'Hide Dates' : 'Show Dates'}
              </button>

              {/* Dates Section - shown when expanded */}
              {expandedCruises[cruise.id] && (
                <div className="mt-4 border-t pt-4">
                  <CruiseDates 
                    cruise={cruise} 
                    duration={duration}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CruiseSearch;