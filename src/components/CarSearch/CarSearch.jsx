import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaCar, FaGasPump, FaUserFriends, FaStar, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { GiCarKey } from 'react-icons/gi';

const CarSearch = () => {
  const location = useLocation();
  const searchData = location.state || {};

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Format time for display (converts "10:00" to "10:00 AM")
  const formatTimeDisplay = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hourNum = parseInt(hours, 10);
    return hourNum >= 12 
      ? `${hourNum === 12 ? 12 : hourNum - 12}:${minutes} PM` 
      : `${hourNum}:${minutes} AM`;
  };

  // Mock car data
  const carTypes = [
    {
      type: "Midsize SUV",
      brands: ["Nissan Rogue or similar", "Toyota RAV4 or similar", "Honda CR-V or similar"],
      features: ["5-person", "Automatic", "Unlimited mileage"],
      image: "https://cache1.arabwheels.ae/system/car_generation_pictures/29386/original/Cover.jpg?1732094940" // Replace with actual image URLs
    },
    {
      type: "Fullsize SUV",
      brands: ["Chevrolet Tahoe or similar", "Ford Expedition or similar", "Nissan Armada or similar"],
      features: ["7-person", "Automatic", "Unlimited mileage"],
      image: "https://di-uploads-pod2.dealerinspire.com/bobsteelechevy/uploads/2023/12/mlp-img-top-2024-tahoe.png"
    },
    {
      type: "Compact",
      brands: ["Nissan Versa or similar", "Toyota Corolla or similar", "Honda Civic or similar"],
      features: ["4-person", "Automatic", "Unlimited mileage"],
      image: "https://mystrongad.com/TSN_TownsendNissan/Digital/Versa/2024/2024-Nissan-Versa-White.webp"
    },
    {
      type: "Economy",
      brands: ["Mitsubishi Mirage or similar", "Kia Rio or similar", "Hyundai Accent or similar"],
      features: ["4-person", "Automatic", "Unlimited mileage"],
      image: "https://www.motortrend.com/uploads/sites/10/2017/11/2017-mitsubishi-mirage-se-hatchback-angular-front.png"
    },
    {
      type: "Mini Van",
      brands: ["Chrysler Pacifica or similar", "Honda Odyssey or similar", "Toyota Sienna or similar"],
      features: ["7-person", "Automatic", "Unlimited mileage"],
      image: "https://file.kelleybluebookimages.com/kbb/base/evox/CP/53514/2025-Chrysler-Pacifica-front_53514_032_1837x816_PDN_cropped.png"
    }
  ];

  // Generate random cars based on search data
  const generateCars = () => {
    return carTypes.map((carType, index) => {
      const randomBrand = carType.brands[Math.floor(Math.random() * carType.brands.length)];
      const basePrice = Math.floor(100 + Math.random() * 150);
      const discount = Math.floor(Math.random() * 30);
      const finalPrice = basePrice - discount;
      
      return {
        id: index + 1,
        type: carType.type,
        brand: randomBrand,
        features: carType.features,
        image: carType.image,
        basePrice,
        discount,
        finalPrice,
        rating: Math.floor(3 + Math.random() * 5), // 3-5 stars
        reviewCount: Math.floor(5 + Math.random() * 20), // 5-25 reviews
        pickupLocation: searchData.pickupLocation || "Las Vegas",
        dropoffLocation: searchData.dropoffLocation || "Orlando",
        pickupDistance: (Math.random() * 2).toFixed(1), // 0.0-2.0 miles
        dropoffDistance: (Math.random() * 2).toFixed(1) // 0.0-2.0 miles
      };
    });
  };

  const cars = generateCars();

  console.log(cars)

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Search Summary */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {searchData.pickupLocation || "Las Vegas"} to {searchData.dropoffLocation || "Orlando"}
        </h1>
        <p className="text-gray-600 mt-2">
          {formatDate(searchData.pickupDate)} at {formatTimeDisplay(searchData.pickupTime)} - 
          {formatDate(searchData.dropoffDate)} at {formatTimeDisplay(searchData.dropoffTime)}
        </p>
      </div>

      {/* Car Listings */}
      <div className="space-y-6">
        {cars.map((car) => (
          <div key={car.id} className="border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            {/* Top Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {/* Left Side - Car Info */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-primary">Member Price</span>
                  
                </div>
                <h1 className="text-2xl font-bold text-gray-800">{car.type}</h1>
                <h2 className="text-sm font-semibold">{car.brand}</h2>
                
                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="flex items-center gap-1 text-sm">
                    <FaUserFriends className="text-gray-500" />
                    <span>{car.features[0]}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <GiCarKey className="text-gray-500" />
                    <span>{car.features[1]}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <FaGasPump className="text-gray-500" />
                    <span>{car.features[2]}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <span>Pick-up in {car.pickupLocation} • {car.pickupDistance} mi from city center</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <span>Drop-off in {car.dropoffLocation} • {car.dropoffDistance} mi from city center</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Car Image */}
              <div className="flex justify-center items-center bg-gray-100 rounded-lg">
                
                    <img src={car.image} alt={car.brand} className="w-full h-auto object-cover rounded-lg" />
            </div>

            </div>

            {/* Bottom Section */}
            <div className=" bg-gray-50 p-4 border-t">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                
                <div>
                    {/* Left - Benefits */}
                <div className="space-y-2">
                  <p className="text-green-600 font-medium">Earn ${(car.finalPrice * 0.02).toFixed(2)} in OneKeyCash</p>
                  <p className="flex items-center gap-1 text-sm">
                    <FaCheck className="text-green-500" /> Free cancellation
                  </p>
                  <p className="flex items-center gap-1 text-sm">
                    <FaCheck className="text-green-500" /> Pay at pick-up
                  </p>
                  <p className="flex items-center gap-1 text-sm">
                    <FaCheck className="text-green-500" /> Reserve without a credit card
                  </p>
                </div>

                {/* Middle - Rating */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-1">
                    <span className="font-bold">Enterprise</span>
                    <div className="flex items-center ml-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`${i < car.rating ? 'text-yellow-400' : 'text-gray-300'} text-sm`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">{car.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{car.reviewCount} ratings</p>
                  <p className="text-green-600 font-medium mt-1">{car.discount}% off</p>
                </div>
                </div>

                {/* Right - Price */}
                <div className="flex flex-col items-end justify-center">
                  <div className="text-right">
                    <p className="text-gray-500 line-through">${car.basePrice}</p>
                    <p className="text-2xl font-bold text-blue-600">${car.finalPrice}</p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">${car.finalPrice * 2}</span> total
                    </p>
                    <p className="text-xs text-gray-500">
                      Price was ${car.basePrice * 2}, now ${car.finalPrice * 2}
                    </p>
                  </div>
                  <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarSearch;