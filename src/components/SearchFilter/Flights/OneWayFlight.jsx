import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const OneWayFlight = ({
  travelers = { adults: 1, children: 0, infants: 0 },
}) => {
  const navigate = useNavigate();

  const [locations, setLocations] = useState({
    leavingFrom: '',
    goingTo: ''
  });

  const [dates, setDates] = useState({
    departure: null
  });

  const [options, setOptions] = useState({
    addStay: false
  });

  const handleLocationChange = (field, value) => {
    setLocations((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionChange = (field) => {
    setOptions((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSearch = () => {
    if (!locations.leavingFrom || !locations.goingTo || !dates.departure) {
      alert('Please fill in all required fields.');
      return;
    }

    const searchParams = {
      ...locations,
      departureDate: dates.departure,
      returnDate: null,
      travelers,
      ...options
    };

    console.log('sending search params:', searchParams);
    navigate('/flight-search', { state: searchParams });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Leaving from */}
      <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
        <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
        <div className="flex flex-col w-full">
          <label className="text-sm text-gray-700 font-medium">Leaving from</label>
          <input
            type="text"
            value={locations.leavingFrom}
            onChange={(e) => handleLocationChange('leavingFrom', e.target.value)}
            placeholder="City or Airport"
            className="text-sm bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Going to */}
      <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
        <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
        <div className="flex flex-col w-full">
          <label className="text-sm text-gray-700 font-medium">Going to</label>
          <input
            type="text"
            value={locations.goingTo}
            onChange={(e) => handleLocationChange('goingTo', e.target.value)}
            placeholder="City or Airport"
            className="text-sm bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Departure Date */}
      <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
        <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
        <div className="flex flex-col w-full">
          <label className="text-sm text-gray-700 font-medium">Departure Date</label>
          <DatePicker
            selected={dates.departure}
            onChange={(newDate) => setDates({ departure: newDate })}
            minDate={new Date()}
            dateFormat="MMM d, yyyy"
            placeholderText="Select date"
            className="text-sm bg-transparent focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      {/* Travelers */}
      <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
        <FaUser className="text-gray-500 text-lg mr-3" />
        <div className="flex flex-col w-full">
          <span className="text-sm text-gray-700 font-medium">Travelers</span>
          <span className="text-sm text-gray-700">
            {travelers.adults} Adult{travelers.adults !== 1 ? 's' : ''}
            {travelers.children > 0 && `, ${travelers.children} Child${travelers.children !== 1 ? 'ren' : ''}`}
            {travelers.infants > 0 && `, ${travelers.infants} Infant${travelers.infants !== 1 ? 's' : ''}`}
          </span>
        </div>
      </div>

      {/* Add Stay Option */}
      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          checked={options.addStay}
          onChange={() => handleOptionChange('addStay')}
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

export default OneWayFlight;
