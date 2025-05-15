"use client";
import React, { useState, useEffect } from "react";

const PaginationComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const limit = 10; // Items per page

  // Replace this with your API endpoint
  const apiUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "https://jono-db.onrender.com";

  // Fetch data from server
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem("authToken") || "your-token-here"; // Add your token logic
        const response = await fetch(`${apiUrl}/v1/job/all-jobs?page=${currentPage}&limit=${limit}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setItems(data.data.jobs || []);
        setTotalPages(data.data.total_page || 1);
        setTotalItems(data.data.total || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Generate pagination numbers
  const getPageNumbers = () => {
    const maxPagesToShow = 5; // Adjust this to show more or fewer numbers
    const pages = [];
    const half = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - half);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page !== "..." && page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Sample Data Display */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Items</h2>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          </div>
        ) : items.length > 0 ? (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item._id || item.id} className="p-2 bg-gray-50 rounded-md">
                {item.title || "No Title"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No items found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-all ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Prev
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  page === currentPage
                    ? "bg-blue-600 text-white shadow-lg"
                    : page === "..."
                    ? "bg-transparent text-gray-500 cursor-default"
                    : "bg-white text-blue-600 hover:bg-blue-100 shadow-md"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-all ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Info */}
      {totalItems > 0 && (
        <p className="mt-4 text-sm text-gray-600">
          Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalItems)} of{" "}
          {totalItems} items
        </p>
      )}
    </div>
  );
};

export default PaginationComponent;