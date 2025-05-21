import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaPlus, FaMinus } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MultiCityFlights = ({ 
  flights = [], 
  travelers = { adults: 1, children: 0, infants: 0 },
  onAddFlight,
  onRemoveFlight,
  onFlightChange,
  maxFlights = 6,
  flightClass = "Economy"
}) => {
  const navigate = useNavigate();
  const [addStay, setAddStay] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const validateFlights = () => {
    const newErrors = {};
    let isValid = true;

    flights.forEach((flight, index) => {
      if (!flight.leavingFrom) {
        newErrors[`leavingFrom-${index}`] = 'Departure location is required';
        isValid = false;
      }
      if (!flight.goingTo) {
        newErrors[`goingTo-${index}`] = 'Destination is required';
        isValid = false;
      }
      if (!flight.date) {
        newErrors[`date-${index}`] = 'Date is required';
        isValid = false;
      } else if (index > 0 && flight.date < flights[index - 1].date) {
        newErrors[`date-${index}`] = 'Date cannot be before previous flight';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!validateFlights()) {
      return;
    }

    // Prepare the flight segments data
    const flightSegments = flights.map((flight, index) => ({
      segmentNumber: index + 1,
      leavingFrom: flight.leavingFrom,
      goingTo: flight.goingTo,
      date: flight.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      departureTime: '00:00', // Default value, can be modified
      arrivalTime: '00:00'   // Default value, can be modified
    }));

    // Structure the search data according to the required pattern
    const searchParams = {
      leavingFrom: flights[0].leavingFrom,
      goingTo: flights[flights.length - 1].goingTo, // Final destination
      departureDate: flights[0].date,
      returnDate: null,
      travelers,
      flightClass,
      addStay,
      flightType: 'multi-city',
      segments: flightSegments, // Include all flight segments
      totalSegments: flights.length
    };

    console.log('Flight search params:', searchParams);
    navigate('/flight-search', { state: searchParams });
  };

  // Function to add a new flight with default values
  const handleAddNewFlight = () => {
    if (flights.length >= maxFlights) return;
    
    const newFlight = {
      leavingFrom: '',
      goingTo: '',
      date: flights.length > 0 
        ? new Date(flights[flights.length - 1].date.getTime() + 86400000) // Next day
        : new Date()
    };
    onAddFlight(newFlight);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-4">
      {/* Travelers Summary */}
      <div className="flex items-center w-full border border-gray-300 rounded-lg p-3 bg-gray-50">
        <FaUser className="text-gray-500 text-lg mr-3" />
        <div className="flex flex-col text-left w-full">
          <span className="text-sm font-medium text-gray-700">Travelers</span>
          <div className="text-sm text-gray-700">
            {travelers.adults} Adult{travelers.adults !== 1 ? 's' : ''}
            {travelers.children > 0 && `, ${travelers.children} Child${travelers.children !== 1 ? 'ren' : ''}`}
            {travelers.infants > 0 && `, ${travelers.infants} Infant${travelers.infants !== 1 ? 's' : ''}`}
          </div>
        </div>
      </div>

      {/* Flight Segments */}
      {flights.map((flight, index) => (
        <div key={`flight-${index}`} className="flex flex-col gap-3 border-b border-gray-200 pb-4 last:border-0">
          {/* Flight Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">Flight {index + 1}</h2>
            {index > 0 && (
              <button
                type="button"
                onClick={() => onRemoveFlight(index)}
                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                <FaMinus className="text-xs" />
                <span>Remove</span>
              </button>
            )}
          </div>

          {/* Leaving From */}
          <div className={`flex items-center border rounded-lg p-3 ${errors[`leavingFrom-${index}`] ? 'border-red-500' : 'border-gray-300'} bg-gray-50`}>
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium text-gray-700">Leaving from</label>
              <input
                type="text"
                value={flight.leavingFrom}
                onChange={(e) => {
                  onFlightChange(index, 'leavingFrom', e.target.value);
                  if (errors[`leavingFrom-${index}`]) {
                    setErrors(prev => ({ ...prev, [`leavingFrom-${index}`]: undefined }));
                  }
                }}
                placeholder="City or Airport"
                className="text-sm bg-transparent focus:outline-none"
                required
              />
              {errors[`leavingFrom-${index}`] && (
                <p className="text-xs text-red-500 mt-1">{errors[`leavingFrom-${index}`]}</p>
              )}
            </div>
          </div>

          {/* Going To */}
          <div className={`flex items-center border rounded-lg p-3 ${errors[`goingTo-${index}`] ? 'border-red-500' : 'border-gray-300'} bg-gray-50`}>
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium text-gray-700">Going to</label>
              <input
                type="text"
                value={flight.goingTo}
                onChange={(e) => {
                  onFlightChange(index, 'goingTo', e.target.value);
                  if (errors[`goingTo-${index}`]) {
                    setErrors(prev => ({ ...prev, [`goingTo-${index}`]: undefined }));
                  }
                }}
                placeholder="City or Airport"
                className="text-sm bg-transparent focus:outline-none"
                required
              />
              {errors[`goingTo-${index}`] && (
                <p className="text-xs text-red-500 mt-1">{errors[`goingTo-${index}`]}</p>
              )}
            </div>
          </div>

          {/* Date */}
          <div className={`flex items-center border rounded-lg p-3 ${errors[`date-${index}`] ? 'border-red-500' : 'border-gray-300'} bg-gray-50`}>
            <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <DatePicker
                selected={flight.date}
                onChange={(date) => {
                  onFlightChange(index, 'date', date);
                  if (errors[`date-${index}`]) {
                    setErrors(prev => ({ ...prev, [`date-${index}`]: undefined }));
                  }
                }}
                minDate={index > 0 ? flights[index - 1].date : new Date()}
                className="text-sm bg-transparent focus:outline-none cursor-pointer w-full"
                dateFormat="MMM d, yyyy"
                placeholderText="Select date"
                required
              />
              {errors[`date-${index}`] && (
                <p className="text-xs text-red-500 mt-1">{errors[`date-${index}`]}</p>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Add Flight Button */}
      {flights.length < maxFlights && (
        <button
          type="button"
          onClick={handleAddNewFlight}
          className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <FaPlus className="text-gray-500 text-lg" />
          <span className="text-sm font-medium text-gray-700">Add another flight</span>
        </button>
      )}

      {/* Add Stay Option */}
      <div className="mt-2">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={addStay}
            onChange={() => setAddStay(!addStay)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          Add a place to stay
        </label>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
        disabled={flights.length === 0}
      >
        Search Flights
      </button>
    </form>
  );
};

export default MultiCityFlights;