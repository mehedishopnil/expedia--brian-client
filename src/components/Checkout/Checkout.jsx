import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaShieldAlt,
} from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImportantInfo from "./CheckoutContent/ImportantInfo";
import PaymentMethod from "./CheckoutContent/PaymentMethod";
import ResortCardInfo from "./CheckoutContent/ResortCardInfo";
import GuestInfoCard from "./CheckoutContent/GuestInfoCard";
import Swal from "sweetalert2";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentData = location.state?.paymentData;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    textAlerts: false,
    cardName: "",
    cardNumber: "",
    expiryMonth: "1",
    expiryYear: new Date().getFullYear().toString(),
    securityCode: "",
    zipCode: "",
    specialRequests: ""
  });

  console.log(paymentData);

  const { paymentDetails, pricing, resort, room } = paymentData;
  const { baseAmount, fees, refundableDate, tax, totalAmount } = paymentDetails;
  const { room_details } = resort;
  const { privacy_room_amount } = room_details;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    // Basic validation - extend as needed
    if (!formData.firstName || !formData.lastName) {
      Swal.fire("Error", "Please enter your full name", "error");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      Swal.fire("Error", "Please enter a valid email address", "error");
      return false;
    }
    if (!formData.phone || formData.phone.length < 10) {
      Swal.fire("Error", "Please enter a valid phone number", "error");
      return false;
    }
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      Swal.fire("Error", "Please enter a valid 16-digit card number", "error");
      return false;
    }
    if (!formData.securityCode || formData.securityCode.length < 3) {
      Swal.fire("Error", "Please enter a valid security code", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      // Prepare booking data according to server expectations
      const bookingData = {
        resortId: paymentData.resort._id, // Assuming your server expects resortId
        roomId: paymentData.room._id,     // Assuming your server expects roomId
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000).toISOString(),
        resort, // +1 day
        guestInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          specialRequests: formData.specialRequests,
        },
        paymentInfo: {
          cardName: formData.cardName,
          cardNumber: formData.cardNumber.replace(/\s/g, ''), // Remove spaces
          expiry: `${formData.expiryMonth}/${formData.expiryYear}`,
          securityCode: formData.securityCode,
          zipCode: formData.zipCode,
        },
        totalAmount: paymentData.paymentDetails.totalAmount,
        status: "confirmed"
      };

      const response = await fetch(`${import.meta.env.VITE_API_Link}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}` // Add if your API requires auth
        },
        body: JSON.stringify(bookingData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Booking failed");
      }

      await Swal.fire({
        title: "Success!",
        text: "Your booking has been confirmed",
        icon: "success",
        confirmButtonText: "View Booking"
      });

      navigate("/confirm-booking", {
        state: {
          bookingData: responseData.data, // Use the data returned from server
          bookingId: responseData.bookingId
        },
        replace: true
      });

    } catch (error) {
      console.error("Booking error:", error);
      await Swal.fire({
        title: "Error",
        text: error.message || "There was an error processing your booking. Please try again.",
        icon: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-4 md:p-6">
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
        <div className="lg:col-span-2 space-y-6">
          {/* Resort Card with data */}
          <ResortCardInfo resort={resort} room={room} />

          <div className="flex items-start mt-4 bg-blue-50 p-3 border rounded-lg">
            <FaCheck className="text-green-500 mt-1 mr-2" />
            <p className="text-gray-700">
              You have good taste! Book now before someone else grabs it!
            </p>
          </div>

          {/* Price Details */}
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

          {/* Guest Info */}
          <GuestInfoCard formData={formData} handleChange={handleChange} />

          {/* Payment Method */}
          <PaymentMethod formData={formData} handleChange={handleChange} />

          {/* Important Info */}
          <ImportantInfo />
        </div>

        {/* Right Sidebar Summary */}
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
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    Complete Booking
                    <FaChevronRight className="ml-2" />
                  </>
                )}
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
    </form>
  );
};

export default Checkout;
