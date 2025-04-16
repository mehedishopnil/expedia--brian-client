import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import { FaHotel, FaCalendarAlt, FaMapMarkerAlt, FaStar, FaUser, FaPhone, FaMoneyBillWave, FaCreditCard, FaSpinner, FaBed, FaWifi, FaUtensils, FaBath } from 'react-icons/fa';
import { GiDuration } from 'react-icons/gi';

const MyBookings = () => {
  const { bookingsData } = useContext(AuthContext);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    if (dateString.includes(',')) return dateString;
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const calculateNights = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate.includes(',') ? startDate : new Date(startDate));
    const end = new Date(endDate.includes(',') ? endDate : new Date(endDate));
    return Math.round((end - start) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">My Bookings</h1>
          <p className="mt-3 text-xl text-gray-500">
            {bookingsData?.length ? `You have ${bookingsData.length} upcoming booking${bookingsData.length !== 1 ? 's' : ''}` : 'Your upcoming trips will appear here'}
          </p>
        </div>

        {!bookingsData ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-indigo-600" />
          </div>
        ) : bookingsData.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <FaHotel className="w-full h-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No bookings yet</h3>
            <p className="mt-2 text-gray-500">Start planning your next adventure!</p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Explore Hotels
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {bookingsData.map((booking) => (
              <div key={booking._id} className="bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-lg">
                <div className="px-6 py-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    {/* Hotel Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <img
                            className="h-24 w-24 rounded-lg object-cover"
                            src={booking.resort?.img || 'https://via.placeholder.com/150'}
                            alt={booking.resort?.place_name}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{booking.resort?.place_name}</h3>
                          <p className="flex items-center text-sm text-gray-500 mt-1">
                            <FaMapMarkerAlt className="mr-1.5" />
                            {booking.resort?.location}
                          </p>
                          <div className="flex items-center mt-2">
                            <div className="flex items-center text-yellow-400">
                              <FaStar className="mr-1" />
                              <span className="text-sm font-medium text-gray-900">
                                {booking.resort?.rating} ({booking.resort?.reviews_amount} reviews)
                              </span>
                            </div>
                            <span className="mx-2 text-gray-300">|</span>
                            <span className="text-sm text-gray-500">{booking.resort?.stateRating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Status & Price */}
                    <div className="sm:text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : booking.status === 'cancelled' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Total price</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${booking.paymentDetails?.totalAmount?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-4"></div>

                  {/* Booking Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Dates */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                        <GiDuration className="mr-2" /> Stay Duration
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Check-in</p>
                          <p className="font-medium">{formatDate(booking.startDate)}</p>
                          <p className="text-xs text-gray-500">{booking.resort?.check_in_time || '16:00'} check-in</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Check-out</p>
                          <p className="font-medium">{formatDate(booking.endDate)}</p>
                          <p className="text-xs text-gray-500">{booking.resort?.check_out_time || '11:00'} check-out</p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        {calculateNights(booking.startDate, booking.endDate)} night stay
                      </p>
                    </div>

                    {/* Room Details */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                        <FaBed className="mr-2" /> Room Details
                      </h4>
                      <div className="space-y-1">
                        <p className="font-medium">{booking.room?.type}</p>
                        <p className="text-sm text-gray-500">{booking.room?.bed}</p>
                        <p className="text-sm text-gray-500">{booking.room?.size}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {booking.room?.amenities?.wifi && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              <FaWifi className="mr-1" /> WiFi
                            </span>
                          )}
                          {booking.room?.amenities?.kitchen && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              <FaUtensils className="mr-1" /> Kitchen
                            </span>
                          )}
                          {booking.room?.amenities?.bath && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                              <FaBath className="mr-1" /> Private Bath
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Guest & Booking Info */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                        <FaUser className="mr-2" /> Guest Info
                      </h4>
                      <div className="space-y-1">
                        <p className="font-medium">{booking.guestInfo?.firstName} {booking.guestInfo?.lastName}</p>
                        <p className="text-sm text-gray-500">{booking.guestInfo?.email}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <FaPhone className="mr-1.5" /> {booking.guestInfo?.phone}
                        </p>
                        <p className="text-xs mt-2">
                          <span className="font-medium">Booking ID:</span> {booking.bookingId}
                        </p>
                        <p className="text-xs">
                          <span className="font-medium">Booked on:</span> {formatDate(booking.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment & Actions */}
                  <div className="mt-6 pt-5 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                          <FaMoneyBillWave className="mr-2" /> Payment Details
                        </h4>
                        <div className="flex flex-wrap gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Payment method</p>
                            <p className="text-sm font-medium flex items-center">
                              <FaCreditCard className="mr-1.5" /> {booking.paymentDetails?.type === 'full' ? 'Full payment' : 'Deposit'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Paid on</p>
                            <p className="text-sm font-medium">{formatDate(booking.paymentDate)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          View Receipt
                        </button>
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Manage Booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;