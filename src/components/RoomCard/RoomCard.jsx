import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';

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
  const rating = 9.0;
  const ratingComplement = "Wonderful";

  // State for selected extra
  const [selectedExtra, setSelectedExtra] = useState("no-extras");
  const { user } = useContext(AuthContext);

  // Price details
  const basePrice = 139;
  const breakfastPrice = 40;
  const totalPrice = selectedExtra === "Breakfast" ? basePrice + breakfastPrice : basePrice;

  // Navigation hook
  const navigate = useNavigate();

  const handleReserveClick = () => {
    // Prepare reservation data
    const reservationData = {
      resort: {
        id: resort.id,
        name: resort.name,
        images: [img2, img3],
        // include any other resort details you need
      },
      room: {
        type: "King Room",
        sleeps: sleeps_room,
        size: "151 sq ft",
        bed: "1 King Bed",
        amenities: {
          wifi: true,
          kitchen: kitchen,
          bath: bath
        }
      },
      pricing: {
        basePrice: basePrice,
        extras: selectedExtra === "Breakfast" ? breakfastPrice : 0,
        totalPrice: totalPrice
      },
      selectedExtra: selectedExtra
    };

    if (!user) {
      // Redirect to login page with the reservation data and return path
      navigate('/signin', { 
        state: { 
          from: 'reservation', 
          reservationData,
          returnPath: '/payment' // Path to redirect after login
        } 
      });
    } else {
      // User is logged in, proceed to payment
      navigate('/payment', { state: { reservationData } });
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden mb-6 hover:shadow-xl transition-shadow duration-300">
      {/* Image at the Top */}
      <img
        src={img2 || img3}
        alt="Room"
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-2">
        {/* Title and Rating */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">King Room</h2>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Guest rating:</span>
            <span className="text-sm font-semibold text-blue-600">
              {rating} {ratingComplement}
            </span>
          </div>
        </div>

        {/* Room Details */}
        <div className="space-y-3">
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
          <p className="text-sm text-green-600 font-medium">Fully refundable</p>
          <p className="text-sm text-gray-600">Before Fri, Mar 28</p>
        </div>

        {/* More Details Link */}
        <div className="mt-6">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-all duration-300">
            More details &gt;
          </a>
        </div>

        <div className='divider w-full'></div>

        {/* Extras Section */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Extras</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-700">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="extras"
                  value="no-extras"
                  checked={selectedExtra === "no-extras"}
                  onChange={() => setSelectedExtra("no-extras")}
                  className="mr-2"
                />
                <span>No extras</span>
              </label>
              <span className="text-green-600">+$0</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="extras"
                  value="Breakfast"
                  checked={selectedExtra === "Breakfast"}
                  onChange={() => setSelectedExtra("Breakfast")}
                  className="mr-2"
                />
                <span>Breakfast</span>
              </label>
              <span className="text-green-600">+$40</span>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="mt-6 text-end">
          <p className="text-2xl font-semibold text-gray-800">${basePrice}</p>
          <p className="text-sm text-gray-600">${totalPrice} total (includes taxes & fees)</p>
        </div>

        {/* Reserve Button */}
        <button 
          onClick={handleReserveClick}
          className="w-full bg-[#1668e3] text-white font-semibold py-1 px-6 rounded-full hover:bg-blue-600 transition-all duration-300 mt-6"
        >
          Reserve
        </button>

        {/* Note */}
        <p className="text-sm text-gray-600 mt-3 text-center">You will not be charged yet.</p>
      </div>
    </div>
  );
};

export default RoomCard;