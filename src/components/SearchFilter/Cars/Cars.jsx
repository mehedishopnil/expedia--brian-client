import React, { useState, useRef, useEffect } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RentalCars from "./CarsFilterMenu/RentalCars";
import AirportTransportation from "./CarsFilterMenu/AirportTransportation";

const Cars = () => {
  const [activeFilter, setActiveFilter] = useState("Rental Cars");
  const [showDiscountMenu, setShowDiscountMenu] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState("Discount Code");

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
      {/* Filter Menu */}
      <div className="flex gap-4 mb-6 overflow-x-auto scrollbar-hide">
        {["Rental Cars", "Airport Transportation"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-shrink-0 text-xs md:text-sm font-medium px-3 py-1 md:px-4 md:py-2 ${
              activeFilter === filter
                ? "text-blue-700 border-b border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Rental Cars Form */}
      {activeFilter === "Rental Cars" && <RentalCars />}

      {/* Airport Transportation Form */}
      {activeFilter === "Airport Transportation" && <AirportTransportation />}
    </div>
  );
};

export default Cars;