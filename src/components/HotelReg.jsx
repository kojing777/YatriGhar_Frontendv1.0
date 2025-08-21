import React from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {
  FaHotel,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const HotelReg = () => {
  const { setShowHotelReg, setIsOwner } = useAppContext();
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      if (name && contact && address && city) {
        toast.success("Hotel registered successfully (Demo Mode)");
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.error("Please fill all the fields");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-[100] flex items-center justify-center bg-black/70"
    >
      {/* animated background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-20 left-10"></div>
        <div className="absolute w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse bottom-20 right-10"></div>
      </div>

      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full max-md:mx-4 animate-fadeIn"
      >
        <img
          src={assets.regImage}
          alt="registration"
          className="w-1/2 hidden md:block object-cover"
        />

        <div className="relative flex flex-col items-center md:w-1/2 w-full p-6 md:p-10">
          <IoClose
            onClick={() => setShowHotelReg(false)}
            className="absolute top-4 right-4 h-6 w-6 text-gray-500 cursor-pointer hover:text-red-500 transition"
          />

          <p className="text-3xl font-bold text-indigo-600 mt-4">
            Register Your Hotel
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Fill in the details to get started
          </p>

          {/* hotel name */}
          <div className="w-full mt-6">
            <label htmlFor="hotelName" className="font-medium text-gray-600">
              Hotel Name
            </label>
            <div className="flex items-center border border-gray-200 rounded px-3 py-2.5 mt-1 focus-within:border-indigo-500 transition">
              <FaHotel className="text-indigo-500 mr-2" />
              <input
                type="text"
                id="hotelName"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full outline-none font-light"
                placeholder="Enter your hotel name"
                required
              />
            </div>
          </div>

          {/* phone */}
          <div className="w-full mt-6">
            <label htmlFor="contact" className="font-medium text-gray-600">
              Contact Number
            </label>
            <div className="flex items-center border border-gray-200 rounded px-3 py-2.5 mt-1 focus-within:border-indigo-500 transition">
              <FaPhone className="text-indigo-500 mr-2" />
              <input
                type="text"
                id="contact"
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                className="w-full outline-none font-light"
                placeholder="Enter your contact number"
                required
              />
            </div>
          </div>

          {/* address */}
          <div className="w-full mt-6">
            <label htmlFor="address" className="font-medium text-gray-600">
              Address
            </label>
            <div className="flex items-center border border-gray-200 rounded px-3 py-2.5 mt-1 focus-within:border-indigo-500 transition">
              <FaMapMarkerAlt className="text-indigo-500 mr-2" />
              <input
                type="text"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="w-full outline-none font-light"
                placeholder="Enter your hotel address"
                required
              />
            </div>
          </div>

          {/* select city */}
          <div className="w-full mt-6">
            <label htmlFor="city" className="font-medium text-gray-600">
              City
            </label>
            <div className="flex items-center border border-gray-200 rounded px-3 py-2.5 mt-1 focus-within:border-indigo-500 transition">
              <FaCity className="text-indigo-500 mr-2" />
              <select
                id="city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                className="w-full outline-none font-light bg-transparent"
                required
              >
                <option value="">Select your city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="mt-8 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
