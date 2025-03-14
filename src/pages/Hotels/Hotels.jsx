import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import ResortCard from "../../components/ResortCard/ResortCard";
import Stays from "../../components/SearchFilter/Stays";

const Hotels = () => {
  const { allResortData } = useContext(AuthContext);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Search stays</h1>

      {/* Stays */}
      <div>
          <Stays />
      </div>

      {/* All the resorts */}

      <h1 className="text-2xl font-semibold text-gray-800 mt-10 mb-6">Ideas for your next trip</h1>

      {/* Resort Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allResortData.map((resort) => (
          <ResortCard key={resort._id} resort={resort} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;