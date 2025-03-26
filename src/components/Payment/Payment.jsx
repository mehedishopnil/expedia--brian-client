import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTimes, FaCheck } from "react-icons/fa";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reservationData = location.state?.reservationData;
  const basePrice = reservationData?.pricing?.totalPrice || 0;

  console.log(reservationData)
  
  // Calculate taxes and fees
  const tax = basePrice * 0.20; // 20% tax
  const fees = basePrice * 0.30; // 30% fees
  const totalAmount = basePrice + tax + fees;
  const depositAmount = 221; // Fixed deposit amount
  const depositTax = depositAmount * 0.20;
  const depositFees = depositAmount * 0.30;
  const depositTotal = depositAmount + depositTax + depositFees;

  // Generate a random near future date (3-7 days from now)
  const randomDays = Math.floor(Math.random() * 5) + 3;
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + randomDays);
  const refundableDate = futureDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  const handlePaymentClick = (paymentType) => {
    const paymentData = {
      ...reservationData,
      paymentDetails: {
        type: paymentType,
        baseAmount: paymentType === 'full' ? basePrice : depositAmount,
        tax: paymentType === 'full' ? tax : depositTax,
        fees: paymentType === 'full' ? fees : depositFees,
        totalAmount: paymentType === 'full' ? totalAmount : depositTotal,
        isDeposit: paymentType === 'deposit',
        refundableDate,
      }
    };

    navigate('/checkout', { state: { paymentData } });
  };

  return (
    <div className="mx-auto p-4">
      {/* Header with close button */}
      <div className="flex gap-3 items-center mb-6">
        <button
          onClick={handleBackClick}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          Your payment options
        </h1>
      </div>

      {/* Refundable notice */}
      <div className="flex items-center bg-green-50 p-3 rounded-lg mb-6">
        <FaCheck className="text-green-500 mr-2" />
        <span className="text-sm text-gray-700">
          Fully refundable before {refundableDate}
        </span>
      </div>

      {/* Payment Options */}
      <div className="space-y-6">
        {/* Pay Now Card */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="">
            <div className="w-full space-y-3">
              <h2 className="text-lg font-semibold mb-3">Pay now</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-4">
                <li>More ways to pay: use Debit/Credit card or Paypal</li>
                <li>You can use valid Travel + Leisure coupon</li>
              </ul>
              <div className="text-right">
                <p className="text-2xl font-semibold">${basePrice.toFixed(2)}</p>
                <p className="text-sm">total ${totalAmount.toFixed(2)}</p>
                <p className="text-sm text-gray-600">includes taxes & fees</p>
              </div>
              <button 
                onClick={() => handlePaymentClick('full')}
                className="bg-blue-600 text-white w-full py-2 px-6 rounded-full hover:bg-blue-700 transition-colors"
              >
                Pay now
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">
                You will not be charged yet
              </p>
            </div>
          </div>
        </div>

        {/* Reserve with Deposit Card */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold mb-3">
                Reserve with deposit
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-4">
                <li>Book with an initial payment of ${depositAmount}</li>
                <li>
                  The property will charge you the remaining amount based on the
                  schedule you'll see at checkout
                </li>
              </ul>

              <div className="text-right">
                <p className="text-2xl font-semibold">${depositAmount.toFixed(2)}</p>
                <p className="text-sm">total ${depositTotal.toFixed(2)}</p>
                <p className="text-sm text-gray-600">includes taxes & fees</p>
              </div>

              <button 
                onClick={() => handlePaymentClick('deposit')}
                className="bg-blue-600 text-white w-full py-2 px-6 rounded-full hover:bg-blue-700 transition-colors"
              >
                Pay deposit
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">
                You will not be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;