import React, { useState } from "react";
import { FaCalendarAlt, FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RoomCard from "../../RoomCard/RoomCard";
import SuiteCard from "../../SuiteCard/SuiteCard";

const Rooms = ({ resort }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [travelers, setTravelers] = useState({ rooms: 1, travelers: 2 });
  const [showPricingInfo, setShowPricingInfo] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState("1bed"); // Default to 1 bed

  const togglePricingInfo = () => {
    setShowPricingInfo(!showPricingInfo);
  };

  // Format dates for display and API
  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate number of nights
  const calculateNights = () => {
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white p-4 md:p-6 max-w-5xl mx-auto">
      {/* Title */}
      <h1 className="text-xl md:text-2xl font-semibold mb-6">Choose your room</h1>

      {/* Input Fields */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Start Date */}
        <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
          <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
          <div className="flex flex-col text-left w-full">
            <span className="text-sm md:text-base text-gray-700 font-medium">
              Start Date
            </span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* End Date */}
        <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
          <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
          <div className="flex flex-col text-left w-full">
            <span className="text-sm md:text-base text-gray-700 font-medium">
              End Date
            </span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
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
              type="text"
              value={`${travelers.rooms} room, ${travelers.travelers} travelers`}
              readOnly
              className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Pricing Information Section */}
      <div className="border border-gray-300 rounded-lg p-4 mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={togglePricingInfo}
        >
          <h2 className="text-sm md:text-base text-gray-700 font-medium">
            Prices are lower than typical
          </h2>
          {showPricingInfo ? (
            <FaChevronUp className="text-gray-500 text-lg" />
          ) : (
            <FaChevronDown className="text-gray-500 text-lg" />
          )}
        </div>

        {showPricingInfo && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              We predict nightly prices for properties like this to range between $173-$260 (before taxes and fees) on our site.
            </p>
            <p className="text-sm text-blue-600 mt-2">More details</p>

            <div className="mt-2">
              <div className="flex gap-4">
                <span className="text-sm text-gray-700">$139</span>
                <span className="text-sm text-gray-700">$173</span>
                <span className="text-sm text-gray-700">$260</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Display selected dates information */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          Showing availability for: <span className="font-medium">{formatDateForDisplay(startDate)}</span> to <span className="font-medium">{formatDateForDisplay(endDate)}</span> ({calculateNights()} nights)
        </p>
      </div>

      {/* Room Type Filter Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg border ${selectedRoomType === "1bed" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"}`}
          onClick={() => setSelectedRoomType("1bed")}
        >
          1 Bed
        </button>
        <button
          className={`px-4 py-2 rounded-lg border ${selectedRoomType === "suite" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"}`}
          onClick={() => setSelectedRoomType("suite")}
        >
          Suite
        </button>
      </div>

      {/* Room Cards with date information */}
      <div>
        {selectedRoomType === "1bed" ? (
          <RoomCard 
            resort={resort}
            startDate={startDate}
            endDate={endDate}
            nights={calculateNights()}
            travelers={travelers}
          />
        ) : (
          <div className="grid gap-6">
            <SuiteCard 
              resort={resort}
              startDate={startDate}
              endDate={endDate}
              travelers={travelers}
              nights={calculateNights()}
              title="Deluxe Suite"
              amount={59}
              imageUrl={resort?.suiteImages?.deluxe || "https://via.placeholder.com/300x200?text=Deluxe+Suite"}
              description="Luxurious suite with premium amenities and stunning views"
              sleeps={2}
              size="350 sq ft"
            />
            <SuiteCard 
              resort={resort}
              startDate={startDate}
              endDate={endDate}
              travelers={travelers}
              nights={calculateNights()}
              title="Family Deluxe Suite"
              amount={79}
              imageUrl={resort?.suiteImages?.family || "https://via.placeholder.com/300x200?text=Family+Suite"}
              description="Spacious suite perfect for families with extra sleeping areas"
              sleeps={4}
              size="500 sq ft"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;