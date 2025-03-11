import { useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import logo from "../../../public/Expedia_Logo.png";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="container mx-auto bg-white shadow-md py-5 px-5 relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-3">
            <img src={logo} className="w-24 md:w-32" alt="Expedia Logo" />
          </div>
        </Link>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-5">
          {/* Get the App Button */}
          <button className="flex items-center gap-1  md:gap-2 rounded-full border border-gray-400 px-2 py-1 md:py-2 md:px-4 hover:bg-gray-700 hover:text-white transition-colors duration-200">
            <IoMdDownload className="text-blue-500 hover:text-white" />{" "}
            <span className="text-[15px] md:text-xl">Get the App</span>
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <MdMenu size={24} />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50">
            <ul className="p-4 text-gray-700 font-bold text-xl space-y-3">
              <li>
                <Link to="/" onClick={toggleMobileMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/resorts" onClick={toggleMobileMenu}>
                  Resorts
                </Link>
              </li>
              <li>
                <Link to="/hosting-dashboard/listings" onClick={toggleMobileMenu}>
                  My Hosting
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={toggleMobileMenu}>
                  Contact
                </Link>
              </li>
            </ul>
            <div className="w-full border border-gray-300"></div>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 font-semibold text-lg text-gray-700">
          <Link to="/">Home</Link>
          <Link to="/resorts">Resorts</Link>
          <Link to="/hosting-dashboard/listings">My Hosting</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Desktop Get the App Button */}
        <div className="hidden md:flex gap-5 justify-end">
          <button className="flex items-center gap-2 rounded-full border border-gray-400 px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors duration-200">
            <IoMdDownload className="text-blue-500 hover:text-white" />{" "}
            <span className="text-xl">Get the App</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;