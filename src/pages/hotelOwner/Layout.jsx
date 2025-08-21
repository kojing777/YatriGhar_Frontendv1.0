// Layout.jsx
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import Navbar from "../../components/hotelOwner/Navbar";
import Sidebar from "../../components/hotelOwner/Sidebar";

const Layout = () => {
  const { isOwner, setIsOwner } = useAppContext();

  useEffect(() => {
    // In demo mode, automatically set user as owner when accessing /owner route
    if (!isOwner) {
      setIsOwner(true);
    }
  }, [isOwner, setIsOwner]);

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-80 h-80 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 pt-16 md:pt-10 md:px-6 p-4 h-full overflow-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-sm min-h-full">
            <Outlet />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Layout;