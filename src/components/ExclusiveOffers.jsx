import React, { useState, useEffect } from "react";
import Title from "./Title";
import { exclusiveOffers } from "../assets/assets";
import { FaChevronRight, FaRegClock, FaTag } from "react-icons/fa";
import { motion } from "framer-motion";

const ExclusiveOffers = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const backgrounds = [
    "linear-gradient(135deg, rgba(253,230,138,0.1) 0%, rgba(254,243,199,0.05) 100%)",
    "linear-gradient(135deg, rgba(254,215,170,0.1) 0%, rgba(255,237,213,0.05) 100%)",
    "linear-gradient(135deg, rgba(252,165,165,0.1) 0%, rgba(254,226,226,0.05) 100%)"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic countdown with seconds
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3); // 3 days from now

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden px-6 md:px-16 lg:px-24 py-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {backgrounds.map((bg, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 transition-all duration-1000"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentBg === index ? 0.2 : 0, background: bg }}
            transition={{ duration: 2 }}
          />
        ))}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 hidden lg:block animate-float">
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/20">
          <FaTag className="text-amber-400 text-xl" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Title
              align="left"
              title="Exclusive Offers"
              subTitle="Special deals curated just for you"
            />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group flex items-center gap-2 font-medium cursor-pointer mt-6 md:mt-0 px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg shadow-md transition-all"
          >
            View All Offers
            <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Offers Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {exclusiveOffers.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col items-start justify-between gap-4 p-6 rounded-xl text-white bg-no-repeat bg-cover bg-center overflow-hidden shadow-lg hover:shadow-xl transition-all min-h-[300px]"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all"></div>
              <div className="relative">
                <span className="px-4 py-1 bg-white text-amber-600 font-bold rounded-full text-sm shadow-md">
                  {item.priceOff}% OFF
                </span>
              </div>

              <div className="relative mt-auto">
                <h3 className="text-2xl font-bold font-playfair mb-2">{item.title}</h3>
                <p className="text-white/90 mb-4">{item.description}</p>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <FaRegClock />
                  <span>Expires {item.expiryDate}</span>
                </div>
              </div>

              <button className="relative flex items-center gap-2 font-medium cursor-pointer mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all border border-white/30">
                View Offer
                <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Dynamic Countdown Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold font-playfair mb-1">Limited Time Offers</h3>
              <p className="text-white/90">Book now before these deals expire!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.days}</div>
                <div className="text-xs">Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                <div className="text-xs">Seconds</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ExclusiveOffers;
