import React from "react";
import { FaUtensils, FaParking, FaSwimmingPool, FaShuttleVan, FaConciergeBell, FaBroom } from "react-icons/fa";

const About = () => {
  const features = [
    { icon: <FaUtensils className="w-6 h-6" />, text: "Breakfast included" },
    { icon: <FaParking className="w-6 h-6" />, text: "Parking included" },
    { icon: <FaSwimmingPool className="w-6 h-6" />, text: "Pool" },
    { icon: <FaShuttleVan className="w-6 h-6" />, text: "Free airport shuttle" },
    { icon: <FaConciergeBell className="w-6 h-6" />, text: "Room service" },
    { icon: <FaBroom className="w-6 h-6" />, text: "Housekeeping" },
  ];

  return (
    <div className=" bg-white rounded-lg ">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">About this property</h2>

      {/* Paragraph */}
      <p className="text-gray-600 mb-2">
        Hotel in Orlando with free breakfast and airport shuttle service.
      </p>

      {/* Feature List */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            {/* Icon */}
            <div className="text-gray-600">{feature.icon}</div>
            {/* Text */}
            <span className="text-gray-700">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;