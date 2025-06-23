
import React from "react";
import customProfile from "@/public/images/profile.jpg";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Star, User  } from "lucide-react";
import { FaStar } from "react-icons/fa6";

const UsersCard = ({image, first_name, last_name, address, userId}) => {
  return (
    <>
       <div
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            {/* image  */}
            <Image
              src={image || customProfile}
              alt={first_name || "profile image"}
            />
            {/* content  */}
            <div className="p-2 space-y-3 mb-1">
              <h2 className="text-base font-semibold text-textHeadingColor">
                {first_name || "Jhone"} {last_name || "Doe"} 
              </h2>
              <h2 className="text-xs flex items-center justify-start text-textColor gap-1">
                <MapPin size={15} /> {address || "Dhaka, Bangladesh"}
              </h2>
              {/* category  */}
              <div className="flex  flex-wrap gap-2">
                {['Electronics Service', 'Electric Service', 'Plumber'].slice(0, 2).map((cat, index) => (
                  <span
                    className="text-xs text-blue-800 p-0.5 px-2 rounded-full bg-gray-100"
                    key={index}
                  >
                    {cat}
                  </span>
                )) || "Electrician, Plumber"}
                {['Electronics Service', 'Electric Service', 'Plumber'].length > 2 && (
                  <span className="text-xs bg-gray-100 rounded-full px-2">
                    +{['Electronics Service', 'Electric Service', 'Plumber'].category?.length - 2} more
                  </span>
                )}
              </div>
              {/* star rating  */}
              <div className="flex items-center justify-start gap-2 text-textColor">
                <span className="text-xs flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" size={14} />
                  {image?.rating || 4}
                </span>
                <span className="text-xs text-textColor">
                  ({image?.reviews || 100} reviews)
                </span>
              </div>
              {/* contact info  */}
              <div>
                {/* {?.phone ? (
                  <a
                    href={`tel:${.phone}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
                  >
                    <Phone size={18} />
                    <span>Call Now</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-100 text-gray-400 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium cursor-not-allowed"
                  >
                    <Phone size={18} />
                    <span className="text-sm">No Phone</span>
                  </button>
                )} */}

                <Link
                  href={`/user-profile/${userId}`}
                  className="flex items-center justify-center p-2 border border-gray-50 rounded-md shadow gap-1 text-textColor text-xs md:text-sm hover:border-blue-700 transition duration-200 hover:text-blue-700"
                >
                  <User size={18} />
                  <span className="text-sm">View Profile</span>
                </Link>
              </div>
            </div>
          </div>
    </>
  );
};

export default UsersCard;
