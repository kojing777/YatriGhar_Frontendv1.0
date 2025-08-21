import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { FaWifi, FaUtensils, FaConciergeBell, FaMountain, FaSwimmingPool, FaUpload } from "react-icons/fa";

const AddRooms = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
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

    // Check if all inputs are filled
    if(!inputs.roomType || !inputs.pricePerNight || !Object.values(images).every(image => image !== null)) {
      toast.error("Please fill all the fields and upload images.");
      return;
    }
    setLoading(true);

    // Simulate room creation without backend call
    try {
      // Simulate successful room addition
      toast.success("Room added successfully (Demo Mode)!");
      setLoading(false);
      setInputs({
        roomType: "",
        pricePerNight: 0,
        amenities: {
          "Free WiFi": false,
          "Free Breakfast": false,
          "Room Service": false,
          "Mountain View": false,
          "Pool Access": false,
        },
      });
      setImages({
        1: null,
        2: null,
        3: null,
        4: null,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Amenity icons mapping
  const amenityIcons = {
    "Free WiFi": <FaWifi className="text-blue-500" />,
    "Free Breakfast": <FaUtensils className="text-amber-500" />,
    "Room Service": <FaConciergeBell className="text-emerald-500" />,
    "Mountain View": <FaMountain className="text-teal-500" />,
    "Pool Access": <FaSwimmingPool className="text-cyan-500" />,
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-float"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: ["#6366f1", "#8b5cf6", "#ec4899", "#3b82f6", "#10b981"][i % 5],
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl my-8">
        <form onSubmit={onSubmitHandler}>
          <Title
            align="left"
            font="outfit"
            title="Add Room"
            subTitle="Fill in the details carefully and accurate room details, pricing, and amenities to enhance the user booking experience"
          />

          {/* Upload area for images */}
          <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-indigo-100">
            <p className="text-indigo-800 font-medium mb-4 flex items-center gap-2">
              <FaUpload className="text-indigo-600" /> Room Images
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(images).map((key) => (
                <label 
                  htmlFor={`roomImage${key}`} 
                  key={key}
                  className="relative group cursor-pointer"
                >
                  <div className="h-40 w-full border-2 border-dashed border-indigo-300 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-indigo-500 group-hover:shadow-md">
                    {images[key] ? (
                      <img
                        className="h-full w-full object-cover"
                        src={URL.createObjectURL(images[key])}
                        alt={`Room preview ${key}`}
                      />
                    ) : (
                      <div className="flex flex-col items-center text-indigo-400">
                        <FaUpload className="text-2xl mb-2" />
                        <span className="text-sm">Upload Image</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Change</span>
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

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-indigo-800 font-medium mb-2 block">Room Type</label>
              <select
                value={inputs.roomType}
                onChange={(e) =>
                  setInputs({ ...inputs, roomType: e.target.value })
                }
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select Room Type</option>
                <option value="single">Single Bed</option>
                <option value="double">Double Bed</option>
                <option value="deluxe">Luxury Room</option>
                <option value="family">Family Suite</option>
              </select>
            </div>
            
            <div>
              <label className="text-indigo-800 font-medium mb-2 block">
                Price <span className="text-sm font-normal">/ Night</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-indigo-600">$</span>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full p-3 pl-8 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  value={inputs.pricePerNight}
                  onChange={(e) =>
                    setInputs({ ...inputs, pricePerNight: e.target.value })
                  }
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-indigo-100">
            <p className="text-indigo-800 font-medium mb-4">Amenities</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(inputs.amenities).map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <label className="relative flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id={`amenities${index + 1}`}
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
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full ${inputs.amenities[amenity] ? 'bg-indigo-500' : 'bg-gray-300'} transition-colors duration-300`}></div>
                    <div className={`absolute left-0.5 top-0.5 bg-white border rounded-full h-5 w-5 transition-transform duration-300 ${inputs.amenities[amenity] ? 'transform translate-x-5' : ''}`}></div>
                  </label>
                  <label
                    htmlFor={`amenities${index + 1}`}
                    className="ml-3 text-gray-700 flex items-center gap-2 cursor-pointer"
                  >
                    {amenityIcons[amenity]}
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Room...
              </>
            ) : "Add Room"}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AddRooms;