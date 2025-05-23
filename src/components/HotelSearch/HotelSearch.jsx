import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import ResortCard from '../ResortCard/ResortCard';

const HotelSearch = () => {
  const { allResortData } = useContext(AuthContext);
  const [filteredResorts, setFilteredResorts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(15);
  const location = useLocation();

  // Extract search query from URL
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('q') || '';

  useEffect(() => {
    const searchResorts = () => {
      if (!allResortData || !keyword) {
        setFilteredResorts([]);
        return;
      }

      // Split keyword into individual words and remove empty terms
      const searchTerms = keyword.toLowerCase().split(' ').filter(term => term.trim() !== '');

      // Score resorts based on search term matches
      const scoredResorts = allResortData.map(resort => {
        const resortName = resort.place_name?.toLowerCase() || '';
        const resortLocation = resort.location?.toLowerCase() || '';
        const resortDescription = resort.description?.toLowerCase() || '';
        
        let score = 0;
        
        // Exact matches get highest priority
        if (resortName === keyword.toLowerCase()) {
          score += 100;
        }
        
        // Count matches in different fields with different weights
        searchTerms.forEach(term => {
          // Name matches are most important
          if (resortName.includes(term)) {
            score += 30;
            // Bonus if the match is at the beginning of the name
            if (resortName.startsWith(term)) score += 20;
          }
          
          // Location matches are also important
          if (resortLocation.includes(term)) {
            score += 20;
          }
          
          // Description matches are less important
          if (resortDescription.includes(term)) {
            score += 10;
          }
        });
        
        // Bonus for having all search terms matched
        if (searchTerms.every(term => 
          resortName.includes(term) || 
          resortLocation.includes(term) ||
          resortDescription.includes(term)
        )) {
          score += 50;
        }
        
        return { ...resort, score };
      });

      // Filter out resorts with zero score and sort by score (descending)
      const results = scoredResorts
        .filter(resort => resort.score > 0)
        .sort((a, b) => b.score - a.score);

      setFilteredResorts(results);
    };

    searchResorts();
  }, [keyword, allResortData]);

  // Pagination Logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredResorts.slice(indexOfFirstResult, indexOfLastResult);

  // Total Pages
  const totalPages = Math.ceil(filteredResorts.length / resultsPerPage);

  // Generate Visible Page Numbers
  const getVisiblePageNumbers = () => {
    const visiblePages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          visiblePages.push(i);
        }
        visiblePages.push('...');
        visiblePages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        visiblePages.push(1);
        visiblePages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          visiblePages.push(i);
        }
      } else {
        visiblePages.push(1);
        visiblePages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          visiblePages.push(i);
        }
        visiblePages.push('...');
        visiblePages.push(totalPages);
      }
    }

    return visiblePages;
  };

  // Change Page
  const paginate = (pageNumber) => {
    if (pageNumber === '...') return;
    setCurrentPage(pageNumber);
  };

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
        {currentResults.map((resort) => (
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

      {/* Pagination */}
      {filteredResorts.length > resultsPerPage && (
        <div className="flex justify-center mt-8">
          <nav className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>

            {getVisiblePageNumbers().map((number, index) => (
              <button
                key={index}
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded-lg ${
                  number === '...'
                    ? 'cursor-default'
                    : currentPage === number
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={number === '...'}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default HotelSearch;