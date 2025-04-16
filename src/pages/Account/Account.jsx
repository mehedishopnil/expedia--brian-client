import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import { FiUser, FiMail, FiCreditCard, FiTag, FiDollarSign, FiStar, FiLock, FiHelpCircle, FiArrowRight, FiLogOut } from 'react-icons/fi';
import { Link, Outlet, useNavigate } from 'react-router-dom'; // Corrected imports

const Account = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate(); // Added for navigation

  const menuItems = [
    {
      title: "Profile",
      description: "Provide your personal details and travel documents",
      icon: <FiUser className="text-xl" />,
      path: "/profile" 
    },
    {
      title: "Communications",
      description: "Control which notifications you get",
      icon: <FiMail className="text-xl" />,
      path: "/communications"
    },
    {
      title: "Payment methods",
      description: "View saved payment methods",
      icon: <FiCreditCard className="text-xl" />,
      path: "payment-methods"
    },
    {
      title: "Coupons",
      description: "View your available coupons",
      icon: <FiTag className="text-xl" />,
      path: "coupons"
    },
    {
      title: "Credits",
      description: "View your active airline credits",
      icon: <FiDollarSign className="text-xl" />,
      path: "credits"
    },
    {
      title: "Reviews",
      description: "Read reviews you've shared",
      icon: <FiStar className="text-xl" />,
      path: "reviews"
    },
    {
      title: "Security and settings",
      description: "Update your email or password",
      icon: <FiLock className="text-xl" />,
      path: "security"
    },
    {
      title: "Help and feedback",
      description: "Get customer support",
      icon: <FiHelpCircle className="text-xl" />,
      path: "help"
    }
  ];

  const handleItemClick = (path) => {
    navigate(path); // Programmatic navigation
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      {/* Left Sidebar Menu */}
      <div className="w-full md:w-1/3 lg:w-1/4">
        {/* User Profile Section */}
        <div className="flex items-center mb-8 p-4 bg-white rounded-lg shadow-sm">
          <div className="mr-4">
            <img 
              src={user?.photoURL || "https://via.placeholder.com/150"} 
              alt="Profile" 
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Hi, {user?.name || 'User'}</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Menu Cards */}
        <div className="space-y-2 mb-8">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              onClick={() => handleItemClick(item.path)}
              className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="flex items-center">
                <div className="mr-4 text-gray-700">
                  {item.icon}
                </div>
                <div className="text-left">
                  <h2 className="font-medium">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <FiArrowRight className="text-gray-400" />
            </div>
          ))}
        </div>

        {/* Sign Out Button */}
        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
          <button 
            onClick={signOut}
            className="flex items-center justify-center mx-auto text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            <FiLogOut className="mr-2" />
            Sign out
          </button>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="w-full md:w-2/3 lg:w-3/4 bg-white rounded-lg shadow-sm p-6">
        <Outlet /> {/* This will render the nested route content (e.g., Profile) */}
      </div>
    </div>
  );
};

export default Account;