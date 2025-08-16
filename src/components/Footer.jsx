import logo from "../assets/yatri.png";
import { assets } from "../assets/assets";
import { BsInstagram } from "react-icons/bs";
import { FaSquareFacebook, FaXTwitter, FaTiktok } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="relative text-gray-800 pt-10 bg-slate-100 px-6 md:px-16 lg:px-24 xl:px-32 ">
      {/* Subtle background Himalaya pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/1e/Himalayas_silhouette.png')] bg-bottom bg-contain bg-no-repeat"></div>

      {/* Main Footer */}
      <div className="relative flex flex-wrap justify-between gap-12 md:gap-6 animate-fadeIn">
        {/* Brand & About */}
        <div className="max-w-80">
          <img src={logo} alt="logo" className="mb-4 h-16 md:h-14" />
          <p className="text-sm leading-relaxed">
            Discover comfort and warmth across Nepal — from charming homestays
            to luxury resorts. Book your perfect stay with{" "}
            <span className="font-semibold text-amber-700">YatriGhar</span>.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-5">
            <BsInstagram className="h-6 w-6 hover:text-[#E4405F] transition-transform duration-200 hover:scale-110 cursor-pointer" />
            <FaSquareFacebook className="h-6 w-6 hover:text-[#1877F2] transition-transform duration-200 hover:scale-110 cursor-pointer" />
            <FaTiktok className="h-5 w-5 hover:text-black transition-transform duration-200 hover:scale-110 cursor-pointer" />
            <FaXTwitter className="h-5 w-5 hover:text-black transition-transform duration-200 hover:scale-110 cursor-pointer" />
          </div>
        </div>

        {/* Company Links */}
        <div>
          <p className="font-playfair text-lg text-gray-900 font-semibold">Company</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {["About", "Careers", "Press", "Blog", "Partners"].map((item, i) => (
              <li key={i}>
                <Link
                  to="#"
                  className="hover:text-amber-700 transition-colors duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <p className="text-lg font-playfair text-gray-900 font-semibold">Support</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {[
              "Help Center",
              "Safety Information",
              "Cancellation Options",
              "Contact Us",
              "Accessibility",
            ].map((item, i) => (
              <li key={i}>
                <Link
                  to="#"
                  className="hover:text-amber-700 transition-colors duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="max-w-80">
          <p className="text-lg font-playfair text-gray-900 font-semibold">Stay Updated</p>
          <p className="mt-3 text-sm leading-relaxed">
            Subscribe for <span className="text-amber-700 font-semibold">travel deals</span>,
            tips, and exclusive offers right in your inbox.
          </p>
          <div className="flex items-center mt-4">
            <input
              type="email"
              className="bg-white rounded-l-md border border-gray-300 h-10 px-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 transition-all w-full"
              placeholder="Enter your email"
            />
            <button className="flex items-center justify-center bg-amber-700 hover:bg-amber-800 transition-all h-10 w-10 aspect-square rounded-r-md shadow-md">
              <img
                src={assets.arrowIcon}
                alt="Arrow Icon"
                className="w-4 invert"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 mt-10 relative z-10" />

      {/* Bottom row */}
      <div className="relative flex flex-col md:flex-row gap-2 items-center justify-between py-6 text-sm animate-fadeIn delay-200">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-amber-700">YatriGhar</span>. All rights reserved.
        </p>
        <ul className="flex items-center gap-4">
          {["Privacy", "Terms", "Sitemap"].map((item, i) => (
            <li key={i}>
              <Link
                to="#"
                className="hover:text-amber-700 transition-colors duration-200"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
          .delay-200 { animation-delay: 0.2s; }
        `}
      </style>
    </div>
  );
};

export default Footer;
