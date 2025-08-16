import React, { useState, useEffect } from "react";
import HotelCart from "./HotelCart";
import { useAppContext } from "../context/AppContext";
import { FaChevronRight, FaMountain, FaUmbrellaBeach } from "react-icons/fa";
import { GiVillage } from "react-icons/gi";
import { motion } from "framer-motion";

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();
  const [currentBg, setCurrentBg] = useState(0);

  const backgrounds = [
    "bg-gradient-to-br from-yellow-100/10 to-yellow-50/5",
    "bg-gradient-to-br from-orange-200/10 to-yellow-100/5",
    "bg-gradient-to-br from-red-200/10 to-pink-100/5"
  ];

  const destinationTypes = [
    { name: "Mountain", icon: <FaMountain className="text-amber-500" /> },
    { name: "Village", icon: <GiVillage className="text-amber-500" /> },
    { name: "Resort", icon: <FaUmbrellaBeach className="text-amber-500" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  if (rooms.length === 0) return null;

  return (
    <div className="relative overflow-hidden bg-slate-50 px-6 md:px-16 lg:px-24 py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {backgrounds.map((bg, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 ${bg} transition-all duration-1000`}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentBg === index ? 0.2 : 0 }}
            transition={{ duration: 2 }}
          />
        ))}
      </div>

      {/* Floating Decorations */}
      {/* Top-left icon */}
      <div className="absolute top-16 left-4 md:left-10 hidden md:block animate-bounce-slow">
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/20">
          <FaMountain className="text-amber-400 text-xl" />
        </div>
      </div>

      {/* Bottom-right icon */}
      <div className="absolute bottom-1/4 right-4 md:right-8 hidden md:block animate-bounce-slow delay-1000">
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/20">
          <GiVillage className="text-white text-xl" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Featured Destinations
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
            Discover our handpicked selection of exceptional properties in Nepal's most breathtaking locations
          </p>
        </motion.div>

        {/* Destination Type Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200">
            {destinationTypes.map((type) => (
              <button
                key={type.name}
                className="px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2 text-gray-600 hover:text-amber-600"
              >
                {type.icon}
                {type.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Hotels Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {rooms.slice(0, 4).map((room, index) => (
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button 
            onClick={() => {
              navigate("/rooms");
              window.scrollTo(0, 0);
            }}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center mx-auto group"
          >
            View All Destinations
            <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default FeaturedDestination;
