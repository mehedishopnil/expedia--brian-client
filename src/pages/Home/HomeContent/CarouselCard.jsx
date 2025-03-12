import React, { useState } from "react";
import { FaArrowRight, FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import airImg from "../../../assets/images/airImg.avif";
import londonBridgeImg from "../../../assets/images/londonBridgeImg.avif";
import keyImg from "../../../assets/images/keyImg.avif";

const CarouselCard = () => {
  // Dummy data for cards
  const cards = [
    {
      id: 1,
      header: "Cleared for takeoff: Southwest Airlines now on Expedia",
      image: airImg,
      link: "#",
    },
    {
      id: 2,
      header: "The Annual Vacation Sale has landed",
      image: londonBridgeImg,
      link: "#",
    },
    {
      id: 3,
      header: "Earn up to $600 in OneKeyCash™. Terms apply",
      image: keyImg,
      link: "#",
    },
  ];

  const [currentCard, setCurrentCard] = useState(0);

  // Handle next card
  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  // Handle previous card
  const handlePrev = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="relative group  rounded-lg">
      {/* Left Arrow Button */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#fddb32] p-2 rounded-full shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:hidden"
      >
        <FaArrowCircleLeft className="text-gray-700 text-2xl" />
      </button>

      {/* Cards Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 sm:grid sm:grid-cols-3 sm:gap-4"
          style={{ transform: `translateX(-${currentCard * 100}%)` }}
        >
          {cards.map((card) => (
            <a
              key={card.id}
              href={card.link}
              className="w-full flex-shrink-0 bg-[#fddb32] rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 sm:hover:scale-100"
            >
              <div className="flex">
                {/* Left Section */}
                <div className="w-1/2 p-4 flex flex-col justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">{card.header}</h3>
                  <button className="flex items-center text-gray-800 hover:text-blue-800">
                    <span className="text-sm mr-2">Book Now</span>
                    <FaArrowRight />
                  </button>
                </div>

                {/* Right Section */}
                <div className="w-1/2 ">
                  <img
                    src={card.image}
                    alt={card.header}
                    className="w-full h-32  object-cover"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Right Arrow Button */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#fddb32] p-2 rounded-full shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:hidden"
      >
        <FaArrowCircleRight className="text-gray-700 text-2xl" />
      </button>
    </div>
  );
};

export default CarouselCard;