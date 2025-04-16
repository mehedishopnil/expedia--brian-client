import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import { FiEdit } from 'react-icons/fi';
import { MdKeyboardArrowRight } from 'react-icons/md';

const Profile = () => {
  const { user } = useContext(AuthContext);

  const getValue = (value) => value || 'Not provided';

  // Profile sections data
  const profileSections = [
    {
      title: "Basic information",
      description: "Make sure this information matches your travel ID, like your passport or license.",
      fields: [
        { label: "Name", value: user?.name },
        { label: "Bio", value: user?.bio },
        { label: "Date of birth", value: user?.dob },
        { label: "Gender", value: user?.gender },
        { label: "Accessibility needs", value: user?.accessibility }
      ]
    },
    {
      title: "Contact",
      description: "Receive account activity alerts and trip updates by sharing this information.",
      fields: [
        { label: "Mobile number", value: user?.phone },
        { label: "Email", value: user?.email },
        { label: "Emergency contact", value: user?.emergencyContact },
        { label: "Address", value: user?.address }
      ]
    }
  ];

  const moreDetailsItems = [
    {
      title: "Airport security",
      description: "TSA PreCheck and Redress number"
    },
    {
      title: "Travel documents",
      description: "Passport information"
    },
    {
      title: "Flight preferences",
      description: "Seat preference and home airport"
    },
    {
      title: "Reward programs",
      description: "Frequent flyer and membership programs"
    },
    {
      title: "Payment methods",
      description: "Saved credit cards and payment options"
    },
    {
      title: "Travel history",
      description: "Past trips and bookings"
    }
  ];

  return (
    <div className="space-y-5">
     <h1 className="text-2xl font-bold text-gray-800 pl-5 pt-5">{user.name}</h1>
          

      {/* Render profile sections */}
      {profileSections.map((section, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-5">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
            <button className="text-blue-600 hover:underline flex items-center">
              <FiEdit className="mr-1" /> Edit
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">{section.description}</p>
          <div className="space-y-2">
            {section.fields.map((field, i) => (
              <p key={i}>
                <strong>{field.label}:</strong> {getValue(field.value)}
              </p>
            ))}
          </div>
        </div>
      ))}

      {/* More Details Section */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">More details</h2>
            <p className="text-sm text-gray-500">
              Speed up your booking by securely saving essential travel details.
            </p>
          </div>
          <button className="text-blue-600 hover:underline flex items-center">
            <FiEdit className="mr-1" /> Edit all
          </button>
        </div>

        <div className="space-y-3">
          {moreDetailsItems.map((item, index) => (
            <div 
              key={index}
              className='flex justify-between items-center border p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors'
            >
              <div>
                <h3 className="text-md font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <MdKeyboardArrowRight className="text-gray-400 text-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;