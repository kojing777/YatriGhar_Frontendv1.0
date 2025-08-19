import React, { useMemo, useState } from "react";
import { facilityIcons } from "../assets/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  HiFilter, 
  HiX, 
  HiHome, 
  HiCurrencyDollar, 
  HiSortAscending, 
  HiLocationMarker,
  HiOutlinePhotograph,
  HiStar,
  HiEye
} from "react-icons/hi";
import { 
  IoBedOutline, 
  IoWaterOutline, 
  IoWifi, 
  IoRestaurantOutline,
  IoCarSportOutline,
  IoFitnessOutline,
  IoAirplaneOutline
} from "react-icons/io5";
import { 
  GiFamilyHouse, 
  GiPriceTag,
  GiPapers
} from "react-icons/gi";
import { MdOutlineMeetingRoom, MdApartment, MdFamilyRestroom } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";

const FilterCheckbox = ({ label, selected = false, onChange = () => {}, icon: Icon }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer mt-3 text-sm hover:text-amber-600 transition-colors group">
      <input
        type="checkbox"
        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="select-none flex items-center gap-2">
        {Icon && <Icon className="text-amber-500 group-hover:text-amber-600 transition-colors" />}
        {label}
      </span>
    </label>
  );
};

const FilterRadio = ({ label, selected = false, onChange = () => {}, icon: Icon }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer mt-3 text-sm hover:text-amber-600 transition-colors group">
      <input
        type="radio"
        className="h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-500"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="select-none flex items-center gap-2">
        {Icon && <Icon className="text-amber-500 group-hover:text-amber-600 transition-colors" />}
        {label}
      </span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { rooms, currency } = useAppContext();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roomTypes: [],
    priceRange: "",
    sortBy: "",
  });
  const [selectedSort, setSelectedSort] = useState("");

  const roomTypes = [
    { label: "Single", icon: IoBedOutline },
    { label: "Double", icon: MdApartment },
    { label: "Deluxe", icon: HiStar },
    { label: "Family", icon: MdFamilyRestroom }
  ];
  
  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];
  
  const sortOptions = [
    { label: "Price Low to High", icon: GiPriceTag },
    { label: "Price High to Low", icon: HiCurrencyDollar },
    { label: "Newest First", icon: GiPapers }
  ];

  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: type === "roomTypes" 
        ? checked 
          ? [...prev[type], value] 
          : prev[type].filter(item => item !== value)
        : checked ? value : ""
    }));
  };

  const filteredRooms = useMemo(() => {
    if (!rooms?.length) return [];

    return rooms
      .filter(room => {
        const matchesRoomType = selectedFilters.roomTypes.length === 0 || 
          selectedFilters.roomTypes.some(type => 
            room.roomType?.toLowerCase().includes(type.toLowerCase())
          );
        
        const matchesPrice = !selectedFilters.priceRange || 
          (() => {
            const [min, max] = selectedFilters.priceRange.split(" to ").map(Number);
            return room.pricePerNight >= min && room.pricePerNight <= max;
          })();
        
        const matchesDestination = !searchParams.get("destination") || 
          room.hotel?.city?.toLowerCase().includes(
            searchParams.get("destination").toLowerCase()
          );
        
        return matchesRoomType && matchesPrice && matchesDestination;
      })
      .sort((a, b) => {
        if (selectedSort === "Price Low to High") return a.pricePerNight - b.pricePerNight;
        if (selectedSort === "Price High to Low") return b.pricePerNight - a.pricePerNight;
        if (selectedSort === "Newest First") return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
      });
  }, [rooms, selectedFilters, selectedSort, searchParams]);

  const clearFilters = () => {
    setSelectedFilters({
      roomTypes: [],
      priceRange: "",
      sortBy: "",
    });
    setSelectedSort("");
  };

  // Amenity icons mapping
  const amenityIcons = {
    "WiFi": IoWifi,
    "Swimming Pool": IoWaterOutline,
    "Air Conditioning": TbAirConditioning,
    "Restaurant": IoRestaurantOutline,
    "Parking": IoCarSportOutline,
    "Fitness Center": IoFitnessOutline,
    "Airport Shuttle": IoAirplaneOutline
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-60 -left-20 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-20 left-40 w-80 h-80 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 relative z-10">
        {/* Mobile filter dialog */}
        <div className="lg:hidden fixed inset-0 z-40 overflow-y-auto bg-black/25 backdrop-blur-sm transition-opacity"
          style={{ display: mobileFiltersOpen ? 'block' : 'none' }}
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <HiFilter className="text-amber-600" />
                Filters
              </h2>
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <HiX className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4 space-y-8">
              <div>
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <MdOutlineMeetingRoom className="text-amber-500" />
                  Room Type
                </h3>
                <div className="mt-2 space-y-1">
                  {roomTypes.map((type) => (
                    <FilterCheckbox
                      key={type.label}
                      label={type.label}
                      icon={type.icon}
                      selected={selectedFilters.roomTypes.includes(type.label)}
                      onChange={(checked) => handleFilterChange(checked, type.label, "roomTypes")}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <HiCurrencyDollar className="text-amber-500" />
                  Price Range
                </h3>
                <div className="mt-2 space-y-1">
                  {priceRanges.map((range) => (
                    <FilterCheckbox
                      key={range}
                      label={`${currency}${range}`}
                      icon={GiPriceTag}
                      selected={selectedFilters.priceRange === range}
                      onChange={(checked) => handleFilterChange(checked, range, "priceRange")}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <HiSortAscending className="text-amber-500" />
                  Sort By
                </h3>
                <div className="mt-2 space-y-1">
                  {sortOptions.map((option) => (
                    <FilterRadio
                      key={option.label}
                      label={option.label}
                      icon={option.icon}
                      selected={selectedSort === option.label}
                      onChange={setSelectedSort}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t px-4 py-3 flex justify-between">
              <button
                type="button"
                className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
                onClick={clearFilters}
              >
                <HiX className="h-4 w-4" />
                Clear all
              </button>
              <button
                type="button"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none transition-all hover:scale-105"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-30 transition-all hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <HiFilter className="text-amber-600" />
                  Filters
                </h2>
                <button
                  type="button"
                  className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
                  onClick={clearFilters}
                >
                  <HiX className="h-4 w-4" />
                  Clear all
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <MdOutlineMeetingRoom className="text-amber-500" />
                    Room Type
                  </h3>
                  <div className="mt-3 space-y-1">
                    {roomTypes.map((type) => (
                      <FilterCheckbox
                        key={type.label}
                        label={type.label}
                        icon={type.icon}
                        selected={selectedFilters.roomTypes.includes(type.label)}
                        onChange={(checked) => handleFilterChange(checked, type.label, "roomTypes")}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <HiCurrencyDollar className="text-amber-500" />
                    Price Range
                  </h3>
                  <div className="mt-3 space-y-1">
                    {priceRanges.map((range) => (
                      <FilterCheckbox
                        key={range}
                        label={`${currency}${range}`}
                        icon={GiPriceTag}
                        selected={selectedFilters.priceRange === range}
                        onChange={(checked) => handleFilterChange(checked, range, "priceRange")}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <HiSortAscending className="text-amber-500" />
                    Sort By
                  </h3>
                  <div className="mt-3 space-y-1">
                    {sortOptions.map((option) => (
                      <FilterRadio
                        key={option.label}
                        label={option.label}
                        icon={option.icon}
                        selected={selectedSort === option.label}
                        onChange={setSelectedSort}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            {/* Mobile filter bar */}
            <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between mb-6 bg-gradient-to-r from-amber-50 to-white p-4 rounded-xl shadow-sm -mx-4 -mt-4">
              <h1 className="font-playfair text-3xl md:text-4xl">Our Rooms</h1>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all hover:shadow-md"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <HiFilter className="h-5 w-5 text-amber-500" />
                Filters
              </button>
            </div>

            <div className="hidden lg:block">
              <h1 className="font-playfair text-4xl mb-2">Our Rooms</h1>
              <p className="text-gray-600 mb-6">
                Take advantage of our limited-time offers and special packages to
                enhance your stay and create unforgettable memories.
              </p>
            </div>

            {/* Results count */}
            <div className="mb-6 flex items-center justify-between bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-700 flex items-center gap-1">
                <HiOutlinePhotograph className="h-4 w-4" />
                Showing <span className="font-medium">{filteredRooms.length}</span> results
              </p>
              {selectedSort && (
                <p className="text-sm text-amber-700 flex items-center gap-1">
                  <HiSortAscending className="h-4 w-4" />
                  Sorted by: <span className="font-medium">{selectedSort}</span>
                </p>
              )}
            </div>

            {/* Rooms list */}
            {filteredRooms.length > 0 ? (
              <div className="space-y-8">
                {filteredRooms.map((room) => (
                  <div
                    key={room._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative group">
                        <img
                          src={room.images[0]}
                          alt={room.hotel?.name}
                          className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                          onClick={() => {
                            navigate(`/rooms/${room._id}`);
                            window.scrollTo(0, 0);
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <button className="bg-white/90 text-amber-600 p-2 rounded-full hover:bg-white transition-colors">
                            <HiEye className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-amber-600 flex items-center gap-1">
                              <HiLocationMarker className="h-4 w-4" />
                              {room.hotel?.city || "Unknown City"}
                            </p>
                            <h2
                              className="text-2xl font-playfair font-medium text-gray-900 cursor-pointer hover:text-amber-600 transition-colors flex items-center gap-2"
                              onClick={() => {
                                navigate(`/rooms/${room._id}`);
                                window.scrollTo(0, 0);
                              }}
                            >
                              <HiHome className="text-amber-500" />
                              {room.hotel?.name || "Unknown Hotel"}
                            </h2>
                            <div className="flex items-center mt-1">
                              <StarRating rating={room.rating} />
                              <span className="ml-2 text-sm text-gray-500">
                                {room.reviewCount || 200}+ reviews
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-medium text-amber-600 flex items-center justify-end gap-1">
                              <HiCurrencyDollar className="h-5 w-5" />
                              {room.pricePerNight}
                              <span className="text-sm font-normal text-gray-500">/night</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-500 mt-3 text-sm">
                          <HiLocationMarker className="h-4 w-4 text-gray-400" />
                          <span>{room.hotel?.address || "Unknown Address"}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {room.amenities?.slice(0, 4).map((amenity, index) => {
                            const IconComponent = amenityIcons[amenity] || GiFamilyHouse;
                            return (
                              <span
                                key={index}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs transition-all hover:bg-amber-100"
                              >
                                <IconComponent className="w-4 h-4" />
                                {amenity}
                              </span>
                            );
                          })}
                          {room.amenities?.length > 4 && (
                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs">
                              +{room.amenities.length - 4} more
                            </span>
                          )}
                        </div>

                        <div className="mt-6 flex justify-end">
                          <button
                            onClick={() => {
                              navigate(`/rooms/${room._id}`);
                              window.scrollTo(0, 0);
                            }}
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 flex items-center gap-2 transition-all hover:scale-105"
                          >
                            <HiEye className="h-4 w-4" />
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <HiOutlinePhotograph className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No rooms found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 flex items-center gap-2 mx-auto transition-all hover:scale-105"
                >
                  <HiX className="h-4 w-4" />
                  Clear all filters
                </button>
              </div>
            )}
          </main>
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

export default AllRooms;