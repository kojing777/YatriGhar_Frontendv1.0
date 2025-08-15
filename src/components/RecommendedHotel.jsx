import React, { useEffect, useState } from "react";
import HotelCart from "./HotelCart";
import { useAppContext } from "../context/AppContext";
import { FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [currentBg, setCurrentBg] = useState(0);

  const backgrounds = [
    "linear-gradient(135deg, rgba(253,230,138,0.15) 0%, rgba(254,243,199,0.1) 100%)",
    "linear-gradient(135deg, rgba(254,215,170,0.15) 0%, rgba(255,237,213,0.1) 100%)",
    "linear-gradient(135deg, rgba(252,165,165,0.15) 0%, rgba(254,226,226,0.1) 100%)",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filterHotels = () => {
      if (searchedCities?.length > 0 && rooms?.length > 0) {
        const filteredHotels = rooms.filter((room) =>
          searchedCities.includes(room.hotel?.city)
        );
        setRecommended(filteredHotels);
      } else {
        setRecommended([]);
      }
    };
    filterHotels();
  }, [rooms, searchedCities]);

  if (!searchedCities?.length) return null;

  return (
    <div className="relative overflow-hidden px-6 md:px-16 lg:px-24 py-16">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {backgrounds.map((bg, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 transition-all duration-1000"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentBg === index ? 0.3 : 0,
              background: bg,
            }}
            transition={{ duration: 2 }}
          />
        ))}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 hidden lg:block animate-float">
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/20">
          <FaMapMarkerAlt className="text-amber-400 text-xl" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Recommended Stays
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
            Discover handpicked accommodations in your searched destinations
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {recommended.slice(0, 4).map((room, index) => (
              <motion.div
                key={room._id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="shadow-md rounded-lg overflow-hidden"
              >
                <HotelCart room={room} index={index} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="bg-white/80 backdrop-blur-sm inline-block px-6 py-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-2">
                No hotels found in the searched cities
              </p>
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
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-10"
          >
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg shadow-md transition-all flex items-center mx-auto group">
              View All Recommended Stays
              <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default RecommendedHotels;
