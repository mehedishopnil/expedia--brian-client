import React, { useState, useRef, useEffect } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RentalCars = () => {
  const [activeFilter, setActiveFilter] = useState("Rental Cars");
  const [showDiscountMenu, setShowDiscountMenu] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState("Discount Code");
  const [pickupDate, setPickupDate] = useState(new Date());
  const [dropoffDate, setDropoffDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState("10:00 AM");
  const [dropoffTime, setDropoffTime] = useState("10:00 AM");

  const discountMenuRef = useRef(null);

  // Close discount menu when clicking outside
  const handleClickOutside = (event) => {
    if (discountMenuRef.current && !discountMenuRef.current.contains(event.target)) {
      setShowDiscountMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDiscountSelect = (discount) => {
    setSelectedDiscount(discount);
    setShowDiscountMenu(false);
  };

  return (
    <div className="bg-white p-4 md:p-6 max-w-5xl mx-auto">
     
      {/* Rental Cars Form */}
      {activeFilter === "Rental Cars" && (
        <div className="flex flex-col gap-4">
          {/* Pick-up Location */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Pick-up Location
              </span>
              <input
                type="text"
                placeholder="Enter pick-up location"
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Drop-off Location */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaMapMarkerAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Drop-off Location
              </span>
              <input
                type="text"
                placeholder="Enter drop-off location"
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Pick-up Date */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Pick-up Date
              </span>
              <DatePicker
                selected={pickupDate}
                onChange={(date) => setPickupDate(date)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Drop-off Date */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
            <FaCalendarAlt className="text-gray-500 text-lg mr-3" />
            <div className="flex flex-col text-left w-full">
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Drop-off Date
              </span>
              <DatePicker
                selected={dropoffDate}
                onChange={(date) => setDropoffDate(date)}
                className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Pick-up and Drop-off Time */}
          <div className="flex md:flex-row gap-4">
            {/* Pick-up Time */}
            <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
              <FaClock className="text-gray-500 text-lg mr-3" />
              <div className="flex flex-col text-left w-full">
                <span className="text-xs md:text-sm text-gray-700 font-medium">
                  Pick-up Time
                </span>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Drop-off Time */}
            <div className="flex items-center w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200">
              <FaClock className="text-gray-500 text-lg mr-3" />
              <div className="flex flex-col text-left w-full">
                <span className="text-xs md:text-sm text-gray-700 font-medium">
                  Drop-off Time
                </span>
                <input
                  type="time"
                  value={dropoffTime}
                  onChange={(e) => setDropoffTime(e.target.value)}
                  className="w-full text-xs text-gray-500 bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Show AARP Rates and Discount Codes */}
          <div className="flex md:flex-row gap-4">
            {/* Show AARP Rates */}
            <button className="w-full md:w-auto text-xs md:text-sm border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white transition-all">
              Show AARP Rates
            </button>

            {/* Discount Codes Dropdown */}
            <div className="relative w-full md:w-auto">
              <button
                onClick={() => setShowDiscountMenu(!showDiscountMenu)}
                className="flex items-center justify-between w-full text-xs border border-gray-300 rounded-full p-2 md:p-3 bg-gray-50 hover:bg-gray-100 focus:ring-2 ring-blue-200"
              >
                <span className="text-xs md:text-sm text-gray-700 font-medium">
                  {selectedDiscount}
                </span>
                <FaChevronDown className="text-gray-500 text-lg" />
              </button>

              {/* Discount Menu */}
              {showDiscountMenu && (
                <div
                  ref={discountMenuRef}
                  className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                >
                  {["Discount Code 1", "Discount Code 2", "Discount Code 3"].map(
                    (discount) => (
                      <button
                        key={discount}
                        onClick={() => handleDiscountSelect(discount)}
                        className="flex items-center justify-between w-full px-4 py-3 text-xs md:text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <span>{discount}</span>
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Search Button */}
          <button className="w-full bg-[#1668e3] text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-500 transition-all text-xs md:text-sm">
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default RentalCars;