"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import defaultProfile from "@/public/Image/profile.png";

const Page = () => {
  const [users, setUsers] = useState([]); // all users
  const [isLoading, setIsLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state
  const [selectedUser, setSelectedUser] = useState(null); // single user select
  const [searchTerm, setSearchTerm] = useState(""); // search term
  const apiUrl = process.env.ADMIN_URL; // admin api url

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filtered users based on search term
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // Fetching users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${apiUrl}/user/all-users`);
        const data = await res.json();
        setUsers(data?.data?.users);
      } catch (error) {
        setError("Failed to fetch Users");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle details
  const handleDetails = (user) => {
    setSelectedUser(user);
  };

  // Close popup
  const closePopup = () => {
    setSelectedUser(null);
  };

  const gotToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const gotToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white p-3 rounded">
      <h2 className="text-xl -tracking-tighter text-gray-800 font-bold">
        Users
      </h2>
      {/* search input */}
      <div className="my-2 mt-4">
        <input
          className="w-full text-textColor p-2 border border-gray-200 rounded outline-none focus:border-gray-400"
          type="search"
          placeholder="Search by name ...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Error state */}
      {error && <p>Error: {error} </p>}

      {/* Users table wrapper */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : filteredUsers.length === 0 ? (
          <div className="py-6 text-center text-gray-500 text-lg font-medium">
            No data available
          </div>
        ) : (
          <table className="w-full border border-collapse table-auto border-spacing-y-4 p-2">
            {/* Table Head */}
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left px-4 text-base text-headingColor p-2">
                  Image
                </th>
                <th className="text-left px-4 text-base text-headingColor p-2">
                  Name
                </th>
                <th className="text-left px-4 text-base text-headingColor p-2">
                  Phone
                </th>
                <th className="text-left px-4 text-base text-headingColor p-2">
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {currentItems.map((user, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 text-textColor text-sm font-medium flex items-center gap-2">
                    <Image
                      src={user?.image || defaultProfile}
                      className="rounded-full w-16 h-16 object-cover p-2"
                      width={50}
                      height={50}
                      alt={user?.first_name}
                    />
                  </td>
                  <td className="px-4 text-textColor text-sm font-medium p-2">
                    {user?.first_name} {user?.last_name}
                  </td>
                  <td className="px-4 text-textColor text-sm font-medium p-2">
                    {user?.phone}
                  </td>
                  <td>
                    <span
                      onClick={() => handleDetails(user)}
                      className="text-xs cursor-pointer bg-successBg text-white px-4 rounded py-1 w-fit p-2"
                    >
                      Details
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* user Popup Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <Image
                src={selectedUser?.image || defaultProfile}
                className="rounded-full w-20 h-20 object-cover"
                width={80}
                height={80}
                alt={selectedUser?.first_name}
              />
              <h3 className="text-lg font-bold mt-4">
                {selectedUser?.first_name} {selectedUser?.last_name}
              </h3>
              <p className="text-gray-600">{selectedUser?.email}</p>
              <p className="text-gray-600">{selectedUser?.phone}</p>
              <p className="text-gray-600 mt-2">{selectedUser?.status}</p>
              <p className="text-gray-600 mt-2">{selectedUser?.address}</p>
            </div>
          </div>
        </div>
      )}

      {/* users pagination */}
      {filteredUsers.length > 20 && (
        <div className="flex items-center justify-between mt-4 w-1/2 mx-auto">
          <button
            onClick={gotToPreviousPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-successBg text-white hover:bg-successBg/90"
            } `}
          >
            <ChevronLeft size={16} />
          </button>
          <span>
            page {currentPage} of {totalPages}
          </span>
          <button
            onClick={gotToNextPage}
            className={`flex items-center gap-1 px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-successBg text-white hover:bg-successBg/90"
            } `}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
