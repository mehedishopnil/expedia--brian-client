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

const UserMenu = ({
  user,
  isUserMenuOpen,
  setUserMenuOpen,
  userMenuRef,
  toggleUserMenu
  
}) => {
  return (
    <div className="relative" ref={userMenuRef}>
      <button
        onClick={toggleUserMenu}
        className="flex items-center gap-2 px-3 xl:px-4 py-2 text-slate-700 hover:text-blue-600 font-medium text-sm transition-all duration-200 rounded-lg hover:bg-blue-50"
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User profile"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2"
          />
        ) : (
          <>
            <FaUserCircle size={20} />
            <span>Sign in</span>
          </>
        )}
      </button>

      {/* User Menu Dropdown */}
      {isUserMenuOpen && (
        <div className="max-h-[400px] overflow-y-auto  ">
          <ToggleMenu closeMenu={toggleUserMenu} />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
