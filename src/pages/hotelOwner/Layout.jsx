import Navbar from "../../components/hotelOwner/Navbar";
import Sidebar from "../../components/hotelOwner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

const Layout = () => {
  const { isOwner, setIsOwner } = useAppContext();

  useEffect(() => {
    // In demo mode, automatically set user as owner when accessing /owner route
    if (!isOwner) {
      setIsOwner(true);
    }
  }, [isOwner, setIsOwner]);

  return (
    
  );
};

export default Layout;
