"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import jobImage from "@/public/images/jobsimage.jpg";
import {
  Share2,
  Ellipsis,
  CircleArrowOutUpRight,
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import Loading from "@/components/Loading";

// Reusable SearchInput component (unchanged)
const SearchInput = ({
  icon,
  placeholder,
  value,
  onChange,
  suggestions = [],
  onSuggestionSelect,
  showSuggestions,
  setShowSuggestions,
  inputRef,
  dropdownRef,
  id,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-1 text-sm text-gray-700 font-normal bg-[#EDF3F8] px-3 rounded-md border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200 transition-all">
        <span className="text-gray-500">{icon}</span>
        <input
          id={id}
          ref={inputRef}
          onFocus={() => setShowSuggestions(true)}
          value={value}
          onChange={onChange}
          type="text"
          placeholder={placeholder}
          className="w-full py-2.5 outline-none bg-transparent focus:ring-0 focus:outline-none text-sm"
          aria-expanded={showSuggestions && suggestions.length > 0}
          aria-controls={`${id}-suggestions`}
          role="combobox"
          aria-autocomplete="list"
        />
      </div>

      {showSuggestions && suggestions && suggestions.length > 0 && (
        <div
          id={`${id}-suggestions`}
          ref={dropdownRef}
          className="absolute left-0 top-full bg-white w-full border border-gray-300 py-2 shadow-lg z-10 max-h-60 overflow-y-auto rounded-md mt-1"
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion?.id || index}
              onClick={() => onSuggestionSelect(suggestion)}
              className="flex items-center justify-start gap-2 hover:bg-blue-50 px-3 cursor-pointer py-2.5"
              role="option"
              aria-selected={false}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSuggestionSelect(suggestion);
              }}
            >
              {suggestion?.jobTitle ? (
                <>
                  <span className="text-gray-800">{suggestion.jobTitle}</span>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="font-medium text-gray-600">{suggestion.companyName}</span>
                </>
              ) : (
                <span className="text-gray-800">{suggestion?.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Reusable JobCard component (unchanged)
const JobCard = ({ job, isSelected, onClick }) => {
  if (!job) return null;

  return (
    <div
      className={`flex gap-3 px-5 py-3 group cursor-pointer border-b border-gray-100 hover:bg-blue-50 transition-colors ${
        isSelected ? "bg-blue-50" : ""
      }`}
      onClick={() => onClick(job)}
    >
      <div className="flex-shrink-0">
        <Image
          src={jobImage}
          alt={`${job.jobTitle || "Job"} company logo`}
          className="object-cover w-12 h-12 rounded-md shadow-sm"
          width={100}
          height={100}
        />
      </div>
      <div className="space-y-1.5">
        <h2 className="text-sm md:text-base font-semibold group-hover:text-blue-700 transition-colors">
          {job.jobTitle || "Job Title"}
        </h2>
        <div className="flex flex-wrap items-center gap-x-2 text-xs md:text-sm text-gray-600">
          <span>{job.companyName || "Company"}</span>
          <span className="text-gray-400">•</span>
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-gray-500" />
            Dhaka, Bangladesh
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
            ৳ {job.salary || "35000"}/month
          </span>
          <span className="text-xs text-gray-500">{job.postedTime || "6 months ago"}</span>
        </div>
      </div>
    </div>
  );
};

// Pagination component (unchanged)
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = Math.min(maxPagesToShow - 1, totalPages - 1);
      }
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - (maxPagesToShow - 2));
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-1 mt-6 mb-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`p-2 rounded-md ${
          currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-blue-600 hover:bg-blue-50"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-md ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-50 text-gray-700"
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-blue-600 hover:bg-blue-50"
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

// Reusable JobDetail component (unchanged)
const JobDetail = ({ job }) => {
  const defaultJob = {
    companyName: "Company Name",
    jobTitle: "React Native Developer (For Pooling)",
    location: "Dhaka, Dhaka, Bangladesh",
    postedTime: "6 months ago",
    description:
      "Wing Assistant is seeking an experienced React Native Developer to assist in the technical aspects of an MVP development project. This role includes utilizing key technologies such as Express.js, React, SQL or MongoDB, and others in the necessary tech stack.",
    requirements: [
      "Develop technical aspects of the MVP using React Native and other required technologies",
      "Assist with and manage the META API approval and documentation process",
      "Manage the product's deployment ensuring smooth operation using tools such as AWS and MongoDB",
    ],
    preferredRequirements: [
      "Proof of previous work on Meta API and its associated processes",
      "Ability to start the project immediately",
      "Exceptional interpersonal skills, a positive attitude, and a self-starter personality",
    ],
    responsibilities: [
      "Proof of previous work on Meta API and its associated processes",
      "Ability to start the project immediately",
      "Exceptional interpersonal skills, a positive attitude, and a self-starter personality",
    ],
    salary: "35000",
  };

  const displayJob = job || defaultJob;

  const requirements = displayJob.requirements || [];
  const preferredRequirements = displayJob.preferredRequirements || [];
  const responsibilities = displayJob.responsibilities || [];

  return (
    <div className="space-y-6 h-screen overflow-hidden overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-sm">
            <Image
              src={jobImage}
              alt={`${displayJob.companyName} logo`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{displayJob.companyName}</h2>
            <p className="text-sm text-gray-500">Technology • 50-200 employees</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => console.log("Hello developer")}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Share job"
          >
            <Share2 size={18} className="text-gray-600" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="More options"
          >
            <Ellipsis size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">{displayJob.jobTitle}</h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-gray-500" />
            <span>{displayJob.location || "Dhaka, Bangladesh"}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span>{displayJob.postedTime || "6 months ago"}</span>
          <span className="text-gray-400">•</span>
          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
            ৳ {displayJob.salary || "35000"}/month
          </span>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-6 py-2.5 rounded-lg text-white font-medium text-sm">
            Apply Now
            <CircleArrowOutUpRight size={16} />
          </button>
          <button className="border border-blue-600 hover:bg-blue-50 transition rounded-lg text-blue-600 py-2.5 px-6 text-sm font-medium">
            Save Job
          </button>
        </div>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About the job</h2>
            <p className="text-gray-700 leading-relaxed">
              {defaultJob.description ||
                "Wing Assistant is seeking an experienced React Native Developer"}
            </p>
          </section>

          {defaultJob.requirements.length > 0 && (
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Job Requirements</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {defaultJob.requirements.map((req, index) => (
                  <li key={index} className="pl-1">
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {defaultJob.preferredRequirements.length > 0 && (
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Preferred Requirements
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {defaultJob.preferredRequirements.map((req, index) => (
                  <li key={index} className="pl-1">
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {defaultJob.responsibilities.length > 0 && (
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {defaultJob.responsibilities.map((resp, index) => (
                  <li key={index} className="pl-1">
                    {resp}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const JobSearchClient = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");
  const pageParam = searchParams.get("page");

  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const [jobsPerPage] = useState(8);
  const [totalJobs, setTotalJobs] = useState(0);
  const [paginatedJobs, setPaginatedJobs] = useState([]);
  const [selectJob, setSelectJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showJobSuggestions, setShowJobSuggestions] = useState(false);
  const [locationTerm, setLocationTerm] = useState("");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);
  const [locationDistrict, setLocationDistrict] = useState([]);
  const [error, setError] = useState(null);

  const jobSearchRef = useRef(null);
  const jobDropdownRef = useRef(null);
  const locationSearchRef = useRef(null);
  const locationDropdownRef = useRef(null);

  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  useEffect(() => {
    if (jobsList && Array.isArray(jobsList)) {
      setTotalJobs(jobsList.length);
      const indexOfLastJob = currentPage * jobsPerPage;
      const indexOfFirstJob = indexOfLastJob - jobsPerPage;
      const currentJobs = jobsList.slice(indexOfFirstJob, indexOfLastJob);
      setPaginatedJobs(currentJobs);
    }
  }, [currentPage, jobsPerPage]);

  const handlePageChange = useCallback(
    (pageNumber) => {
      setCurrentPage(pageNumber);
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber);
      if (jobId) {
        params.set("id", jobId);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, jobId]
  );

  useEffect(() => {
    if (jobId && jobsList && Array.isArray(jobsList)) {
      const foundJob = jobsList.find(
        (job) => job.id === parseInt(jobId) || job.id === jobId
      );
      if (foundJob) {
        setSelectJob(foundJob);
      }
    }
  }, [jobId]);

  useEffect(() => {
    if (pageParam) {
      const page = parseInt(pageParam);
      if (!isNaN(page) && page > 0) {
        setCurrentPage(page);
      }
    }
  }, [pageParam]);

  const handleJobInputChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredJobs([]);
    } else {
      if (jobsList && Array.isArray(jobsList)) {
        const filtered = jobsList.filter(
          (job) =>
            job.jobTitle?.toLowerCase().includes(value.toLowerCase()) ||
            job.companyName?.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredJobs(filtered);
        setShowJobSuggestions(true);
      }
    }
  }, []);

  const handleLocationInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setLocationTerm(value);

      if (value.trim() === "") {
        setFilteredLocation([]);
        setShowLocationSuggestions(false);
      } else {
        if (locationDistrict && Array.isArray(locationDistrict)) {
          const locationFiltered = locationDistrict.filter((location) =>
            location.name?.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredLocation(locationFiltered);
          setShowLocationSuggestions(true);
        }
      }
    },
    [locationDistrict]
  );

  const handleJobSelect = useCallback((job) => {
    if (job && job.jobTitle) {
      setSearchTerm(job.jobTitle);
      setShowJobSuggestions(false);
    }
  }, []);

  const handleLocationSelect = useCallback((location) => {
    if (location && location.name) {
      setLocationTerm(location.name);
      setShowLocationSuggestions(false);
    }
  }, []);

  const handleJobCardClick = useCallback(
    (job) => {
      setSelectJob(job);
      if (job && job.id) {
        const params = new URLSearchParams(searchParams);
        params.set("id", job.id);
        if (currentPage > 1) {
          params.set("page", currentPage);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    },
    [router, pathname, searchParams, currentPage]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        jobDropdownRef.current &&
        !jobDropdownRef.current.contains(event.target) &&
        jobSearchRef.current &&
        !jobSearchRef.current.contains(event.target)
      ) {
        setShowJobSuggestions(false);
      }
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target) &&
        locationSearchRef.current &&
        !locationSearchRef.current.contains(event.target)
      ) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://bdapi.vercel.app/api/v.1/district");
        if (!res.ok) throw new Error("Failed to fetch location data");

        const data = await res.json();
        setLocationDistrict(data?.data || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setError("Failed to load location data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const [showMobileJobDetails, setShowMobileJobDetails] = useState(false);

  useEffect(() => {
    if (selectJob) {
      setShowMobileJobDetails(true);
    }
  }, [selectJob]);

  const handleBackToList = () => {
    setShowMobileJobDetails(false);
    const params = new URLSearchParams(searchParams);
    params.delete("id");
    if (currentPage > 1) {
      params.set("page", currentPage);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-10">
      {error && (
        <div
          className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6"
          role="alert"
        >
          <div className="flex items-center">
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

      <div className="grid lg:grid-cols-12 gap-6">
        <div className={`lg:col-span-5 space-y-4 ${showMobileJobDetails ? "hidden lg:block" : ""}`}>
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <SearchInput
              id="job-search"
              icon={<Search size={18} />}
              placeholder="Job title, skill or company"
              value={searchTerm}
              onChange={handleJobInputChange}
              suggestions={filteredJobs}
              onSuggestionSelect={handleJobSelect}
              showSuggestions={showJobSuggestions}
              setShowSuggestions={setShowJobSuggestions}
              inputRef={jobSearchRef}
              dropdownRef={jobDropdownRef}
            />

            <SearchInput
              id="location-search"
              icon={<MapPin size={18} />}
              placeholder="City, state or zip code"
              value={locationTerm}
              onChange={handleLocationInputChange}
              suggestions={filteredLocation}
              onSuggestionSelect={handleLocationSelect}
              showSuggestions={showLocationSuggestions}
              setShowSuggestions={setShowLocationSuggestions}
              inputRef={locationSearchRef}
              dropdownRef={locationDropdownRef}
            />
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm max-h-screen sticky top-20 overflow-hidden overflow-y-auto">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Top job picks for you</h2>
              <p className="text-sm text-gray-600 mt-1">
                Based on your profile, preferences, and activity
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-medium text-gray-500">{totalJobs} results</span>
                {totalPages > 1 && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs font-medium text-gray-500">
                      Page {currentPage} of {totalPages}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {loading ? (
                <div className="p-10 flex justify-center">
                  <Loading />
                </div>
              ) : paginatedJobs && paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <JobCard
                    key={job.id || Math.random().toString()}
                    job={job}
                    isSelected={selectJob?.id === job.id}
                    onClick={handleJobCardClick}
                  />
                ))
              ) : (
                <div className="p-10 text-center">
                  <p className="text-gray-500">No jobs available</p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="border-t border-gray-100">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>

        <div className={`lg:col-span-7 ${showMobileJobDetails ? "block" : "hidden lg:block"}`}>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:p-8">
            {showMobileJobDetails && (
              <button
                onClick={handleBackToList}
                className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors lg:hidden"
              >
                <ArrowLeft size={18} />
                <span className="font-medium">Back to job listings</span>
              </button>
            )}
            <JobDetail job={selectJob} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchClient;