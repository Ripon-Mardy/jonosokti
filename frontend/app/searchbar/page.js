"use client";
import React, { useState } from "react";

const jobList = [
  { id: 1, title: "Frontend Developer", company: "Google" },
  { id: 2, title: "Backend Developer", company: "Microsoft" },
  { id: 3, title: "Full Stack Developer", company: "Amazon" },
  { id: 4, title: "UI/UX Designer", company: "Apple" },
  { id: 5, title: "Data Scientist", company: "Meta" },
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredJobs([]);
    } else {
      const filtered = jobList.filter(
        (job) =>
          job.title.toLowerCase().includes(value.toLowerCase()) ||
          job.company.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-10">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by job title or company..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredJobs.length > 0 && (
        <ul className="absolute left-0 w-full bg-white border border-gray-200 rounded-lg shadow-md mt-1 max-h-52 overflow-y-auto">
          {filteredJobs.map((job) => (
            <li
              key={job.id}
              onClick={() => handleSuggestionClick(`${job.title} - ${job.company}`)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              <span className="font-medium text-gray-900">{job.title}</span> -{" "}
              <span className="text-gray-600">{job.company}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
