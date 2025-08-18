import React, { useMemo, useState } from "react";
import { facilityIcons } from "../assets/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiFilter, HiX } from "react-icons/hi";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";

const FilterCheckbox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer mt-3 text-sm hover:text-amber-600 transition-colors">
      <input
        type="checkbox"
        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="select-none">{label}</span>
    </label>
  );
};

const FilterRadio = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer mt-3 text-sm hover:text-amber-600 transition-colors">
      <input
        type="radio"
        className="h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-500"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="select-none">{label}</span>
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

  const roomTypes = ["Single", "Double", "Deluxe", "Family"];
  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];
  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
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

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Mobile filter dialog */}
        <div className="lg:hidden fixed inset-0 z-40 overflow-y-auto bg-black/25 backdrop-blur-sm transition-opacity"
          style={{ display: mobileFiltersOpen ? 'block' : 'none' }}
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
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
                <h3 className="font-medium text-gray-900">Room Type</h3>
                <div className="mt-2 space-y-1">
                  {roomTypes.map((type) => (
                    <FilterCheckbox
                      key={type}
                      label={type}
                      selected={selectedFilters.roomTypes.includes(type)}
                      onChange={(checked) => handleFilterChange(checked, type, "roomTypes")}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Price Range</h3>
                <div className="mt-2 space-y-1">
                  {priceRanges.map((range) => (
                    <FilterCheckbox
                      key={range}
                      label={`${currency}${range}`}
                      selected={selectedFilters.priceRange === range}
                      onChange={(checked) => handleFilterChange(checked, range, "priceRange")}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Sort By</h3>
                <div className="mt-2 space-y-1">
                  {sortOptions.map((option) => (
                    <FilterRadio
                      key={option}
                      label={option}
                      selected={selectedSort === option}
                      onChange={setSelectedSort}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t px-4 py-3 flex justify-between">
              <button
                type="button"
                className="text-sm font-medium text-amber-600 hover:text-amber-700"
                onClick={clearFilters}
              >
                Clear all
              </button>
              <button
                type="button"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="text-sm font-medium text-amber-600 hover:text-amber-700"
                  onClick={clearFilters}
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="font-medium text-gray-900">Room Type</h3>
                  <div className="mt-3 space-y-1">
                    {roomTypes.map((type) => (
                      <FilterCheckbox
                        key={type}
                        label={type}
                        selected={selectedFilters.roomTypes.includes(type)}
                        onChange={(checked) => handleFilterChange(checked, type, "roomTypes")}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Price Range</h3>
                  <div className="mt-3 space-y-1">
                    {priceRanges.map((range) => (
                      <FilterCheckbox
                        key={range}
                        label={`${currency}${range}`}
                        selected={selectedFilters.priceRange === range}
                        onChange={(checked) => handleFilterChange(checked, range, "priceRange")}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Sort By</h3>
                  <div className="mt-3 space-y-1">
                    {sortOptions.map((option) => (
                      <FilterRadio
                        key={option}
                        label={option}
                        selected={selectedSort === option}
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
            <div className="lg:hidden sticky top-0 flex items-center justify-between mb-6">
              <h1 className="font-playfair text-3xl md:text-4xl">Our Rooms</h1>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <HiFilter className="h-5 w-5 text-gray-500" />
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
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium">{filteredRooms.length}</span> results
              </p>
              {selectedSort && (
                <p className="text-sm text-gray-500">
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
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                          src={room.images[0]}
                          alt={room.hotel?.name}
                          className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => {
                            navigate(`/rooms/${room._id}`);
                            window.scrollTo(0, 0);
                          }}
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-amber-600">
                              {room.hotel?.city || "Unknown City"}
                            </p>
                            <h2
                              className="text-2xl font-playfair font-medium text-gray-900 cursor-pointer hover:text-amber-600 transition-colors"
                              onClick={() => {
                                navigate(`/rooms/${room._id}`);
                                window.scrollTo(0, 0);
                              }}
                            >
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
                            <p className="text-xl font-medium text-amber-600">
                              {currency}{room.pricePerNight}
                              <span className="text-sm font-normal text-gray-500">/night</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-500 mt-3 text-sm">
                       
                          <span>{room.hotel?.address || "Unknown Address"}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {room.amenities?.slice(0, 4).map((amenity, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs"
                            >
                              <img src={facilityIcons[amenity]} alt={amenity} className="w-4 h-4" />
                              {amenity}
                            </span>
                          ))}
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
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                          >
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
                <h3 className="text-lg font-medium text-gray-900">No rooms found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;