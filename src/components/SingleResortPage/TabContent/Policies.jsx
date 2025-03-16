import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Policies = () => {
  // State to manage FAQ open/close
  const [openIndex, setOpenIndex] = useState(null);

  // FAQ data
  const faqData = [
    {
      question: "Does Ramada by Wyndham Suites Orlando Airport have a pool?",
      answer: "Yes, this property has an outdoor pool.",
    },
    {
      question: "Is Ramada by Wyndham Suites Orlando Airport pet-friendly?",
      answer: "No, pets are not allowed at this property.",
    },
    {
      question: "How much is parking at Ramada by Wyndham Suites Orlando Airport?",
      answer: "Self parking is free at this property.",
    },
    {
      question: "What time is check-in at Ramada by Wyndham Suites Orlando Airport?",
      answer: "Check-in start time: 3:00 PM; Check-in end time: 12:30 AM.",
    },
    {
      question: "What time is check-out at Ramada by Wyndham Suites Orlando Airport?",
      answer: "Check-out is at 11 AM.",
    },
    {
      question: "Does Ramada by Wyndham Suites Orlando Airport provide a shuttle to the airport?",
      answer: "Yes, there's a free airport shuttle that runs 4:30 AM–1 AM on request.",
    },
    {
      question: "Where is Ramada by Wyndham Suites Orlando Airport located?",
      answer:
        "Located in Airport North, this hotel is within 9 mi (15 km) of Ventura Country Club, Florida Mall, and Crayola Experience. Rio Pinar Country Club and East Orlando Shopping Center are also within 9 mi (15 km).",
    },
  ];

  // Toggle FAQ answer visibility
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Policies Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Policies</h2>

      {/* Check-in Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Check-in</h3>
        <ul className="space-y-3">
          <li className="text-gray-700">
            <span className="font-medium">Check-in start time:</span> 3:00 PM
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Check-in end time:</span> 12:30 AM
          </li>
          <li className="text-gray-700">
            Early check-in subject to availability
          </li>
          <li className="text-gray-700">
            Contactless check-in available
          </li>
          <li className="text-gray-700">
            Express check-in available
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Minimum check-in age:</span> 21
          </li>
        </ul>
      </div>

      {/* Check-out Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Check-out</h3>
        <ul className="space-y-3">
          <li className="text-gray-700">
            Check-out before 11 AM
          </li>
          <li className="text-gray-700">
            Contactless check-out available
          </li>
          <li className="text-gray-700">
            Late check-out subject to availability
          </li>
          <li className="text-gray-700">
            Express check-out available
          </li>
        </ul>
      </div>

      {/* Special Check-in Instructions */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Special check-in instructions
        </h3>
        <p className="text-gray-700">
          This property offers transfers from the airport; guests must contact the
          property with arrival details before travel, using the contact
          information on the booking confirmation.
        </p>
        <p className="text-gray-700 mt-2">
          Front desk staff will greet guests on arrival at the property.
        </p>
      </div>

      {/* Access Methods */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Access methods
        </h3>
        <p className="text-gray-700">Staffed front desk</p>
      </div>

      {/* Pets Policy */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Pets</h3>
        <p className="text-gray-700">Pets not allowed</p>
      </div>

      {/* Children and Extra Beds */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Children and extra beds
        </h3>
        <ul className="space-y-3">
          <li className="text-gray-700">Children are welcome</li>
          <li className="text-gray-700">
            2 children, up to the age of 18 years, can stay for free if using
            existing beds when occupying the parent or guardian's room
          </li>
          <li className="text-gray-700">
            Rollaway/extra beds are not available
          </li>
          <li className="text-gray-700">
            Free cribs are available on request at the property
          </li>
        </ul>
      </div>

      {/* Important Information */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Important information
        </h3>
        <ul className="space-y-3">
          <li className="text-gray-700">
            Extra-person charges may apply and vary depending on property policy
          </li>
          <li className="text-gray-700">
            Government-issued photo identification and a credit card may be
            required at check-in for incidental charges
          </li>
          <li className="text-gray-700">
            Special requests are subject to availability upon check-in and may
            incur additional charges; special requests cannot be guaranteed
          </li>
          <li className="text-gray-700">
            This property accepts credit cards; cash is not accepted
          </li>
          <li className="text-gray-700">
            Safety features at this property include a carbon monoxide detector,
            a fire extinguisher, a smoke detector, a security system, a first
            aid kit, and window guards
          </li>
          <li className="text-gray-700">
            This property affirms that it follows the cleaning and disinfection
            practices of Count on Us (Wyndham)
          </li>
          <li className="text-gray-700">
            Masks are required at the property for guests without COVID-19
            vaccination
          </li>
          <li className="text-gray-700">
            Please note that cultural norms and guest policies may differ by
            country and by property; the policies listed are provided by the
            property
          </li>
        </ul>
      </div>

      {/* We Should Mention */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          We should mention
        </h3>
        <p className="text-gray-700">
          The property has connecting/adjoining rooms, which are subject to
          availability and can be requested by contacting the property using the
          number on the booking confirmation.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Frequently asked questions
        </h3>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <span className="text-gray-600">
                  {openIndex === index ? (
                    <FiChevronUp className="w-5 h-5" />
                  ) : (
                    <FiChevronDown className="w-5 h-5" />
                  )}
                </span>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Policies;