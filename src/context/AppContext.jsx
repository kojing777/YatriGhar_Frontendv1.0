import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { roomsDummyData } from "../assets/assets";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState(["Kathmandu", "Pokhara"]); // Default cities for demo
  const [rooms, setRooms] = useState(roomsDummyData);

  // Listen for route changes to update owner status
  useEffect(() => {
    if (location.pathname.startsWith('/owner')) {
      setIsOwner(true);
    }
  }, [location.pathname]);

  // Removed all backend API calls - using static dummy data
  const fetchRooms = () => {
    // Using static dummy data instead of backend call
    setRooms(roomsDummyData);
  };

  const fetchUser = () => {
    // Using static data instead of backend call
    // In demo mode, check if user should be owner based on current URL
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/owner')) {
      setIsOwner(true);
    } else {
      setIsOwner(false); // Default to false for regular users
    }
    setSearchedCities([]);
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    fetchRooms();  
  }, []);

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    fetchUser,
    searchedCities,
    setSearchedCities,
    rooms,
    setRooms
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
