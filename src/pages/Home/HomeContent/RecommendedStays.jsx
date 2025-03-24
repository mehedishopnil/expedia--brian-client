import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../providers/AuthProvider/AuthProvider';
import ResortCard from '../../../components/ResortCard/ResortCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const RecommendedStays = () => {
  const { allResortData } = useContext(AuthContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [cardWidth, setCardWidth] = useState('33.33%');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1.2);
        setCardWidth('83.33%'); // 100%/1.2
      } else if (window.innerWidth < 768) {
        setSlidesToShow(1.5);
        setCardWidth('66.66%'); // 100%/1.5
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
        setCardWidth('50%');
      } else {
        setSlidesToShow(3);
        setCardWidth('33.33%');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev >= allResortData.length - Math.ceil(slidesToShow) ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? allResortData.length - Math.ceil(slidesToShow) : prev - 1
    );
  };

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title and Description */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Recommended stays for you</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">
          Based on your most recently viewed property
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Left Arrow - Only show if there are slides to the left */}
        {currentSlide > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all z-10"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-gray-800 text-lg" />
          </button>
        )}

        {/* Slider Viewport */}
        <div className="overflow-hidden">
          {/* Slider Track */}
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
            }}
          >
            {allResortData.slice(0, 9).map((resort, index) => (
              <div
                key={resort.id || index}
                className="flex-shrink-0 px-2"
                style={{ width: cardWidth }}
              >
                <ResortCard resort={resort} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow - Only show if there are slides to the right */}
        {currentSlide < allResortData.length - Math.ceil(slidesToShow) && (
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all z-10"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-gray-800 text-lg" />
          </button>
        )}
      </div>
    </div>
  );
};

export default RecommendedStays;