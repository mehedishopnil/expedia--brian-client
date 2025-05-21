import React, { useState } from "react";
import {
  FaUser, FaCheck, FaPlus, FaMinus
} from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import RoundtripFlights from "./RoundtripFlights";
import OneWayFlight from "./OneWayFlight";
import MultiCityFlights from "./MultiCityFlights";

const Flights = () => {
  const [activeFilter, setActiveFilter] = useState("Roundtrip");

  const [showClassMenu, setShowClassMenu] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Economy");
  const [showTravelerMenu, setShowTravelerMenu] = useState(false);

  const [travelers, setTravelers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });

  const [roundtripDates, setRoundtripDates] = useState({
    departure: new Date(),
    return: new Date(new Date().setDate(new Date().getDate() + 7))
  });

  const [oneWayDate, setOneWayDate] = useState(new Date());

  const [multiCityFlights, setMultiCityFlights] = useState([
    { leavingFrom: "", goingTo: "", date: new Date() }
  ]);

  const handleClassSelect = (className) => {
    setSelectedClass(className);
    setShowClassMenu(false);
  };

  const handleTravelerChange = (type, operation) => {
    setTravelers(prev => {
      const newValue = operation === "increase" ? prev[type] + 1 : prev[type] - 1;
      if (type === "adults" && newValue < 1) return prev;
      if (["children", "infants"].includes(type) && newValue < 0) return prev;
      if (type !== "infants" && prev.infants > newValue) {
        return { ...prev, [type]: newValue, infants: newValue };
      }
      return { ...prev, [type]: newValue };
    });
  };

  const handleAddFlight = () => {
    if (multiCityFlights.length < 6) {
      setMultiCityFlights([
        ...multiCityFlights,
        { leavingFrom: "", goingTo: "", date: new Date() }
      ]);
    }
  };

  const handleRemoveFlight = (index) => {
    if (multiCityFlights.length > 1) {
      const updatedFlights = multiCityFlights.filter((_, i) => i !== index);
      setMultiCityFlights(updatedFlights);
    }
  };

  const handleFlightChange = (index, field, value) => {
    const updatedFlights = [...multiCityFlights];
    updatedFlights[index][field] = value;
    setMultiCityFlights(updatedFlights);
  };

  return (
    <div className="bg-white p-4 md:p-6 max-w-5xl mx-auto">
      {/* Filter Tabs */}
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

      {/* Class Selection Dropdown */}
      <div className="relative mb-6">
        <button
          type="button"
          onClick={() => setShowClassMenu(!showClassMenu)}
          className="flex items-center justify-between gap-2 md:w-64 border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200"
        >
          <span className="text-sm md:text-base text-gray-700 font-medium">
            {selectedClass}
          </span>
          <MdKeyboardArrowDown className="text-gray-500 text-lg" />
        </button>

        {showClassMenu && (
          <div className="absolute mt-2 w-full md:w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {["Economy", "Premium Economy", "Business Class", "First Class"].map(
              (className) => (
                <button
                  type="button"
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

      {/* Travelers Selection */}
      <div className="relative mb-6">
        <button
          type="button"
          onClick={() => setShowTravelerMenu(!showTravelerMenu)}
          className="flex items-center justify-between gap-2 md:w-64 border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200"
        >
          <div className="flex items-center gap-2">
            <FaUser className="text-gray-500" />
            <span className="text-sm md:text-base text-gray-700 font-medium">
              {`${travelers.adults + travelers.children} Travelers`}
              {travelers.infants > 0 && `, ${travelers.infants} Infant${travelers.infants !== 1 ? 's' : ''}`}
            </span>
          </div>
          <MdKeyboardArrowDown className="text-gray-500 text-lg" />
        </button>

        {showTravelerMenu && (
          <div className="absolute mt-2 w-full md:w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4">
            {["adults", "children", "infants"].map((type) => (
              <div key={type} className="flex justify-between items-center mb-3">
                <div>
                  <p className="font-medium capitalize">{type}</p>
                  <p className="text-xs text-gray-500">
                    {type === "adults" ? "12+ years" : type === "children" ? "2-11 years" : "Under 2 years"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleTravelerChange(type, "decrease")}
                    disabled={type === "adults" ? travelers[type] <= 1 : travelers[type] <= 0}
                    className={`p-1 rounded-full ${travelers[type] <= (type === "adults" ? 1 : 0)
                      ? "bg-gray-200 text-gray-400"
                      : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span>{travelers[type]}</span>
                  <button
                    type="button"
                    onClick={() => handleTravelerChange(type, "increase")}
                    disabled={type === "infants" && travelers.infants >= travelers.adults}
                    className={`p-1 rounded-full ${(type === "infants" && travelers.infants >= travelers.adults)
                      ? "bg-gray-200 text-gray-400"
                      : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Conditionally Render Flight Types */}
      {activeFilter === "Roundtrip" && (
        <RoundtripFlights 
          dates={roundtripDates}
          onDateChange={setRoundtripDates}
          travelers={travelers}
          selectedClass={selectedClass}
        />
      )}

      {activeFilter === "One-way" && (
        <OneWayFlight 
          date={oneWayDate}
          onDateChange={setOneWayDate}
          travelers={travelers}
          selectedClass={selectedClass}
        />
      )}

      {activeFilter === "Multi-city" && (
        <MultiCityFlights 
          flights={multiCityFlights}
          onAddFlight={handleAddFlight}
          onRemoveFlight={handleRemoveFlight}
          onFlightChange={handleFlightChange}
          travelers={travelers}
          selectedClass={selectedClass}
        />
      )}
    </div>
  );
};

export default Flights;
