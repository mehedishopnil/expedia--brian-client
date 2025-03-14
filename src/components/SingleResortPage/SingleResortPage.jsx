import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import Loading from "../Loading";

const SingleResortPage = () => {
  const { _id } = useParams(); // Get the _id from the URL parameters
  const { allResortData } = useContext(AuthContext); // Access allResortData from AuthContext
  const [resort, setResort] = useState(null); // State to store the matching resort

  useEffect(() => {
    if (allResortData && _id) {
      // Find the resort with the matching _id
      const foundResort = allResortData.find((resort) => resort._id === _id);
      if (foundResort) {
        setResort(foundResort); // Set the matching resort in the state
      } else {
        console.error("Resort not found");
      }
    }
  }, [_id, allResortData]); // Re-run effect if _id or allResortData changes

  if (!resort) {
    return <Loading />; // Show loading component if resort is not found
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {resort.place_name}
      </h1>
      <img
        src={resort.img}
        alt={resort.place_name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Location:</span> {resort.location}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Rating:</span> {resort.rating}/10
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Reviews:</span> {resort.reviews_amount}{" "}
        reviews
      </p>
      {/* Add more details as needed */}
    </div>
  );
};

export default SingleResortPage;