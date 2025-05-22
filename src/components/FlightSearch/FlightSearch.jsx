import React from "react";
import { IoFilter, IoAirplane } from "react-icons/io5";
import { FaArrowRight, FaRegClock, FaUser } from "react-icons/fa";
import { BsCalendarDate, BsFillBagCheckFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const FlightSearch = () => {
  const location = useLocation();
  const searchData = location.state || {};

  console.log(searchData);
  const {
    goingTo,
    leavingFrom,
    departureDate,
    returnDate,
    travelers,
    addStay,
    addCar,
  } = searchData;

  // Function to format date for display
  const formatDate = (date) => {
    if (!date) return "N/A";

    // If date is already a string (from ISO format), use it directly
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
    
    // If it's a Date object, format it
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
    
    return "N/A";
  };

  // Mock data for flight options
  const mockFlights = [
    {
      id: 1,
      airline: "SkyWings",
      logo: "✈️",
      departureTime: "08:30 AM",
      arrivalTime: "11:45 AM",
      duration: "3h 15m",
      price: 249,
      stops: 0,
    },
    {
      id: 2,
      airline: "Oceanic",
      logo: "🛫",
      departureTime: "10:15 AM",
      arrivalTime: "02:30 PM",
      duration: "4h 15m",
      price: 189,
      stops: 1,
    },
    {
      id: 3,
      airline: "Global Air",
      logo: "🛩️",
      departureTime: "01:45 PM",
      arrivalTime: "04:15 PM",
      duration: "2h 30m",
      price: 299,
      stops: 0,
    },
  ];

    
    // Previous dates
   // Generate alternative dates
  const generateAlternativeDates = (baseDate, daysBefore = 2, daysAfter = 2) => {
    const dates = [];
    const base = baseDate ? new Date(baseDate) : new Date();
    
    // Previous dates
    for (let i = daysBefore; i > 0; i--) {
      const date = new Date(base);
      date.setDate(date.getDate() - i);
      dates.push({
        date,
        price: Math.floor(150 + Math.random() * 100),
        isCheaper: true,
      });
    }
    
    // Selected date
    dates.push({
      date: base,
      price: 299,
      isSelected: true
    });
    
    // Next dates
    for (let i = 1; i <= daysAfter; i++) {
      const date = new Date(base);
      date.setDate(date.getDate() + i);
      dates.push({
        date,
        price: Math.floor(150 + Math.random() * 100),
        isCheaper: i < 4,
      });
    }
    
    return dates.sort((a, b) => a.date - b.date);
  };

  const alternativeDates = generateAlternativeDates(departureDate);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Search Summary */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          {leavingFrom || "Unknown"} <FaArrowRight className="inline mx-2" /> {goingTo || "Unknown"}
        </h1>
        
        <div className="flex flex-col gap-4 mb-4">
          <div className="badge badge-base badge-info gap-2">
            <BsCalendarDate />
            {formatDate(departureDate)} {returnDate && `- ${formatDate(returnDate)}`}
          </div>
          
          {travelers && (
            <div className="badge badge-base badge-info gap-2">
              <FaUser />
              {travelers.adults || 0} Adult{travelers.adults !== 1 ? 's' : ''}
              {travelers.children ? `, ${travelers.children} Child${travelers.children !== 1 ? 'ren' : ''}` : ''}
              {travelers.infants ? `, ${travelers.infants} Infant${travelers.infants !== 1 ? 's' : ''}` : ''}
            </div>
          )}
          
          {addStay && (
            <div className="badge badge-lg badge-success gap-2">
              <BsFillBagCheckFill />
              Hotel Included
            </div>
          )}
        </div>

        <Link to="#" className="btn btn-outline btn-primary w-full md:w-auto">
          <IoFilter className="text-lg" />
          Sort & Filter
        </Link>
      </div>

      {/* Date Options Section */}
      {/* Date Options Section - Mobile (Horizontal Scroll) */}
      <div className="md:hidden bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Flexible Date Options</h2>
        <p className="text-gray-600 mb-6">
          Prices may change based on availability.
        </p>

        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            {alternativeDates.map((option, index) => (
              <div 
                key={`mobile-date-${index}`} 
                className={`flex-shrink-0 w-24 ${option.isSelected ? 'border-2 rounded-lg border-primary' : ''}`}
              >
                <div className={`card ${option.isSelected ? 'bg-blue-100  text-gray-600 ' : 'bg-base-100'} shadow-sm h-full`}>
                  <div className="card-body p-3">
                    <h3 className="text-xs font-medium">
                      {option.date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </h3>
                    <p className="text-sm font-semibold">
                      {option.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <p className={`text-lg font-bold ${option.isCheaper ? 'text-success' : option.isSelected ? '' : 'text-warning'}`}>
                      ${option.price}
                    </p>
                    {option.isSelected ? (
                      <span className="badge badge-secondary badge-xs">Selected</span>
                    ) : option.isCheaper && (
                      <span className="badge badge-success badge-xs">Cheaper</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Date Options Section - Desktop (Grid) */}
      <div className="hidden md:block bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Flexible Date Options</h2>
        <p className="text-gray-600 mb-6">
          Prices may change based on availability. You can review any additional fees before checkout.
        </p>

        <div className="grid grid-cols-7 gap-4">
          {alternativeDates.map((option, index) => (
            <div 
              key={`desktop-date-${index}`} 
              className={`card ${option.isSelected ? 'bg-primary text-primary-content' : 'bg-base-100'} shadow-sm`}
            >
              <div className="card-body p-4">
                <h3 className="text-sm font-medium">
                  {option.date.toLocaleDateString('en-US', { weekday: 'short' })}
                </h3>
                <p className="text-lg font-semibold">
                  {option.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                <p className={`text-xl font-bold ${option.isCheaper ? 'text-success' : option.isSelected ? '' : 'text-warning'}`}>
                  ${option.price}
                </p>
                {option.isSelected ? (
                  <span className="badge badge-secondary badge-sm">Selected</span>
                ) : option.isCheaper && (
                  <span className="badge badge-success badge-sm">Cheaper</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flight Results */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Recommended Departing Flights</h2>
          <button className="text-sm text-primary hover:underline">
            How our sort order works
          </button>
        </div>

        <div className="space-y-4">
          {mockFlights.map((flight) => (
            <div key={flight.id} className="card card-side bg-base-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Airline Info */}
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{flight.logo}</span>
                    <div>
                      <h3 className="font-bold">{flight.airline}</h3>
                      <p className="text-sm text-gray-500">
                        {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops !== 1 ? 's' : ''}`}
                      </p>
                    </div>
                  </div>

                  {/* Flight Times */}
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="font-bold">{flight.departureTime}</p>
                      <p className="text-sm text-gray-500">{leavingFrom || "DEP"}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <FaRegClock className="text-gray-400" />
                      <p className="text-sm text-gray-500">{flight.duration}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{flight.arrivalTime}</p>
                      <p className="text-sm text-gray-500">{goingTo || "ARR"}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">${flight.price}</p>
                    <button className="btn btn-primary btn-sm mt-2">Select</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;