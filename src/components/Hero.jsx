import React, { useState } from "react";
import { cities } from "../assets/assets";
import { MdEditCalendar } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const Hero = () => {
  const { navigate, setSearchedCities } = useAppContext();
  const [destinations, setDestinations] = useState("");

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
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/nepal1.jpg")] bg-no-repeat bg-cover bg-center h-screen overflow-hidden'>

      {/* Tagline */}
      <p className="bg-white/70 text-gray-800 px-4 py-1 rounded-full mt-20 font-medium tracking-wide shadow-md animate-fadeIn">
        🏔️ <span className="font-semibold">Welcome to Your Nepali Getaway</span>
      </p>

      {/* Heading */}
      <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-extrabold max-w-2xl mt-4 
        bg-gradient-to-r from-amber-200 via-white to-rose-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)] animate-slideUp">
        Discover Rooms That Feel Like Home
      </h1>

      {/* Subtext */}
      <p className="max-w-130 mt-2 text-sm md:text-base bg-white/60 text-gray-800 px-4 py-2 rounded-md backdrop-blur-sm shadow-md animate-fadeIn delay-200">
        Whether it’s a cozy homestay or a luxury suite, we’ll help you find your perfect stay in Nepal.
        Enjoy <span className="font-semibold text-amber-700">warm hospitality</span>, 
        <span className="font-semibold text-rose-700"> local flavors</span>, 
        and breathtaking views of the <span className="italic">Himalayas</span>.
      </p>

      {/* Search Form */}
      <form
        onSubmit={onSearch}
        className="bg-white mt-8 text-gray-600 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 shadow-lg animate-fadeIn delay-400"
      >
        <div>
          <div className="flex items-center gap-2 font-semibold text-gray-700">
            <MdEditCalendar className="text-amber-500" />
            <label htmlFor="destinationInput">Where to?</label>
          </div>
          <input
            onChange={(e) => setDestinations(e.target.value)}
            value={destinations}
            list="destinations"
            id="destinationInput"
            type="text"
            className="rounded border border-gray-300 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Search city or destination"
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold text-gray-700">
            <MdEditCalendar className="text-amber-500" />
            <label htmlFor="checkIn">Check-in Date</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className="rounded border border-gray-300 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold text-gray-700">
            <MdEditCalendar className="text-amber-500" />
            <label htmlFor="checkOut">Check-out Date</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className="rounded border border-gray-300 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests" className="font-semibold text-gray-700">Guests</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="rounded border border-gray-300 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 max-w-16"
            placeholder="0"
          />
        </div>

        <button className="flex items-center justify-center mt-5 gap-2 rounded-md bg-amber-500 hover:bg-amber-600 py-2.5 px-5 text-white font-semibold shadow-md transition-all my-auto cursor-pointer max-md:w-full max-md:py-1">
          <FaSearch />
          <span>Find Rooms</span>
        </button>
      </form>

      {/* Quick Booking Guarantee */}
      <p className="mt-3 text-sm md:text-base bg-white/60 text-gray-800 px-4 py-1 rounded-full shadow-sm backdrop-blur-sm animate-fadeIn delay-600">
        ✅ <span className="font-semibold text-green-700">Quick Booking:</span> Reserve in under a minute & pay at check-in.
      </p>

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
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
          .animate-slideUp {
            animation: slideUp 1s ease-out forwards;
          }
          .delay-200 { animation-delay: 0.2s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-600 { animation-delay: 0.6s; }
        `}
      </style>
    </div>
  );
};

export default Hero;
