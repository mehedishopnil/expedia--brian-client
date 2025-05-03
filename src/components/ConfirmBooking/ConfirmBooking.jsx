import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheckCircle, FaMapMarkerAlt, FaCalendarAlt, FaHotel, FaCreditCard, FaUser, FaPhone, FaEnvelope, FaShieldAlt, FaCheck } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { BsFillCreditCardFill } from 'react-icons/bs';

const ConfirmBooking = () => {
  const { state } = useLocation();
  const bookingData = state?.bookingData || {};
  const bookingId = state?.bookingId || 'TR-' + Math.floor(Math.random() * 1000000);

  // Extract data from booking
  const { resort, room, paymentDetails, guestInfo, paymentInfo } = bookingData;
  const { place_name, location, img } = resort || {};
  const { type, bed, sleeps } = room || {};
  const { totalAmount, refundableDate } = paymentDetails || {};
  const { firstName, lastName, email, phone } = guestInfo || {};
  const { cardNumber } = paymentInfo || {};

  console.log(resort)

  // Format dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formatDate = (date) => date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });

  // Mask credit card number
  const maskCardNumber = (num) => {
    if (!num) return '•••• •••• •••• ••••';
    const last4 = num.slice(-4);
    return `•••• •••• •••• ${last4}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Confirmation Header */}
      <div className="text-center mb-10">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Your booking is confirmed!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We've sent the details to <span className="font-semibold">{email}</span>
        </p>
        <div className="bg-blue-50 inline-flex px-4 py-2 rounded-full">
          <span className="font-medium text-blue-700">
            Booking ID: {bookingId}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Booking Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{place_name}</h2>
              <div className="flex items-center text-gray-600 mb-4">
                <FaMapMarkerAlt className="mr-2" />
                <span>{location}</span>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <FaHotel className="text-blue-500 mr-2" />
                  <span>{type}</span>
                </div>
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <span>🛏️ {bed}</span>
                </div>
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <span>👥 Sleeps {sleeps}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaCalendarAlt className="mr-2" />
                    <span className="font-medium">Check-in</span>
                  </div>
                  <p className="text-lg font-semibold">{formatDate(today)}</p>
                  <p className="text-sm text-gray-500">After 3:00 PM</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaCalendarAlt className="mr-2" />
                    <span className="font-medium">Check-out</span>
                  </div>
                  <p className="text-lg font-semibold">{formatDate(tomorrow)}</p>
                  <p className="text-sm text-gray-500">Before 11:00 AM</p>
                </div>
              </div>

              {img && (
                <div className="mt-4">
                  <img 
                    src={img} 
                    alt={place_name} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Price details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Room rate</span>
                <span>${totalAmount .toFixed(2)}</span>
              </div>
              {/* <div className="flex justify-between">
                <span>Taxes & fees</span>
                <span>${(totalAmount * 0.2).toFixed(2)}</span>
              </div> */}
              <div className="border-t border-gray-200 my-3"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalAmount?.toFixed(2)}</span>
              </div>
              <div className="flex items-center text-green-600 mt-4">
                <IoMdTime className="mr-2" />
                <span>Fully refundable before {refundableDate}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Payment method</h3>
            <div className="flex items-center">
              <BsFillCreditCardFill className="text-2xl text-gray-700 mr-3" />
              <div>
                <p className="font-medium">Credit card ending in {maskCardNumber(cardNumber).slice(-4)}</p>
                <p className="text-sm text-gray-500">Charged ${totalAmount?.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Guest Information */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Guest information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Primary guest</p>
                <p className="font-medium">
                  <FaUser className="inline mr-2 text-gray-600" />
                  {firstName} {lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">
                  <FaEnvelope className="inline mr-2 text-gray-600" />
                  {email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">
                  <FaPhone className="inline mr-2 text-gray-600" />
                  {phone || 'Not provided'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Next Steps */}
        <div className="space-y-6">
          

          {/* Need Help? */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Need help?</h3>
            <p className="text-gray-600 mb-4">
              Our customer service team is available 24/7 to assist you with your booking.
            </p>
            <button className="btn btn-outline w-full">
              Contact Customer Support
            </button>
          </div>

          {/* Booking Protection */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-start mb-3">
              <FaShieldAlt className="text-green-500 text-2xl mr-3 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-800">Booking Protection</h3>
                <p className="text-gray-600">Included with your reservation</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Full refund if cancelled by {refundableDate}</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>24/7 emergency assistance during your stay</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Property damage protection up to $1,000</span>
              </li>
            </ul>
          </div>

          {/* View Booking */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-3">View or manage booking</h3>
            <p className="text-gray-600 mb-4">
              You can view your booking details or make changes anytime.
            </p>
            <button className="btn btn-primary w-full">
              View My Booking
            </button>
          </div>

          {/* Directions */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Getting there</h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Address:</span> {location}
            </p>
            <button className="btn btn-outline w-full mt-3">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;