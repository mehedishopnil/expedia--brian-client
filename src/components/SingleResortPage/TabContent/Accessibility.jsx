import React from 'react';
import {
  FaWheelchair,
  FaBed,
  FaBuilding,
  FaDumbbell,
  FaUtensils,
  FaRestroom,
  FaBriefcase,
  FaDoorOpen,
  FaShower,
  FaCheck,
} from 'react-icons/fa';
import { MdAccessible, MdElevator, MdLocalParking } from 'react-icons/md';
import { FiInfo } from 'react-icons/fi';
import { FaElevator } from 'react-icons/fa6';

const Accessibility = () => {
  const commonAreasFeatures = [
    { icon: <FaWheelchair />, text: 'Wheelchair accessible throughout' },
    { icon: <FaElevator />, text: 'Elevator to all floors' },
    { icon: <FaDoorOpen />, text: 'Stair-free path to entrance' },
    { icon: <FaBriefcase />, text: 'Accessible business center' },
    { icon: <FaDumbbell />, text: 'Accessible fitness center' },
    { icon: <FaUtensils />, text: 'Accessible restaurant' },
    { icon: <FaRestroom />, text: 'Accessible public restrooms' },
    { icon: <MdLocalParking />, text: 'Accessible parking spaces' },
    { icon: <MdAccessible />, text: 'Accessible path of travel' },
    { icon: <FaDoorOpen />, text: 'Accessible registration desk' },
  ];

  const roomFeatures = [
    { icon: <FaShower />, text: 'Hand-held showerhead' },
    { icon: <FaDoorOpen />, text: 'Lever door handles' },
    { icon: <FaBed />, text: 'Low-height desk' },
    { icon: <FaDoorOpen />, text: 'Low-height door lock' },
    { icon: <FaRestroom />, text: 'Accessible bathroom outlets' },
    { icon: <FaDoorOpen />, text: 'Low-height view port in door' },
    { icon: <FaWheelchair />, text: 'Wheelchair accessible rooms' },
    { icon: <FaDoorOpen />, text: 'Wheelchair-width doorways' },
    { icon: <FaBed />, text: 'Roll-in shower (select rooms)' },
    { icon: <FaRestroom />, text: 'Grab bars in bathroom' },
  ];

  const additionalServices = [
    'Service animals welcome',
    'Visual alarms for hearing impaired',
    'Accessible room service',
    'Staff trained in accessibility needs',
  ];

  const FeatureCard = ({ icon, text }) => (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all duration-200 group border border-gray-200 hover:border-blue-300">
      <div className="text-blue-600 text-xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <span className="text-gray-700 text-sm sm:text-base font-medium">
        {text}
      </span>
    </div>
  );

  const ServiceItem = ({ text }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
      <FaCheck className="text-green-600 text-lg flex-shrink-0" />
      <span className="text-gray-700 text-sm sm:text-base">{text}</span>
    </div>
  );

  return (
    <div className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-blue-100 p-3 rounded-xl">
              <FaWheelchair className="text-blue-600 text-3xl" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Accessibility Features
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We're committed to providing accessible accommodations for all
                guests
              </p>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <FiInfo className="text-blue-600 text-xl flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Need specific accommodations?
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  If you have requests for specific accessibility needs, please
                  contact the property using the information on your reservation
                  confirmation. Our team is available 24/7 to assist you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Areas Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-3 rounded-xl">
              <FaBuilding className="text-purple-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Common Areas
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Accessible facilities throughout the property
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {commonAreasFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                text={feature.text}
              />
            ))}
          </div>
        </div>

        {/* Accessible Rooms Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-xl">
              <FaBed className="text-green-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Accessible Rooms
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Specially designed rooms for maximum comfort
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {roomFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                text={feature.text}
              />
            ))}
          </div>

          {/* Room Note */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Note:</span> Accessible rooms are
              available upon request and subject to availability. We recommend
              booking in advance to ensure availability.
            </p>
          </div>
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 p-3 rounded-xl">
              <MdAccessible className="text-orange-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Additional Services
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Extra accommodations and support services
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {additionalServices.map((service, index) => (
              <ServiceItem key={index} text={service} />
            ))}
          </div>
        </div>

        {/* Accessibility Statement */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <FaWheelchair className="text-white text-4xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                Our Commitment to Accessibility
              </h3>
              <p className="text-blue-100 leading-relaxed mb-4 text-sm sm:text-base">
                We are dedicated to ensuring that all guests have equal access
                to our facilities and services. Our property meets ADA
                (Americans with Disabilities Act) standards, and we continuously
                work to improve accessibility for all guests.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaCheck className="text-green-300" />
                  <span className="text-sm font-semibold">ADA Compliant</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaCheck className="text-green-300" />
                  <span className="text-sm font-semibold">Staff Trained</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaCheck className="text-green-300" />
                  <span className="text-sm font-semibold">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Questions about accessibility?
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Our accessibility coordinator is available to discuss your
                specific needs and ensure your stay is comfortable.
              </p>
            </div>
            <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl whitespace-nowrap">
              Contact Us
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-100 rounded-xl p-4 border border-gray-300">
          <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
            <span className="font-semibold">Disclaimer:</span> While we strive
            to provide accurate accessibility information, features may have
            limitations. We recommend contacting the property directly to
            confirm specific accessibility requirements before your stay.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
