import React from "react";
import userImage from "@/public/images/user.png"
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, User   } from "lucide-react";

const Users = ({user}) => {
  return (
    <section>
      <div className="bg-white w-fit">
        <div className=" flex md:block">
          {/* Profile Image */}
          <div className="relative w-full rounded-md">
            <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200">
              <Image
                src={userImage}
                alt={`${user?.name || "User"}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 w-full"
                onError={(e) => {
                  e.target.src = customProfile.src;
                }}
              />

              {/* Verification Badge */}
              {user?.is_verified && (
                <div className="absolute top-3 right-3 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                  <Shield size={16} />
                </div>
              )}

              {/* Online Status */}
              {user?.is_online && (
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  Online
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-2 md:p-5 space-y-4 w-full">
            {/* Name and Location */}
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">
                {user?.name || "Professional"}
              </h3>
              <div className="flex items-center gap-1 text-gray-600 text-xs">
                <MapPin size={14} />
                <span>{user?.address || user?.location || "Dhaka"}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {user?.category?.slice(0, 2).map((cat, catIndex) => (
                <span
                  key={catIndex}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {cat}
                </span>
              )) || (
                <>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    Electrician
                  </span>
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    Repair
                  </span>
                </>
              )}
              {user?.category?.length > 2 && (
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                  +{user.category.length - 2} more
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">4.5</div>
              <span className="text-sm text-gray-600">
                {user?.rating ? user.rating.toFixed(1) : "4.5"}
              </span>
              {/* <span className="text-xs text-gray-500">
                                ({user?.reviews_count || "150"} reviews)
                              </span> */}
            </div>

            {/* Experience */}
            {/* {user?.experience && (
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <Clock size={14} />
                                <span>{user.experience} years experience</span>
                              </div>
                            )} */}

            {/* Specialization */}
            {user?.specialization && (
              <p className="text-gray-600 text-sm line-clamp-2">
                {user.specialization}
              </p>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 hidden md:block">
              {user?.phone ? (
                <a
                  href={`tel:${user.phone}`}
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
              )}

              <Link
                href={`/user-profile/${user?.id || ""}`}
                className="w-full border-2 border-gray-100 hover:border-blue-500 hover:text-blue-600 text-gray-700 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-200 hover:bg-blue-50"
              >
                <User size={18} />
                <span className="text-sm">View Profile</span>
              </Link>
            </div>
          </div>
        </div>
        {/* mobile actions buttons  */}
        {/* Action Buttons */}
        <div className="space-y-2 pt-2 px-3 pb-2 md:hidden">
          {user?.phone ? (
            <a
              href={`tel:${user.phone}`}
              className="w-full bg-gray-100 text-gray-400 py-2 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed text-xs font-medium"
            >
              <Phone size={18} />
              <span>Call Now</span>
            </a>
          ) : (
            <button
              disabled
              className="w-full bg-gray-100 text-gray-400 py-2 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed text-xs font-medium"
            >
              <Phone size={18} />
              <span className="text-xs">No Phone</span>
            </button>
          )}
          <Link
            href={`/user-profile/${user?.id || ""}`}
            className="w-full text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed text-xs bg-bgColor font-medium"
          >
            <User size={18} />
            <span className="text-xs text-white">View Profile</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Users;
