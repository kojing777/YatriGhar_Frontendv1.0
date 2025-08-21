import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import Navbar from "../../components/hotelOwner/Navbar";
import Sidebar from "../../components/hotelOwner/Sidebar";

const Layout = () => {
  const { isOwner, setIsOwner } = useAppContext();

  useEffect(() => {
    if (!isOwner) {
      setIsOwner(true);
    }
  }, [isOwner, setIsOwner]);

  return (
    <div className="flex flex-col h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -left-20 w-96 h-96 bg-gradient-to-r from-amber-300 via-pink-300 to-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-96 h-96 bg-gradient-to-r from-green-300 via-teal-300 to-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Subtle Overlay Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.07] dark:opacity-[0.15] bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dots.png')]"></div>

      {/* Navbar */}
      <Navbar />

      {/* Sidebar + Main */}
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 pt-16 md:pt-10 md:px-6 p-4 h-full overflow-auto transition-all duration-300">
          <div className="relative bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl p-5 md:p-7 shadow-md min-h-full border border-white/30 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500">
            <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-indigo-400/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
            <Outlet />
          </div>
        </div>
      </div>

      {/* Blob Animations */}
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
          animation: blob 10s infinite;
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
