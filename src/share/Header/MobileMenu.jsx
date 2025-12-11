import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdDownload } from 'react-icons/io';
import ToggleMenu from '../../components/ToggleMenu/ToggleMenu';
import {
  FaBed,
  FaPlane,
  FaCar,
  FaGift,
  FaUmbrellaBeach,
  FaShip,
  FaUserCircle,
} from 'react-icons/fa';

const MobileMenu = ({ isMobileMenuOpen, toggleUserMenu, setMobileMenuOpen, user, shopTravelItems }) => {
  return (
    <div
      className={`lg:hidden fixed top-16 right-0 bottom-0 w-80 max-w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 space-y-1">
        {/* User Profile Section */}
        <div className="mb-6 pb-4 border-b border-slate-200">
          <button
            onClick={() => {
              toggleUserMenu();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg transition-all duration-200 hover:shadow-md"
          >
            {user?.photoURL ? (
              <>
                <img
                  src={user.photoURL}
                  alt="User profile"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500"
                />
                <div className="text-left">
                  <p className="font-semibold text-slate-800">My Account</p>
                  <p className="text-xs text-slate-600">Manage your profile</p>
                </div>
              </>
            ) : (
              <>
                <FaUserCircle size={32} className="text-slate-600" />
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Sign in</p>
                  <p className="text-xs text-slate-600">Access your account</p>
                </div>
              </>
            )}
          </button>
        </div>

        {/* Shop Travel Section */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
            Shop Travel
          </p>
          <div className="space-y-1">
            {shopTravelItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 p-3 text-slate-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className={`${item.color} text-xl`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Menu Section */}
        <div className="border-t border-slate-200 pt-4 space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
            Menu
          </p>

          <Link
            to="/get-the-app"
            className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            <IoMdDownload size={20} className="text-blue-600" />
            <span className="font-medium">Get the App</span>
          </Link>

          <Link
            to="/list-your-property"
            className="block px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            List your property
          </Link>

          <Link
            to="/support"
            className="block px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Support
          </Link>

          {user && (
            <>
              <Link
                to="/trips"
                className="block px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trips
              </Link>

              <Link
                to="/account"
                className="block px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Account
              </Link>

              <Link
                to="/user-dashboard/user-overview"
                className="block px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;