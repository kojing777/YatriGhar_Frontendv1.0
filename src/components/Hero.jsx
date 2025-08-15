import React, { useState } from "react";
import { cities } from "../assets/assets";
import { MdEditCalendar } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const Hero = () => {
  const { navigate, setSearchedCities } = useAppContext();
  const [destinations, setDestinations] = useState("");

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${destinations}`);

    setSearchedCities((prevSearchedCities) => {
      const updatedsearchedCities = [...prevSearchedCities, destinations];
      if (updatedsearchedCities.length > 3) {
        updatedsearchedCities.shift();
      }
      return updatedsearchedCities;
    });
  };

  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/nepal1.jpg")] bg-no-repeat bg-cover bg-center h-screen overflow-hidden'>
      {/* Tagline */}
      <p className="bg-[#49b9ff]/60 px-4 py-1 rounded-full mt-20 font-medium tracking-wide shadow-md animate-fadeIn">
        🇳🇵 <span className="font-semibold">Authentic Nepali Hospitality</span>
      </p>

      {/* Heading */}
      <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-extrabold max-w-2xl mt-4 
        bg-gradient-to-r from-yellow-300 via-white to-pink-200 bg-clip-text text-transparent drop-shadow-lg animate-slideUp">
        Experience Nepal Like a Local with Our Homestays
      </h1>

      {/* Subtext */}
      <p className="max-w-130 mt-2 text-sm md:text-base bg-black/30 px-4 py-2 rounded-md backdrop-blur-sm shadow-sm animate-fadeIn delay-200">
        Immerse yourself in <span className="font-semibold text-yellow-200">Nepali culture</span> while enjoying 
        <span className="font-semibold text-pink-200"> warm hospitality</span> in traditional homes 
        across the <span className="italic">Himalayas</span>.
      </p>

      {/* Search Form */}
      <form
        onSubmit={onSearch}
        className="bg-white mt-8 text-gray-500 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto shadow-lg animate-fadeIn delay-400"
      >
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <MdEditCalendar className="text-[#49b9ff]" />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            onChange={(e) => setDestinations(e.target.value)}
            value={destinations}
            list="destinations"
            id="destinationInput"
            type="text"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-[#49b9ff]"
            placeholder="Where to?"
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold">
            <MdEditCalendar className="text-[#49b9ff]" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-[#49b9ff]"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold">
            <MdEditCalendar className="text-[#49b9ff]" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-[#49b9ff]"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests" className="font-semibold">Guests</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-[#49b9ff] max-w-16"
            placeholder="0"
          />
        </div>

        <button className="flex items-center justify-center mt-5 gap-2 rounded-md bg-[#49b9ff] hover:bg-[#3aa7e8] py-2.5 px-5 text-white font-semibold shadow-md transition-all my-auto cursor-pointer max-md:w-full max-md:py-1">
          <FaSearch />
          <span>Search</span>
        </button>
      </form>

      {/* Tailwind custom animations */}
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
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
          .animate-slideUp {
            animation: slideUp 1s ease-out forwards;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
          .delay-400 {
            animation-delay: 0.4s;
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
