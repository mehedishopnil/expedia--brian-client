import React, { useState } from "react";
import { FaMapMarkerAlt, FaUser, FaCalendarAlt, FaCheck } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Flights = () => {
  const [activeFilter, setActiveFilter] = useState("Roundtrip");
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showClassMenu, setShowClassMenu] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Economy");

  const randomLocationFrom = "New York, USA";
  const randomLocationTo = "Los Angeles, USA";
  const randomTravelers = `${Math.floor(Math.random() * 5) + 1} travelers`;

  const handleButtonClick = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const handleClassSelect = (className) => {
    setSelectedClass(className);
    setShowClassMenu(false); // Close the menu after selection
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
          <button
            onClick={() => handleButtonClick("leaving-from")}
            className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200"
          >
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Leaving from
              </span>
              <span className="text-xs text-gray-500">{randomLocationFrom}</span>
            </div>
          </button>

          {/* Going to */}
          <button
            onClick={() => handleButtonClick("going-to")}
            className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200"
          >
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Going to
              </span>
              <span className="text-xs text-gray-500">{randomLocationTo}</span>
            </div>
          </button>

          {/* Dates */}
          <button
            onClick={() => handleButtonClick("dates")}
            className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200"
          >
            <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Dates
              </span>
              <span className="text-xs text-gray-500">
                {selectedDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </button>

          {/* Travelers */}
          <button
            onClick={() => handleButtonClick("travelers")}
            className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200"
          >
            <FaUser className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Travelers
              </span>
              <span className="text-xs text-gray-500">{randomTravelers}</span>
            </div>
          </button>

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

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <h3 className="text-lg font-semibold mb-4">
              {popupType === "leaving-from"
                ? "Enter Leaving From"
                : popupType === "going-to"
                ? "Enter Going To"
                : popupType === "dates"
                ? "Select Dates"
                : "Enter Travelers"}
            </h3>

            {/* Date Picker */}
            {popupType === "dates" ? (
              <div className="flex justify-center">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  inline
                />
              </div>
            ) : (
              <input
                type="text"
                placeholder={`Enter ${popupType}`}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              />
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flights;