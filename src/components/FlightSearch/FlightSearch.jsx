import React from 'react';
import { IoFilter } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';

const FlightSearch = () => {
  const location = useLocation();
  const searchData = location.state || {};

  console.log(searchData);
  const { goingTo, leavingFrom, departureDate, returnDate, travelers, addStay, addCar } = searchData;

  // Function to format date for display
  const formatDate = (date) => {
    if (!date) return 'N/A';
    
    // If date is already a string (from ISO format), use it directly
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString();
    }
    
    // If it's a Date object, format it
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    
    return 'N/A';
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-blue-600 ">
        {leavingFrom || 'Unknown'} to {goingTo || 'Unknown'}
      </h1>
      <p>{formatDate(departureDate)} - {formatDate(returnDate)}</p>

      <Link>
      <div className='flex items-center justify-center gap-3 w-full border text-blue-600 font-semibold rounded-full border-gray-600 py-1 my-5'>
          <IoFilter />
          <h1>Sort & Filter</h1>
      </div>
      </Link>
      
      
    </div>
  );
};

export default FlightSearch;
