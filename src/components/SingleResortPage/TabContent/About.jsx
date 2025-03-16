import React from "react";
import {
  FaUtensils,
  FaParking,
  FaSwimmingPool,
  FaShuttleVan,
  FaConciergeBell,
  FaBroom,
  FaMapMarkerAlt,
} from "react-icons/fa";

import onekeyIcon from "../../../assets/images/onekey__standard__always_light.svg";
import { Link } from "react-router-dom";

const About = ({ resort }) => {
  const { location } = resort;

  // Split location by commas and trim whitespace
  const locationParts = location.split(",").map((part) => part.trim());

  const features = [
    { icon: <FaUtensils className="w-6 h-6" />, text: "Breakfast included" },
    { icon: <FaParking className="w-6 h-6" />, text: "Parking included" },
    { icon: <FaSwimmingPool className="w-6 h-6" />, text: "Pool" },
    { icon: <FaShuttleVan className="w-6 h-6" />, text: "Free airport shuttle" },
    { icon: <FaConciergeBell className="w-6 h-6" />, text: "Room service" },
    { icon: <FaBroom className="w-6 h-6" />, text: "Housekeeping" },
  ];

  return (
    <div className="bg-white rounded-lg space-y-2 shadow-sm">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        About this property
      </h2>

      {/* Paragraph */}
      <p className="text-gray-600 mb-6">
        Hotel in Orlando with free breakfast and airport shuttle service.
      </p>

      {/* Feature List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            {/* Icon */}
            <div className="text-gray-600">{feature.icon}</div>
            {/* Text */}
            <span className="text-gray-700">{feature.text}</span>
          </div>
        ))}
      </div>

      {/* Location Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Explore the area</h3>
        <ul className="space-y-2">
          {locationParts.map((part, index) => (
            <li key={index} className="flex items-center space-x-3">
              {/* Location Icon */}
              <div className="text-gray-600">
                <FaMapMarkerAlt className="w-5 h-5" />
              </div>
              {/* Location Text */}
              <span className="text-gray-700">{part}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full rounded gap-2 flex bg-[#191E3B] p-2 ">
          <img src={onekeyIcon} alt="" className="w-20" />
          <div className="flex flex-col gap-2">
               <h1 className="text-white text-sm">Earn OneKeyCash on this stay when you sign in and book. More rewards for more adventures!</h1>
               <Link to="/login">
               <button className="bg-[#1c4ff7] text-white px-4 py-2 rounded-full">Sign in</button>
               </Link>
          </div>
      </div>
    </div>
  );
};

export default About;