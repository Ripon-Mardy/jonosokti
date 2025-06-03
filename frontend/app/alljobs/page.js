"use client";
import React, { useEffect, useState, useRef } from "react";
import Loading from "@/components/Loading";
import Image from "next/image";
import Link from "next/link";
import {
  Clock8,
  MapPin,
  Banknote,
  Bookmark,
  Award,
  BriefcaseBusiness,
  Search,
  Filter,
  X,
  ChevronDown,
  Heart,
  Users,
  TrendingUp,
  Star,
} from "lucide-react";
import jobsImage from "@/public/images/jobsimage.jpg";

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
  const [savedJobs, setSavedJobs] = useState([]);
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

  // Handle saving a job
  const handleSaveJob = (job) => {
    if (!savedJobs.some((savedJob) => savedJob.id === job.id)) {
      setSavedJobs([...savedJobs, job]);
    }
  };

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
    <div>
      {/* Hero Section */}
      <div className="relative">
        <div className="xl:container xl:mx-auto px-2 xl:px-0 relative z-10 pt-16 md:pt-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-2 rounded-2xl shadow-lg mb-4">
                <Award className="text-yellow-300" size={28} />
                <h1 className="text-base md:text-xl font-bold">
                  Find Your Dream Career
                </h1>
              </div>
              <p className="text-paraColor text-sm max-w-2xl mx-auto">
                Discover thousands of opportunities from top companies. Your
                next career move starts here.
              </p>
            </div>

            {/* Quick Search Bar */}
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

          </div>
        </div>
      </div>

      <div className="xl:container xl:mx-auto px-2 xl:px-0 mt-5 relative z-20">
        {/* Stats Cards */}
        {/* <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12'>
          <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
            <div className='flex items-center gap-4'>
              <div className='bg-blue-100 p-3 rounded-xl'>
                <TrendingUp className='text-blue-600' size={24} />
              </div>
              <div>
                <p className='text-2xl font-bold text-gray-800'>{filteredJobs.length}+</p>
                <p className='text-gray-600 text-sm'>Active Jobs</p>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
            <div className='flex items-center gap-4'>
              <div className='bg-green-100 p-3 rounded-xl'>
                <Users className='text-green-600' size={24} />
              </div>
              <div>
                <p className='text-2xl font-bold text-gray-800'>500+</p>
                <p className='text-gray-600 text-sm'>Companies</p>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
            <div className='flex items-center gap-4'>
              <div className='bg-purple-100 p-3 rounded-xl'>
                <Star className='text-purple-600' size={24} />
              </div>
              <div>
                <p className='text-2xl font-bold text-gray-800'>1000+</p>
                <p className='text-gray-600 text-sm'>Success Stories</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

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
                <div>
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
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl md:text-xl font-bold text-gray-800">
                  {filteredJobs.length > 0
                    ? `${filteredJobs.length} Jobs Found`
                    : "No Jobs Found"}
                </h2>
                <p className="text-gray-600 text-sm">Discover your next opportunity</p>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-96 bg-white rounded-2xl shadow-lg">
                <Loading />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 bg-red-50 p-8 rounded-2xl border border-red-200">
                <p className="text-lg font-medium mb-2">
                  Oops! Something went wrong
                </p>
                <p>{error}</p>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {filteredJobs.map((job, index) => (
                  <div
                    key={index}
                    className={`group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden ${
                      animateCards ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link href={`/alljobs/${job._id}`} className="block p-6">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <Image
                              alt="company logo"
                              className="rounded-2xl ring-4 ring-gray-100 group-hover:ring-blue-100 transition-all"
                              width={80}
                              height={80}
                              src={jobsImage}
                            />
                            <div className="absolute -top-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {job.title}
                              </h3>
                              <p className="text-gray-600 font-medium mt-1">
                                {job.company_name}
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleSaveJob(job);
                              }}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                            >
                              <Heart
                                size={20}
                                className={`${
                                  savedJobs.some((saved) => saved.id === job.id)
                                    ? "fill-current text-red-500"
                                    : ""
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                            <span className="flex items-center gap-2 text-gray-600">
                              <Clock8 size={16} className="text-blue-500" />
                              {job.posted || "10 Dec"}
                            </span>
                            <span className="flex items-center gap-2 text-gray-600">
                              <MapPin size={16} className="text-green-500" />
                              {job?.address || "Remote"}
                            </span>
                            <span className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                              <Banknote size={16} />৳{job.cost || 0}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                                {job.type || "Full Time"}
                              </span>
                              {job.featured && (
                                <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full font-medium flex items-center gap-1">
                                  <Star size={14} />
                                  Featured
                                </span>
                              )}
                            </div>
                            <div className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                              View Details →
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
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
