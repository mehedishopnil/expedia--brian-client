import React from 'react';

const RoomCard = ({ resort }) => {
  const { img2, img3 } = resort;
  const {
    sleeps_room,
    privacy_room_amount,
    bath,
    kitchen,
    room_Description,
    studio_sleeps_room,
    studio_privacy_room_amount,
    studio_kitchen,
    studio_bath,
    hotel_room,
    hotel_privacy_room_amount,
    hotel_kitchen,
    hotel_bath,
  } = resort.room_details;

  // Fixed rating and complement
  const rating = 9.0; // Fixed rating
  const ratingComplement = "Wonderful"; // Fixed complement

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
      {/* Image at the Top */}
      <img
        src={img2 || img3} // Use img2 or img3 from the resort object
        alt="Room"
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">King Room</h2>
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-2">Guest rating:</span>
            <span className="text-sm font-semibold text-blue-600">
              {rating} {ratingComplement}
            </span>
          </div>
        </div>

        {/* Room Details */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-700">
            <span className="mr-2">📌</span>
            <span>151 sq ft</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <span className="mr-2">📍</span>
            <span>Sleeps {sleeps_room}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <span className="mr-2">📎</span>
            <span>1 King Bed</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <span className="mr-2">✓</span>
            <span>Reserve now, pay later</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <span className="mr-2">☞</span>
            <span>Free WiFi</span>
          </div>
        </div>

        {/* Refund Policy */}
        <div className="mt-4">
          <p className="text-sm text-green-600">Fully refundable</p>
          <p className="text-sm text-gray-600">Before Fri, Mar 28</p>
        </div>

        {/* More Details Link */}
        <div className="mt-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            More details &gt;
          </a>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;