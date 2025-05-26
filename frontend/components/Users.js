import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "./Loading";
import Link from "next/link";
import customProfile from "@/public/images/user.png";
import { Phone, User, ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  // api key 
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Calculate pagination values
  const jobsPerPage = 18;
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    `${user?.first_name} ${user?.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalJobs = filteredUsers.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, startIndex + jobsPerPage);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${apiKey}/user/all-users`
        );
        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data?.data?.users || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    
    setIsFiltering(true);
    setCurrentPage(page);
    
    // Scroll to top of user list
    window.scrollTo({
      top: document.getElementById('user-list-top').offsetTop - 100,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      setIsFiltering(false);
    }, 300);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="user-list-top">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Service Providers</h2>
          <p className="text-gray-500 mt-1">Find and connect with skilled professionals</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Loading Effect */}
      {(loading || isFiltering) && (
        <div className="flex justify-center items-center py-20">
          <Loading />
        </div>
      )}

      {/* Error Message */}
      {error && !loading && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* User List */}
      {!loading && !isFiltering && !error && (
        <>
          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
              {displayedUsers.map((user, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col"
                >
                  <div className="relative pb-[100%] bg-gray-100">
                    <Image
                      src={user?.profile_image || customProfile}
                      alt={`${user?.first_name || 'User'} ${user?.last_name || ''}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-t-lg"
                      onError={(e) => {
                        e.target.src = customProfile.src;
                      }}
                    />
                    {user?.is_verified && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {user?.first_name || 'User'} {user?.last_name || ''}
                    </h3>
                    
                    <div className="flex items-center mt-1 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} strokeWidth={1.5} />
                        ))}
                      </div>
                      <span className="text-gray-500 text-xs ml-1">(150)</span>
                    </div>
                    
                    {user?.specialization && (
                      <p className="text-gray-500 text-sm mb-3 line-clamp-1">
                        {user.specialization}
                      </p>
                    )}
                    
                    <div className="mt-auto space-y-2">
                      {user?.phone ? (
                        <a 
                          href={`tel:${user.phone}`} 
                          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-200"
                        >
                          <Phone size={16} />
                          <span>Call Now</span>
                        </a>
                      ) : (
                        <button 
                          disabled 
                          className="bg-gray-200 text-gray-500 py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm font-medium cursor-not-allowed w-full"
                        >
                          <Phone size={16} />
                          <span>No Phone</span>
                        </button>
                      )}
                      
                      <Link 
                        href={`/user-profile`}
                        className="border border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm font-medium transition-all duration-200"
                      >
                        <User size={16} />
                        <span>View Profile</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                <User className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? `No results for "${searchTerm}"` : "There are no users available at the moment."}
              </p>
              {searchTerm && (
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(startIndex + jobsPerPage, totalJobs)}
            </span>{" "}
            of <span className="font-medium">{totalJobs}</span> results
          </div>
          
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            
            {/* First page */}
            {currentPage > 3 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-3 py-1.5 text-sm rounded-md hover:bg-gray-100"
                >
                  1
                </button>
                {currentPage > 4 && (
                  <span className="px-2 py-1.5 text-gray-500">...</span>
                )}
              </>
            )}
            
            {/* Page numbers */}
            {[...Array(totalPages)].map((_, i) => {
              const pageNumber = i + 1;
              // Show current page and 1 page before and after
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-1.5 text-sm rounded-md ${
                      currentPage === pageNumber
                        ? "bg-blue-600 text-white font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              }
              // Show ellipsis for skipped pages
              if (
                (pageNumber === currentPage - 2 && pageNumber > 2) ||
                (pageNumber === currentPage + 2 && pageNumber < totalPages - 1)
              ) {
                return (
                  <span key={pageNumber} className="px-2 py-1.5 text-gray-500">
                    ...
                  </span>
                );
              }
              return null;
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </nav>
        </div>
      )}
    </section>
  );
};

export default Users;
