import React, { useState } from 'react';
import {
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiLogIn,
  FiLogOut,
  FiAlertCircle,
  FiUsers,
  FiShield,
  FiMapPin,
  FiCheck,
  FiX,
} from 'react-icons/fi';
import { FaDog, FaBaby, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';

const Policies = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: 'Does this property have a pool?',
      answer:
        'Yes, this property has an outdoor pool with poolside loungers and umbrellas available for guests.',
    },
    {
      question: 'Is this property pet-friendly?',
      answer:
        'No, pets are not allowed at this property. Service animals are welcome with proper documentation.',
    },
    {
      question: 'How much is parking?',
      answer:
        'Self parking is free at this property. We also offer valet parking for an additional fee.',
    },
    {
      question: 'What time is check-in?',
      answer:
        'Check-in start time: 3:00 PM; Check-in end time: 12:30 AM. Early check-in is subject to availability.',
    },
    {
      question: 'What time is check-out?',
      answer:
        'Check-out is at 11 AM. Late check-out may be available for an additional fee, subject to availability.',
    },
    {
      question: 'Is there a shuttle to the airport?',
      answer:
        "Yes, there's a free airport shuttle that runs 4:30 AM–1 AM on request. Please contact the front desk to schedule.",
    },
    {
      question: 'Where is this property located?',
      answer:
        'Located in Airport North, this hotel is within 9 mi (15 km) of Ventura Country Club, Florida Mall, and Crayola Experience. Rio Pinar Country Club and East Orlando Shopping Center are also within 9 mi (15 km).',
    },
  ];

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const PolicySection = ({
    icon: Icon,
    title,
    children,
    bgColor = 'bg-blue-50',
    iconColor = 'text-blue-600',
  }) => (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 sm:p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-4">
        <div className={`${bgColor} p-2.5 rounded-lg`}>
          <Icon className={`${iconColor} text-xl`} />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-3 text-sm sm:text-base">{children}</div>
    </div>
  );

  const InfoItem = ({ label, value, highlight = false }) => (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 p-3 rounded-lg ${
        highlight ? 'bg-blue-50' : 'bg-gray-50'
      }`}
    >
      <span className="font-semibold text-gray-900">{label}:</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );

  const ListItem = ({ children, icon = true }) => (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
      {icon && (
        <FiCheck className="text-green-600 text-lg flex-shrink-0 mt-0.5" />
      )}
      <span className="text-gray-700 text-sm sm:text-base">{children}</span>
    </div>
  );

  return (
    <div className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Policies & Information
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Everything you need to know about your stay
          </p>
        </div>

        {/* Check-in Section */}
        <PolicySection
          icon={FiLogIn}
          title="Check-in"
          bgColor="bg-green-50"
          iconColor="text-green-600"
        >
          <InfoItem label="Start time" value="3:00 PM" highlight />
          <InfoItem label="End time" value="12:30 AM" highlight />
          <InfoItem label="Minimum age" value="21 years" highlight />

          <div className="pt-2 space-y-2">
            <ListItem>Early check-in subject to availability</ListItem>
            <ListItem>Contactless check-in available</ListItem>
            <ListItem>Express check-in available</ListItem>
            <ListItem>Mobile key access supported</ListItem>
          </div>
        </PolicySection>

        {/* Check-out Section */}
        <PolicySection
          icon={FiLogOut}
          title="Check-out"
          bgColor="bg-orange-50"
          iconColor="text-orange-600"
        >
          <InfoItem label="Check-out time" value="Before 11:00 AM" highlight />

          <div className="pt-2 space-y-2">
            <ListItem>Contactless check-out available</ListItem>
            <ListItem>Late check-out subject to availability</ListItem>
            <ListItem>Express check-out available</ListItem>
          </div>
        </PolicySection>

        {/* Special Check-in Instructions */}
        <PolicySection
          icon={FiAlertCircle}
          title="Special check-in instructions"
          bgColor="bg-purple-50"
          iconColor="text-purple-600"
        >
          <div className="space-y-3">
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
              <p className="text-gray-700 leading-relaxed">
                This property offers transfers from the airport. Guests must
                contact the property with arrival details before travel using
                the contact information on the booking confirmation.
              </p>
            </div>
            <ListItem>Front desk staff will greet guests on arrival</ListItem>
            <ListItem>
              Valid photo ID and credit card required at check-in
            </ListItem>
          </div>
        </PolicySection>

        {/* Two Column Grid for Smaller Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Access Methods */}
          <PolicySection
            icon={FiShield}
            title="Access methods"
            bgColor="bg-indigo-50"
            iconColor="text-indigo-600"
          >
            <ListItem>Staffed front desk (24/7)</ListItem>
            <ListItem>Mobile app check-in</ListItem>
            <ListItem>Key card access</ListItem>
          </PolicySection>

          {/* Pets Policy */}
          <PolicySection
            icon={FaDog}
            title="Pets"
            bgColor="bg-red-50"
            iconColor="text-red-600"
          >
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50">
              <FiX className="text-red-600 text-lg flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">
                Pets not allowed
              </span>
            </div>
            <ListItem>Service animals welcome with documentation</ListItem>
          </PolicySection>
        </div>

        {/* Children and Extra Beds */}
        <PolicySection
          icon={FaBaby}
          title="Children and extra beds"
          bgColor="bg-pink-50"
          iconColor="text-pink-600"
        >
          <div className="space-y-2">
            <ListItem>Children are welcome at this property</ListItem>
            <ListItem>
              Up to 2 children (under 18) stay free with existing bedding
            </ListItem>
            <ListItem>Free cribs available on request</ListItem>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <FiX className="text-gray-500 text-lg flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">
                Rollaway/extra beds not available
              </span>
            </div>
          </div>
        </PolicySection>

        {/* Important Information */}
        <PolicySection
          icon={FiAlertCircle}
          title="Important information"
          bgColor="bg-yellow-50"
          iconColor="text-yellow-600"
        >
          <div className="space-y-2">
            <ListItem icon={false}>
              Extra-person charges may apply and vary depending on property
              policy
            </ListItem>
            <ListItem icon={false}>
              Government-issued photo ID and credit card required at check-in
              for incidental charges
            </ListItem>
            <ListItem icon={false}>
              Special requests subject to availability and may incur additional
              charges
            </ListItem>
            <ListItem icon={false}>
              This property accepts credit cards; cash is not accepted
            </ListItem>
          </div>
        </PolicySection>

        {/* Safety Features */}
        <PolicySection
          icon={FiShield}
          title="Safety & Security"
          bgColor="bg-teal-50"
          iconColor="text-teal-600"
        >
          <div className="grid sm:grid-cols-2 gap-2">
            <ListItem>Carbon monoxide detector</ListItem>
            <ListItem>Fire extinguisher</ListItem>
            <ListItem>Smoke detector</ListItem>
            <ListItem>Security system</ListItem>
            <ListItem>First aid kit</ListItem>
            <ListItem>Window guards</ListItem>
          </div>

          <div className="mt-4 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-600">
            <p className="text-sm text-gray-700">
              This property follows enhanced cleaning and disinfection practices
              (Count on Us - Wyndham standards).
            </p>
          </div>
        </PolicySection>

        {/* Additional Notes */}
        <PolicySection
          icon={FaInfoCircle}
          title="Additional notes"
          bgColor="bg-gray-100"
          iconColor="text-gray-600"
        >
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              The property has connecting/adjoining rooms available. These are
              subject to availability and can be requested by contacting the
              property using the number on your booking confirmation.
            </p>
          </div>
        </PolicySection>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-2.5 rounded-lg">
              <FaQuestionCircle className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Frequently asked questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left p-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-sm sm:text-base font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <span className="text-gray-500 flex-shrink-0">
                    {openIndex === index ? (
                      <FiChevronUp className="w-5 h-5" />
                    ) : (
                      <FiChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed pt-3">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Help Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Have more questions?
              </h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Our team is available 24/7 to help you with any inquiries about
                policies and your stay.
              </p>
            </div>
            <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors duration-200 whitespace-nowrap shadow-lg">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;
