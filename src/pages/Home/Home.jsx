import { useState } from "react";
import Stays from "../../components/SearchFilter/Stays";
import Flights from "../../components/SearchFilter/Flights";
import Cars from "../../components/SearchFilter/Cars";
import Packages from "../../components/SearchFilter/Packages";
import ThingsToDo from "../../components/SearchFilter/ThingsToDo";
import Cruises from "../../components/SearchFilter/Cruises";
import icon1 from "../../assets/images/onekey__standard__always_light.svg";
import { Link } from "react-router-dom";
import bannerImg1 from "../../assets/images/banner-img-1.avif";

const Home = () => {
  const [activeFilter, setActiveFilter] = useState("Stays");

  const filters = ["Stays", "Flights", "Cars", "Packages", "Things to do", "Cruises"];

  // Render the corresponding filter content based on the active filter
  const renderFilterContent = () => {
    switch (activeFilter) {
      case "Stays":
        return <Stays />;
      case "Flights":
        return <Flights />;
      case "Cars":
        return <Cars />;
      case "Packages":
        return <Packages />;
      case "Things to do":
        return <ThingsToDo />;
      case "Cruises":
        return <Cruises />;
      default:
        return <Stays />;
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
      {/* Horizontal Filter Menu */}
      <div className="mb-8">
        <div className="flex justify-center gap-4 md:gap-6 lg:gap-8 text-sm md:text-lg font-semibold">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative pb-2 ${
                activeFilter === filter
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {filter}
              {/* Underline for active filter */}
              {activeFilter === filter && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Content */}
      <div>{renderFilterContent()}</div>

      <div className="py-5 px-2 rounded bg-[#031a3b]">
        <div className="flex items-center justify-center gap-4">
          <img src={icon1} className="w-12" alt="" />
          <h1 className="text-[#ddecfd]">One Key members always get our best prices</h1>
        </div>

        <Link to="/signin">
        <button type="button" className="w-full rounded-full btn mt-4 py-1 text-white bg-blue-500">Sign in</button>
        </Link>
      </div>


      {/* The Annual Vacations Sale */}
      <div className="border my-10 rounded">
        <div className="p-3">
          <h1 className="text-3xl  font-[times-new-roman]">The Annual Vacation Sale: Save 25%+</h1>
          <p className="text-sm">Members save 25% or more on select hotels until Mar 31. And now more choices to get there with Southwest Airlines on Expedia.</p>
          <Link to="/">
            <button type="button" className="w-1/2 rounded-full btn mt-4 py-1 text-white bg-blue-500">Unlock vacation deals </button>
          </Link>
        </div>

          <img src={bannerImg1} alt="" className="h-full w-full covered rounded-b"/>

      </div>



    </div>
  );
};

export default Home;