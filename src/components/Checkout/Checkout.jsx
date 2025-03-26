import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaWifi,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsCreditCard, BsPaypal } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";

const Checkout = () => {
  const location = useLocation();
  const paymentData = location.state?.paymentData;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSpecialRequests, setShowSpecialRequests] = useState(false);

  if (!paymentData) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          No payment information found
        </h1>
        <p className="text-gray-600 mb-6">
          Please complete your reservation process from the payment page
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors inline-flex items-center"
        >
          <IoMdArrowRoundBack className="mr-2" />
          Return to Home
        </Link>
      </div>
    );
  }

  // Extract data exactly as provided
  const { paymentDetails, pricing, resort, room } = paymentData;
  const {
    baseAmount,
    fees,
    isDeposit,
    refundableDate,
    tax,
    totalAmount,
    type: paymentType,
  } = paymentDetails;
  const {
    img,
    img2,
    img3,
    location: resortLocation,
    place_name,
    room_details,
    reviews_amount,
  } = resort;
  const { privacy_room_amount } = room_details;
  const { amenities, bed, size, sleeps, type } = room;

  // Prepare images array
  const images = [img, img2, img3].filter(Boolean);

  // Generate random rating (7-10)
  const rating = Math.floor(Math.random() * 4) + 7;
  const ratingText =
    rating >= 9 ? "Wonderful" : rating >= 8 ? "Excellent" : "Very Good";

  // Date functions
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // Image slider functions
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Secure Booking</h1>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
        >
          <FaChevronLeft className="mr-1" />
          Back
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resort Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Image Slider */}
            <div className="relative h-48 md:h-64 bg-gray-200">
              {images.length > 0 && (
                <>
                  <img
                    src={images[currentImageIndex]}
                    alt={place_name}
                    className="w-full h-full object-cover"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                      >
                        <FaChevronRight />
                      </button>
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                        {images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex
                                ? "bg-white"
                                : "bg-white bg-opacity-50"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="p-4 md:p-6">
              <h2 className="text-xl font-bold text-gray-800">{place_name}</h2>

              {/* Rating */}
              <div className="flex items-center mt-2">
                <div className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-bold mr-2">
                  {rating.toFixed(1)}
                </div>
                <span className="font-medium">{ratingText}</span>
                <span className="text-gray-500 text-sm ml-2">
                  ({reviews_amount} reviews)
                </span>
              </div>

              <div className="divider my-3" />

              {/* Room Info */}
              <div className="space-y-2">
                <p className="font-medium">
                  ${privacy_room_amount} • {type}
                </p>
                <p className="text-gray-600">
                  {bed} • Sleeps {sleeps}
                </p>
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-medium">{formatDate(today)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-medium">{formatDate(tomorrow)}</p>
                  </div>
                </div>
              </div>

              <div className="divider my-3" />

              {/* VIP Access */}
              <div className="flex items-start">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs font-bold mr-3">
                  VIP
                </span>
                <p className="text-gray-700 flex-1">
                  Expect outstanding service at this top-rated VIP Access stay.
                </p>
              </div>

              <div className="divider my-3" />

              {/* Special Requests */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowSpecialRequests(!showSpecialRequests)}
              >
                <p className="font-medium">
                  Special/Accessibility requests (optional)
                </p>
                <FaChevronRight
                  className={`transition-transform ${
                    showSpecialRequests ? "rotate-90" : ""
                  }`}
                />
              </div>

              {showSpecialRequests && (
                <div className="mt-3">
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Enter any special requests..."
                    rows={3}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start mt-4 bg-blue-50 p-3 border rounded-lg">
            <FaCheck className="text-green-500 mt-1 mr-2" />
            <p className="text-gray-700">
              You have good taste! Book now before someone else grabs it!
            </p>
          </div>

          {/* Price Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Price Details
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>${privacy_room_amount} Room</span>
                <span>${baseAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Fees</span>
                <span>${fees.toFixed(2)}</span>
              </div>
            </div>

            <div className="divider my-3" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            <Link
              to="#"
              className="text-blue-600 hover:underline text-sm mt-4 inline-block"
            >
              Use a coupon, credit, or promotion code
            </Link>

            <p className="text-gray-500 text-xs mt-3">
              Rates are quoted in US dollars. Taxes and Fees due at the property
              are based on current exchange rates, and are payable in local
              currency.
            </p>
          </div>

          {/* Guest Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Who's checking in?
            </h2>

            <div className="mb-6">
              <p className="font-medium">
                Room 1: 2 Adults, {bed}, Non-smoking
              </p>
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
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last name (required)
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address (required)
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile phone number (required)
                </label>
                <input
                  type="tel"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="text-alerts"
                  className="checkbox checkbox-sm mt-1 mr-2"
                />
                <label htmlFor="text-alerts" className="text-sm text-gray-700">
                  Receive text alerts about this trip. Message and data rates
                  may apply.
                </label>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Payment method
            </h2>

            <div className="space-y-2 mb-6">
              <div className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2" />
                <p className="text-gray-700">We use secure transmission</p>
              </div>
              <div className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2" />
                <p className="text-gray-700">
                  We protect your personal information
                </p>
              </div>
            </div>

            <div className="flex text-[8px] sm:flex-row gap-3 mb-6">
              <button className="btn btn-outline flex-1">
                <BsCreditCard className="mr-2" />
                <span className="text-[10px]">Debit/Credit Card</span>
              </button>
              <button className="btn btn-outline flex-1">
                <BsPaypal className="mr-2" />
                <span className="text-[10px]">PayPal</span>
              </button>
              <button className="btn btn-outline flex-1">
              <span className="text-[10px]">Monthly Payments</span>
                
              </button>
            </div>

            <Link
              to="#"
              className="text-blue-600 hover:underline text-sm mb-6 inline-block"
            >
              Click-to-Pay
            </Link>

            <div className="divider my-3" />

            {/* Credit Card Icons */}
            <div className="flex space-x-4 mb-6">
              {["visa", "mastercard", "amex", "discover"].map((card) => (
                <img
                  key={card}
                  src={`https://logo.clearbit.com/${card}.com`}
                  alt={card}
                  className="w-10 h-6 "
                />
              ))}
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card*
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Debit/Credit card number*
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration date*
                  </label>
                  <div className="flex items-center input input-bordered pr-0">
                    <select className="flex-1 border-none focus:outline-none">
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <span className="mx-2">/</span>
                    <select className="flex-1 border-none focus:outline-none">
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={new Date().getFullYear() + i}>
                          {new Date().getFullYear() + i}
                        </option>
                      ))}
                    </select>
                    <BiCalendar className="ml-2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Security code*
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Billing ZIP code*
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
          </div>

          {/* Important Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Important information
            </h2>

            <ul className="space-y-3 text-sm text-gray-700 mb-4">
              <li className="list-disc ml-4">
                Front desk staff will greet guests on arrival at the property.
                For any questions, please contact the property using the
                information on the booking confirmation.
              </li>
              <li className="list-disc ml-4">
                The name on the reservation must match the name on the guest's
                photo identification provided at check-in.
              </li>
              <li className="list-disc ml-4">
                You'll be asked to pay the following charges at the property.
                Fees may include applicable taxes:
              </li>
            </ul>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="font-medium mb-2">Deposit: USD 100.00</p>
              <p className="font-medium">
                Resort fee: USD 40.67 per accommodation, per night
              </p>
              <p className="text-sm mt-2">The resort fee includes:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2 text-sm">
                {[
                  "Business center/computer access",
                  "Concierge service",
                  "Faxes",
                  "Fitness center access",
                  "Housekeeping",
                  "In-room safe",
                  "Parking",
                  "Phone calls",
                  "Pool access",
                  "Self parking",
                  "Hot tub access",
                  "Valet parking",
                ].map((item) => (
                  <div key={item} className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 text-xs" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="divider my-3" />

            <div className="flex justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Check-in</p>
                <p className="font-medium">3:00 PM - 11:00 PM</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Check-out</p>
                <p className="font-medium">11:00 AM</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                By clicking on the button below, I acknowledge that I have
                reviewed the
                <Link to="#" className="text-blue-600 hover:underline">
                  {" "}
                  Privacy Statement
                </Link>
                ,
                <Link to="#" className="text-blue-600 hover:underline">
                  {" "}
                  Government Travel Advice
                </Link>
                , and have reviewed and accept the
                <Link to="#" className="text-blue-600 hover:underline">
                  {" "}
                  Rules & Restrictions
                </Link>{" "}
                and
                <Link to="#" className="text-blue-600 hover:underline">
                  {" "}
                  Terms of Use
                </Link>
                .
              </p>
            </div>

            <button className="btn btn-primary w-full">
              Complete Booking
              <FaChevronRight className="ml-2" />
            </button>

            <div className="flex items-start mt-4">
              <FaLock className="text-gray-500 mt-1 mr-2" />
              <p className="text-xs text-gray-500">
                We use secure transmission and encrypted storage to protect your
                personal information. Payments are processed in the U.S. except
                where the travel provider (hotel / airline etc) processes your
                payment outside the U.S., in which case your card issuer may
                charge a foreign transaction fee.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>

            <div className="flex items-center text-green-600 mb-4">
              <FaCheck className="mr-2" />
              <span>Fully refundable before {refundableDate}</span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary w-full">
                Complete Booking
                <FaChevronRight className="ml-2" />
              </button>
              <div className="flex items-start mt-4">
                <FaShieldAlt className="text-gray-500 mt-1 mr-2" />
                <p className="text-xs text-gray-500">
                  We use secure transmission and encrypted storage to protect
                  your personal information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
