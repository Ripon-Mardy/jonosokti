"use client";
import React, { useEffect, useState, useRef } from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import customProfile from "@/public/images/user.png";
import Link from "next/link";
import { Phone, User, Star, Loader2, Users } from "lucide-react";

import useOutsideClick from "@/hooks/useClickOutside";

import jsonUsers from "@/lib/Users.json";
import NoDataFound from "@/components/NoDataFound/NoDataFound";

const page = () => {
  const [formData, setFormData] = useState({ location: "" });
  const [filters, setFilters] = useState({
    location: "",
    category: "",
    rating: "",
  });
  const [filteredUsers, setFilteredUsers] = useState(jsonUsers);
  const [category, setCategory] = useState([]);
  const [users, setUsers] = useState([]);
  const [location, setLocation] = useState([]);
  const [filterdLocation, setFilteredLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // api key 
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const ref = useRef(null);
  // handle outside click to close the suggestion
  useOutsideClick(ref, () => setFilteredLocation([]));

  // handle filter
  const handleFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));

    const filterd = jsonUsers.filter((user) => {
      const matchLocation = type === "location"
      ? user?.address?.toLowerCase() === value.toLowerCase()
      : filters.location
      ? user?.address?.toLowerCase() === filters.location.toLowerCase()
      : true;

      const matchCategory = type === 'category'
      ? user?.category?.some((cat) => cat.toLowerCase() === value.toLowerCase())
      : filters.category 
      ? user?.category?.some((cat) => cat.toLowerCase() === filters.category.toLowerCase())
      : true;

      const matchRating = type === "rating"
      ? String(user?.rating) === String(value)
      : filters.rating
      ? String(user?.rating) === String(filters.rating)
      : true;

      return matchLocation && matchCategory && matchRating
    })
    setFilteredUsers(filterd);
  };

  // fetching data from api
  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const [categoryRes, userRes, locationRes] = await Promise.all([
          fetch(`${apiKey}/category/categories`),
          fetch(`${apiKey}/user/all-users`),
          fetch(`https://bdapi.vercel.app/api/v.1/district`),
        ]);

        if (!categoryRes.ok) {
          setError("category Response was not ok");
        }
        if (!userRes.ok) {
          setError("User response was not ok");
        }

        if (!locationRes.ok) {
          setError("Location response was not ok");
        }

        const categoryData = await categoryRes.json();
        const userData = await userRes.json();
        const locationData = await locationRes.json();

        setCategory(categoryData?.data);
        setUsers(userData?.data?.users);
        setLocation(locationData?.data);
      } catch (error) {
        setError(
          error instanceof error
            ? error.message
            : "An unexpected error occurred"
        );
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory(); // fetch data from api
  }, []);

  // handle location change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "location") {
      const filteredLocations = location.filter((loc) =>
        loc.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocation(filteredLocations);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-blue-500" size={48} />
          <p className="mt-4 text-gray-600">Loading experts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="xl:container xl:mx-auto px-2 pt-20 pb-20">
      <h2 className="text-lg md:text-2xl text-center font-semibold bg-bgColor py-1 md:py-2 rounded text-white">
        Hire Exparts
      </h2>
      {/* exparts  */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-9">
        {/* filter  */}
        <div
          className=" md:col-span-4 bg-white p-4 border border-borderInputColor rounded space-y-6 py-5 max-h-max"
          ref={ref}
        >
          <div className="space-y-2">
            <h2 className="text-base text-textColor font-medium">Location</h2>
            <div className="relative w-full border border-borderInputColor rounded flex items-center px-2 focus:border-borderFocusColor transition ">
              <span>
                <MapPin size={20} className="text-textColor" />
              </span>
              <input
                onChange={handleInputChange}
                name="location"
                type="text"
                className="relative w-full px-2 transition outline-none py-2 text-sm"
                placeholder="Location"
                value={formData.location}
              />
              {/* suggestions location  */}
              {filterdLocation.length > 0 && (
                <div
                  id="location-list"
                  className="absolute left-0 top-full w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto"
                  role="listbox"
                >
                  {filterdLocation.map((loc, index) => (
                    <div
                      key={index}
                      className="px-4 py-2.5 text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0 text-sm"
                      role="option"
                      aria-selected={formData.location === loc.name}
                      onClick={() => {
                        setFormData({ ...formData, location: loc.name });
                        setFilteredLocation([]);
                        handleFilter("location", loc.name);
                      }}
                    >
                      {loc.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-base font-medium text-textColor">Category</h2>
            <select
              className="w-full border border-borderInputColor py-2 rounded px-2 text-sm text-textColor outline-none"
              name="category"
              id=""
              onChange={(e) => handleFilter("category", e.target.value)}
            >
              <option selected value="">
                Select a category
              </option>
              {category?.map((cate, index) => (
                <div key={index}>
                  <option value={cate?.name}> {cate?.name} </option>
                </div>
              ))}
            </select>
          </div>

          {/* rating  */}
          <div className="space-y-1">
            <h2 className="text-base font-medium text-textColor">Rating</h2>
            <select
              name="rating"
              id=""
              className="w-full border border-borderInputColor py-2 rounded text-textColor px-2 text-sm outline-none"
              onChange={(e) => handleFilter("rating", e.target.value)}
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((item) => (
                <option value={item}> {item} Star </option>
              ))}
            </select>
          </div>
        </div>

        {/* exparts  */}
        <div className="md:col-span-8">
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div> {error} </div>
            ) : filteredUsers.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredUsers?.map((user, index) => (
                  <div key={index}>
                    <div
                      key={index}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 flex flex-col"
                    >
                      <div className="relative pb-[100%] bg-gray-100">
                        <Image
                          src={user?.profile_image || customProfile}
                          alt={`${user?.first_name || "User"} ${
                            user?.last_name || ""
                          }`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover rounded-t-lg"
                          onError={(e) => {
                            e.target.src = customProfile.src;
                          }}
                        />
                        {user?.is_verified && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="p-2 flex-grow flex flex-col">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {user?.name || "User"}
                        </h3>

                        <div className="flex items-center gap-1 flex-wrap mt-1 mb-3">
                          {user?.category.map((item, index) => (
                            <span
                              key={index}
                              className="text-xs text-textColor bg-[#EFF6FF] p-0.5 inline-block rounded-md px-3"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center mt-1 mb-3">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={i < 4 ? "currentColor" : "none"}
                                strokeWidth={1.5}
                              />
                            ))}
                          </div>
                          <span className="text-gray-500 text-xs ml-1">
                            (150)
                          </span>
                        </div>

                        <div>
                          {user.address }
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
                  </div>
                ))}
              </div>
            ) : (
              <NoDataFound
                icon={<Users size={30} />}
                text={"No Users Found"}
                subText={
                  " It looks like there are no users yet. Try adding one!"
                }
              />
            )}
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default page;
