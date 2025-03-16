import React, { useState } from "react";
import { FaMapMarkerAlt, FaUser, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Stays = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [travelers, setTravelers] = useState("1 traveler");
  const [rooms, setRooms] = useState("1 room");
  const navigate = useNavigate();

  const handleButtonClick = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const handleSearch = () => {
    // Navigate to HotelSearch with the location as a query parameter
    if (location.trim()) {
      navigate(`/hotel-search?q=${encodeURIComponent(location.trim())}`);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Where to Button */}
        <button
          onClick={() => handleButtonClick("location")}
          className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200"
        >
          <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
          <div className="flex flex-col text-left">
            <span className="text-sm md:text-base text-gray-700 font-medium">
              Where to
            </span>
            <span className="text-xs text-gray-500">
              {location || "Enter location"}
            </span>
          </div>
        </button>

        {/* Dates Button */}
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

        {/* Travelers Button */}
        <button
          onClick={() => handleButtonClick("travelers")}
          className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200"
        >
          <FaUser className="text-gray-500 text-lg mr-3" />
          <div className="flex flex-col text-left">
            <span className="text-sm md:text-base text-gray-700 font-medium">
              Travelers
            </span>
            <span className="text-xs text-gray-500">
              {travelers}, {rooms}
            </span>
          </div>
        </button>

        {/* Check Options */}
        <div className="flex gap-4 mt-4">
          <label className="flex items-center gap-2 text-sm md:text-base text-gray-700">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            Add a flight
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
        <button
          onClick={handleSearch}
          className="w-full md:w-auto bg-[#1668e3] text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-full hover:bg-blue-500 transition-all text-sm md:text-base"
        >
          Search
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <h3 className="text-lg font-semibold mb-4">
              {popupType === "location"
                ? "Enter Location"
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
            ) : popupType === "location" ? (
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              />
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Travelers
                  </label>
                  <input
                    type="number"
                    value={travelers.replace(/\D/g, "")}
                    onChange={(e) =>
                      setTravelers(`${e.target.value} travelers`)
                    }
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rooms
                  </label>
                  <input
                    type="number"
                    value={rooms.replace(/\D/g, "")}
                    onChange={(e) => setRooms(`${e.target.value} room`)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
              </div>
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

export default Stays;