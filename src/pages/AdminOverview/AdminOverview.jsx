import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import {
  FaUsers,
  FaCalendarCheck,
  FaDollarSign,
  FaChartLine,
  FaHotel,
  FaFileAlt,
  FaCog,
  FaBell,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaEdit,
  FaTrash,
  FaUserShield,
  FaUserCheck,
} from 'react-icons/fa';
import { MdDashboard, MdOutlineRateReview } from 'react-icons/md';
import { GiPayMoney } from 'react-icons/gi';

const AdminOverview = () => {
  const {
    user,
    bookingsData,
    allUsersData,
    fetchAllUsersData,
    fetchbookingsData,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    avgBookingValue: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    activeUsers: 0,
    newUsers: 0,
    occupancyRate: 0,
    userGrowth: 12.5,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!allUsersData || allUsersData.length === 0) {
          await fetchAllUsersData();
        }
        if (!bookingsData || bookingsData.length === 0) {
          await fetchbookingsData();
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchAllUsersData, fetchbookingsData, allUsersData, bookingsData]);

  useEffect(() => {
    if (bookingsData && allUsersData) {
      // Calculate revenue
      const totalRevenue = bookingsData.reduce((sum, booking) => {
        return sum + (booking.paymentDetails?.totalAmount || 0);
      }, 0);

      // Calculate confirmed bookings
      const confirmedBookings = bookingsData.filter(
        booking => booking.status === 'confirmed'
      ).length;

      // Calculate pending bookings
      const pendingBookings = bookingsData.filter(
        booking => booking.status === 'pending'
      ).length;

      // Calculate average booking value
      const avgBookingValue =
        bookingsData.length > 0 ? totalRevenue / bookingsData.length : 0;

      // Calculate active users (users with at least one booking)
      const activeUsers = allUsersData.filter(user =>
        bookingsData.some(booking => booking.email === user.email)
      ).length;

      // Calculate new users (registered in last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const newUsers = allUsersData.filter(
        user => new Date(user.createdAt || Date.now()) > thirtyDaysAgo
      ).length;

      // Calculate occupancy rate (simplified)
      const occupancyRate =
        bookingsData.length > 0
          ? Math.min(
              95,
              Math.round(
                (confirmedBookings / (allUsersData.length * 0.3)) * 100
              )
            )
          : 0;

      setStats({
        totalRevenue,
        avgBookingValue,
        confirmedBookings,
        pendingBookings,
        activeUsers,
        newUsers,
        occupancyRate,
        userGrowth: Math.round((newUsers / allUsersData.length) * 100),
      });
    }
  }, [bookingsData, allUsersData]);

  if (loading || !user) {
    return <Loading />;
  }

  const { name, photoURL, email } = user;

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'made a booking',
      time: '5 min ago',
      type: 'booking',
    },
    {
      id: 2,
      user: 'Sarah Smith',
      action: 'registered',
      time: '12 min ago',
      type: 'user',
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'cancelled booking',
      time: '1 hour ago',
      type: 'cancellation',
    },
    {
      id: 4,
      user: 'Emma Wilson',
      action: 'updated profile',
      time: '2 hours ago',
      type: 'update',
    },
    {
      id: 5,
      user: 'David Brown',
      action: 'left a review',
      time: '3 hours ago',
      type: 'review',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {name || 'Admin'}! Here's what's happening.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <button className="relative p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <FaBell className="text-gray-600 text-xl" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-xl shadow-sm">
                <img
                  src={
                    photoURL ||
                    'https://i.ibb.co/tm4qz6G/avatar-placeholder.png'
                  }
                  alt="Admin"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-gray-700">
                  {name || 'Admin'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Total Revenue
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mt-2">
                    ${stats.totalRevenue.toLocaleString()}
                  </h3>
                </div>
                <div className="bg-blue-400/20 p-3 rounded-xl">
                  <FaDollarSign className="text-2xl" />
                </div>
              </div>
              <div className="flex items-center text-blue-100 text-sm">
                <FaArrowUp className="mr-2" />
                <span>+18.2% from last month</span>
              </div>
            </div>
          </div>

          {/* Total Bookings Card */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">
                    Total Bookings
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mt-2">
                    {bookingsData?.length || 0}
                  </h3>
                </div>
                <div className="bg-emerald-400/20 p-3 rounded-xl">
                  <FaCalendarCheck className="text-2xl" />
                </div>
              </div>
              <div className="flex items-center text-emerald-100 text-sm">
                <div className="mr-4">
                  <span className="font-semibold">
                    {stats.confirmedBookings} confirmed
                  </span>
                </div>
                <div>
                  <span className="font-semibold">
                    {stats.pendingBookings} pending
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Users Card */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-purple-100 text-sm font-medium">
                    Total Users
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mt-2">
                    {allUsersData?.length || 0}
                  </h3>
                </div>
                <div className="bg-purple-400/20 p-3 rounded-xl">
                  <FaUsers className="text-2xl" />
                </div>
              </div>
              <div className="flex items-center text-purple-100 text-sm">
                <FaArrowUp className="mr-2" />
                <span>
                  +{stats.newUsers} new this month ({stats.userGrowth}%)
                </span>
              </div>
            </div>
          </div>

          {/* Occupancy Rate Card */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-amber-100 text-sm font-medium">
                    Occupancy Rate
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mt-2">
                    {stats.occupancyRate}%
                  </h3>
                </div>
                <div className="bg-amber-400/20 p-3 rounded-xl">
                  <FaChartLine className="text-2xl" />
                </div>
              </div>
              <div className="flex items-center text-amber-100 text-sm">
                <FaArrowUp className="mr-2" />
                <span>+5.2% from last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Quick Actions
                </h2>
                <span className="text-sm text-gray-500">Frequent tasks</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/admin-panel/users-bookings"
                  className="group bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-500 text-white p-3 rounded-lg mr-4">
                      <FaCalendarCheck className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Manage Bookings
                      </h3>
                      <p className="text-sm text-gray-600">
                        {bookingsData?.length || 0} total bookings
                      </p>
                    </div>
                  </div>
                  <div className="text-blue-600 font-medium flex items-center group-hover:translate-x-2 transition-transform">
                    View all bookings
                    <FaArrowUp className="ml-2 rotate-45" />
                  </div>
                </Link>

                <Link
                  to="/admin-panel/user-control"
                  className="group bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-purple-500 text-white p-3 rounded-lg mr-4">
                      <FaUsers className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        User Management
                      </h3>
                      <p className="text-sm text-gray-600">
                        {allUsersData?.length || 0} registered users
                      </p>
                    </div>
                  </div>
                  <div className="text-purple-600 font-medium flex items-center group-hover:translate-x-2 transition-transform">
                    Manage users
                    <FaArrowUp className="ml-2 rotate-45" />
                  </div>
                </Link>

                <Link
                  to="/admin-panel/reports"
                  className="group bg-gradient-to-r from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border border-emerald-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-emerald-500 text-white p-3 rounded-lg mr-4">
                      <FaFileAlt className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Reports & Analytics
                      </h3>
                      <p className="text-sm text-gray-600">
                        View detailed insights
                      </p>
                    </div>
                  </div>
                  <div className="text-emerald-600 font-medium flex items-center group-hover:translate-x-2 transition-transform">
                    View reports
                    <FaArrowUp className="ml-2 rotate-45" />
                  </div>
                </Link>

                <Link
                  to="/admin-panel/revenue"
                  className="group bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border border-amber-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-500 text-white p-3 rounded-lg mr-4">
                      <GiPayMoney className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Revenue Overview
                      </h3>
                      <p className="text-sm text-gray-600">
                        ${stats.totalRevenue.toLocaleString()} total
                      </p>
                    </div>
                  </div>
                  <div className="text-amber-600 font-medium flex items-center group-hover:translate-x-2 transition-transform">
                    View revenue
                    <FaArrowUp className="ml-2 rotate-45" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Recent Activity
              </h2>
              <Link
                to="/admin-panel/activity"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div
                  key={activity.id}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg mr-3 ${
                      activity.type === 'booking'
                        ? 'bg-blue-100 text-blue-600'
                        : activity.type === 'user'
                        ? 'bg-purple-100 text-purple-600'
                        : activity.type === 'cancellation'
                        ? 'bg-red-100 text-red-600'
                        : activity.type === 'update'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-amber-100 text-amber-600'
                    }`}
                  >
                    {activity.type === 'booking' && <FaCalendarCheck />}
                    {activity.type === 'user' && <FaUserCheck />}
                    {activity.type === 'cancellation' && <FaTrash />}
                    {activity.type === 'update' && <FaEdit />}
                    {activity.type === 'review' && <MdOutlineRateReview />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Booking Statistics */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Booking Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Booking Value</span>
                <span className="font-bold text-gray-900">
                  ${stats.avgBookingValue.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Users</span>
                <span className="font-bold text-gray-900">
                  {stats.activeUsers}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Conversion Rate</span>
                <span className="font-bold text-gray-900">
                  {(
                    (stats.confirmedBookings / allUsersData?.length) * 100 || 0
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">API Services</span>
                </div>
                <span className="text-sm text-green-600 font-medium">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Database</span>
                </div>
                <span className="text-sm text-green-600 font-medium">
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Payment Gateway</span>
                </div>
                <span className="text-sm text-green-600 font-medium">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Email Service</span>
                </div>
                <span className="text-sm text-green-600 font-medium">
                  Running
                </span>
              </div>
            </div>
          </div>

          {/* Admin Profile Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl overflow-hidden p-6">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={
                    photoURL ||
                    'https://i.ibb.co/tm4qz6G/avatar-placeholder.png'
                  }
                  alt="Admin"
                  className="w-20 h-20 rounded-full border-4 border-white/30 shadow-lg"
                />
                <span className="absolute -bottom-2 -right-2 bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  ADMIN
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {name || 'Administrator'}
              </h3>
              <p className="text-indigo-100 text-sm mb-4">
                {email || 'admin@example.com'}
              </p>
              <div className="flex justify-center space-x-2 mb-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                  Super Admin
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                  Owner
                </span>
              </div>
              <div className="flex justify-center space-x-3">
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <FaEye className="text-sm" />
                </button>
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <FaEdit className="text-sm" />
                </button>
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <FaCog className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
