import React, { useContext, useState, useMemo } from 'react';
import { AuthContext } from '../../../providers/AuthProvider/AuthProvider';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import bgPhoto from '../../../assets/images/BEX-USCAINKSAUAE.webp';
import { Link } from 'react-router-dom';

const AnnualVacation = ({ resortData }) => {
  const { _id } = resortData || {};

  const { allResortData } = useContext(AuthContext);
  const [currentSlide, setCurrentSlide] = useState(0);



  // Memoize random data to prevent re-generation on every render
  const resortDetails = useMemo(() => {
    if (!allResortData || allResortData.length === 0) return [];

    return allResortData.map(() => {
      // Generate random rating
      const rating = (Math.random() * (10 - 7) + 7).toFixed(1);
      let complement = 'Good';
      if (parseFloat(rating) >= 9.5) {
        complement = 'Exceptional';
      } else if (parseFloat(rating) >= 8.5) {
        complement = 'Wonderful';
      } else if (parseFloat(rating) >= 7.5) {
        complement = 'Excellent';
      }

      // Generate random price
      const price = Math.floor(Math.random() * (400 - 250 + 1)) + 250;
      const total = price + Math.floor(price * 0.15);
      const reviews = Math.floor(Math.random() * (500 - 50 + 1)) + 50;

      return { rating, complement, price, total, reviews };
    });
  }, [allResortData]);

  // Check if allResortData is defined and not empty
  if (!allResortData || allResortData.length === 0) {
    return (
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <div
          className="relative bg-cover bg-center h-[400px] md:h-[500px] flex items-center justify-center"
          style={{
            backgroundImage: `url(${bgPhoto})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
          <div className="relative z-10 text-center text-white px-4">
            <p className="text-xl md:text-2xl font-semibold">
              No resorts available at the moment.
            </p>
            <p className="mt-2 text-sm md:text-base text-gray-200">
              Check back soon for amazing vacation deals!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate deadline (7 days from now)
  const deadline = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Slider navigation
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % allResortData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? allResortData.length - 1 : prev - 1));
  };

  const currentResort = allResortData[currentSlide];
  const currentDetails = resortDetails[currentSlide];

  return (
    <section className="w-full my-10 lg:my-16">
      <div
        className="relative bg-cover bg-center rounded-3xl overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `url(${bgPhoto})`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

        {/* Content Container */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-block mb-4">
                <span className="bg-red-600 text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                  Limited Time Offer
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                The Annual Vacation Sale
              </h2>
              <p className="mt-3 text-base md:text-lg lg:text-xl text-gray-100">
                Book by{' '}
                <span className="font-semibold text-yellow-400">
                  {deadline}
                </span>
              </p>
              <p className="mt-2 text-sm md:text-base text-gray-200">
                Save up to 25% on select hotels worldwide
              </p>
            </div>

            {/* Carousel Container */}
            <div className="relative max-w-4xl mx-auto">
              {/* Navigation Buttons */}
              {allResortData.length > 1 && (
                <>
                  {/* Left Arrow - Hidden on mobile, shown on tablet+ */}
                  <button
                    onClick={prevSlide}
                    className="hidden md:flex absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12 h-12 bg-white rounded-full shadow-xl hover:bg-gray-100 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50"
                    aria-label="Previous resort"
                  >
                    <FaChevronLeft className="text-gray-800 text-lg" />
                  </button>

                  {/* Right Arrow - Hidden on mobile, shown on tablet+ */}
                  <button
                    onClick={nextSlide}
                    className="hidden md:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12 h-12 bg-white rounded-full shadow-xl hover:bg-gray-100 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50"
                    aria-label="Next resort"
                  >
                    <FaChevronRight className="text-gray-800 text-lg" />
                  </button>
                </>
              )}

              {/* Resort Card */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto transform transition-all duration-300 hover:scale-[1.02]">
                {/* Image Container */}
                <div className="relative">
                  <img
                    src={currentResort.img}
                    alt={currentResort.place_name}
                    className="w-full h-52 sm:h-60 md:h-64 object-cover"
                  />
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    Save 25%
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6">
                  {/* Resort Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {currentResort.place_name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-blue-600 text-white px-2.5 py-1 rounded-lg">
                      <FaStar className="text-sm" />
                      <span className="font-bold text-sm">
                        {currentDetails.rating}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {currentDetails.complement}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({currentDetails.reviews} reviews)
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-4"></div>

                  {/* Pricing */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                        ${currentDetails.price}
                      </span>
                      <span className="text-sm text-gray-500">per night</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      ${currentDetails.total} total{' '}
                      <span className="text-gray-500">
                        (includes taxes & fees)
                      </span>
                    </p>
                  </div>

                  {/* Member Price CTA */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          Member Price Available
                        </p>
                        <p className="text-xs text-gray-600">
                          Save even more as a member
                        </p>
                      </div>
                      <a
                        href="#"
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"
                      >
                        Sign in
                      </a>
                    </div>
                  </div>

                  {/* See More Deals Link */}
                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group"
                  >
                    <Link to={`/singleResortPage/${_id}`}>See more deals</Link>
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>

              {/* Mobile Navigation Dots */}
              {allResortData.length > 1 && (
                <div className="flex md:hidden justify-center gap-2 mt-6">
                  {allResortData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'w-8 bg-white'
                          : 'w-2 bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Desktop Slide Counter */}
              {allResortData.length > 1 && (
                <div className="hidden md:block text-center mt-6">
                  <p className="text-white text-sm font-medium">
                    {currentSlide + 1} / {allResortData.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnualVacation;
