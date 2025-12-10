import React, { useMemo } from 'react';
import { FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ResortCard = ({ resort }) => {
  const { _id, img, place_name, location, reviews_amount } = resort;

  // Memoize rating to prevent changes on re-renders
  const { rating, comment } = useMemo(() => {
    const r = Math.floor(Math.random() * 4) + 7;
    let c = 'Good';
    if (r === 8) c = 'Excellent';
    if (r >= 9) c = 'Wonderful';
    return { rating: r, comment: c };
  }, []);

  return (
    <Link to={`/singleResortPage/${_id}`} className="group block h-full">
      <div className="relative flex flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={img}
            alt={place_name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Heart Button */}
          <button
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-500 hover:text-red-500 transition-all duration-200 shadow-sm z-10"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Liked:', place_name);
            }}
          >
            <FaHeart size={16} />
          </button>

          {/* Badge (Optional: if you wanted to show 'New' or 'Popular') */}
          {rating >= 9 && (
            <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              Top Rated
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-4 sm:p-5">
          <div className="flex-grow">
            {/* Title */}
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {place_name}
            </h2>

            {/* Location */}
            <div className="flex items-start gap-1.5 text-gray-500 text-sm mb-4">
              <FaMapMarkerAlt className="mt-0.5 flex-shrink-0 text-gray-400" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>

          {/* Footer: Rating Section */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                {comment}
              </span>
              <span className="text-xs text-gray-500">
                {reviews_amount} reviews
              </span>
            </div>

            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white font-bold rounded-lg text-sm shadow-sm">
              {rating}/10
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResortCard;
