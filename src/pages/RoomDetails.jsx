import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { 
  FaCalendarAlt, 
  FaUserFriends, 
  FaMapMarkerAlt, 
  FaStar,
  FaPhone,
  FaQuoteLeft
} from "react-icons/fa";
import { IoIosRibbon } from "react-icons/io";
import { motion } from "framer-motion";

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, navigate } = useAppContext();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  const checkAvailability = async () => {
    try {
      if (!checkInDate || !checkOutDate) {
        toast.error("Please select both check-in and check-out dates");
        return;
      }
      if (checkInDate > checkOutDate) {
        toast.error("Check-in date should be before check-out date");
        return;
      }
      
      const available = Math.random() > 0.3;
      if (available) {
        setIsAvailable(true);
        toast.success("Room is available (Demo Mode)");
      } else {
        setIsAvailable(false);
        toast.error("Room is not available (Demo Mode)");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!isAvailable) {
        return checkAvailability();
      } else {
        toast.success("Room booked successfully (Demo Mode)");
        navigate("/my-bookings");
        scrollTo(0, 0);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const room = rooms.find((room) => room._id === id);
    room && setRoom(room);
    room && setMainImage(room.images[0]);
  }, [rooms, id]);

  if (!room) {
    return (
      <div className="text-center mt-20 text-red-500">Room not found.</div>
    );
  }

  return (
    room && (
      <div className="py-20 px-4 sm:px-6 md:px-16 lg:px-24 bg-slate-50">
        {/* Decorative elements */}
        <div className="absolute top-20 left-4 sm:left-10 hidden lg:block animate-float">
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/20">
            <FaQuoteLeft className="text-amber-400 text-xl" />
          </div>
        </div>

        {/* Room header */}
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
            <div className="inline-flex items-center">
              <IoIosRibbon className="text-amber-500 text-2xl mr-2" />
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800">
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  {room.hotel?.name || "Luxury Stay"}
                </span>
              </h1>
              <IoIosRibbon className="text-amber-500 text-2xl ml-2 transform rotate-180" />
            </div>
            <span className="bg-amber-500 text-white text-sm font-medium px-3 py-1 rounded-full">
              {room.roomType}
            </span>
          </div>

          {/* Rating and location */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <div className="flex items-center">
              <StarRating rating={4.5} />
              <span className="ml-2 text-gray-700">200+ reviews</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="text-amber-500 mr-1" />
              <span>{room.hotel?.address || "Prime Location"}</span>
            </div>
          </div>

          {/* Image gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="overflow-hidden rounded-xl shadow-lg"
              >
                <img
                  src={mainImage}
                  alt="Main room view"
                  className="w-full h-full object-cover aspect-video"
                />
              </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {room.images.slice(0, 4).map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className={`cursor-pointer overflow-hidden rounded-xl shadow-md ${
                    mainImage === image ? "ring-2 ring-amber-500" : ""
                  }`}
                  onClick={() => setMainImage(image)}
                >
                  <img
                    src={image}
                    alt={`Room view ${index + 1}`}
                    className="w-full h-full object-cover aspect-square"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Room details and amenities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <div className="lg:col-span-2">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Experience Luxury Like Never Before
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {room.amenities.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100"
                  >
                    <img
                      src={facilityIcons[item]}
                      alt={item}
                      className="h-5 w-5 text-amber-500"
                    />
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Description */}
              <div className="mt-10 border-t border-gray-200 pt-8">
                <h3 className="font-playfair text-xl font-bold text-gray-800 mb-4">
                  About This Room
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Guests will be allocated on the ground floor according to availability. 
                  You get a comfortable bedroom apartment with a true city feeling. 
                  The price quoted is for two guests. Please mark the number of guests 
                  to get the exact price for groups.
                </p>
              </div>
            </div>

            {/* Booking card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-fit sticky top-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-playfair text-xl font-bold text-gray-800">
                  ${room.pricePerNight}
                  <span className="text-gray-500 font-normal text-sm"> / night</span>
                </h3>
                <div className="flex items-center text-amber-500">
                  <FaStar className="mr-1" />
                  <span>4.8</span>
                </div>
              </div>

              <form onSubmit={onSubmitHandler} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="date"
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="date"
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate}
                        disabled={!checkInDate}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <div className="relative">
                    <FaUserFriends className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      min="1"
                      max="10"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                    isAvailable
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                      : "bg-gray-800 hover:bg-gray-900"
                  } text-white shadow-md`}
                >
                  {isAvailable ? "Book Now" : "Check Availability"}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Room specifications */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {roomCommonData.map((spec, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <div className="p-3 bg-amber-100 rounded-lg text-amber-600">
                  <img src={spec.icon} alt={spec.title} className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{spec.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{spec.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Host information */}
          <div className="mt-20 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img
                src={room.hotel?.owner?.image || assets.userIcon}
                alt="Host"
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-400"
              />
              <div>
                <h3 className="font-playfair text-xl font-bold text-gray-800">
                  Hosted by {room.hotel?.owner?.name || "Professional Host"}
                </h3>
                <div className="flex items-center mt-2">
                  <StarRating rating={4.8} />
                  <span className="ml-2 text-gray-600">200+ reviews</span>
                </div>
                <p className="text-gray-600 mt-2">
                  Superhost with 5 years of experience providing exceptional stays
                </p>
              </div>
              <button className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors mt-4 sm:mt-0">
                <FaPhone />
                Contact Host
              </button>
            </div>
          </div>
        </div>

        {/* Custom Animation Styles */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </div>
    )
  );
};

export default RoomDetails;