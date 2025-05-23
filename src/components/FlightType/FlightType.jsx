import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { IoAirplane } from 'react-icons/io5';

const FlightType = () => {
  const location = useLocation();
  const { selectedFlight } = location.state || {};
  const { airline, departureTime, arrivalTime, date } = selectedFlight || {};

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  // Fare options data
  const fareOptions = [
    {
      id: 1,
      title: "Basic Economy",
      price: 208,
      roundtripPrice: 207.67,
      cabin: "Economy",
      features: [
        { label: "Seat", value: "Seat choice for a fee", included: false },
        { label: "Bags", value: "Personal item included", included: true },
        { label: "", value: "Carry-on bag not allowed", included: false },
        { label: "", value: "1st checked bag: $55-$99", included: false },
        { label: "Flexibility", value: "Cancellation fee applies", included: false },
        { label: "", value: "Change fee applies", included: false }
      ]
    },
    {
      id: 2,
      title: "Economy",
      price: 279,
      roundtripPrice: 278.47,
      cabin: "Economy",
      features: [
        { label: "Seat", value: "Seat choice included", included: true },
        { label: "Bags", value: "Personal item included", included: true },
        { label: "", value: "Carry-on bag included", included: true },
        { label: "", value: "1st checked bag for a fee", included: false },
        { label: "Flexibility", value: "Non-refundable", included: false },
        { label: "", value: "Changes included, only pay fare difference", included: true }
      ]
    },
    {
      id: 3,
      title: "Premium Economy",
      price: 325,
      roundtripPrice: 324.37,
      cabin: "Premium Economy",
      features: [
        { label: "Seat", value: "Seat choice included", included: true },
        { label: "Bags", value: "Personal item included", included: true },
        { label: "", value: "Carry-on bag included", included: true },
        { label: "", value: "1st checked bag for a fee", included: false },
        { label: "Flexibility", value: "Non-refundable", included: false },
        { label: "", value: "Changes included, only pay fare difference", included: true }
      ]
    },
    {
      id: 4,
      title: "First",
      price: 457,
      roundtripPrice: 456.97,
      cabin: "First Class",
      features: [
        { label: "Seat", value: "Seat choice included", included: true },
        { label: "Bags", value: "Personal item included", included: true },
        { label: "", value: "Carry-on bag included", included: true },
        { label: "", value: "1st checked bag included", included: true },
        { label: "Flexibility", value: "Non-refundable", included: false },
        { label: "", value: "Changes included, only pay fare difference", included: true }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Flight Header */}
      <div className="mb-8">
        <p className="text-gray-600 mb-1">Select fare to {selectedFlight?.to || 'your destination'}</p>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {departureTime} - {arrivalTime} • {formatDate(date)}
        </h1>
        <div className="flex items-center gap-2 text-lg">
          <IoAirplane className="text-blue-600" />
          <span className="font-medium">{airline || 'Airline'}</span>
        </div>
      </div>

      {/* Fare Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {fareOptions.map((fare) => (
          <div key={fare.id} className="border rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Price Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-3xl font-bold">${fare.price}</p>
                  <p className="text-gray-600">${fare.roundtripPrice} roundtrip for 1 traveler</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {fare.title}
                </span>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="font-medium min-w-[60px]">Cabin:</span>
                  <span>{fare.cabin}</span>
                </div>
                
                {fare.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {feature.label && (
                      <span className="font-medium min-w-[60px]">{feature.label}:</span>
                    )}
                    <div className="flex-1 flex items-start gap-2">
                      {feature.included ? (
                        <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <FaTimes className="text-red-500 mt-0.5 flex-shrink-0" />
                      )}
                      <span>{feature.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Select Button */}
              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
                Select
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
        <FaInfoCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-gray-700">
          Prices include all taxes and fees. Additional baggage fees may apply at the airport.
          Seats are subject to availability. Changes and cancellations may have fees depending on fare rules.
        </p>
      </div>
    </div>
  );
};

export default FlightType;