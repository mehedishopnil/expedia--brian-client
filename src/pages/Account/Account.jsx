import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import { FiUser, FiMail, FiCreditCard, FiTag, FiDollarSign, FiStar, FiLock, FiHelpCircle, FiArrowRight, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Account = () => {
  const { user, signOut } = useContext(AuthContext);

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
      path: "/payment-methods"
    },
    {
      title: "Coupons",
      description: "View your available coupons",
      icon: <FiTag className="text-xl" />,
      path: "/coupons"
    },
    {
      title: "Credits",
      description: "View your active airline credits",
      icon: <FiDollarSign className="text-xl" />,
      path: "/credits"
    },
    {
      title: "Reviews",
      description: "Read reviews you've shared",
      icon: <FiStar className="text-xl" />,
      path: "/reviews"
    },
    {
      title: "Security and settings",
      description: "Update your email or password",
      icon: <FiLock className="text-xl" />,
      path: "/security"
    },
    {
      title: "Help and feedback",
      description: "Get customer support",
      icon: <FiHelpCircle className="text-xl" />,
      path: "/help"
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4">
      {/* User Profile Section */}
      <div className="flex items-center mb-8">
        <div className="mr-4">
          <img 
            src={user?.photoURL || "https://via.placeholder.com/150"} 
            alt="Profile" 
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Hi, {user?.displayName || 'User'}</h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* Menu Cards */}
      <div className="space-y-4 mb-8">
        {menuItems.map((item, index) => (
          <Link 
            to={item.path} 
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow duration-200"
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
          </Link>
        ))}
      </div>

      {/* Sign Out Button */}
      <div className="text-center">
        <button 
          onClick={signOut}
          className="flex items-center justify-center mx-auto text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          <FiLogOut className="mr-2" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Account;