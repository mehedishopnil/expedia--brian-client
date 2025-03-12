import React from "react";
import { FaSearch, FaQuestionCircle } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { BsFlag } from "react-icons/bs";
import { MdOutlineTravelExplore } from "react-icons/md";

const ToggleMenu = () => {
  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-[320px] p-4">
      {/* Title */}
      <h3 className="text-[14px] font-semibold text-gray-900 mb-2 leading-snug">
        Unlock instant savings with <br /> 
        <span className="text-blue-600">Member Prices.</span>
      </h3>

      {/* Sign In Button */}
      <button className="w-full bg-blue-600 text-white font-medium text-[14px] py-1 rounded-full hover:bg-blue-700 transition-all duration-200">
        Sign in
      </button>

      {/* Learn More */}
      <p className="text-gray-600 text-[12px] text-center mt-1 cursor-pointer hover:text-blue-600">
        Learn more
      </p>

      {/* Divider */}
      <hr className="border-gray-300 my-3" />

      {/* Menu Items */}
      <div className="space-y-3">
        <MenuItem icon={<IoMdMail />} text="Inbox" />
        <MenuItem icon={<FaSearch />} text="Shop travel" />
        <MenuItem icon={<FaQuestionCircle />} text="Support" />
        <MenuItem icon={<BsFlag />} text="English • USD $" />

        {/* Divider */}
        <hr className="border-gray-300" />

        <MenuItem icon={<MdOutlineTravelExplore />} text="List your property" />
        <MenuItem text="Trips" />
        <MenuItem text="Feedback" />
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
