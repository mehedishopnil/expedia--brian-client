import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../../../providers/AuthProvider/AuthProvider';
import ResortCard from '../../../components/ResortCard/ResortCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RecommendedStays = () => {
  const { allResortData } = useContext(AuthContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [cardWidth, setCardWidth] = useState('33.33%');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Responsive breakpoints handler - Always show 4 cards
  const handleResize = useCallback(() => {
    if (window.innerWidth < 640) {
      // Mobile: Show 1 card
      setSlidesToShow(1);
      setCardWidth('100%');
    } else if (window.innerWidth < 768) {
      // Small tablet: Show 2 cards
      setSlidesToShow(2);
      setCardWidth('50%');
    } else if (window.innerWidth < 1024) {
      // Tablet: Show 3 cards
      setSlidesToShow(3);
      setCardWidth('33.33%');
    } else {
      // Desktop: Show 4 cards
      setSlidesToShow(4);
      setCardWidth('25%');
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Handle slide navigation with transition lock
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => {
      const maxSlide = totalCards === 4 ? 1 : 0;
      return prev >= maxSlide ? maxSlide : prev + 1;
    });
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => Math.max(0, prev - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Check if navigation buttons should be shown
  const totalCards = Math.min(allResortData.length, 4);
  const showPrevButton = currentSlide > 0;
  const showNextButton = totalCards === 4 && currentSlide < 1;

  // Early return if no data
  if (!allResortData || allResortData.length === 0) {
    return (
      <section className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <p className="text-gray-500 text-lg">
            No recommended stays available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto my-10 lg:my-16">
      {/* Header Section */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Recommended stays for you
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Based on your most recently viewed property
            </p>
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={prevSlide}
              disabled={!showPrevButton}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                showPrevButton
                  ? 'border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700'
                  : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              onClick={nextSlide}
              disabled={!showNextButton}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                showNextButton
                  ? 'border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700'
                  : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Next slide"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Mobile/Tablet Navigation - Floating Arrows */}
        {showPrevButton && (
          <button
            onClick={prevSlide}
            className="sm:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-xl hover:bg-gray-50 transition-all duration-200 opacity-90 hover:opacity-100"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-gray-800 text-sm" />
          </button>
        )}

        {showNextButton && (
          <button
            onClick={nextSlide}
            className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-xl hover:bg-gray-50 transition-all duration-200 opacity-90 hover:opacity-100"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-gray-800 text-sm" />
          </button>
        )}

        {/* Slider Viewport */}
        <div className="overflow-hidden -mx-2">
          {/* Slider Track */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
            }}
          >
            {allResortData.slice(0, 4).map((resort, index) => (
              <div
                key={resort.id || index}
                className="flex-shrink-0 px-2"
                style={{ width: cardWidth }}
              >
                <div className="h-full transform transition-all duration-300 hover:scale-[1.02]">
                  <ResortCard resort={resort} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Dots - Mobile Only */}
        <div className="sm:hidden flex justify-center gap-2 mt-6">
          {totalCards > 1 &&
            Array.from({ length: Math.ceil(totalCards / slidesToShow) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning && index < 2) {
                      setIsTransitioning(true);
                      setCurrentSlide(index);
                      setTimeout(() => setIsTransitioning(false), 300);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentSlide / slidesToShow) === index
                      ? 'w-8 bg-blue-600'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            )}
        </div>

        {/* Slide Counter - Desktop Only */}
        {totalCards > slidesToShow && (
          <div className="hidden sm:flex justify-center mt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <span className="text-sm font-semibold text-gray-900">
                {currentSlide + 1}
              </span>
              <span className="text-sm text-gray-500">/</span>
              <span className="text-sm text-gray-600">2</span>
            </div>
          </div>
        )}
      </div>

      {/* View All Link */}
      <div className="mt-8 text-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 font-semibold text-base hover:text-blue-700 transition-colors duration-200 group"
        >
          <Link to="/hotels">ViewLink properties</Link>
          <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </section>
  );
};

export default RecommendedStays;
