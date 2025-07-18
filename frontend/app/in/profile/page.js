"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Send,
  Share2,
  X,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash,
  Camera,
} from "lucide-react";
import { FaStar } from "react-icons/fa6";
import coverImage from "@/public/images/jonosokti_cover.jpeg";
import userImage from "@/public/images/profile.jpg";

const page = () => {
  
  const [bannerImage, setBannerImage] = useState(coverImage); // state for banner image
  const [editCoverImage, setEditCoverImage] = useState(false);
  const [editProfileImage, setEditProfileImage] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [userData, setUserData] = useState(null);
  console.log("user data", JSON.stringify(userData));
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    setUserData(userData);
  }, []);

  // for popup scroll
  useEffect(() => {
    document.body.style.overflow =
      editCoverImage || editProfileImage ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editCoverImage, editProfileImage]);

  return (
    <div className="xl:container xl:mx-auto px-2 xl:px-0 mt-20 pb-20">
      {error && <div className=""> {error} </div>}
      <div className="w-full md:w-3/4">
        {/* Profile Card */}
        <div className="bg-white rounded border border-gray-200 pb-5">
          {/* Cover Image */}
          <div className="relative">
            <div className="relative w-full h-40 md:h-64 lg:h-72">
              <Image
                src={bannerImage}
                alt="Cover Image"
                layout="fill"
                objectFit="cover"
                className="rounded-t-md"
              />
              <span
                onClick={() => setEditCoverImage(!editCoverImage)}
                className="absolute right-2 top-2 bg-white p-2 rounded-full cursor-pointer group-hover"
              >
                <Pencil className="text-blue-800 w-5 h-5 group-hover:text-black" />
              </span>
            </div>
            <div
              onClick={() => setEditProfileImage(!editProfileImage)}
              className="absolute left-3 -bottom-12 w-24 h-24 md:w-40 md:h-40 border-4 border-white rounded-full shadow-lg cursor-pointer"
            >
              <Image
                src={userImage}
                alt="profile image"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-14 md:mt-16">
            <div className="mt-12 md:mt-16 px-2">
              <div className="md:flex md:items-center justify-start leading-5">
                <div className="flex gap-3 items-center justify-start">
                  <h2 className="text-xl md:text-2xl font-semibold text-textHeadingColor  ">
                    Axel Mardy
                  </h2>
                  <Link
                    href={"#"}
                    className="flex items-center justify-center gap-1 text-xs text-blue-600 hover:bg-blue-100 transition font-medium border border-blue-800 rounded-full px-2 py-0.5 border-dashed"
                  >
                    <ShieldCheck size={18} /> Add verification badge
                  </Link>
                </div>
                <span
                  onClick={() => setShowSharePopup(true)}
                  className="cursor-pointer text-paraColor pr-5 hover:text-gray-900 transition "
                  title="Share"
                >
                  {/* <Share2 size={22} className="hidden md:block" /> */}
                </span>
              </div>

              <div className="md:mt-4">
                {/* services  */}
                <div className="flex items-center justify-start flex-wrap text-sm md:text-base gap-2 text-black90 font-normal leading-4 mb-2">
                  {[
                    "Cleaning Service",
                    "Electric Service",
                    "Electronics Service",
                  ].map((name, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium"
                    >
                      {name}
                    </span>
                  ))}
                </div>

                {/* star rating  */}
                <div className="flex items-center justify-start gap-2">
                  <span className="text-sm text-textColor flex items-center justify-center font-medium gap-1">
                    <FaStar className="text-yellow-500" size={16} />4
                  </span>
                  <span className="text-xs text-textColor font-medium">
                    reviews
                  </span>
                </div>

                <span className="text-sm mt-1 block text-paraColor font-normal">
                  dinajpur bangladesh
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* about me  */}
        <div className="bg-white p-4 rounded border border-borderInputColor mt-4">
          <h1 className="text-xl mb-4 font-semibold text-textHeadingColor ">
            About
          </h1>
          <p className="text-textColor leading-6 text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non atque
            eos rem consequuntur architecto quos, itaque culpa perferendis ex
            dignissimos voluptatem commodi illum eaque! Deserunt dolores,
            officia et quas quia expedita blanditiis suscipit laudantium nobis
            mollitia repudiandae nostrum minus. Unde tempora officiis eos modi
            ut aspernatur aperiam in id quisquam?
          </p>
        </div>
      </div>

      {/* edit banner cover image  */}
      {editCoverImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
          <div className="bg-white w-full max-w-2xl rounded-lg py-5 space-y-3">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-textHeadingColor font-semibold text-base md:text-lg">
                Cover image
              </h2>
              <span
                onClick={() => setEditCoverImage(!editCoverImage)}
                className="bg-gray-100 p-2 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </span>
            </div>
            <Image src={coverImage} className="w-full h-52" alt="cover image" />
            <div className="mt-8 flex items-center justify-between gap-2 px-4">
              <button className="text-sm font-semibold text-paraColor hover:text-textHeadingColor rounded-md px-2 p-1">
                Delete photo
              </button>
              <div className="space-x-4">
                <button className="p-1 px-4 rounded-md text-sm border border-gray-300 text-paraColor hover:text-textHeadingColor font-semibold">
                  Change photo
                </button>
                <button className="bg-bgColor hover:bg-hoverBg transition-all text-white p-1 px-4 rounded-md text-sm">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* edit main profile picture  */}
      {editProfileImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4 z-50">
          <div className="max-w-2xl bg-white rounded-md w-full py-5">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-textHeadingColor font-semibold text-base md:text-lg">
                Profile photo
              </h2>
              <span
                onClick={() => setEditProfileImage(!editProfileImage)}
                className="bg-gray-100 p-2 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </span>
            </div>
            <Image
              src={userImage}
              className="w-52 h-52 mx-auto rounded-full"
              alt="profile image"
            />

            <div className="mt-8 w-full flex flex-col sm:flex-row items-center justify-between px-4 border-t border-gray-200 pt-5 gap-4 sm:gap-0">
              {/* Delete Button */}
              <div className="w-full sm:w-fit text-sm font-semibold text-paraColor hover:text-textHeadingColor rounded-md hover:bg-gray-100 transition-all px-2 p-2 flex items-center justify-center">
                <Trash className="w-5 h-5 mr-2" />
                Delete photo
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <button className="w-full sm:w-auto p-2 px-4 rounded-md text-sm text-paraColor hover:text-textHeadingColor font-semibold flex items-center justify-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Change photo
                </button>
                <button className="w-full sm:w-auto bg-bgColor hover:bg-hoverBg transition-all text-white p-2 px-4 rounded-md text-sm">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
