import React from "react";
import { FaStar, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResortCard = ({ resort }) => {
  const { _id, img, place_name, location, reviews_amount } = resort;


  // Generate a random rating between 7 and 10
  const rating = Math.floor(Math.random() * 4) + 7;

  // Determine the comment based on the rating
  let comment;
  if (rating === 7) {
    comment = "Good";
  } else if (rating === 8) {
    comment = "Excellent";
  } else if (rating >= 9) {
    comment = "Wonderful";
  }

  return (
    <Link to={`/singleResortPage/${_id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Resort Image with Like Icon */}
        <div className="relative">
          <img
            src={img}
            alt={place_name}
            className="w-full h-48 object-cover"
          />
          {/* Like (Love) Icon */}
          <button
            className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.preventDefault(); // Prevent Link navigation when clicking the like button
              console.log("Liked:", place_name);
            }}
          >
            <FaHeart className="text-red-500" />
          </button>
        </div>

        {/* Resort Details */}
        <div className="p-4">
          {/* Place Name */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {place_name}
          </h2>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-2" />
            <span>{location}</span>
          </div>

          {/* Rating and Review */}
          <div className="flex items-center gap-1 text-yellow-500 mb-2">
            <FaStar className="mr-1" />
            <span>{rating}</span>
            {/* Comment based on Rating */}
            <p className="text-gray-500">{comment}</p>
            <span className="ml-2 text-gray-600">({reviews_amount} reviews)</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResortCard;