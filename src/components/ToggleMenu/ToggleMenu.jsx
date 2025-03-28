import React, { useContext } from "react";
import { FaSearch, FaQuestionCircle, FaHotel } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { BsFlag } from "react-icons/bs";
import { MdOutlineTravelExplore } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const ToggleMenu = ({ closeMenu }) => {
  const { signOut, user } = useContext(AuthContext);
  
  // Function to handle clicks on menu items
  const handleMenuItemClick = () => {
    closeMenu(); // Close the menu when an option is clicked
  };

  // Function to handle sign out
  const handleSignOut = () => {
    signOut();
    closeMenu();
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-[320px] p-4">
      {/* Title */}
      <h3 className="text-[14px] font-semibold text-gray-900 mb-2 leading-snug">
        {user ? (
          `Welcome, ${user.displayName || user.email || 'Member'}!`
        ) : (
          <>
            Unlock instant savings with <br />
            <span className="text-blue-600">Member Prices.</span>
          </>
        )}
      </h3>

      {/* Sign In/Sign Out Button */}
      {user ? (
        <button 
          onClick={handleSignOut}
          className="w-full bg-blue-600 text-white font-medium text-[14px] py-1 rounded-full hover:bg-blue-700 transition-all duration-200"
        >
          Sign out
        </button>
      ) : (
        <Link to="/signin" onClick={handleMenuItemClick}>
          <button className="w-full bg-blue-600 text-white font-medium text-[14px] py-1 rounded-full hover:bg-blue-700 transition-all duration-200">
            Sign in
          </button>
        </Link>
      )}

      {/* Learn More */}
      {!user && (
        <p className="text-gray-600 text-[12px] text-center mt-1 cursor-pointer hover:text-blue-600" onClick={handleMenuItemClick}>
          Learn more
        </p>
      )}

      {/* Divider */}
      <hr className="border-gray-300 my-3" />

      {/* Menu Items */}
      <div className="space-y-3">
        <Link to="/hotels" onClick={handleMenuItemClick}>
          <MenuItem icon={<FaHotel />} text="Hotels" />
        </Link>
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

        {/* Divider */}
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