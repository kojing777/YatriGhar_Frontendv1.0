import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import { roomsDummyData } from "../../assets/assets";
import toast from "react-hot-toast";
import { 
  FaBed, 
  FaWifi, 
  FaParking, 
  FaUtensils, 
  FaSnowflake, 
  FaTv, 
  FaShower, 
  FaCocktail,
  FaEdit,
  FaEye,
  FaToggleOn,
  FaToggleOff
} from "react-icons/fa";

const ListRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(null);
  const { currency } = useAppContext();

  // Amenity icons mapping
  const amenityIcons = {
    wifi: <FaWifi className="text-blue-500" />,
    parking: <FaParking className="text-green-500" />,
    breakfast: <FaUtensils className="text-yellow-500" />,
    ac: <FaSnowflake className="text-teal-500" />,
    tv: <FaTv className="text-purple-500" />,
    shower: <FaShower className="text-pink-500" />,
    bar: <FaCocktail className="text-red-500" />,
  };

  const fetchRooms = () => {
    setLoading(true);
    setTimeout(() => {
      setRooms(roomsDummyData);
      setLoading(false);
    }, 800);
  };

  const toggleAvailability = async (roomId) => {
    setToggleLoading(roomId);
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room._id === roomId ? { ...room, isAvailable: !room.isAvailable } : room
      )
    );
    
    setTimeout(() => {
      toast.success("Room availability updated");
      setToggleLoading(null);
    }, 1000);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Skeleton loader component
  const RoomSkeleton = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-6 w-6 bg-gray-300 rounded-full"></div>
          ))}
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-10 bg-gray-300 rounded w-24"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-10">
      <Title
        align="left"
        font="outfit"
        title="Room Management"
        subTitle="Manage your room inventory, update availability, and edit room details to maximize bookings."
      />
      
      <div className="mt-8 mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">All Rooms</h2>
        <span className="text-sm text-gray-500">
          {rooms.length} {rooms.length === 1 ? 'Room' : 'Rooms'}
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <RoomSkeleton key={n} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={room.image || "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"} 
                  alt={room.roomType}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${room.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {room.isAvailable ? 'Available' : 'Unavailable'}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{room.roomType}</h3>
                  <span className="text-2xl font-bold text-blue-600">{currency} {room.pricePerNight}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">/{room.capacity} {room.capacity > 1 ? 'guests' : 'guest'}</p>
                
                <div className="flex flex-wrap gap-3 mb-5">
                  {room.amenities.slice(0, 5).map((amenity, index) => (
                    <div key={index} className="flex items-center gap-1 text-sm">
                      {amenityIcons[amenity.toLowerCase().replace(/\s+/g, '')] || <FaBed className="text-gray-500" />}
                      <span className="text-gray-600 hidden sm:inline">{amenity}</span>
                    </div>
                  ))}
                  {room.amenities.length > 5 && (
                    <span className="text-xs text-gray-500">+{room.amenities.length - 5} more</span>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                      <FaEdit />
                    </button>
                    <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                      <FaEye />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => toggleAvailability(room._id)}
                    disabled={toggleLoading === room._id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${room.isAvailable ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'} transition-colors disabled:opacity-50`}
                  >
                    {toggleLoading === room._id ? (
                      <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin"></div>
                    ) : room.isAvailable ? (
                      <FaToggleOn className="text-lg" />
                    ) : (
                      <FaToggleOff className="text-lg" />
                    )}
                    <span className="hidden sm:inline">
                      {room.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && rooms.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow">
          <FaBed className="mx-auto text-4xl text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-600">No rooms listed yet</h3>
          <p className="text-gray-500 mt-2">Get started by adding your first room to your property</p>
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Room
          </button>
        </div>
      )}
    </div>
  );
};

export default ListRooms;