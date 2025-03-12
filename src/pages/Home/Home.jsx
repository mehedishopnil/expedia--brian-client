import { useState } from "react";
import Stays from "../../components/SearchFilter/Stays";
import Flights from "../../components/SearchFilter/Flights";
import Cars from "../../components/SearchFilter/Cars";
import Packages from "../../components/SearchFilter/Packages";
import ThingsToDo from "../../components/SearchFilter/ThingsToDo";
import Cruises from "../../components/SearchFilter/Cruises";

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
    </div>
  );
};

export default Home;