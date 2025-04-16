import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import { FaUserCircle, FaHotel, FaCalendarAlt, FaMapMarkerAlt, FaStar, FaCreditCard, FaSpinner, FaBed, FaRulerCombined, FaUtensils, FaBath, FaWifi } from 'react-icons/fa';

const UserOverview = () => {
  const { user, bookingsData } = useContext(AuthContext);

  const formatDate = (dateString) => {
    if (dateString.includes(',')) {
      return dateString;
    }
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString) => {
    if (timeString.includes('.')) {
      const [hours, minutes] = timeString.split('.');
      return `${hours}:${minutes.padEnd(2, '0')}`;
    }
    return timeString;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* User Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 p-6 bg-white rounded-xl shadow-sm">
        <div className="avatar">
          <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User profile" className="w-full h-full object-cover" />
            ) : (
              <FaUserCircle className="w-full h-full text-gray-400" />
            )}
          </div>
        </div>
        
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {user?.displayName || 'Welcome Back'}
          </h1>
          <p className="text-gray-600 mb-4">{user?.email}</p>
          
          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-title">Total Bookings</div>
              <div className="stat-value text-primary">
                {bookingsData ? bookingsData.length : 0}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Upcoming Trips</div>
              <div className="stat-value text-secondary">
                {bookingsData ? bookingsData.filter(b => b.status === 'confirmed').length : 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2">Your Bookings</h2>
        
        {!bookingsData ? (
          <div className="flex justify-center items-center h-40">
            <FaSpinner className="animate-spin text-4xl text-primary" />
          </div>
        ) : bookingsData.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 mb-4">You don't have any bookings yet</p>
            <button className="btn btn-primary">Start Exploring</button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookingsData.map((booking) => (
              <div key={booking._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Resort Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <FaHotel className="text-3xl text-blue-500 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{booking.resort?.place_name}</h3>
                        <p className="text-gray-600 flex items-center gap-1">
                          <FaMapMarkerAlt className="text-gray-400" />
                          {booking.resort?.location}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="badge badge-primary">{booking.resort?.stateRating}</div>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <FaStar />
                            <span>{booking.resort?.rating} ({booking.resort?.reviews_amount} reviews)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-gray-800">
                        ${booking.paymentDetails?.totalAmount?.toFixed(2)}
                      </span>
                      <span className={`badge ${booking.status === 'confirmed' ? 'badge-success' : 'badge-neutral'}`}>
                        {booking.status}
                      </span>
                      <span className="text-sm text-gray-500 mt-1">Booking ID: {booking.bookingId}</span>
                    </div>
                  </div>
                  
                  {/* Images Gallery */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                    {[booking.resort?.img, booking.resort?.img2, booking.resort?.img3, booking.resort?.img4].filter(Boolean).map((img, index) => (
                      <img 
                        key={index} 
                        src={img} 
                        alt={`Resort view ${index + 1}`} 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                  
                  {/* Dates and Room Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">Stay Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Check-in</p>
                          <p className="font-medium">{formatDate(booking.startDate)}</p>
                          <p className="text-sm">{formatTime(booking.resort?.check_in_time)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Check-out</p>
                          <p className="font-medium">{formatDate(booking.endDate)}</p>
                          <p className="text-sm">{formatTime(booking.resort?.check_out_time)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Payment Date</p>
                          <p className="font-medium">{formatDate(booking.paymentDate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Refundable Until</p>
                          <p className="font-medium">{booking.paymentDetails?.refundableDate || 'Non-refundable'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">Room Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Room Type</p>
                          <p className="font-medium">{booking.room?.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bed Type</p>
                          <p className="font-medium">{booking.room?.bed}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Room Size</p>
                          <p className="font-medium">{booking.room?.size}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Sleeps</p>
                          <p className="font-medium">{booking.room?.sleeps} people</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Amenities</h4>
                    <div className="flex flex-wrap gap-3">
                      {booking.room?.amenities?.wifi && (
                        <div className="flex items-center gap-2 badge badge-outline">
                          <FaWifi /> WiFi
                        </div>
                      )}
                      {booking.room?.amenities?.kitchen && (
                        <div className="flex items-center gap-2 badge badge-outline">
                          <FaUtensils /> {booking.room?.amenities?.kitchen} Kitchen
                        </div>
                      )}
                      {booking.room?.amenities?.bath && (
                        <div className="flex items-center gap-2 badge badge-outline">
                          <FaBath /> {booking.room?.amenities?.bath} Bath
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Guest Info */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Guest Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{booking.guestInfo?.firstName} {booking.guestInfo?.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{booking.guestInfo?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{booking.guestInfo?.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Special Requests</p>
                        <p className="font-medium">{booking.guestInfo?.specialRequests || 'None'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Details */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">Payment Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Base Amount</p>
                        <p className="font-medium">${booking.paymentDetails?.baseAmount?.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tax</p>
                        <p className="font-medium">${booking.paymentDetails?.tax?.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Fees</p>
                        <p className="font-medium">${booking.paymentDetails?.fees?.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="font-medium text-primary">${booking.paymentDetails?.totalAmount?.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Type</p>
                        <p className="font-medium">{booking.paymentDetails?.type === 'full' ? 'Full Payment' : 'Deposit'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Date</p>
                        <p className="font-medium">{formatDate(booking.paymentDate)}</p>
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

export default UserOverview;