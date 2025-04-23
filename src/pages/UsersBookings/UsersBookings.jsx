import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const UsersBookings = () => {
  const { bookingsData } = useContext(AuthContext);

  // Check if bookingsData is an array and is not empty
  const flattenedBookingsData = Array.isArray(bookingsData[0])
    ? bookingsData.flat()
    : bookingsData;

  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed':
        return 'badge-success';
      case 'cancelled':
        return 'badge-error';
      case 'pending':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Bookings Management</h1>
            <p className="text-gray-600 mt-2">
              View and manage all customer bookings
            </p>
          </div>
          <div className="stats shadow mt-4 md:mt-0">
            <div className="stat">
              <div className="stat-title">Total Bookings</div>
              <div className="stat-value text-primary">{flattenedBookingsData.length}</div>
              <div className="stat-desc">↗︎ 12% from last month</div>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hidden lg:block">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-4 px-6">Resort</th>
                  <th className="text-left py-4 px-6">Booking Details</th>
                  <th className="text-left py-4 px-6">Guest Info</th>
                  <th className="text-left py-4 px-6">Payment</th>
                  <th className="text-left py-4 px-6">Status</th>
                  <th className="text-left py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {flattenedBookingsData.map((booking, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    {/* Resort Column */}
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          <img
                            className="h-16 w-16 rounded-md object-cover"
                            src={booking.resort?.img || "https://via.placeholder.com/150"}
                            alt="Resort"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.resort?.place_name || "Unknown Resort"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.resort?.location || "N/A"}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Rating: {booking.resort?.rating || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Booking Details Column */}
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div className="font-medium">Booking ID:</div>
                        <div className="text-gray-700">{booking.bookingId || "N/A"}</div>
                      </div>
                      <div className="text-sm mt-2">
                        <div className="font-medium">Dates:</div>
                        <div className="text-gray-700">
                          {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                        </div>
                      </div>
                      <div className="text-sm mt-2">
                        <div className="font-medium">Room:</div>
                        <div className="text-gray-700">
                          {booking.room?.type || "N/A"} ({booking.room?.size || "N/A"})
                        </div>
                      </div>
                    </td>

                    {/* Guest Info Column */}
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div className="font-medium">Guest:</div>
                        <div className="text-gray-700">
                          {booking.guestInfo?.firstName} {booking.guestInfo?.lastName}
                        </div>
                      </div>
                      <div className="text-sm mt-2">
                        <div className="font-medium">Contact:</div>
                        <div className="text-gray-700">
                          {booking.guestInfo?.email || "N/A"}
                        </div>
                        <div className="text-gray-700">
                          {booking.guestInfo?.phone || "N/A"}
                        </div>
                      </div>
                    </td>

                    {/* Payment Column */}
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div className="font-medium">Total:</div>
                        <div className="text-gray-700">
                          ${booking.paymentDetails?.totalAmount?.toFixed(2) || "0.00"}
                        </div>
                      </div>
                      <div className="text-sm mt-2">
                        <div className="font-medium">Payment:</div>
                        <div className="text-gray-700">
                          {booking.paymentDetails?.type === 'full' ? 'Full Payment' : 'Deposit'}
                        </div>
                        {booking.paymentDetails?.refundableDate && (
                          <div className="text-xs text-gray-500">
                            Refundable until: {booking.paymentDetails.refundableDate}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="py-4 px-6">
                      <span className={`badge ${getStatusBadge(booking.status)} gap-2`}>
                        {booking.status || "Unknown"}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Booked on: {formatDate(booking.createdAt)}
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-2">
                        <button className="btn btn-sm btn-outline btn-primary">
                          View Details
                        </button>
                        <button className="btn btn-sm btn-outline btn-error">
                          Cancel Booking
                        </button>
                        <button className="btn btn-sm btn-outline btn-success">
                          Print Receipt
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 lg:hidden">
          {flattenedBookingsData.map((booking, index) => (
            <div key={index} className="card bg-white shadow-md">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title text-lg">
                      {booking.resort?.place_name || "Unknown Resort"}
                    </h2>
                    <p className="text-gray-600">
                      {booking.guestInfo?.firstName} {booking.guestInfo?.lastName}
                    </p>
                  </div>
                  <span className={`badge ${getStatusBadge(booking.status)}`}>
                    {booking.status || "Unknown"}
                  </span>
                </div>
                
                <div className="flex items-start mt-4">
                  <div className="flex-shrink-0 h-24 w-24">
                    <img
                      className="h-24 w-24 rounded-md object-cover"
                      src={booking.resort?.img || "https://via.placeholder.com/150"}
                      alt="Resort"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium">Booking ID:</p>
                        <p className="text-sm">{booking.bookingId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Room Type:</p>
                        <p className="text-sm">{booking.room?.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Check-in:</p>
                        <p className="text-sm">{formatDate(booking.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Check-out:</p>
                        <p className="text-sm">{formatDate(booking.endDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Total Price:</p>
                        <p className="text-sm">${booking.paymentDetails?.totalAmount?.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Booked On:</p>
                        <p className="text-sm">{formatDate(booking.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card-actions justify-end mt-4 space-x-2">
                  <button className="btn btn-sm btn-primary">Details</button>
                  <button className="btn btn-sm btn-outline btn-error">Cancel</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {flattenedBookingsData.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400"
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
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings found</h3>
            <p className="text-gray-500 mb-4">
              There are currently no bookings to display.
            </p>
            <button className="btn btn-primary">Refresh</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersBookings;