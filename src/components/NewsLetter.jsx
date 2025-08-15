import React, { useState } from "react";
import { 
  FaPaperPlane,
  FaCheckCircle,
  FaRegLightbulb,
  FaMapMarkedAlt,
  FaGift,
  FaRegCalendarAlt,
  FaQuoteLeft,
  FaChevronRight,
  FaRegSmileBeam
} from "react-icons/fa";
import { IoMdSend, IoIosRibbon } from "react-icons/io";
import { LiaBoxOpenSolid } from "react-icons/lia";
import { motion } from "framer-motion";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 1500);
  };

  return (
    <div className="relative overflow-hidden px-4 sm:px-6 md:px-16 lg:px-24 py-16 md:py-20 bg-white">
      {/* Decorative elements */}
      <div className="absolute top-20 left-4 sm:left-10 hidden lg:block animate-float">
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/20">
          <FaQuoteLeft className="text-amber-400 text-xl" />
        </div>
      </div>
      <div className="absolute bottom-20 right-4 sm:right-10 hidden lg:block animate-float-delay">
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/20">
          <FaRegSmileBeam className="text-amber-400 text-xl" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Title Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-4">
            <IoIosRibbon className="text-amber-500 text-2xl mr-2" />
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Stay Inspired!
              </span>
            </h2>
            <IoIosRibbon className="text-amber-500 text-2xl ml-2 transform rotate-180" />
          </div>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
            Join our newsletter for exclusive travel offers and inspiration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Subscription Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 transform hover:-translate-y-1"
          >
            {isSubscribed ? (
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-6 text-center">
                <FaCheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">You're In!</h3>
                <p className="text-green-700">
                  Thanks for subscribing! Check your email for exclusive offers.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-700 mb-2 flex items-center"
                  >
                    <IoMdSend className="mr-2 text-amber-500" />
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-gray-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
                    isLoading
                      ? "bg-amber-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                  } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-sm`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Subscribe Now
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Benefits Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-lg text-amber-600">
                  <LiaBoxOpenSolid className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Exclusive Home Stay Offers
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Unlock special discounts and early access to our best home
                    stay deals every month.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-lg text-amber-600">
                  <FaRegLightbulb className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Travel Tips & Inspiration
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Receive curated travel guides, destination highlights, and
                    tips for your next adventure.
                  </p>
                </div>
              </div>


            
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(-5px); }
          50% { transform: translateY(5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 6s ease-in-out infinite 1s;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default NewsLetter;