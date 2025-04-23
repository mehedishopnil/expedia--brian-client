import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const AdminOverview = () => {
  const {
    user,
    bookingsData,
    allUsersData,
    fetchAllUsersData,
    fetchbookingsData,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

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
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchAllUsersData, fetchbookingsData, allUsersData, bookingsData]);

  if (loading || !user) {
    return <Loading />;
  }

  const { name, photoURL, email } = user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Admin Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={
                  photoURL || "https://i.ibb.co/tm4qz6G/avatar-placeholder.png"
                }
                alt="Admin Avatar"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <span className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                ADMIN
              </span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {name || "Admin Name"}
              </h1>
              <p className="text-gray-500 mb-2">
                {email || "admin@example.com"}
              </p>
              <div className="flex justify-center md:justify-start gap-2">
                <span className="badge badge-primary">Super Admin</span>
                <span className="badge badge-outline">Last active: Now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="w-[100px] flex gap-2">

            <Link to="/admin-panel/users-bookings" className="">
              <div className=" bg-white shadow hover:shadow-lg transition-all">
                <div className="p-4 stat rounded">

                <div className="stat-title">Total Bookings</div>
                  <div className="flex justify-between items-center">
                  
                  
                  <div className="stat-value text-primary">
                    {bookingsData?.length || 0}
                  </div>
                  <div className=" text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-8 h-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      ></path>
                    </svg>
                  </div>
                  </div>
                  <div className="stat-desc">↗︎ 12% from last month</div>
                </div>
              </div>
            </Link>


            <Link to="/admin-panel/user-control" className="">
              <div className=" bg-white shadow hover:shadow-lg transition-all">
                <div className="p-4 stat rounded">

                <div className="stat-title">Total Users</div>
                  <div className="flex justify-between items-center">
                  
                  
                  <div className="stat-value  text-pink-500">
                  {allUsersData?.length || 0}
                  </div>
                  <div className=" text-primary">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-8 h-8 stroke-current text-pink-500 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      ></path>
                    </svg>
                  </div>
                  </div>
                  <div className="stat-desc">↗︎ 8 new users this month</div>
                </div>
              </div>
            </Link>


          </div>

          <div className="stats bg-white shadow">
            <div className="stat">
              <div className="stat-figure text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Revenue</div>
              <div className="stat-value text-accent">$12,345</div>
              <div className="stat-desc">↗︎ 23% from last month</div>
            </div>
          </div>

          <div className="stats bg-white shadow">
            <div className="stat">
              <div className="stat-figure text-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Occupancy Rate</div>
              <div className="stat-value text-info">78%</div>
              <div className="stat-desc">↘︎ 5% from last month</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin-panel/users-bookings"
            className="card bg-white shadow-md hover:shadow-lg transition-all"
          >
            <div className="card-body">
              <h2 className="card-title text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Manage Bookings
              </h2>
              <p className="text-gray-500">
                View, edit, and manage all bookings
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-primary">
                  Go to Bookings
                </button>
              </div>
            </div>
          </Link>

          <Link
            to="/admin-panel/user-control"
            className="card bg-white shadow-md hover:shadow-lg transition-all"
          >
            <div className="card-body">
              <h2 className="card-title text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                User Management
              </h2>
              <p className="text-gray-500">
                Manage user accounts and permissions
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-secondary">
                  Manage Users
                </button>
              </div>
            </div>
          </Link>

          <Link
            to="/admin-panel/reports"
            className="card bg-white shadow-md hover:shadow-lg transition-all"
          >
            <div className="card-body">
              <h2 className="card-title text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Reports & Analytics
              </h2>
              <p className="text-gray-500">View business performance metrics</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-accent">View Reports</button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
