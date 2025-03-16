import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import Loading from "../Loading";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Overview from "./TabContent/Overview";
import About from "./TabContent/About";
import Rooms from "./TabContent/Rooms";
import Accessibility from "./TabContent/Accessibility";
import Policies from "./TabContent/Policies";

const SingleResortPage = () => {
  const { _id } = useParams();
  const { allResortData } = useContext(AuthContext);
  const [resort, setResort] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sectionRefs = {
    overview: useRef(null),
    about: useRef(null),
    rooms: useRef(null),
    accessibility: useRef(null),
    policies: useRef(null),
  };

  useEffect(() => {
    if (allResortData && _id) {
      const foundResort = allResortData.find((resort) => resort._id === _id);
      if (foundResort) setResort(foundResort);
    }
  }, [_id, allResortData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!resort) return <Loading />;

  const { img, img2, img3, place_name } = resort;
  const images = [img, img2, img3];
  console.log(resort)

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    sectionRefs[tab].current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8 h-48 overflow-hidden rounded-sm">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={place_name}
            className={`absolute h-full w-full object-cover transition-opacity duration-500 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <button
          onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? 2 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-2 hover:bg-white"
        >
          <FiChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % 3)}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-2 hover:bg-white"
        >
          <FiChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Sticky Tab Menu */}
      <div className=" sticky top-0 z-10 flex justify-center w-full overflow-x-auto whitespace-nowrap bg-white  border-b-2 border-gray-200 ">
        {Object.keys(sectionRefs).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`mx-2 flex-shrink-0 py-2 text-sm font-semibold capitalize sm:text-base md:text-lg lg:px-6 lg:py-3 ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Sections */}
      <div className="space-y-2">
        <section ref={sectionRefs.overview} className="scroll-mt-20 py-2">
          <Overview resort={resort} />
        </section>
        <section ref={sectionRefs.about} className="scroll-mt-20 py-2">
          <About resort={resort} />
        </section>
        <section ref={sectionRefs.rooms} className="scroll-mt-20 py-2">
          <Rooms resort={resort} />
        </section>
        <section ref={sectionRefs.accessibility} className="scroll-mt-20 py-2">
          <Accessibility resort={resort} />
        </section>
        <section ref={sectionRefs.policies} className="scroll-mt-20 py-2">
          <Policies resort={resort} />
        </section>
      </div>
    </div>
  );
};

export default SingleResortPage;