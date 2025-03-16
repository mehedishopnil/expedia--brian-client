import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import ResortCard from '../ResortCard/ResortCard';

const HotelSearch = () => {
  const { allResortData } = useContext(AuthContext);
  const [filteredResorts, setFilteredResorts] = useState([]);
  const location = useLocation();

  // Extract search query from URL
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('q') || '';

  console.log(queryParams);

  useEffect(() => {
    const searchResorts = () => {
      if (!allResortData || !keyword) {
        setFilteredResorts([]);
        return;
      }

      // Split keyword into individual words
      const searchTerms = keyword.toLowerCase().split(' ').filter(term => term.trim() !== '');

      console.log(allResortData);

      // Filter resorts based on search terms
      const results = allResortData.filter(resort => {
        const resortName = resort.place_name.toLowerCase();
        const resortLocation = resort.location.toLowerCase();
        
        return searchTerms.some(term => 
          resortName.includes(term) || 
          resortLocation.includes(term)
        );
      });

      setFilteredResorts(results);
    };

    searchResorts();
  }, [keyword, allResortData]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Search Results for "{keyword}"
        </h1>
        <p className="text-gray-600 mt-2">
          Found {filteredResorts.length} properties
        </p>
      </div>

      {/* Search Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResorts.map((resort) => (
          <ResortCard key={resort._id} resort={resort} />
        ))}
      </div>

      {/* No Results Message */}
      {filteredResorts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No resorts found matching your search criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default HotelSearch;