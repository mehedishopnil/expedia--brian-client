import React from "react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const Stays = () => {
  return (
    <div className="bg-white p-4 md:p-6  max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Location Input */}
        <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 focus-within:ring-2 ring-blue-200">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Going to"
            className="w-full bg-transparent border-hidden outline-none text-sm md:text-base"
          />
        </div>

        {/* Check-in & Check-out Inputs */}
        <div className="flex flex-col md:flex-row w-full gap-2">
          <div className="flex items-center border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 focus-within:ring-2 ring-blue-200 w-full">
            <MdDateRange className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Check-in"
              className="w-full bg-transparent border-hidden outline-none text-sm md:text-base"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 focus-within:ring-2 ring-blue-200 w-full">
            <MdDateRange className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Check-out"
              className="w-full bg-transparent border-hidden outline-none text-sm md:text-base"
            />
          </div>
        </div>

        {/* Guests Input */}
        <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 focus-within:ring-2 ring-blue-200">
          <FaUser className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Guests - 2 travelers, 1 room"
            className="w-full bg-transparent border-hidden outline-none text-sm md:text-base"
          />
        </div>

        {/* Search Button */}
        <button className="w-full md:w-auto bg-[#1668e3] text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-full hover:bg-blue-500 transition-all text-sm md:text-base">
          Search
        </button>
      </div>
    </div>
  );
};

export default Stays;