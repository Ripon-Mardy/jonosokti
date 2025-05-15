"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import imageMark from "../public/images/mark_curv.svg";
import { FaAddressCard, FaSearch } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { motion } from "framer-motion";

const Banner = () => {
  const [formData, setFormData] = useState({
    address: "",
    category: "",
    city: "",
  }); // Form data state
  const [category, setCategory] = useState([]); // Fetch category from API
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Refs for dropdown containers
  const categoryDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const categoryInputRef = useRef(null);
  const locationInputRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  // Handle input change function
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "category") {
      if (value.trim() === "") {
        setFilteredCategory([]);
      } else {
        const filtered = category.filter((cate) =>
          cate.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCategory(filtered);
      }
    } else if (name === "city") {
      if (value.trim() === "") {
        setFilteredLocations([]);
      } else {
        const filtered = location.filter((loc) =>
          loc.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredLocations(filtered);
      }
    }
  }, [category, location]);

  // Handle category selection
  const handleCategorySelect = useCallback((selectedCategory) => {
    setFormData((prev) => ({
      ...prev,
      category: selectedCategory,
    }));
    setFilteredCategory([]);
  }, []);

  // Handle location selection
  const handleLocationSelect = useCallback((selectedLocation) => {
    setFormData((prev) => ({
      ...prev,
      city: selectedLocation,
    }));
    setFilteredLocations([]);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target) &&
        !categoryInputRef.current.contains(event.target)
      ) {
        setFilteredCategory([]);
      }
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target) &&
        !locationInputRef.current.contains(event.target)
      ) {
        setFilteredLocations([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch data
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [categoryRes, locationRes] = await Promise.all([
          fetch("https://jono-db.onrender.com/v1/category/categories"),
          fetch("https://bdapi.vercel.app/api/v.1/district"),
        ]);

        if (!categoryRes.ok) throw new Error("Failed to fetch category data");
        if (!locationRes.ok) throw new Error("Failed to fetch location data");

        const categoryData = await categoryRes.json();
        const locationData = await locationRes.json();

        if (isMounted) {
          setCategory(categoryData?.data || []);
          setLocation(locationData?.data || []); // Ensure this is an array
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  };


  return (
    <section className="py-5 pt-20">
      <div className="xl:container xl:mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16 px-2 sm:px-0">
        {/* Left Side - Content */}
        <motion.div
          className="w-full lg:w-1/2 space-y-4  md:space-y-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="text-gray-900 font-bold text-3xl sm:text-2xl md:text-5xl leading-tight">
              Hire
              <span className="relative inline-block mx-3">
                <span className="relative z-10">Experts</span>
                <Image
                  className="absolute left-0 -bottom-2 w-full"
                  src={imageMark}
                  alt="mark"
                />
              </span>
              &
            </h2>
            <h2 className="text-gray-900 font-bold text-3xl sm:text-5xl md:text-5xl leading-tight">
              Get Your Job Done
            </h2>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-textColor text-sm max-w-lg"
          >
            A Handy Service Solution Website In Bangladesh. Hire Experts & Get
            Your Job Done with confidence and ease.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/exparts" className="btn">
              Hire Experts
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white shadow-xl rounded-2xl p-3 md:p-5 max-w-md ml-auto"
          >
            <h3 className="text-xl font-semibold text-textHeadingColor mb-3">
              Find Services
            </h3>

            {error && (
              <div
                className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md"
                role="alert"
              >
                <div className="flex">
                  <div className="py-1">
                    <svg
                      className="h-6 w-6 text-red-500 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {/* Address Field */}
              <div className="relative">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-paraColor mb-1"
                >
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaAddressCard className="text-textIconColor" />
                  </div>
                  <input
                    id="address"
                    type="text"
                    value={formData.address}
                    name="address"
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    className="block text-sm w-full pl-10 pr-3 py-2 border border-borderInputColor rounded-lg focus:ring-blue-500 focus:border-borderFocusColor bg-gray-50 text-gray-900 transition-all duration-200 outline-none"
                    required
                    aria-label="Address input"
                  />
                </div>
              </div>

              {/* Category Field */}
              <div className="relative">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-textColor mb-1"
                >
                  Category
                </label>

                <select className="py-2 px-3 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 transition-all duration-200 outline-none w-full">
                  <option selected>Choose a category</option>
                  {category.map((cate, index) => (
                    <option key={index} className="text-sm" value={cate.name}>
                      {cate.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Field */}
              <div className="relative">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-paraColor mb-1"
                >
                  City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLocationCrosshairs className="text-textIconColor" />
                  </div>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    onChange={handleInputChange}
                    value={formData.city}
                    placeholder="Enter your city"
                    className="block text-sm w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 transition-all duration-200 outline-none"
                    required
                    aria-label="City input"
                    aria-expanded={filteredLocations.length > 0}
                    aria-controls="location-list"
                    ref={locationInputRef}
                  />
                </div>

                {/* Location Dropdown */}
                {filteredLocations.length > 0 && (
                  <div
                    id="location-list"
                    className="absolute left-0 right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto"
                    role="listbox"
                    ref={locationDropdownRef}
                  >
                    {filteredLocations.map((loc, index) => (
                      <div
                        key={index}
                        onClick={() => handleLocationSelect(loc.name)}
                        className="px-4 py-2.5 text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0 text-sm"
                        role="option"
                        aria-selected={formData.city === loc.name}
                      >
                        {loc.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    <FaSearch />
                    Search Now
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;