import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider/AuthProvider';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import bgPhoto from '../../../assets/images/BEX-USCAINKSAUAE.webp';

const AnnualVacation = () => {
  const { allResortData } = useContext(AuthContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Check if allResortData is defined and not empty
  if (!allResortData || allResortData.length === 0) {
    return (
      <div
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${bgPhoto})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <p className="text-xl">No resorts available at the moment.</p>
        </div>
      </div>
    );
  }

  // Generate random rating and complement
  const getRandomRating = () => {
    const rating = (Math.random() * (10 - 7) + 7).toFixed(1);
    let complement = "Good";
    if (rating >= 9.5) {
      complement = "Exceptional";
    } else if (rating >= 8.5) {
      complement = "Wonderful";
    } else if (rating >= 7.5) {
      complement = "Excellent";
    }
    return { rating, complement };
  };

  // Generate random price
  const getRandomPrice = () => {
    const price = Math.floor(Math.random() * (400 - 250 + 1)) + 250;
    const total = price + Math.floor(price * 0.15); // Adding 15% taxes & fees
    return { price, total };
  };

  // Slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allResortData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? allResortData.length - 1 : prev - 1));
  };

  return (
    <div
      className="relative bg-cover bg-center h-[650px] my-10 rounded-3xl flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgPhoto})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute rounded-3xl inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="flex flex-col justify-center items-center relative z-10 text-start text-white max-w-6xl w-full px-4">
        {/* Title */}
        <h2 className="text-xl md:text-4xl font-bold mb-6">
          The Annual Vacation Sale: Book by {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
        </h2>

        {/* Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 p-2 rounded-full hover:bg-opacity-100 transition-all"
          >
            <FaChevronLeft className="text-gray-800 text-xl" />
          </button>

          {/* Resort Card */}
          <div className="flex  items-start text-start">
            <div className=" rounded-lg shadow-lg w-80  text-white overflow-hidden">
              <img
                src={allResortData[currentSlide].img}
                alt={allResortData[currentSlide].place_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-white">
                <h3 className="text-lg font-semibold ">
                  {allResortData[currentSlide].place_name}
                </h3>
                <div className="flex text-sm  mt-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">
                    {getRandomRating().rating} {getRandomRating().complement} ({Math.floor(Math.random() * 100)} reviews)
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-semibold ">
                    ${getRandomPrice().price}
                  </p>
                  <p className="text-sm text-gray-100">per night</p>
                  <p className="text-sm text-gray-100">
                    ${getRandomPrice().total} total (includes taxes & fees)
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-200">Member Price Available</p>
                  <a href="#" className="text-sm text-gray-200 bg-blue-600 px-2 rounded py-1 hover:underline">
                    Sign in for Member Price
                  </a>
                </div>
                <div className="mt-4 flex items-center gap-2 ">
                  <a href="#" className="text-sm text-gray-200 hover:underline">
                    See more deals
                  </a>
                  <FaChevronRight className="text-gray-200 text-sm " />
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 p-2 rounded-full hover:bg-opacity-100 transition-all"
          >
            <FaChevronRight className="text-gray-800 text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnualVacation;