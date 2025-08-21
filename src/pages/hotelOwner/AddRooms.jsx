import React, { useState } from "react";
import Title from "../../components/Title";
import toast from "react-hot-toast";
import {
  FaWifi,
  FaUtensils,
  FaConciergeBell,
  FaMountain,
  FaSwimmingPool,
  FaUpload,
} from "react-icons/fa";
import { motion } from "framer-motion";

const AddRooms = () => {
  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !Object.values(images).every((image) => image !== null)
    ) {
      toast.error("Please fill all fields and upload images.");
      return;
    }

    setLoading(true);
    try {
      toast.success("Room added successfully (Demo Mode)!");
      setInputs({
        roomType: "",
        pricePerNight: "",
        amenities: {
          "Free WiFi": false,
          "Free Breakfast": false,
          "Room Service": false,
          "Mountain View": false,
          "Pool Access": false,
        },
      });
      setImages({ 1: null, 2: null, 3: null, 4: null });
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const amenityIcons = {
    "Free WiFi": <FaWifi className="text-blue-500" />,
    "Free Breakfast": <FaUtensils className="text-amber-500" />,
    "Room Service": <FaConciergeBell className="text-emerald-500" />,
    "Mountain View": <FaMountain className="text-teal-500" />,
    "Pool Access": <FaSwimmingPool className="text-cyan-500" />,
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 overflow-hidden">
      {/* Floating decorative shapes */}
      <div className="absolute inset-0 z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 80 + 40,
              height: Math.random() * 80 + 40,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: ["#6366f1", "#8b5cf6", "#ec4899", "#10b981"][
                i % 4
              ],
            }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: Math.random() * 6 + 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Form container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl my-10"
      >
        <form onSubmit={onSubmitHandler} className="space-y-8">
          <Title
            align="left"
            font="outfit"
            title="Add Room"
            subTitle="Fill in all details carefully to make your listing attractive and user-friendly."
          />

          {/* Image Upload */}
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
            <p className="text-indigo-800 font-semibold mb-4 flex items-center gap-2">
              <FaUpload /> Upload Room Images
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(images).map((key) => (
                <label
                  key={key}
                  htmlFor={`roomImage${key}`}
                  className="relative group cursor-pointer"
                >
                  <div className="h-40 w-full border-2 border-dashed border-indigo-300 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-indigo-600 group-hover:shadow-lg">
                    {images[key] ? (
                      <img
                        src={URL.createObjectURL(images[key])}
                        alt="preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-indigo-400">
                        <FaUpload className="text-2xl mb-1" />
                        <span className="text-sm">Upload</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-sm font-medium rounded-xl">
                    Change
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    id={`roomImage${key}`}
                    hidden
                    onChange={(e) =>
                      setImages({ ...images, [key]: e.target.files[0] })
                    }
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Room Type & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-indigo-800 font-semibold mb-2 block">
                Room Type
              </label>
              <select
                value={inputs.roomType}
                onChange={(e) =>
                  setInputs({ ...inputs, roomType: e.target.value })
                }
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Select Type</option>
                <option value="single">Single Bed</option>
                <option value="double">Double Bed</option>
                <option value="deluxe">Luxury Room</option>
                <option value="family">Family Suite</option>
              </select>
            </div>
            <div>
              <label className="text-indigo-800 font-semibold mb-2 block">
                Price <span className="text-sm font-normal">/ Night</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-indigo-600">$</span>
                <input
                  type="number"
                  value={inputs.pricePerNight}
                  onChange={(e) =>
                    setInputs({ ...inputs, pricePerNight: e.target.value })
                  }
                  placeholder="0"
                  min="0"
                  className="w-full p-3 pl-8 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
            <p className="text-indigo-800 font-semibold mb-4">Amenities</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(inputs.amenities).map((amenity, i) => (
                <label
                  key={i}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={inputs.amenities[amenity]}
                    onChange={() =>
                      setInputs({
                        ...inputs,
                        amenities: {
                          ...inputs.amenities,
                          [amenity]: !inputs.amenities[amenity],
                        },
                      })
                    }
                    className="hidden"
                  />
                  <div
                    className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${
                      inputs.amenities[amenity] ? "bg-indigo-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        inputs.amenities[amenity] ? "translate-x-5" : ""
                      }`}
                    ></div>
                  </div>
                  <span className="flex items-center gap-2 text-gray-700 group-hover:text-indigo-700 transition">
                    {amenityIcons[amenity]} {amenity}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 
                    5.373 0 12h4zm2 5.291A7.962 7.962 
                    0 014 12H0c0 3.042 1.135 5.824 
                    3 7.938l3-2.647z"
                  />
                </svg>
                Adding Room...
              </>
            ) : (
              "Add Room"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddRooms;
