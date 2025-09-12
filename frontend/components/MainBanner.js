"use client";
import React, { useEffect, useRef, useState } from "react";
import { List, MapPin } from "lucide-react";

import useOutsideClick from "@/hooks/useClickOutside";
import { useRouter } from "next/navigation";

const MainBanner = () => {
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [showDropdown, setshowDropdown] = useState(false);
  const [filteredLocation, setFilteredLocation] = useState([]);
  const [serchTerm, setSearchTerm] = useState("");
  const [categoryValue, setCategoryValue] = useState('')

  const router = useRouter();

  // api key
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // outside click to hide dropdown
  const locationRef = useRef(null);
  useOutsideClick(locationRef, () => setshowDropdown(false));

  // fetcing category and location 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, locationsRes] = await Promise.all([
          fetch(`${apiKey}/category/categories`),
          fetch(`https://bdapi.vercel.app/api/v.1/district`),
        ]);

        if (!categoriesRes.ok || !locationsRes.ok) {
          throw new Error("Failed to fetch categories or locations");
        }

        const categoriesData = await categoriesRes.json();
        const locationData = await locationsRes.json();

        setCategory(categoriesData?.data || []);
        setLocation(locationData?.data || []);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  // filtered location
  useEffect(() => {
    if (!serchTerm.trim()) {
      setFilteredLocation(location);
    } else {
      setFilteredLocation(
        location.filter((loc) =>
          loc?.name.toLowerCase().includes(serchTerm.toLowerCase())
        )
      );
    }
  }, [location, serchTerm]);

  // handle find service submit   
  const handleFinderserviceSubmit = (e) => {
    e.preventDefault()

    router.push(`/exparts?location=${encodeURIComponent(serchTerm)}&category=${encodeURIComponent(categoryValue)}`)
  }

  return (
    <div className="bg-heroImage relative after:content-[''] after:absolute after:inset-0 after:bg-black after:bg-opacity-50 after:z-10 bg-cover bg-no-repeat bg-fixed bg-top py-10 pb-28">
      <div className="xl:container xl:mx-auto relative px-2 xl:px-0 pt-20 z-20">
        {/* title  */}
        <div className="text-center text-white space-y-3">
          <h2 className="text-white font-bold text-3xl sm:text-5xl mx-auto sm:max-w-3xl">
            Find Trusted
            <b className="text-textBannerColor font-bold">Service Providers</b>
            Near You
          </h2>
          <p className="text-white text-center max-w-sm mx-auto sm:max-w-xl text-sm sm:text-base">
            Connect with skilled professionals for all your home and personal
            service needs. Quality service, verified providers, instant booking.
          </p>
        </div>

        {/* search bar  */}
        <form onSubmit={handleFinderserviceSubmit} className=" bg-white p-3 md:p-5 rounded-md flex items-center justify-center flex-col sm:max-w-4xl mx-auto sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-8">
          <div ref={locationRef} className="relative w-full max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <MapPin className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={serchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setshowDropdown(true)}
              className="w-full pl-12 pr-4 py-3 text-textHeadingColor border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition text-sm"
              placeholder="Where service you want"
              required
            />

            {/* show location cites  */}
            {showDropdown && (
              <div className="absolute left-0 top-full bg-white w-full space-y-1 max-h-52 overflow-y-auto border border-borderInputColor rounded-md p-1">
                {filteredLocation.length > 0 ? (
                  filteredLocation.map((loc, index) => (
                    <p
                      onClick={() => {
                        setSearchTerm(loc?.name);
                        setshowDropdown(false);
                      }}
                      key={index}
                      className="p-1 text-sm text-textHeadingColor font-medium cursor-pointer hover:bg-gray-100"
                    >
                      {loc?.name}
                    </p>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500 text-sm">
                    No locations found
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative w-full">
            <select
              className="w-full border border-gray-300 rounded-md py-3 outline-none pl-12 pr-4 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition text-sm"
              onChange={(e) => setCategoryValue(e.target.value)}
              required
            >
              <option selected>All Services</option>
              {category?.map((item) => (
                <div>
                  <option
                    key={item._id}
                    className="rounded-md"
                    value={item?.name}
                  >
                    {item.name}
                  </option>
                </div>
              ))}
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <List className="w-5 h-5" />
            </span>
          </div>

          <button type="submit" className="bg-bgColor text-sm text-center hover:bg-hoverBg transition text-white font-medium rounded-md w-full py-2 sm:py-3 sm:w-1/2">
            Find Services
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainBanner;