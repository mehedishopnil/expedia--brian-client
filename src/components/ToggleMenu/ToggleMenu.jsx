import React, { useContext } from "react";
import { FaSearch, FaQuestionCircle, FaHotel } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { BsFlag } from "react-icons/bs";
import { MdAccountCircle, MdOutlineTravelExplore } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

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
    <div className="bg-white rounded-lg shadow-md w-full max-w-[320px] p-4">
      {/* User Info Section */}
      {user ? (
        <div className="mb-3">
          <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
            Hi, {user.name || 'Member'}
          </h3>
          <p className="text-[12px] text-gray-600 mb-2">
            {user.email}
          </p>
          {role === 'admin' && (
            <p className="text-[12px] text-blue-600 font-medium">Admin User</p>
          )}
        </div>
      ) : (
        <>
          <h3 className="text-[14px] font-semibold text-gray-900 mb-2 leading-snug">
            Unlock instant savings with <br />
            <span className="text-blue-600">Member Prices.</span>
          </h3>
          <Link to="/signin" onClick={handleMenuItemClick}>
            <button className="w-full bg-blue-600 text-white font-medium text-[14px] py-1 rounded-full hover:bg-blue-700 transition-all duration-200 mb-1">
              Sign in
            </button>
          </Link>
          <p className="text-gray-600 text-[12px] text-center cursor-pointer hover:text-blue-600" onClick={handleMenuItemClick}>
            Learn more
          </p>
        </>
      )}

      {/* Divider */}
      <hr className="border-gray-300 my-3" />

      {/* Menu Items */}
      <div className="space-y-3">
        <Link to="/hotels" onClick={handleMenuItemClick}>
          <MenuItem icon={<FaHotel />} text="Hotels" />
        </Link>

        {user && (
          <>
            <Link to="/account" onClick={handleMenuItemClick}>
              <MenuItem icon={<MdAccountCircle />} text="Account" />
            </Link>
            
            {/* Conditionally render AdminPanel or Dashboard based on role */}
            {role === 'admin' ? (
              <Link to="/admin-panel/admin-overview" onClick={handleMenuItemClick}>
                <MenuItem icon={<MdOutlineTravelExplore />} text="Admin Panel" />
              </Link>
            ) : (
              <Link to="/user-dashboard/user-overview" onClick={handleMenuItemClick}>
                <MenuItem icon={<MdOutlineTravelExplore />} text="Dashboard" />
              </Link>
            )}
          </>
        )}

        <Link to="/inbox" onClick={handleMenuItemClick}>
          <MenuItem icon={<IoMdMail />} text="Inbox" />
        </Link>

        <Link to="/shop-travel" onClick={handleMenuItemClick}>
          <MenuItem icon={<FaSearch />} text="Shop travel" />
        </Link>

        <Link to="/support" onClick={handleMenuItemClick}>
          <MenuItem icon={<FaQuestionCircle />} text="Support" />
        </Link>

        <Link to="/language-currency" onClick={handleMenuItemClick}>
          <MenuItem icon={<BsFlag />} text="English • USD $" />
        </Link>

        <hr className="border-gray-300" />

        <Link to="/list-your-property" onClick={handleMenuItemClick}>
          <MenuItem icon={<MdOutlineTravelExplore />} text="List your property" />
        </Link>
        <Link to="/trips" onClick={handleMenuItemClick}>
          <MenuItem text="Trips" />
        </Link>
        <Link to="/feedback" onClick={handleMenuItemClick}>
          <MenuItem text="Feedback" />
        </Link>

        {user && (
          <>
            <hr className="border-gray-300" />
            <button 
              onClick={handleSignOut}
              className="w-full text-gray-600 font-medium text-[13px] py-1 rounded-md hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 px-2"
            >
              <span>Sign out</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Reusable MenuItem Component
const MenuItem = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-gray-700 cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-all duration-200">
    {icon && <span className="text-lg">{icon}</span>}
    <span className="text-[13px] font-medium">{text}</span>
  </div>
);

export default ToggleMenu;