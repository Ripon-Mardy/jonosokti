"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Search,
  Filter,
  X,
  ChevronDown,
  Heart,
  BriefcaseBusiness,
  CircleDollarSign,
  User 
} from "lucide-react";
import Loader from "@/components/Loader/Loader";

const page = () => {
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    jobType: [],
    searchTerm: "",
  });
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const dropdownRef = useRef(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [jobRes, categoryRes, locationRes] = await Promise.all([
          fetch(`${apiKey}/job/active-jobs`),
          fetch(`${apiKey}/category/categories`),
          fetch("https://bdapi.vercel.app/api/v.1/district"),
        ]);

        if (!jobRes.ok) throw new Error("Failed to fetch jobs");
        if (!categoryRes.ok) throw new Error("Failed to fetch categories");
        if (!locationRes.ok) throw new Error("Failed to fetch location");

        const jobData = await jobRes.json();
        const categoryData = await categoryRes.json();
        const locationData = await locationRes.json();

        const jobsArray = jobData?.data?.jobs || [];
        setJobs(jobsArray);
        setFilteredJobs(jobsArray);
        setCategory(categoryData?.data || []);
        setLocation(locationData?.data || []);

        // Animate cards after data loads
        setTimeout(() => setAnimateCards(true), 100);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter jobs based on form data
  useEffect(() => {
    let filtered = jobs;

    // Filter by search term
    if (formData.searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title
            ?.toLowerCase()
            .includes(formData.searchTerm.toLowerCase()) ||
          job.company_name
            ?.toLowerCase()
            .includes(formData.searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (formData.category) {
      filtered = filtered.filter(
        (job) => job.category?.toLowerCase() === formData.category.toLowerCase()
      );
    }

    // Filter by location
    if (formData.location) {
      filtered = filtered.filter((job) =>
        job.address?.toLowerCase().includes(formData.location.toLowerCase())
      );
    }

    // Filter by job type
    if (formData.jobType.length > 0) {
      filtered = filtered.filter((job) => formData.jobType.includes(job.type));
    }

    setFilteredJobs(filtered);
  }, [formData, jobs]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilteredLocation([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        jobType: checked
          ? [...prevFormData.jobType, value]
          : prevFormData.jobType.filter((jobType) => jobType !== value),
      }));
    } else if (name === "location") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      if (value.trim() === "") {
        setFilteredLocation([]);
      } else {
        const filtered = location.filter((loc) =>
          loc.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredLocation(filtered);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle location select
  const handleLocationSelect = (loc) => {
    setFormData((prev) => ({
      ...prev,
      location: loc,
    }));
    setFilteredLocation([]);
  };

  // Clear all filters
  const clearFilters = () => {
    setFormData({
      category: "",
      location: "",
      jobType: [],
      searchTerm: "",
    });
  };

  return (
    <div className="py-20">

      <div className="xl:container xl:mx-auto px-2 xl:px-0 mt-10 relative z-20">

              {/* quick search bar  */}
        <div className="relative max-w-2xl mx-auto mt-5">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="searchTerm"
                  value={formData.searchTerm}
                  onChange={handleInputChange}
                  placeholder="Search jobs, companies, or keywords..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl shadow focus:ring-1 focus:ring-blue-600 outline-none text-sm border border-gray-200"
                />
              </div>
            </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-5">

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4 col-span-full">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full bg-white rounded-2xl p-3 shadow-lg border border-gray-100 flex items-center justify-between text-gray-700 font-medium"
            >
              <div className="flex items-center gap-2">
                <Filter size={20} />
                <span>Filters</span>
                {(formData.category ||
                  formData.location ||
                  formData.jobType.length > 0) && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {
                      [
                        formData.category,
                        formData.location,
                        ...formData.jobType,
                      ].filter(Boolean).length
                    }
                  </span>
                )}
              </div>
              <ChevronDown
                className={`transform transition-transform ${
                  showMobileFilters ? "rotate-180" : ""
                }`}
                size={20}
              />
            </button>
          </div>


          {/* Filters Sidebar */}
          <div
            className={`lg:col-span-4 border border-gray-200 rounded-md shadow ${
              showMobileFilters || "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Filter size={18} className="text-blue-600" />
                  Filters
                </h3>
                {(formData.category ||
                  formData.location ||
                  formData.jobType.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  >
                    <X size={16} />
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {/* Category Filter */}
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-3">
                    Job Category
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full text-sm py-3 px-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all appearance-none bg-white"
                    >
                      <option value="">All Categories</option>
                      {category.map((cate, index) => (
                        <option key={index} value={cate?.name}>
                          {cate?.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={18}
                    />
                  </div>
                </div>

                {/* Location Filter */}
                <div className="relative">
                  <label className="block text-base font-semibold text-gray-700 mb-3">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      name="location"
                      type="text"
                      onChange={handleInputChange}
                      value={formData.location}
                      className="w-full text-sm py-3 pl-10 pr-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
                      placeholder="Enter city or location"
                    />
                  </div>

                  {filteredLocation.length > 0 && (
                    <div
                      ref={dropdownRef}
                      className="absolute left-0 top-full bg-white rounded-xl border border-gray-200 w-full mt-2 shadow-xl z-30 max-h-60 overflow-y-auto"
                    >
                      {filteredLocation.map((loc, index) => (
                        <div
                          onClick={() => handleLocationSelect(loc?.name)}
                          key={index}
                          className="px-4 py-3 text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors text-sm border-b border-gray-50 last:border-b-0 flex items-center gap-2"
                        >
                          <MapPin size={14} className="text-gray-400" />
                          {loc?.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Job Type Filter */}
                {/* <div>
                  <label className="block text-base font-semibold text-gray-700 mb-4">
                    Job Type
                  </label>
                  <div className="space-y-3">
                    {[
                      "Freelance",
                      "Full Time",
                      "Internship",
                      "Part Time",
                      "Temporary",
                    ].map((type, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-3 text-sm cursor-pointer group"
                      >
                        <input
                          name="jobType"
                          type="checkbox"
                          value={type}
                          onChange={handleInputChange}
                          checked={formData.jobType.includes(type)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div> */}



              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-8">

            {loading ? (
              <Loader/>
            ) : error ? (
              <div className="text-center text-red-500 bg-red-50 p-8 rounded-2xl border border-red-200">
                <p className="text-lg font-medium mb-2">
                  Oops! Something went wrong
                </p>
                <p>{error}</p>
              </div>
            ) : filteredJobs.length < 5 ? (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1  */}
                <div className="bg-white rounded-lg shadow-md p-4 border border-gray-50">
                <div className="flex items-center justify-start gap-3 mb-4">
                  <span className="bg-blue-200 p-2 rounded-full">
                    <BriefcaseBusiness className="w-5 h-5 text-blue-500" />
                  </span>
                  <div>
                    <h2 className="text-textHeadingColor font-bold text-base">
                      Emergency Plumbing Repair
                    </h2>
                    <span className="text-xs font-medium text-textColor">
                      2 hours ago
                    </span>
                  </div>
                </div>

                {/* details  */}
                <div>
                  <p className="text-textColor text-sm font-medium">
                   {` Need urgent plumbing repair for kitchen sink. Water leakage
                    issue. Need urgent plumbing repair for kitchen sink. Water leakage
                    issue.`.split(' ').slice(0, 34).join(' ')}...
                  </p>
                  <div className="mt-4 space-y-2">
                    <span className="flex items-center justify-start gap-2 text-xs text-gray-600">
                      <MapPin className="w-3 h-3" /> Dhanmondi, Dhaka
                    </span>
                    <span className="flex items-center justify-start gap-2 text-xs text-gray-600">
                      <CircleDollarSign className="w-3 h-3" /> ৳800/hour
                    </span>
                    <span className="flex items-center justify-start gap-2 text-xs text-gray-600">
                      <User className="w-3 h-3" /> Rashid Ahmed
                    </span>
                  </div>
                </div>
                {/* button  */}
                <div className="flex items-center justify-center mt-4 gap-3">
                  <button className="btn w-full">Apply Now</button>
                  <button className="w-1/3 flex items-center justify-center border border-gray-200 py-2 rounded-full text-gray-500">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {/* 2  */}
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-50">
                <div className="flex items-center justify-start gap-3 mb-4">
                  <span className="bg-blue-200 p-2 rounded-full">
                    <BriefcaseBusiness className="w-5 h-5 text-blue-500" />
                  </span>
                  <div>
                    <h2 className="text-textHeadingColor font-bold text-base">
                      Emergency Plumbing Repair
                    </h2>
                    <span className="text-xs font-medium text-textColor">
                      2 hours ago
                    </span>
                  </div>
                </div>

                {/* details  */}
                <div>
                  <p className="text-textColor text-sm font-medium">
                   {` Need urgent plumbing repair for kitchen sink. Water leakage
                    issue. Need urgent plumbing repair for kitchen sink. Water leakage
                    issue.`.split(' ').slice(0, 34).join(' ')}...
                  </p>
                  <div className="mt-4 space-y-2">
                    <span className="flex items-center justify-start gap-2 text-xs text-gray-600">
                      <MapPin className="w-3 h-3" /> Dhanmondi, Dhaka
                    </span>
                    <span className="flex items-center justify-start gap-2 text-xs text-gray-600">
                      <CircleDollarSign className="w-3 h-3" /> ৳800/hour
                    </span>
                    <span className="flex items-center justify-start gap-2 text-xs text-gray-600">
                      <User className="w-3 h-3" /> Rashid Ahmed
                    </span>
                  </div>
                </div>
                {/* button  */}
                <div className="flex items-center justify-center mt-4 gap-3">
                  <button className="btn w-full">Apply Now</button>
                  <button className="w-1/3 flex items-center justify-center border border-gray-200 py-2 rounded-full text-gray-500">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              </div>
              


            ) : (


              // if users is empty 
              <div className="text-center py-16 rounded-2xl">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                    No Jobs Found
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    Try adjusting your search criteria or check back later for
                    new opportunities.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 text-sm text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>


            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
