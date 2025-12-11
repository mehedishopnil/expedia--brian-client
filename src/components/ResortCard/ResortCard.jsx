import React, { useState, useMemo, useEffect } from 'react';
import { FaMapMarkerAlt, FaHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ResortCard = ({ resort }) => {
  const { _id, img, place_name, location, reviews_amount } = resort;
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Remove the old getFallbackImage function and replace it with:
  const [fallbackImage, setFallbackImage] = useState('');

  useEffect(() => {
    // Generate a random fallback image on component mount
    const demoImages = [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ];

    // Generate random index on mount
    const randomIndex = Math.floor(Math.random() * demoImages.length);
    setFallbackImage(demoImages[randomIndex]);
  }, []); // Empty dependency array means this runs once on mount

  // Change this line:
  const imageSrc = imageError || !img ? fallbackImage : img;

  // Memoize rating to prevent changes on re-renders
  const { rating, comment } = useMemo(() => {
    const r = Math.floor(Math.random() * 4) + 7;
    let c = 'Good';
    if (r === 8) c = 'Excellent';
    if (r >= 9) c = 'Wonderful';
    return { rating: r, comment: c };
  }, []);

  const handleLikeClick = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    console.log('Liked:', place_name, isLiked ? 'unliked' : 'liked');
  };

  return (
    <Link
      to={`/singleResortPage/${_id}`}
      className="group relative block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {/* Image Container */}
      <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden">
        {/* Loading Skeleton */}
        {imageLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}

        {/* Main Image */}
        <img
          src={imageSrc}
          alt={place_name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            imageLoading ? 'opacity-0' : 'opacity-100 group-hover:scale-105'
          }`}
          loading="lazy"
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Heart Button */}
        <button
          onClick={handleLikeClick}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FaHeart
            className={`text-lg transition-colors ${
              isLiked
                ? 'text-red-500 fill-red-500'
                : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>

        {/* Top Rated Badge */}
        {rating >= 9 && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1 z-10">
            <FaStar className="text-xs" />
            Top Rated
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-semibold">
          <FaStar className="text-amber-400" />
          <span>{rating}/10</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 sm:p-6 md:p-7">
        {/* Title and Location */}
        <div className="mb-4 sm:mb-5">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {place_name}
          </h3>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="text-blue-500 mr-2 flex-shrink-0 text-sm" />
            <span className="text-sm sm:text-base line-clamp-1">
              {location}
            </span>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100 gap-3 sm:gap-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-sm font-medium">
                <FaStar className="text-amber-400" />
                {comment}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              {reviews_amount?.toLocaleString() || 0} reviews
            </p>
          </div>

          {/* View Details Button */}
          <span className="text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center gap-1">
            View details
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Hover Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:via-blue-500/5 group-hover:to-blue-500/10 transition-all duration-300 pointer-events-none" />
    </Link>
  );
};

export default ResortCard;
