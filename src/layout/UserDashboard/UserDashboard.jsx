import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FiUser, FiSettings, FiCalendar, FiCreditCard, FiHeart, FiLogOut, FiHome, FiMessageSquare, FiBell } from 'react-icons/fi';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">My Dashboard</h1>
        <button className="btn btn-circle btn-sm">
          <FiBell className="text-lg" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white shadow-md lg:min-h-screen">
          <div className="p-4 hidden lg:block">
            <h1 className="text-2xl font-bold text-primary">TravelEase</h1>
            <p className="text-sm text-gray-500">User Dashboard</p>
          </div>

          <div className="divider m-0"></div>

          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/user-dashboard/profile" 
                  className="flex items-center p-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
                  activeClassName="bg-primary text-white"
                >
                  <FiUser className="mr-3" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/user-dashboard/bookings" 
                  className="flex items-center p-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <FiCalendar className="mr-3" />
                  <span>My Bookings</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/user-dashboard/payments" 
                  className="flex items-center p-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <FiCreditCard className="mr-3" />
                  <span>Payments</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/user-dashboard/wishlist" 
                  className="flex items-center p-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <FiHeart className="mr-3" />
                  <span>Wishlist</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/user-dashboard/settings" 
                  className="flex items-center p-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <FiSettings className="mr-3" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="divider m-0"></div>

          <div className="p-4">
            <Link 
              to="/" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiHome className="mr-3" />
              <span>Back to Home</span>
            </Link>
            <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors text-red-500">
              <FiLogOut className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Dashboard Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Welcome back, User!</h2>
                <p className="text-gray-500">Here's what's happening with your bookings today</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <button className="btn btn-outline btn-primary">
                  <FiMessageSquare className="mr-2" />
                  Messages
                </button>
                <button className="btn btn-circle btn-primary">
                  <FiBell />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="stats bg-white shadow-sm">
              <div className="stat">
                <div className="stat-title">Upcoming Trips</div>
                <div className="stat-value text-primary">3</div>
                <div className="stat-desc">Next 30 days</div>
              </div>
            </div>
            <div className="stats bg-white shadow-sm">
              <div className="stat">
                <div className="stat-title">Wishlist</div>
                <div className="stat-value text-secondary">12</div>
                <div className="stat-desc">Saved properties</div>
              </div>
            </div>
            <div className="stats bg-white shadow-sm">
              <div className="stat">
                <div className="stat-title">Loyalty Points</div>
                <div className="stat-value">1,250</div>
                <div className="stat-desc">Earn more rewards</div>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Recent Bookings</h3>
              <Link to="/user-dashboard/bookings" className="text-primary hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Property</th>
                    <th>Dates</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#TR-12548</td>
                    <td>Luxury Beach Villa</td>
                    <td>15-20 Jun 2023</td>
                    <td><span className="badge badge-success">Confirmed</span></td>
                    <td><button className="btn btn-xs btn-outline">Details</button></td>
                  </tr>
                  <tr>
                    <td>#TR-12547</td>
                    <td>Mountain Resort</td>
                    <td>05-10 May 2023</td>
                    <td><span className="badge badge-success">Completed</span></td>
                    <td><button className="btn btn-xs btn-outline">Details</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Outlet for nested routes */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;