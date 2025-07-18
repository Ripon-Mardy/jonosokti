"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  User,
  Star,
  Loader2,
  Users,
  MapPin,
  Filter,
  X,
  Search,
  ChevronDown,
  Award,
  Clock,
  UsersRound,
  Shield,
} from "lucide-react";

import useOutsideClick from "@/hooks/useClickOutside";
import UsersCard from "@/components/UsersCard";
import NoDataFound from "@/components/NoDataFound/NoDataFound";

const page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ location: "" });
  const [filters, setFilters] = useState({
    location: "",
    category: "",
    rating: "",
    verified: false,
  });
  const [users, setUsers] = useState([]);
  console.log("users", users);
  const [filteredUsers, setFilteredUsers] = useState([]);
  console.log("filteredUsers", filteredUsers);
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  // API key
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Refs
  const locationRef = useRef(null);
  const filterRef = useRef(null);

  // Handle outside clicks
  useOutsideClick(locationRef, () => setFilteredLocation([]));
  useOutsideClick(filterRef, () => setShowMobileFilters(false));

  const getFilteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchLocation =
        !filters.location ||
        user?.address?.toLowerCase() === filters.location.toLowerCase();

      const matchCategory = !filters?.category || (Array.isArray(user?.category) && user?.category?.some((cat) => cat.toLowerCase() === filters.category.toLowerCase()))

      const matchRating =
        !filters.rating || Math.floor(user?.rating) >= parseInt(filters.rating);
      const matchVerified = !filters.verified || user.is_verified;

      return matchLocation && matchCategory && matchRating && matchVerified;
    });
  }, [users, filters]);

  useEffect(() => {
    setFilteredUsers(getFilteredUsers);
  }, [getFilteredUsers]);

  // Handle filter changes
  const handleFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? (type === "verified" ? false : "") : value,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      location: "",
      category: "",
      rating: "",
      verified: false,
    });
    setFormData({ location: "" });
    setSearchQuery("");
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [categoryRes, userRes, locationRes] = await Promise.all([
          fetch(`${apiKey}/category/categories`),
          fetch(`${apiKey}/user/all-users`),
          fetch(`https://bdapi.vercel.app/api/v.1/district`),
        ]);

        const categoryData = categoryRes.ok
          ? await categoryRes.json()
          : { data: [] };
        const userData = userRes.ok
          ? await userRes.json()
          : { data: { users: [] } };
        const locationData = locationRes.ok
          ? await locationRes.json()
          : { data: [] };

        setCategory(categoryData?.data || []);
        setUsers(userData?.data?.users || []);
        setLocation(locationData?.data || []);
      } catch (error) {
        setError("Failed to load data. Please try again.");
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

  // Handle location input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "location" && value.length > 0) {
      const filtered = location.filter((loc) =>
        loc.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocation(filtered.slice(0, 10)); // Limit suggestions
    } else {
      setFilteredLocation([]);
    }
  };

  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          className={`${
            i < fullStars
              ? "text-yellow-400 fill-current"
              : i === fullStars && hasHalfStar
              ? "text-yellow-400 fill-current opacity-50"
              : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
        <div className=" p-8 rounded-2xl shadow-xl flex flex-col items-center space-y-4">
          <Loader2 className="animate-spin text-blue-500" size={48} />
          {/* <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">Loading Experts</h3>
            <p className="text-gray-600">Finding the best professionals for you...</p>
          </div> */}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="xl:container xl:mx-auto px-4 pt-24 pb-20">


        {/* Header */}
        <div className="text-center mb-8 bg-headerBgColor rounded-md p-3 space-y-2 py-5 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <Award className="text-yellow-300" size={28} />
            <h1 className="text-base md:text-xl font-bold text-white">
              Hire Expert Professionals
            </h1>
          </div>

          <p className="text-white text-sm max-w-2xl mx-auto">
            Connect with verified professionals in your area. Quality service
            guaranteed.
          </p>

        </div>

        {/* Search and Sort Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search experts, categories, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 text-sm py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl text-sm px-4 py-3 pr-10 focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer w-full"
              >
                <option value="rating">Sort by Rating</option>
                <option value="name">Sort by Name</option>
                <option value="experience">Sort by Experience</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center justify-between gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <span className="flex items-center gap-1">
                <Filter size={20} />
                Filters
              </span>
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Active Filters */}
          {(filters.location ||
            filters.category ||
            filters.rating ||
            filters.verified ||
            searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-600 font-medium">
                Active filters:
              </span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Search: {searchQuery}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => setSearchQuery("")}
                  />
                </span>
              )}
              {filters.location && (
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {filters.location}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => handleFilter("location", "")}
                  />
                </span>
              )}
              {filters.category && (
                <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {filters.category}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => handleFilter("category", "")}
                  />
                </span>
              )}
              {filters.rating && (
                <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  {filters.rating}+ Stars
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => handleFilter("rating", "")}
                  />
                </span>
              )}
              {filters.verified && (
                <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                  Verified Only
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => handleFilter("verified", false)}
                  />
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium underline"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        <div className="flex items-start justify-center gap-4">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block lg:col-span-3">
            <div
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-20 space-y-6"
              ref={locationRef}
            >
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <Filter className="text-blue-600" size={20} />
                <h3 className="font-semibold text-gray-800">Filters</h3>
              </div>

              {/* Location Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    onChange={handleInputChange}
                    name="location"
                    type="text"
                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter location"
                    value={formData.location}
                  />
                  {/* Location Suggestions */}
                  {filteredLocation.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg z-50 max-h-48 overflow-y-auto">
                      {filteredLocation.map((loc, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                          onClick={() => {
                            setFormData({ ...formData, location: loc.name });
                            setFilteredLocation([]);
                            handleFilter("location", loc.name);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-gray-400" />
                            <span className="text-sm">{loc.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-paraColor"
                  onChange={(e) => handleFilter("category", e.target.value)}
                  value={filters.category}
                >
                  <option value="">All Categories</option>
                  {category?.map((cate, index) => (
                    <option key={index} value={cate?.name}>
                      {cate?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Minimum Rating
                </label>
                <select
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-paraColor"
                  onChange={(e) => handleFilter("rating", e.target.value)}
                  value={filters.rating}
                >
                  <option value="">Any Rating</option>
                  {[4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}+ Stars
                    </option>
                  ))}
                </select>
              </div>

              {/* Verification Filter */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => handleFilter("verified", e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Verified Professionals
                  </span>
                  <Shield className="text-blue-600" size={16} />
                </label>
              </div>


            </div>
          </div>



          {/* Mobile Filters Modal */}
          {showMobileFilters && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
              <div
                className="bg-white w-full max-h-[80vh] overflow-y-auto rounded-t-2xl"
                ref={filterRef}
              >
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Mobile filter content - same as desktop but in modal */}
                  <div className="space-y-6">
                    {/* Location Filter */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <input
                          onChange={handleInputChange}
                          name="location"
                          type="text"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                          placeholder="Enter location"
                          value={formData.location}
                        />
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-paraColor"
                        onChange={(e) =>
                          handleFilter("category", e.target.value)
                        }
                        value={filters.category}
                      >
                        <option value="">All Categories</option>
                        {category?.map((cate, index) => (
                          <option key={index} value={cate?.name}>
                            {cate?.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Rating Filter */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">
                        Minimum Rating
                      </label>
                      <select
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-paraColor"
                        onChange={(e) => handleFilter("rating", e.target.value)}
                        value={filters.rating}
                      >
                        <option value="">Any Rating</option>
                        {[4, 3, 2, 1].map((rating) => (
                          <option key={rating} value={rating}>
                            {rating}+ Stars
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Verification Filter */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.verified}
                          onChange={(e) =>
                            handleFilter("verified", e.target.checked)
                          }
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Verified Professionals
                        </span>
                        <Shield className="text-blue-600" size={16} />
                      </label>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={() => setShowMobileFilters(false)}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Experts Grid */}
          <div className="w-full">
            {filteredUsers && filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {filteredUsers.map((user, index) => (
                  <UsersCard key={index} userId={user?._id}  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <NoDataFound icon={<UsersRound />} text={'No Experts Found'} subText={' Try adjusting your search or filters to find the right professionals.'} />
              </div>
            )}
          </div>




        </div>
      </div>
    </div>
  );
};

export default page;
