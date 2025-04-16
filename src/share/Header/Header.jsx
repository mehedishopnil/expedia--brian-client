import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { FaBed, FaPlane, FaCar, FaGift, FaUmbrellaBeach, FaShip, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/images/Travel+Leisure-logo.png";
import ToggleMenu from "../../components/ToggleMenu/ToggleMenu";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const Header = () => {
  const [isShopTravelOpen, setShopTravelOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleShopTravel = () => {
    setShopTravelOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  return (
    <div className="container mx-auto bg-white shadow-md py-5 px-5 relative">
      <div className="flex items-center justify-between">
        {/* Logo and Shop Travel Toggle */}
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src={logo} className="w-28 md:w-32" alt="Expedia Logo" />
          </Link>

          {/* Shop Travel Toggle (Desktop) */}
          <div className="hidden md:block relative">
            <button
              onClick={toggleShopTravel}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold text-lg"
            >
              Shop Travel <MdKeyboardArrowDown size={20} />
            </button>

            {/* Shop Travel Dropdown Menu */}
            {isShopTravelOpen && (
              <div className="absolute top-10 left-0 bg-white shadow-lg rounded-lg p-4 z-50 w-64">
                <ul className="space-y-3">
                  
                  <li><Link to="/stays" className="flex items-center gap-2 text-gray-700 hover:text-gray-900"><FaBed className="text-gray-500" /> Stays</Link></li>
                  
                  <li><Link to="/flights" className="flex items-center gap-2 text-gray-700 hover:text-gray-900"><FaPlane className="text-gray-500" /> Flights</Link></li>
                  <li><Link to="/cars" className="flex items-center gap-2 text-gray-700 hover:text-gray-900"><FaCar className="text-gray-500" /> Cars</Link></li>
                  <li><Link to="/packages" className="flex items-center gap-2 text-gray-700 hover:text-gray-900"><FaGift className="text-gray-500" /> Packages</Link></li>
                  <li><Link to="/things-to-do" className="flex items-center gap-2 text-gray-700 hover:text-gray-900"><FaUmbrellaBeach className="text-gray-500" /> Things to Do</Link></li>
                  <li><Link to="/cruises" className="flex items-center gap-2 text-gray-700 hover:text-gray-900"><FaShip className="text-gray-500" /> Cruises</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-5">
          {/* Get the App Button */}
          <button className="flex items-center gap-1 md:gap-2 rounded-full border border-gray-400 px-2 py-1 md:py-2 md:px-4 hover:bg-gray-700 hover:text-white transition-colors duration-200">
            <IoMdDownload className="text-blue-500 hover:text-white" />
            <span className="text-[15px] md:text-xl">Get the App</span>
          </button>

          {/* User Icon/Photo for Mobile Menu */}
          <button 
            onClick={toggleUserMenu} 
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="User profile" 
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle size={24} />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/get-the-app" className="font-semibold text-lg text-gray-700 hover:text-gray-900">Get the App</Link>
          <Link to="/list-your-property" className="font-semibold text-lg text-gray-700 hover:text-gray-900">List your property</Link>
          <Link to="/support" className="font-semibold text-lg text-gray-700 hover:text-gray-900">Support</Link>
          
          {/* Only show Trips link if user is logged in */}
          {user && (
            <>
              <Link to="/trips" className="font-semibold text-lg text-gray-700 hover:text-gray-900">Trips</Link>
              <Link to="/account" className="font-semibold text-lg text-gray-700 hover:text-gray-900">Account</Link>
              <Link to="/user-dashboard/user-overview" className="font-semibold text-lg text-gray-700 hover:text-gray-900">Dashboard</Link>
            </>
          )}
          
          {/* User Icon/Photo */}
          <button 
            onClick={toggleUserMenu} 
            className="font-semibold text-lg text-gray-700 hover:text-gray-900 flex items-center gap-1"
          >
            {user?.photoURL ? (
              <>
                <img 
                  src={user.photoURL} 
                  alt="User profile" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              </>
            ) : (
              <>
                <FaUserCircle size={20} />
                <span>Sign in</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* User Menu - Popup from Right */}
      {isUserMenuOpen && (
        <div className="absolute top-16 right-0 w-[350px] bg-white shadow-lg rounded-md transition-transform duration-300 z-50 ease-in-out transform translate-x-0">
          <ToggleMenu closeMenu={toggleUserMenu} />
        </div>
      )}
    </div>
  );
};

export default Header;