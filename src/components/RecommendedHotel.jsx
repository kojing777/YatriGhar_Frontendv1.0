import React, { useEffect, useState } from "react";
import HotelCart from "./HotelCart";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";
import { FaMapMarkerAlt, FaStar, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const filterHotels = () => {
      if (searchedCities && searchedCities.length > 0 && rooms && rooms.length > 0) {
        const filteredHotels = rooms.filter(room => 
          searchedCities.includes(room.hotel?.city)
        );
        setRecommended(filteredHotels);
      } else {
        setRecommended([]);
      }
    };
    filterHotels();
  }, [rooms, searchedCities]);

  if (!searchedCities || searchedCities.length === 0) return null;

  return (
    <div className="px-6 md:px-16 lg:px-24 py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Title Section */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Recommended Stays
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base"
          >
            Discover handpicked accommodations in your searched destinations, featuring authentic Nepali hospitality and breathtaking Himalayan views.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-200">
            {["all", "popular", "luxury", "budget"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeTab === tab
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:text-amber-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Location Tags */}
        {searchedCities.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {searchedCities.map((city, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-200"
              >
                <FaMapMarkerAlt className="text-amber-500 mr-1" />
                {city}
              </span>
            ))}
          </motion.div>
        )}

        {/* Hotels Grid */}
        {recommended.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {recommended.slice(0, 4).map((room, index) => (
              <HotelCart key={room._id} room={room} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="bg-white/80 backdrop-blur-sm inline-block px-6 py-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-2">No hotels found in the searched cities</p>
              <button className="text-amber-600 font-medium text-sm hover:text-amber-700 transition-colors">
                Explore all destinations
              </button>
            </div>
          </motion.div>
        )}

        {/* View All Button */}
        {recommended.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-10"
          >
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg shadow-md transition-all flex items-center mx-auto">
              View All Recommended Stays
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RecommendedHotels;