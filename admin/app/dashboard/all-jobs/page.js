"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Calendar,
  Briefcase,
  Search,
  X,
} from "lucide-react";
import jobsImage from "../../../public/Image/profile.png";
import AddCategory from './../../../components/AddCatgory';

const JobDashboard = () => {
  const [jobs, setJobs] = useState([]); // Show all jobs
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopUp, setShowPopUp] = useState(false); // Show jobs details popup
  const [selectedJob, setSelectedJob] = useState(null); // Track the selected job for popup
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [limit] = useState(10);

  const adminUrl = process.env.ADMIN_URL;

  const jobTabs = [
    { id: "all", label: "All Jobs" },
    { id: "pending", label: "Pending" },
    { id: "active", label: "Active" },
    { id: "closed", label: "Closed" },
  ];

  // status mapping - consistent naming
  const statusMap = {
    pending: "1",
    active: "2",
    closed: "3",
  }

  // status display map - consistent naming
  const statusDisplayMap = {
    "1": "pending",
    "2": "active",
    "3": "closed"
  }

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setError("Authentication token is missing");
        setLoading(false);
        return;
      }
      if (!adminUrl) {
        setError("Admin URL is not configured");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `${adminUrl}/job/all-jobs?page=${currentPage}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch jobs: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        const jobData = data?.data?.jobs || [];
        setJobs(jobData);
        setFilteredJobs(jobData); // Initially set to all jobs
        setTotalPages(data?.data?.total_page || 1);
        setTotalJobs(data?.data?.total || jobData.length);
        setCurrentPage(data?.data?.current_page || currentPage);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [adminUrl, currentPage, limit]);

  // Filter jobs based on activeTab and searchTerm
  useEffect(() => {
    let result = [...jobs];

    if (activeTab !== "all") {
      result = result.filter((job) => 
        job.status?.toLowerCase() === activeTab.toLowerCase()
      );
    }

    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJobs(result);
  }, [activeTab, searchTerm, jobs]);

  // Handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to page 1 when switching tabs
  };

  // Pagination handlers
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Handle job popup
  const handleJobsPopUp = (job) => {
    setSelectedJob(job); // Set the clicked job
    setShowPopUp(true); // Show the popup
  };

  const closePopUp = () => {
    setShowPopUp(false); // Hide the popup
    setSelectedJob(null); // Clear the selected job
  };

  // handle approve button click 
  const handleApproveClick = async (jobId, status) => {
    setLoading(true)
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) throw new Error('No auth token found');

      const statusCode = statusMap[status.toLowerCase()];
      if (!statusCode) {
        throw new Error(`Invalid status: ${status}`);
      }

      const res = await fetch(`https://jono-db.onrender.com/v1/job/update-job-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ job_id: jobId, status: statusCode })
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(errorData);
        throw new Error('Failed to update job status');
      }

      const updateData = await res.json();
      const displayStatus = statusDisplayMap[statusCode];

      // Update jobs and filteredJobs state
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job._id === jobId ? { ...job, status: displayStatus } : job
        )
      );
      
      closePopUp();
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  const getStatusClass = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === "active") {
      return "bg-green-100 text-green-800";
    } else if (statusLower === "pending") {
      return "bg-yellow-100 text-yellow-800";
    } else if (statusLower === "closed") {
      return "bg-red-100 text-red-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const JobRow = ({ job }) => (
    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
      <td className="py-4 px-2">
        <div className="w-12 h-12 relative">
          <Image
            src={job?.company_logo || jobsImage}
            alt={job?.company_name || "Company"}
            fill
            className="rounded-md object-cover"
          />
        </div>
      </td>
      <td className="py-4 px-2 text-sm font-medium text-gray-900">
        {job?.company_name || "N/A"}
      </td>
      <td className="py-4 px-2 text-sm text-gray-700">{job?.title || "N/A"}</td>
      <td className="py-4 px-2 text-sm text-gray-500">
        <div className="flex items-center">
          <MapPin size={16} className="mr-2" />
          {job?.address || "N/A"}
        </div>
      </td>
      <td className="py-4 px-2 text-sm text-gray-500">
        <div className="flex items-center">
          <Mail size={16} className="mr-2" />
          {job?.email_url || "N/A"}
        </div>
      </td>
      <td className="py-4 px-2 text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar size={16} className="mr-2" />
          {new Date(job?.created_at).toLocaleDateString() || "N/A"}
        </div>
      </td>
      <td className="py-4 px-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(job.status)}`}
        >
          {job?.status ? job.status.charAt(0).toUpperCase() + job.status.slice(1) : "Unknown"}
        </span>
      </td>
      <td className="py-4 px-2 text-right">
        <button
          className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => handleJobsPopUp(job)}
        >
          View
        </button>
      </td>
    </tr>
  );

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage and monitor all job postings</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between -z-10">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {jobTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">
          <p>{error}</p>
        </div>
      ) : filteredJobs.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase">Logo</th>
                  <th className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase">Company</th>
                  <th className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
                  <th className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase">Address</th>
                  <th className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                  <th className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase">Created</th>
                  <th className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job, index) => (
                  <JobRow key={job._id || index} job={job} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * limit + 1} to{" "}
              {Math.min(currentPage * limit, totalJobs)} of {totalJobs} jobs
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {activeTab === "pending" ? "No Pending Jobs Found" : "No Jobs Found"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === "pending"
              ? "There are no pending jobs at the moment."
              : "Try adjusting your search or filter criteria."}
          </p>
        </div>
      )}

      {/* Popup for Job Details */}
      {showPopUp && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full h-auto max-w-xl relative">
            <button
              onClick={closePopUp}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {selectedJob.title || "Job Title"}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Image
                  src={selectedJob?.company_logo || jobsImage}
                  alt={selectedJob?.company_name || "Company"}
                  width={40}
                  height={40}
                  className="rounded-md object-cover mr-2"
                />
                <span className="text-sm font-medium text-gray-900">
                  {selectedJob?.company_name || "N/A"}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <MapPin size={16} className="mr-2" />
                {selectedJob?.address || "N/A"}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Mail size={16} className="mr-2" />
                {selectedJob?.email_url || "N/A"}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Calendar size={16} className="mr-2" />
                {new Date(selectedJob?.created_at).toLocaleDateString() || "N/A"}
              </div>
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(selectedJob.status)}`}
                >
                  {selectedJob?.status ? selectedJob.status.charAt(0).toUpperCase() + selectedJob.status.slice(1) : "Unknown"}
                </span>
              </div>
              {/* Add more job details as needed */}
              {selectedJob.description && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-900">Description</h3>
                  <p className="text-sm text-gray-600">{selectedJob.description || "N/A"}</p>
                </div>
              )}
              {!selectedJob.description && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-900">Description</h3>
                  <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam harum facere accusantium at aspernatur repellendus provident ipsa magnam. Aspernatur et itaque beatae. Porro perferendis pariatur voluptas nihil quas, repellendus officia cum necessitatibus</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-5 justify-end">
              <button
                onClick={() => handleApproveClick(selectedJob?._id, 'closed')}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Reject
              </button>
              <button
                onClick={() => handleApproveClick(selectedJob?._id, 'active')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {selectedJob?.status?.toLowerCase() === 'active' ? 'Approved' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDashboard;
