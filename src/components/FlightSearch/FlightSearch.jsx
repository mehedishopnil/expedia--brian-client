import React from 'react';
import { useLocation } from 'react-router-dom';

const FlightSearch = () => {
  const location = useLocation();
  const searchData = location.state || {};

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Flight Search Results</h1>

      <div className="text-gray-700">
        <p><strong>Leaving From:</strong> {searchData.leavingFrom}</p>
        <p><strong>Going To:</strong> {searchData.goingTo}</p>
        <p><strong>Departure Date:</strong> {searchData.departureDate ? new Date(searchData.departureDate).toDateString() : 'Not provided'}</p>
        <p><strong>Return Date:</strong> {searchData.returnDate ? new Date(searchData.returnDate).toDateString() : 'Not provided'}</p>

        <p><strong>Travelers:</strong></p>
        <ul className="ml-4 list-disc">
          <li>Adults: {searchData.travelers?.adults ?? 0}</li>
          <li>Children: {searchData.travelers?.children ?? 0}</li>
          <li>Infants: {searchData.travelers?.infants ?? 0}</li>
        </ul>

        <p className="mt-2"><strong>Add-ons:</strong></p>
        <ul className="ml-4 list-disc">
          <li>Stay: {searchData.addStay ? 'Yes' : 'No'}</li>
          <li>Car: {searchData.addCar ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </div>
  );
};

export default FlightSearch;
