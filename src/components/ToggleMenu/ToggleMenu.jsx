import React, { useContext } from 'react';
import { FaSearch, FaQuestionCircle, FaHotel } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { BsFlag } from 'react-icons/bs';
import { MdAccountCircle, MdOutlineTravelExplore } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';

const ToggleMenu = ({ closeMenu }) => {
  const { signOut, user, role } = useContext(AuthContext);

  const handleMenuItemClick = () => {
    closeMenu();
  };

  const handleSignOut = () => {
    signOut();
    closeMenu();
  };

  return (
    <div className="absolute right-0 top-5 w-[340px] bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50 font-sans animate-fade-in-down">
      {/* User Info Section */}
      <div className="p-6 pb-4">
        {user ? (
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-gray-900 truncate">
              Hi, {user.name || 'Traveler'}
            </h3>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
            {role === 'admin' && (
              <span className="inline-block mt-1 text-xs font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full w-fit">
                Admin
              </span>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-[1.125rem] font-bold text-gray-900 leading-snug">
              Unlock instant savings with{' '}
              <span className="text-blue-600">Member Prices.</span>
            </h3>
            <Link to="/signin" onClick={handleMenuItemClick} className="block">
              <button className="w-full bg-[#1668e3] hover:bg-[#1254b7] text-white font-semibold text-[15px] py-2.5 rounded-full transition-colors duration-200 shadow-sm">
                Sign in
              </button>
            </Link>
            <Link
              to="/learn-more"
              onClick={handleMenuItemClick}
              className="block text-center text-[14px] text-[#1668e3] hover:underline font-medium"
            >
              Create a free account
            </Link>
          </div>
        )}
      </div>

      <hr className="border-gray-200" />

      {/* Menu Items */}
      <div className="py-2">
        <MenuLink
          to="/hotels"
          icon={<FaHotel />}
          text="Hotels"
          onClick={handleMenuItemClick}
        />

        {user && (
          <>
            <MenuLink
              to="/account"
              icon={<MdAccountCircle />}
              text="Account"
              onClick={handleMenuItemClick}
            />
            {role === 'admin' ? (
              <MenuLink
                to="/admin-panel/admin-overview"
                icon={<MdOutlineTravelExplore />}
                text="Admin Panel"
                onClick={handleMenuItemClick}
              />
            ) : (
              <MenuLink
                to="/user-dashboard/user-overview"
                icon={<MdOutlineTravelExplore />}
                text="Dashboard"
                onClick={handleMenuItemClick}
              />
            )}
          </>
        )}

        <MenuLink
          to="/inbox"
          icon={<IoMdMail />}
          text="Inbox"
          onClick={handleMenuItemClick}
        />
        <MenuLink
          to="/shop-travel"
          icon={<FaSearch />}
          text="Shop travel"
          onClick={handleMenuItemClick}
        />
        <MenuLink
          to="/support"
          icon={<FaQuestionCircle />}
          text="Support"
          onClick={handleMenuItemClick}
        />
        <MenuLink
          to="/language-currency"
          icon={<BsFlag />}
          text="English • USD $"
          onClick={handleMenuItemClick}
        />
      </div>

      <hr className="border-gray-200 mx-4" />

      <div className="py-2">
        <MenuLink
          to="/list-your-property"
          text="List your property"
          onClick={handleMenuItemClick}
        />
        <MenuLink to="/trips" text="Trips" onClick={handleMenuItemClick} />
        <MenuLink
          to="/feedback"
          text="Feedback"
          onClick={handleMenuItemClick}
        />

        {user && (
          <div className="mt-1 px-4 py-2">
            <button
              onClick={handleSignOut}
              className="w-full text-center text-[#1668e3] font-medium text-[14px] hover:underline transition-all"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Refactored Reusable MenuItem Component for cleaner code
const MenuLink = ({ to, icon, text, onClick }) => (
  <Link to={to} onClick={onClick} className="block group">
    <div className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors duration-150">
      {icon && (
        <span className="text-gray-500 group-hover:text-gray-900 text-lg">
          {icon}
        </span>
      )}
      <span
        className={`text-[15px] font-normal text-gray-700 group-hover:text-gray-900 ${
          !icon ? 'ml-0' : ''
        }`}
      >
        {text}
      </span>
    </div>
  </Link>
);

export default ToggleMenu;
