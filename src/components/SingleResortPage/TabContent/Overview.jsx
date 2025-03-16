import React, { useMemo } from 'react';
import { FaStar } from 'react-icons/fa';

const Overview = ({ resort }) => {
    if (!resort) return null;

    const { place_name, rating, reviews_amount } = resort;
    
    // Fix the random rating so it doesn't change over time
    const fixedRandomRating = useMemo(() => (Math.random() * (10 - 7) + 7).toFixed(1), []);
    const ratingComment =
        fixedRandomRating >= 9 ? "Wonderful" :
        fixedRandomRating >= 8 ? "Excellent" :
        fixedRandomRating >= 7.5 ? "Very Good" : "Good";

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-2">{place_name}</h1>
            <div className="flex items-center gap-1">
                {[...Array(Math.round(rating))].map((_, i) => (
                    <FaStar key={i} className="text-gray-800" />
                ))}
            </div>
            <div className="flex items-center gap-2 mt-2">
                <h1 className="">
                    <span className='bg-blue-500 text-white px-2 py-1 rounded-md text-sm'>{fixedRandomRating} </span>  <span className='text-xl font-semibold px-2'>{ratingComment}</span>
                </h1>
            </div>
            <p className=" text-blue-700 mt-1">{reviews_amount} reviews</p>
        </div>
    );
};

export default Overview;
