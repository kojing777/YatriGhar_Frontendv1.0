// Dashboard.jsx
import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import { assets, dashboardDummyData } from "../../assets/assets";
import { 
  HiUsers, 
  HiCurrencyDollar, 
  HiCalendar, 
  HiCheckCircle, 
  HiClock,
  HiTrendingUp,
  HiStar,
  HiLocationMarker
} from "react-icons/hi";
import { 
  IoBedOutline, 
  IoReceiptOutline,
  IoSpeedometerOutline
} from "react-icons/io5";

const Dashboard = () => {
  const { currency } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    bookings: [],
  });

  useEffect(() => {
    const fetchDashboardData = () => {
      // Using static dummy data instead of backend call
      console.log('Loading dashboard data:', dashboardDummyData);
      setDashboardData(dashboardDummyData);
    };

    // Load dashboard data immediately in demo mode
    fetchDashboardData();
  }, []);

  return (
    <div className="animate-fade-in">
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {/* Total Bookings Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <HiUsers className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex flex-col ml-4">
              <p className="text-blue-500 text-sm">Total Bookings</p>
              <p className="text-neutral-700 text-xl font-semibold">
                {dashboardData.totalBookings}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-green-600">
            <HiTrendingUp className="h-4 w-4 mr-1" />
            <span>+12% from last month</span>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <HiCurrencyDollar className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex flex-col ml-4">
              <p className="text-green-500 text-sm">Total Revenue</p>
              <p className="text-neutral-700 text-xl font-semibold">
                {currency} {dashboardData.totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-green-600">
            <HiTrendingUp className="h-4 w-4 mr-1" />
            <span>+8% from last month</span>
          </div>
        </div>

        {/* Occupancy Rate Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center">
            <div className="bg-amber-100 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <IoSpeedometerOutline className="h-6 w-6 text-amber-600" />
            </div>
            <div className="flex flex-col ml-4">
              <p className="text-amber-500 text-sm">Occupancy Rate</p>
              <p className="text-neutral-700 text-xl font-semibold">
                78%
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-green-600">
            <HiTrendingUp className="h-4 w-4 mr-1" />
            <span>+5% from last month</span>
          </div>
        </div>

        {/* Average Rating Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <HiStar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex flex-col ml-4">
              <p className="text-purple-500 text-sm">Average Rating</p>
              <p className="text-neutral-700 text-xl font-semibold">
                4.7/5
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-green-600">
            <HiTrendingUp className="h-4 w-4 mr-1" />
            <span>+0.2 from last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-blue-950/70 text-xl font-medium flex items-center">
              <HiCalendar className="mr-2 text-amber-500" />
              Recent Bookings
            </h2>
            <button className="text-sm text-amber-600 hover:text-amber-700 transition-colors">
              View all
            </button>
          </div>
          
          <div className="w-full text-left rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-gray-600 font-medium text-sm text-left">
                    Guest
                  </th>
                  <th className="py-3 px-4 text-gray-600 font-medium text-sm text-left max-md:hidden">
                    Room
                  </th>
                  <th className="py-3 px-4 text-gray-600 font-medium text-sm text-right">
                    Amount
                  </th>
                  <th className="py-3 px-4 text-gray-600 font-medium text-sm text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {dashboardData.bookings.map((item, index) => (
                  <tr key={index} className="hover:bg-amber-50/50 transition-colors">
                    <td className="py-3 px-4 text-gray-700 text-left">
                      <div className="font-medium">{item.user.username}</div>
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <HiLocationMarker className="h-3 w-3 mr-1" />
                        {item.user.country}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700 text-left max-md:hidden">
                      <div className="flex items-center">
                        <IoBedOutline className="h-4 w-4 mr-1 text-amber-500" />
                        {item.room.roomType}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700 text-right font-medium">
                      {currency} {item.totalPrice}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div
                        className={`inline-flex items-center py-1 px-3 rounded-full text-xs ${
                          item.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.isPaid ? (
                          <>
                            <HiCheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </>
                        ) : (
                          <>
                            <HiClock className="h-3 w-3 mr-1" />
                            Pending
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-blue-950/70 text-xl font-medium mb-5 flex items-center">
            <IoSpeedometerOutline className="mr-2 text-amber-500" />
            Quick Stats
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-md">
                  <HiUsers className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Check-ins Today</p>
                  <p className="font-semibold">12</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-md">
                  <IoReceiptOutline className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Check-outs Today</p>
                  <p className="font-semibold">8</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-md">
                  <IoBedOutline className="h-5 w-5 text-amber-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Available Rooms</p>
                  <p className="font-semibold">24</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-md">
                  <HiCurrencyDollar className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="font-semibold">{currency} 24,580</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;