import React from 'react';
import { FaWheelchair, FaBed, FaBuilding } from 'react-icons/fa';

const Accessibility = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Accessibility</h2>

      {/* Paragraph */}
      <p className="text-sm text-gray-600 mb-6">
        If you have requests for specific accessibility needs, please contact the property using the information on the reservation confirmation received after booking.
      </p>

      {/* Common Areas Section */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <FaBuilding className="text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Common areas</h3>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
          <li>Wheelchair accessible (may have limitations)</li>
          <li>Elevator</li>
          <li>Stair-free path to entrance</li>
          <li>Wheelchair-accessible business center</li>
          <li>Wheelchair-accessible gym</li>
          <li>Wheelchair-accessible lounge</li>
          <li>Wheelchair-accessible path of travel</li>
          <li>Wheelchair-accessible path to elevator</li>
          <li>Wheelchair-accessible public washroom</li>
          <li>Wheelchair-accessible registration desk</li>
          <li>Wheelchair-accessible restaurant</li>
        </ul>
      </div>

      {/* Rooms Section */}
      <div>
        <div className="flex items-center mb-3">
          <FaBed className="text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Rooms</h3>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
          <li>Hand-held showerhead</li>
          <li>Lever door handles</li>
          <li>Low-height desk</li>
          <li>Low-height door lock</li>
          <li>Low-height electrical outlets in bathroom</li>
          <li>Low-height view port in door</li>
          <li>Wheelchair accessibility</li>
          <li>Wheelchair-width doorways</li>
        </ul>
      </div>
    </div>
  );
};

export default Accessibility;