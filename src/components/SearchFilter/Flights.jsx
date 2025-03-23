import React, { useState } from "react";
import { FaMapMarkerAlt, FaUser, FaCalendarAlt, FaCheck, FaPlus, FaMinus } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Flights = () => {
  const [activeFilter, setActiveFilter] = useState("Roundtrip");
  const [showClassMenu, setShowClassMenu] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Economy");
  const [travelers, setTravelers] = useState(1);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [flights, setFlights] = useState([
    { leavingFrom: "", goingTo: "", date: new Date() },
  ]);

  const handleClassSelect = (className) => {
    setSelectedClass(className);
    setShowClassMenu(false); // Close the menu after selection
  };

  const handleAddFlight = () => {
    setFlights([...flights, { leavingFrom: "", goingTo: "", date: new Date() }]);
  };

  const handleRemoveFlight = (index) => {
    const updatedFlights = flights.filter((_, i) => i !== index);
    setFlights(updatedFlights);
  };

  const handleFlightChange = (index, field, value) => {
    const updatedFlights = [...flights];
    updatedFlights[index][field] = value;
    setFlights(updatedFlights);
  };

  return (
    <div className="bg-white p-4 md:p-6 max-w-5xl mx-auto">
      {/* Filter Menu */}
      <div className="flex gap-4 mb-6 overflow-x-auto scrollbar-hide">
        {["Roundtrip", "One-way", "Multi-city"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-shrink-0 text-sm font-medium px-4 py-2 ${
              activeFilter === filter
                ? "text-blue-700 border-b border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Toggle Button for Economy */}
      <div className="relative mb-6">
        <button
          onClick={() => setShowClassMenu(!showClassMenu)}
          className="flex items-center justify-between gap-2 md:w-64 border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200"
        >
          <span className="text-sm md:text-base text-gray-700 font-medium">
            {selectedClass}
          </span>
          <MdKeyboardArrowDown className="text-gray-500 text-lg" />
        </button>

        {/* Dropdown Menu */}
        {showClassMenu && (
          <div className="absolute mt-2 w-full md:w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {["Economy", "Premium Economy", "Business Class", "First Class"].map(
              (className) => (
                <button
                  key={className}
                  onClick={() => handleClassSelect(className)}
                  className="flex items-center justify-between w-full px-4 py-3 text-sm md:text-base text-gray-700 hover:bg-gray-100"
                >
                  <span>{className}</span>
                  {selectedClass === className && (
                    <FaCheck className="text-blue-600" />
                  )}
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* Roundtrip Form */}
      {activeFilter === "Roundtrip" && (
        <div className="flex flex-col gap-4">
          {/* Leaving from */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Leaving from
              </span>
              <input
                type="text"
                placeholder="Enter departure location"
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Going to */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Going to
              </span>
              <input
                type="text"
                placeholder="Enter destination location"
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Departure Date */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Departure Date
              </span>
              <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Return Date */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Return Date
              </span>
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Travelers */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaUser className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Travelers
              </span>
              <input
                type="number"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Check Options */}
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 text-sm md:text-base text-gray-700">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              Add a place to stay
            </label>
            <label className="flex items-center gap-2 text-sm md:text-base text-gray-700">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              Add a car
            </label>
          </div>

          {/* Search Button */}
          <button className="w-full bg-[#1668e3] text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-500 transition-all text-sm md:text-base">
            Search
          </button>
        </div>
      )}

      {/* One-way Form */}
      {activeFilter === "One-way" && (
        <div className="flex flex-col gap-4">
          {/* Leaving from */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Leaving from
              </span>
              <input
                type="text"
                placeholder="Enter departure location"
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Going to */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Going to
              </span>
              <input
                type="text"
                placeholder="Enter destination location"
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Departure Date */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Departure Date
              </span>
              <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Travelers */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaUser className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Travelers
              </span>
              <input
                type="number"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Check Options */}
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 text-sm md:text-base text-gray-700">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              Add a place to stay
            </label>
          </div>

          {/* Search Button */}
          <button className="w-full bg-[#1668e3] text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-500 transition-all text-sm md:text-base">
            Search
          </button>
        </div>
      )}

      {/* Multi-city Form */}
      {activeFilter === "Multi-city" && (
        <div className="flex flex-col gap-4">
          {/* Travelers */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaUser className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Travelers
              </span>
              <input
                type="number"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Flight Sections */}
          {flights.map((flight, index) => (
            <div key={index} className="flex flex-col gap-4">
              {/* Flight Number */}
              <div className="flex items-center justify-between">
                <h1 className="text-sm font-semibold">Flight {index + 1}</h1>
                {index > 0 && (
                  <button
                    onClick={() => handleRemoveFlight(index)}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                  >
                    <FaMinus className="text-sm" />
                    Remove
                  </button>
                )}
              </div>

              {/* Leaving from */}
              <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
                <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
                <div className="flex flex-col text-left w-full">
                  <span className="text-sm md:text-base text-gray-700 font-medium">
                    Leaving from
                  </span>
                  <input
                    type="text"
                    placeholder="Enter departure location"
                    value={flight.leavingFrom}
                    onChange={(e) =>
                      handleFlightChange(index, "leavingFrom", e.target.value)
                    }
                    className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {/* Going to */}
              <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
                <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
                <div className="flex flex-col text-left w-full">
                  <span className="text-sm md:text-base text-gray-700 font-medium">
                    Going to
                  </span>
                  <input
                    type="text"
                    placeholder="Enter destination location"
                    value={flight.goingTo}
                    onChange={(e) =>
                      handleFlightChange(index, "goingTo", e.target.value)
                    }
                    className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
                <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
                <div className="flex flex-col text-left w-full">
                  <span className="text-sm md:text-base text-gray-700 font-medium">
                    Date
                  </span>
                  <DatePicker
                    selected={flight.date}
                    onChange={(date) =>
                      handleFlightChange(index, "date", date)
                    }
                    className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Another Flight Button */}
          <button
            onClick={handleAddFlight}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200"
          >
            <FaPlus className="text-gray-500 text-lg" />
            <span className="text-sm md:text-base text-gray-700 font-medium">
              Add another flight
            </span>
          </button>

          {/* Search Button */}
          <button className="w-full bg-[#1668e3] text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-500 transition-all text-sm md:text-base">
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Flights;