import React from 'react';
import { FaCheck, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ImportantInfo = () => {
     return (
          <div>
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Important information
            </h2>

            <ul className="space-y-3 text-sm text-gray-700 mb-4">
              <li className="list-disc ml-4">
                Front desk staff will greet guests on arrival at the property.
                For any questions, please contact the property using the
                information on the booking confirmation.
              </li>
              <li className="list-disc ml-4">
                The name on the reservation must match the name on the guest's
                photo identification provided at check-in.
              </li>
              <li className="list-disc ml-4">
                You'll be asked to pay the following charges at the property.
                Fees may include applicable taxes:
              </li>
            </ul>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="font-medium mb-2">Deposit: USD 100.00</p>
              <p className="font-medium">
                Resort fee: USD 40.67 per accommodation, per night
              </p>
              <p className="text-sm mt-2">The resort fee includes:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2 text-sm">
                {[
                  "Business center/computer access",
                  "Concierge service",
                  "Faxes",
                  "Fitness center access",
                  "Housekeeping",
                  "In-room safe",
                  "Parking",
                  "Phone calls",
                  "Pool access",
                  "Self parking",
                  "Hot tub access",
                  "Valet parking",
                ].map((item) => (
                  <div key={item} className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 text-xs" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="divider my-3" />

            <div className="flex justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Check-in</p>
                <p className="font-medium">3:00 PM - 11:00 PM</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Check-out</p>
                <p className="font-medium">11:00 AM</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                By clicking on the button below, I acknowledge that I have
                reviewed the
                <Link to="#" className="text-blue-600 hover:underline">
                  {" "}
                  Privacy Statement
                </Link>
                ,
                <Link to="#" className="text-blue-600 hover:underline">
                  {" "}
                  Government Travel Advice
                </Link>
                , and have reviewed and accept the
                <Link to="#" className="text-blue-600 hover:underline">
                  {" "}
                  Rules & Restrictions
                </Link>{" "}
                and
                <Link to="#" className="text-blue-600 hover:underline">
                  {" "}
                  Terms of Use
                </Link>
                .
              </p>
            </div>

            {/* <button className="btn btn-primary w-full">
              Complete Booking
              <FaChevronRight className="ml-2" />
            </button> */}

            <div className="flex items-start mt-4">
              <FaLock className="text-gray-500 mt-1 mr-2" />
              <p className="text-xs text-gray-500">
                We use secure transmission and encrypted storage to protect your
                personal information. Payments are processed in the U.S. except
                where the travel provider (hotel / airline etc) processes your
                payment outside the U.S., in which case your card issuer may
                charge a foreign transaction fee.
              </p>
            </div>
          </div>
          </div>
     );
};

export default ImportantInfo;