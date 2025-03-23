import React, { useState } from "react";
import { FaMapMarkerAlt, FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AirportTransportation = () => {
  const [activeFilter, setActiveFilter] = useState("Airport to Hotel");
  const [airport, setAirport] = useState("");
  const [hotel, setHotel] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [flightArrivalDate, setFlightArrivalDate] = useState(new Date());
  const [flightArrivalTime, setFlightArrivalTime] = useState("10:00 AM");
  const [flightDepartureDate, setFlightDepartureDate] = useState(new Date());
  const [flightDepartureTime, setFlightDepartureTime] = useState("10:00 AM");

  const handleSearch = () => {
    alert("Search functionality to be implemented.");
  };

  return (
    <div className="bg-white p-4 md:p-6 max-w-5xl mx-auto">
      {/* Filter Menu */}
      <div className="flex gap-1 mb-6 overflow-x-auto scrollbar-hide">
        {["Airport to Hotel", "Hotel to Airport", "Roundtrip"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-shrink-0 text-[10px] border rounded-full  md:text-sm font-medium px-3 py-1 md:px-4 md:py-2 ${
              activeFilter === filter
                ? "text-blue-700 border-b border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Airport to Hotel Form */}
      {activeFilter === "Airport to Hotel" && (
        <div className="flex flex-col gap-4">
          {/* Airport Input */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Airport
              </span>
              <input
                type="text"
                placeholder="Enter airport"
                value={airport}
                onChange={(e) => setAirport(e.target.value)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Hotel Input */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Hotel
              </span>
              <input
                type="text"
                placeholder="Enter hotel"
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Travelers Input */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaUser className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
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

          {/* Flight Arrival Date */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Flight Arrival Date
              </span>
              <DatePicker
                selected={flightArrivalDate}
                onChange={(date) => setFlightArrivalDate(date)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Flight Arrival Time */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaClock className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Flight Arrival Time
              </span>
              <input
                type="time"
                value={flightArrivalTime}
                onChange={(e) => setFlightArrivalTime(e.target.value)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full bg-[#1668e3] text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-500 transition-all text-xs md:text-sm"
          >
            Search
          </button>
        </div>
      )}

      {/* Hotel to Airport Form */}
      {activeFilter === "Hotel to Airport" && (
        <div className="flex flex-col gap-4">
          {/* Hotel Input */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Hotel
              </span>
              <input
                type="text"
                placeholder="Enter hotel"
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Airport Input */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Airport
              </span>
              <input
                type="text"
                placeholder="Enter airport"
                value={airport}
                onChange={(e) => setAirport(e.target.value)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Travelers Input */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaUser className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
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

          {/* Flight Arrival Date */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Flight Arrival Date
              </span>
              <DatePicker
                selected={flightArrivalDate}
                onChange={(date) => setFlightArrivalDate(date)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Flight Arrival Time */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaClock className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Flight Arrival Time
              </span>
              <input
                type="time"
                value={flightArrivalTime}
                onChange={(e) => setFlightArrivalTime(e.target.value)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full bg-[#1668e3] text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-500 transition-all text-xs md:text-sm"
          >
            Search
          </button>
        </div>
      )}

      {/* Roundtrip Form */}
      {activeFilter === "Roundtrip" && (
        <div className="flex flex-col gap-4">
          {/* Airport Input */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Airport
              </span>
              <input
                type="text"
                placeholder="Enter airport"
                value={airport}
                onChange={(e) => setAirport(e.target.value)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Hotel Input */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Hotel
              </span>
              <input
                type="text"
                placeholder="Enter hotel"
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Travelers Input */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaUser className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
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

          {/* Flight Arrival Date */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Flight Arrival Date
              </span>
              <DatePicker
                selected={flightArrivalDate}
                onChange={(date) => setFlightArrivalDate(date)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Flight Arrival Time */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaClock className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Flight Arrival Time
              </span>
              <input
                type="time"
                value={flightArrivalTime}
                onChange={(e) => setFlightArrivalTime(e.target.value)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Flight Departure Date */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Flight Departure Date
              </span>
              <DatePicker
                selected={flightDepartureDate}
                onChange={(date) => setFlightDepartureDate(date)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Flight Departure Time */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaClock className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Flight Departure Time
              </span>
              <input
                type="time"
                value={flightDepartureTime}
                onChange={(e) => setFlightDepartureTime(e.target.value)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full bg-[#1668e3] text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-500 transition-all text-xs md:text-sm"
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default AirportTransportation;