import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/clerk-react";
import logo from "../assets/yatri.png";
import { IoSearch } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-amber-400"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openSignIn } = useClerk();
  const location = useLocation();
  const { user, navigate, isOwner, setShowHotelReg } = useAppContext();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }

    setIsScrolled((prev) => (location.pathname !== "/" ? true : prev));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
  className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 h-[64px] md:h-[80px] ${
    isScrolled
      ? "bg-slate-900/20 shadow-md text-white backdrop-blur-lg"
      : "text-white"
  }`}
>

      {/* Logo */}
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className={`w-35 max-h-full object-contain transition-all duration-300 ${
            isScrolled ? "brightness-100" : "brightness-150"
          }`}
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6 font-semibold">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className="relative group transition-colors duration-300 hover:text-amber-400"
          >
            {link.name}
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        ))}

        {user && (
          <button
            onClick={() =>
              isOwner ? navigate("/owner") : setShowHotelReg(true)
            }
            className="border border-amber-400 px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all duration-300 hover:bg-amber-400 hover:text-slate-900"
          >
            {isOwner ? "Dashboard" : "List your hotel"}
          </button>
        )}

        {/* Demo Mode */}
        <button
          onClick={() => navigate("/owner")}
          className="border  px-4 py-1.5 text-sm font-light rounded-full cursor-pointer bg-slate-50 text-slate-500 hover:bg-amber-300 transition-all duration-300"
          title="Demo: Access Owner Dashboard"
        >
          Demo Dashboard
        </button>
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-3">
        <IoSearch
          className={`h-6 w-6 transition-colors duration-300 ${
            isScrolled ? "text-amber-400" : "text-white"
          }`}
        />

        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="bg-amber-400 text-slate-900 px-6 py-2.5 rounded-full ml-4 transition-all duration-300 hover:bg-amber-500"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        {user && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={assets.menuIcon}
          alt="menu"
          className={`h-5 transition-colors duration-300 ${
            isScrolled ? "invert" : ""
          }`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-slate-900 text-white flex flex-col md:hidden items-center justify-center gap-6 font-medium text-lg transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="closemenu" className="h-6" />
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-amber-400 transition-colors duration-300"
          >
            {link.name}
          </Link>
        ))}

        {user && (
          <button
            onClick={() =>
              isOwner ? navigate("/owner") : setShowHotelReg(true)
            }
            className="border border-amber-400 px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all duration-300 hover:bg-amber-400 hover:text-slate-900"
          >
            {isOwner ? "Dashboard" : "List your hotel"}
          </button>
        )}

        <button
          onClick={() => {
            navigate("/owner");
            setIsMenuOpen(false);
          }}
          className="border border-amber-500 px-4 py-1 text-sm font-light rounded-full cursor-pointer bg-amber-500 text-slate-900 hover:bg-amber-600 transition-all duration-300"
        >
          Demo Dashboard
        </button>

        {!user && (
          <button
            onClick={openSignIn}
            className="bg-amber-400 text-slate-900 px-8 py-2.5 rounded-full transition-all duration-300 hover:bg-amber-500"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
