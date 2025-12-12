import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import { FiEdit, FiUser, FiMail, FiPhone, FiAlertCircle } from 'react-icons/fi';
import { MdKeyboardArrowRight, MdOutlineEdit } from 'react-icons/md';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [editingSection, setEditingSection] = useState(null);
  const [editValues, setEditValues] = useState({});

  const getValue = value => value || 'Not provided';

  // Enhanced profile sections with validation
  const profileSections = [
    {
      title: 'Basic information',
      description:
        'Make sure this information matches your travel ID, like your passport or license.',
      fields: [
        { label: 'Name', value: user?.name, type: 'text', required: true },
        { label: 'Bio', value: user?.bio, type: 'textarea' },
        { label: 'Date of birth', value: user?.dob, type: 'date' },
        {
          label: 'Gender',
          value: user?.gender,
          type: 'select',
          options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
        },
        {
          label: 'Accessibility needs',
          value: user?.accessibility,
          type: 'textarea',
        },
      ],
    },
    {
      title: 'Contact',
      description:
        'Receive account activity alerts and trip updates by sharing this information.',
      fields: [
        {
          label: 'Mobile number',
          value: user?.phone,
          type: 'tel',
          pattern: '[+]?[0-9]{10,12}',
        },
        { label: 'Email', value: user?.email, type: 'email' },
        {
          label: 'Emergency contact',
          value: user?.emergencyContact,
          type: 'text',
        },
        { label: 'Address', value: user?.address, type: 'textarea' },
      ],
    },
  ];

  const moreDetailsItems = [
    {
      title: 'Airport security',
      description: 'TSA PreCheck and Redress number',
      icon: <FiAlertCircle className="text-blue-500" />,
    },
    {
      title: 'Travel documents',
      description: 'Passport information',
      icon: <FiUser className="text-green-500" />,
    },
    {
      title: 'Flight preferences',
      description: 'Seat preference and home airport',
      icon: <FiMail className="text-purple-500" />,
    },
    {
      title: 'Reward programs',
      description: 'Frequent flyer and membership programs',
      icon: <FiPhone className="text-yellow-500" />,
    },
    {
      title: 'Payment methods',
      description: 'Saved credit cards and payment options',
      icon: <FiAlertCircle className="text-red-500" />,
    },
    {
      title: 'Travel history',
      description: 'Past trips and bookings',
      icon: <FiUser className="text-teal-500" />,
    },
  ];

  const handleEdit = sectionIndex => {
    setEditingSection(sectionIndex);
    setEditValues(
      profileSections[sectionIndex].fields.reduce((acc, field) => {
        acc[field.label] = field.value;
        return acc;
      }, {})
    );
  };

  const handleSave = sectionIndex => {
    // Add API call here to save changes
    setEditingSection(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <FiUser className="w-8 h-8 text-gray-500" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-sm text-gray-500">
              Member since {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
          <MdOutlineEdit /> Edit Profile
        </button>
      </div>

      {/* Profile Sections */}
      <div className="space-y-6">
        {profileSections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {section.description}
                  </p>
                </div>
                {editingSection !== sectionIndex ? (
                  <button
                    onClick={() => handleEdit(sectionIndex)}
                    className="text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <FiEdit className="w-4 h-4" /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(sectionIndex)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingSection(null)}
                      className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {section.fields.map((field, fieldIndex) => (
                  <div
                    key={fieldIndex}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
                  >
                    <label className="text-sm font-medium text-gray-600">
                      {field.label}
                    </label>
                    {editingSection === sectionIndex ? (
                      <input
                        type={field.type}
                        value={editValues[field.label] || ''}
                        onChange={e =>
                          setEditValues({
                            ...editValues,
                            [field.label]: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-700">{getValue(field.value)}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* More Details Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  More details
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Speed up your booking by securely saving essential travel
                  details.
                </p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 p-2 rounded-lg hover:bg-gray-50">
                <FiEdit className="w-4 h-4" /> Edit all
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {moreDetailsItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {item.description}
                    </p>
                  </div>
                  <MdKeyboardArrowRight className="text-gray-400 text-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
