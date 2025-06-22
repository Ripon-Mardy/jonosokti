"use client";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 ${
            currentPage === i
              ? "bg-blue-600 text-white font-semibold border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 text-sm rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-blue-100 transition-all"
        >
          Prev
        </button>
      )}

      {renderPageNumbers()}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 text-sm rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-blue-100 transition-all"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
