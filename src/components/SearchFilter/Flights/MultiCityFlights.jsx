import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaPlus, FaMinus } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MultiCityFlights = ({ 
  flights, 
  travelers = { adults: 1, children: 0, infants: 0 },
  onAddFlight,
  onRemoveFlight,
  onFlightChange,
  maxFlights = 6
}) => {
  const navigate = useNavigate();
  const [addStay, setAddStay] = React.useState(false);

  const handleSearch = () => {
    // Basic validation
    const isValid = flights.every(f => f.leavingFrom && f.goingTo && f.date);
    if (!isValid) {
      alert("Please fill in all flight details.");
      return;
    }

    const searchData = {
      flights,
      travelers,
      addStay,
    };

    navigate('/flight-search', { state: searchData });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Travelers */}
      <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50">
        <FaUser className="text-gray-500 text-lg mr-3" />
        <div className="flex flex-col text-left w-full">
          <span className="text-sm md:text-base text-gray-700 font-medium">Travelers</span>
          <div className="text-sm text-gray-700">
            {travelers.adults} Adult{travelers.adults !== 1 ? 's' : ''}
            {travelers.children > 0 && `, ${travelers.children} Child${travelers.children !== 1 ? 'ren' : ''}`}
            {travelers.infants > 0 && `, ${travelers.infants} Infant${travelers.infants !== 1 ? 's' : ''}`}
          </div>
        </div>
      </div>

      {/* Flight Segments */}
      {flights.map((flight, index) => (
        <div key={index} className="flex flex-col gap-4 border-b border-gray-200 pb-4 last:border-0">
          {/* Flight Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">Flight {index + 1}</h2>
            {index > 0 && (
              <button
                type="button"
                onClick={() => onRemoveFlight(index)}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                <FaMinus className="text-xs" />
                Remove
              </button>
            )}
          </div>

          {/* Leaving From */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-700 font-medium">Leaving from</label>
              <input
                type="text"
                value={flight.leavingFrom}
                onChange={(e) => onFlightChange(index, 'leavingFrom', e.target.value)}
                placeholder="City or Airport"
                className="text-sm bg-transparent focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Going To */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-700 font-medium">Going to</label>
              <input
                type="text"
                value={flight.goingTo}
                onChange={(e) => onFlightChange(index, 'goingTo', e.target.value)}
                placeholder="City or Airport"
                className="text-sm bg-transparent focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
            <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-700 font-medium">Date</label>
              <DatePicker
                selected={flight.date}
                onChange={(date) => onFlightChange(index, 'date', date)}
                minDate={index > 0 ? flights[index - 1].date : new Date()}
                className="text-sm bg-transparent focus:outline-none cursor-pointer"
                dateFormat="MMM d, yyyy"
                placeholderText="Select date"
                required
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Flight */}
      {flights.length < maxFlights && (
        <button
          onClick={onAddFlight}
          className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-gray-100"
        >
          <FaPlus className="text-gray-500 text-lg" />
          <span className="text-sm font-medium text-gray-700">Add another flight</span>
        </button>
      )}

      {/* Add Stay Checkbox */}
      <label className="flex items-center gap-2 text-sm md:text-base text-gray-700 cursor-pointer mt-2">
        <input
          type="checkbox"
          checked={addStay}
          onChange={() => setAddStay(!addStay)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded"
        />
        Add a place to stay
      </label>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Search Flights
      </button>
    </div>
  );
};

export default MultiCityFlights;
