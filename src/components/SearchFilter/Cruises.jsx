import React, { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaShip, FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Cruises = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [goingTo, setGoingTo] = useState("");
  const [duration, setDuration] = useState("7 nights");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const cruiseDestinations = [
    "Alaska", "Bahamas", "Caribbean", "Europe", "Mexico", 
    "Africa", "Antarctic", "Asia", "Australia", "Bermuda", 
    "Canada", "England", "Central America", "Galapagos", 
    "Hawaii", "MiddleEast", "Pacific Coastal", "Panama Canal", 
    "South America", "South Pacific", "Transatlantic", "Transpacific",
    "Baltic Sea", "Mediterranean", "Greek Isles", "Norwegian Fjords",
    "New Zealand", "Iceland", "Dubai", "Singapore", "Japan",
    "Hong Kong", "Vietnam", "Thailand", "Fiji", "Tahiti",
    "Canary Islands", "Scandinavia", "Greenland", "Black Sea",
    "Cuba", "Florida", "New England", "South Korea", "Malaysia",
    "Indian Ocean", "Red Sea", "Seychelles", "Maldives", "Sri Lanka",
    "Chile", "Argentina", "Brazil", "Costa Rica", "Puerto Rico",
    "Barbados", "Jamaica", "St. Lucia", "St. Maarten", "Dominican Republic"
  ];

  const handleButtonClick = (type) => {
    setPopupType(type);
    setShowPopup(true);
    if (type === "goingTo") {
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    if (goingTo.trim()) {
      const searchData = {
        destination: goingTo.trim(),
        duration,
        departureDate: departureDate.toISOString()
      };
      navigate('/cruise-search', { state: searchData });
    }
  };

  const handleDestinationSelect = (destination) => {
    setGoingTo(destination);
    setShowSuggestions(false);
    setShowPopup(false);
  };

  const durationOptions = [
    "3-5 nights",
    "7 nights",
    "10-14 nights",
    "15+ nights",
  ];

  return (
    <div className="bg-white p-4 md:p-6 max-w-5xl mx-auto">
      <p className="text-sm md:text-base text-gray-700 mb-4">
        For expert cruise advice.
      </p>

      <div className="flex flex-col md:flex-row gap-3">
        {/* Going To Button */}
        <div className="relative w-full">
          <button
            onClick={() => {
              setPopupType("goingTo");
              setShowPopup(true);
              setShowSuggestions(true);
            }}
            className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200"
          >
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Going to
              </span>
              <span className="text-xs text-gray-500">
                {goingTo || "Any destination"}
              </span>
            </div>
            <FaChevronDown className="text-gray-500" />
          </button>

          {showSuggestions && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {cruiseDestinations.map((destination) => (
                <button
                  key={destination}
                  onClick={() => handleDestinationSelect(destination)}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {destination}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Departing Between Button */}
        <button
          onClick={() => handleButtonClick("departureDate")}
          className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200"
        >
          <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
          <div className="flex flex-col text-left">
            <span className="text-sm md:text-base text-gray-700 font-medium">
              Departing between
            </span>
            <span className="text-xs text-gray-500">
              {departureDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <FaChevronDown className="text-gray-500" />
        </button>

        {/* Duration Button */}
        <button
          onClick={() => handleButtonClick("duration")}
          className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200"
        >
          <FaShip className="text-gray-500 text-lg mr-3" />
          <div className="flex flex-col text-left">
            <span className="text-sm md:text-base text-gray-700 font-medium">
              Duration
            </span>
            <span className="text-xs text-gray-500">{duration}</span>
          </div>
          <FaChevronDown className="text-gray-500" />
        </button>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={!goingTo}
          className={`w-full md:w-auto bg-[#1668e3] text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-full hover:bg-blue-500 transition-all text-sm md:text-base flex items-center justify-center gap-2 ${
            !goingTo ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span>Search</span>
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 h-4/6 md:w-1/2 max-h-[100vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {popupType === "goingTo"
                ? "Enter Destination"
                : popupType === "departureDate"
                ? "Select Departure Date"
                : "Select Cruise Duration"}
            </h3>

            {popupType === "departureDate" ? (
              <div className="flex justify-center">
                <DatePicker
                  selected={departureDate}
                  onChange={(date) => setDepartureDate(date)}
                  minDate={new Date()}
                  inline
                />
              </div>
            ) : popupType === "goingTo" ? (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cruise destinations"
                  value={goingTo}
                  onChange={(e) => {
                    setGoingTo(e.target.value);
                    setShowSuggestions(true);
                  }}
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                />
                {showSuggestions && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-50 overflow-y-auto">
                    {cruiseDestinations
                      .filter(dest => 
                        dest.toLowerCase().includes(goingTo.toLowerCase())
                      )
                      .map((destination) => (
                        <button
                          key={destination}
                          onClick={() => handleDestinationSelect(destination)}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {destination}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {durationOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setDuration(option);
                      setShowPopup(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg ${
                      duration === option
                        ? "bg-blue-100 text-blue-800"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => {
                  setShowPopup(false);
                  setShowSuggestions(false);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              {popupType !== "duration" && (
                <button
                  onClick={() => {
                    setShowPopup(false);
                    setShowSuggestions(false);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cruises;