import React, { useState } from 'react';
import { FaPlus, FaInfoCircle, FaShare, FaSuitcase, FaCreditCard, FaCamera, FaTag, FaStar } from 'react-icons/fa';

const CruiseDates = () => {
  const [selectedCabin, setSelectedCabin] = useState('Inside');
  const [prices, setPrices] = useState(['$899', '$1,099', '$1,299', '$999']);

  // Sample data for cruise dates
  const cabinTypes = ['Inside', 'Outside', 'Balcony', 'Suite'];
  
  const dates = [
    { date: 'Jun 15, 2024' },
    { date: 'Jul 6, 2024' },
    { date: 'Aug 10, 2024' },
    { date: 'Sep 5, 2024' }
  ];

  const offers = [
    { icon: <FaSuitcase className="text-blue-500 mr-2" />, text: 'Have It All - Includes Drinks, Shore Excursions, Dining, and Wi-Fi' },
    { icon: <FaCreditCard className="text-blue-500 mr-2" />, text: 'Up to $150 Onboard Credit, Savings & More!' },
    { icon: <img src="https://egca.odysol.com/site/images/promotions/OneKeyIcon.png" alt="OneKey" className="w-4 h-4 mr-2" />, text: 'Earn 2% in OneKeyCash' },
    { icon: <FaCamera className="text-blue-500 mr-2" />, text: '10% off Shore Excursions!' },
    { icon: <FaStar className="text-blue-500 mr-2" />, text: 'Exclusive! $50 Onboard Credit' },
    { icon: <FaTag className="text-blue-500 mr-2" />, text: 'Member Prices' }
  ];

  // Generate random prices when cabin type changes
  const handleCabinChange = (cabin) => {
    setSelectedCabin(cabin);
    const newPrices = dates.map(() => {
      const basePrice = Math.floor(Math.random() * 1000) + 500;
      return `$${basePrice.toLocaleString()}`;
    });
    setPrices(newPrices);
  };

  return (
    <div className="space-y-6">
      {/* Cabin Type Filters - Horizontal Scroll for Mobile */}
      <div className="flex overflow-x-auto pb-2 mb-4 scrollbar-hide whitespace-nowrap space-x-2">
        {cabinTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleCabinChange(type)}
            className={`py-2 px-4 rounded-lg transition-colors ${
              selectedCabin === type
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Date Rows */}
      <div className="space-y-4">
        {dates.map((dateItem, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              {/* Left Column - Icons */}
              <div className="flex flex-col items-start space-y-2">
                <div className="flex space-x-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaPlus size={16} />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaInfoCircle size={16} />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaShare size={16} />
                  </button>
                </div>
                <div className="flex space-x-4 text-gray-500">
                  <FaSuitcase size={14} />
                  <FaCreditCard size={14} />
                  <FaCamera size={14} />
                  <FaTag size={14} />
                </div>
              </div>

              {/* Middle Column - Date and Price */}
              <div className="text-center">
                <p className="font-medium">{dateItem.date}</p>
                <p className="text-blue-600 font-bold">{prices[index]}</p>
              </div>

              {/* Right Column - Book Button */}
              <div className="flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg">
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bonus Offers Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Bonus Offers*</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Bonus offers vary and apply to select staterooms and prices.
        </p>
        
        <ul className="space-y-3">
          {offers.map((offer, index) => (
            <li key={index} className="flex items-start">
              {offer.icon}
              <span>{offer.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CruiseDates;