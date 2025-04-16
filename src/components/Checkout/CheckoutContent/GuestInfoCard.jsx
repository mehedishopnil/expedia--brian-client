import React from "react";
import { FaWifi } from "react-icons/fa";

const GuestInfoCard = ({ formData, handleChange, bed = "1 King Bed" }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Who's checking in?
      </h2>

      <div className="mb-6">
        <p className="font-medium">Room 1: 2 Adults, {bed}, Non-smoking</p>
        <div className="flex items-center mt-1 text-green-600">
          <FaWifi className="mr-2" />
          <span>Free wifi</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First name (required)
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last name (required)
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email address (required)
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile phone number (required)
          </label>
          <input
            type="tel"
            className="input input-bordered w-full"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="text-alerts"
            name="textAlerts"
            className="checkbox checkbox-sm mt-1 mr-2"
            checked={formData.textAlerts}
            onChange={handleChange}
          />
          <label htmlFor="text-alerts" className="text-sm text-gray-700">
            Receive text alerts about this trip. Message and data rates may apply.
          </label>
        </div>
      </div>
    </div>
  );
};

export default GuestInfoCard;
