import { useState } from "react";
import Stays from "../../components/SearchFilter/Stays";
import Flights from "../../components/SearchFilter/Flights";
import Cars from "../../components/SearchFilter/Cars/Cars";
import Packages from "../../components/SearchFilter/Packages";
import ThingsToDo from "../../components/SearchFilter/ThingsToDo";
import Cruises from "../../components/SearchFilter/Cruises";
import icon1 from "../../assets/images/onekey__standard__always_light.svg";
import { Link } from "react-router-dom";
import bannerImg1 from "../../assets/images/banner-img-1.avif";
import bannerImg2 from "../../assets/images/banner-img-2.avif";
import KeyImg from "../../assets/images/Key.avif";
import CarouselCard from "./HomeContent/CarouselCard";
import AnnualVacation from "./HomeContent/AnnualVacation";
import RecommendedStays from "./HomeContent/RecommendedStays";

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
        <button type="button" className="w-full rounded-full  mt-4 py-1 text-white bg-blue-500">Sign in</button>
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

      {/* Carousel Card */}
      <div className="my-10">
      <CarouselCard />
      </div>

      {/* Annual Vacation */}
          <div className="flex justify-center">
            <AnnualVacation />
          </div>

          {/* Recommended stays*/}
          <RecommendedStays />

      {/* OneKeyCash */}
 
      <div className="relative relate border rounded">
      <img  src={KeyImg} alt="" className="absolute w-32 left-36 top-40 z-50"/>
        <img src={bannerImg2} alt="" className="rounded-t"/>
        
        <div className="p-3 pt-10 space-y-2 bg-[#f1f7ff]">
          <h1 className=""><span className="text-sm bg-black text-white px-2 py-1 rounded">New</span></h1>
          <h1 className="font-semibold">Earn up to $600 in OneKeyCash™</h1>
          <p>after qualifying purchases. Terms apply.</p>
          <p>OneKeyCash is not redeemable for cash.</p>
          <button className="btn  border px-2 py-1 border-gray-400 bg-white  rounded-full text-blue-600 hover:bg-slate-100">Learn more</button>
        </div>
      </div>


    </div>
  );
};

export default Home;