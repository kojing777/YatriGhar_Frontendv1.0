import React, { useState, useEffect } from "react";
import { cities } from "../assets/assets";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import { RiHotelFill } from "react-icons/ri";
import { GiMountainRoad } from "react-icons/gi";
import { useAppContext } from "../context/AppContext";

const Hero = () => {
  const { navigate, setSearchedCities } = useAppContext();
  const [destinations, setDestinations] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/src/assets/nepal1.jpg",
    "/src/assets/nepal2.jpg",
    "/src/assets/nepal3.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${destinations}`);

    setSearchedCities((prev) => {
      const updated = [...prev, destinations];
      if (updated.length > 3) updated.shift();
      return updated;
    });
  };

  return (
    <div className="relative h-screen overflow-hidden flex flex-col items-start justify-center px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32">
      {/* Background Image Slider */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

      {/* Floating Decorations */}
      <div className="absolute top-20 right-10 hidden lg:block animate-float">
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/20">
          <RiHotelFill className="text-amber-400 text-3xl" />
        </div>
      </div>
      <div className="absolute bottom-1/4 left-8 hidden lg:block animate-float delay-1000">
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/20">
          <GiMountainRoad className="text-white text-3xl" />
        </div>
      </div>

      {/* Content */}
      <div className="relative mt-10 text-white z-10 w-full max-w-6xl ">
        {/* Welcome Tag */}
        <div className="bg-white/80 text-gray-800 px-4 py-1 rounded-full inline-flex items-center gap-2 font-medium tracking-wide shadow-md animate-fadeIn">
          <span className="text-amber-600">🏔️</span>
          <span className="font-semibold">Welcome to Himalayan Stays</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-2xl mt-4 leading-tight animate-slideUp">
          <span className="bg-gradient-to-r from-amber-300 via-white to-rose-200 bg-clip-text text-transparent">
            Discover Your Perfect
          </span>
          <br />
          <span className="bg-gradient-to-r from-amber-200 via-white to-amber-300 bg-clip-text text-transparent">
            Mountain Retreat
          </span>
        </h1>

        {/* Subheading */}
        <p className="max-w-xl mt-4 text-sm sm:text-base bg-white/70 text-gray-800 px-4 py-2 rounded-lg backdrop-blur-sm shadow-md animate-fadeIn delay-200">
          Experience authentic Nepali hospitality in handpicked accommodations. 
          From cozy tea house stays to luxury resorts with Himalayan views - 
          we've got your perfect getaway covered.
        </p>

        {/* Stats Bar */}
        <div className="flex flex-wrap gap-4 mt-6 animate-fadeIn delay-300">
          <div className="bg-white/80 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
            <span className="text-amber-600">⭐</span>
            <span>4.9/5 (2.5k+ reviews)</span>
          </div>
          <div className="bg-white/80 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
            <span className="text-amber-600">🏡</span>
            <span>1,200+ properties</span>
          </div>
          <div className="bg-white/80 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
            <span className="text-amber-600">🗺️</span>
            <span>50+ destinations</span>
          </div>
        </div>

        {/* Search Form */}
        <form
          onSubmit={onSearch}
          className="bg-white/90 backdrop-blur-sm mt-8 text-gray-600 rounded-xl px-6 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 shadow-2xl animate-fadeIn delay-400 border border-white/20"
        >
          {/* Destination */}
          <div className="relative">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <FaMapMarkerAlt className="text-amber-500" />
              <label htmlFor="destinationInput">Destination</label>
            </div>
            <input
              onChange={(e) => setDestinations(e.target.value)}
              value={destinations}
              list="destinations"
              id="destinationInput"
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 pl-8 py-2.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="City or region"
              required
            />
            <datalist id="destinations">
              {cities.map((city, index) => (
                <option value={city} key={index} />
              ))}
            </datalist>
          </div>

          {/* Check-in */}
          <div className="relative">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <FaCalendarAlt className="text-amber-500" />
              <label htmlFor="checkIn">Check-in</label>
            </div>
            <input
              id="checkIn"
              type="date"
              className="w-full rounded-lg border border-gray-300 px-3 pl-8 py-2.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Check-out */}
          <div className="relative">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <FaCalendarAlt className="text-amber-500" />
              <label htmlFor="checkOut">Check-out</label>
            </div>
            <input
              id="checkOut"
              type="date"
              className="w-full rounded-lg border border-gray-300 px-3 pl-8 py-2.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Guests */}
          <div className="relative">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <FaUserFriends className="text-amber-500" />
              <label htmlFor="guests">Guests</label>
            </div>
            <select
              id="guests"
              className="w-full rounded-lg border border-gray-300 px-3 pl-8 py-2.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 appearance-none"
            >
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4+ guests</option>
            </select>
          </div>

          {/* Search Button */}
          <button className="flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 py-3 px-5 text-white font-semibold shadow-md transition-all cursor-pointer col-span-1 sm:col-span-2 lg:col-span-1 mt-auto h-[42px]">
            <FaSearch />
            <span>Search Stays</span>
          </button>
        </form>

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-3 mt-4 animate-fadeIn delay-600">
          <div className="bg-white/80 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
            <span className="text-green-600">✓</span>
            <span>No booking fees</span>
          </div>
          <div className="bg-white/80 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
            <span className="text-blue-600">✓</span>
            <span>Best price guarantee</span>
          </div>
          <div className="bg-white/80 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
            <span className="text-purple-600">✓</span>
            <span>24/7 customer support</span>
          </div>
        </div>
      </div>

      {/* Scrolling Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 hidden md:block">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
            40% { transform: translateY(-20px) translateX(-50%); }
            60% { transform: translateY(-10px) translateX(-50%); }
          }
          @keyframes scroll {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(6px); opacity: 0; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
          .animate-slideUp {
            animation: slideUp 1s ease-out forwards;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-bounce {
            animation: bounce 2s infinite;
          }
          .animate-scroll {
            animation: scroll 1.5s infinite;
          }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-600 { animation-delay: 0.6s; }
          .delay-1000 { animation-delay: 1s; }
        `}
      </style>
    </div>
  );
};

export default Hero;