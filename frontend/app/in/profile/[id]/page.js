"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import defaultProfile from "@/public/images/profile.jpg";
import { FaStar } from "react-icons/fa";
import {
  CircleCheck,
  Clock3,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Globe,
  ShieldCheck,
  UserCheck,
  X,
  User,
  Pencil,
} from "lucide-react";

// image
import image1 from "@/public/images/gallery/1.jpg";
import image2 from "@/public/images/gallery/2.jpg";
import image3 from "@/public/images/gallery/3.jpg";
import image4 from "@/public/images/gallery/4.jpg";

const page = ({ params }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [authToken, setIsAuthTokn] = useState("");
  const [storeduser, setStoredUser] = useState([]);
  const [error, setError] = useState("");
  const [isAboutPopUp, setIsAboutPopUp] = useState(false);

  const router = useRouter();
  const isLoggedin = authToken;

  // api key
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  // userId
  const userId = params.id;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "services", label: "Services" },
    { id: "reviews", label: "Reviews" },
    { id: "gallery", label: "Gallery" },
  ];

  const galleryImage = [image1, image2, image3, image4];

  // authtoken or login user data
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const storedUserData = localStorage.getItem("user");
    setStoredUser(storedUserData);
    setIsAuthTokn(authToken);
  }, [authToken]);

  // get single users
  useEffect(() => {
    const getSingleUser = async () => {
      try {
        const res = await fetch(`${apikey}/user/get-user?id=${userId}`);

        if (!res.ok) {
          setError("Failed to fetch user");
        }

        const userData = await res.json();
        setUser(userData?.data || []);
      } catch (error) {
        console.log("error", error);
      }
    };

    getSingleUser();
  }, []);

  return (
    <div className="xl:container xl:mx-auto px-2 xl:px-0 py-24">
      {/* Left side info */}

      <div className="md:grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          {/* left side left info  */}
          <div className="flex flex-col md:flex-row items-start gap-8 bg-white border border-gray-100 shadow rounded-md p-3">
            <div className="w-40 h-auto flex items-center justify-start flex-col">
              {/* Profile Image Preview */}
              <Image
                alt="User"
                src={defaultProfile}
                className="rounded-md object-cover"
                width={192}
                height={192}
              />

              {/* File Input */}
              <label className="text-sm mt-5 bg-yellow-300 hover:bg-yellow-400 transition font-semibold px-3 py-1 rounded-md text-textHeadingColor hover:text-gray-900 cursor-pointer">
                Select Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>

            {/* Right side info */}
            <div className="space-y-2 md:space-y-1 w-full">
              {/* Name + verification */}
              <div className="flex items-center justify-between w-full mb-4">
                <div className="flex items-center justify-center gap-2">
                  <User className="w-6 h-6" />
                  <h2 className="text-2xl text-textHeadingColor font-semibold">
                    About Me
                  </h2>
                </div>
                <Pencil
                  onClick={() => setIsAboutPopUp(true)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              <div className=" space-y-4">
                <div className="block space-y-2">
                  <label
                    className="block text-textColor font-medium text-base"
                    htmlFor="fist_name"
                  >
                    First Name *
                  </label>
                  <div className="flex items-center p-3 rounded-md border border-gray-300 bg-gray-50 focus-within:border-blue-500 transition">
                    <User className="w-5 h-5 text-textColor" />
                    <input
                      type="text"
                      className="text-base pl-3 w-full outline-none bg-transparent text-textColor"
                      value={user?.first_name}
                      disabled
                    />
                  </div>
                </div>
                <div className="block space-y-2">
                  <label
                    className="block text-base text-textColor"
                    htmlFor="fist_name"
                  >
                    Last Name *
                  </label>
                  <div className="flex  p-3 rounded-md border border-gray-300 focus-within:border-blue-500 transition">
                    <User className="w-5 h-5 text-textColor" />
                    <input
                      type="text"
                      className="text-base pl-2 w-full outline-none "
                      value={user?.last_name}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* about pop up  */}

          {isAboutPopUp && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
              <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-lg space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold text-textHeadingColor">
                    About Me
                  </h2>
                  <X
                    onClick={() => setIsAboutPopUp(false)}
                    className="w-6 h-6 text-textColor cursor-pointer"
                  />
                </div>
                {/* First Name */}
                <div className="space-y-2">
                  <label
                    className="block text-textColor font-medium text-base"
                    htmlFor="first_name"
                  >
                    First Name *
                  </label>
                  <div className="flex items-center p-3 rounded-md border border-gray-300 bg-gray-50 focus-within:border-blue-500 transition">
                    <User className="w-5 h-5 text-gray-500" />
                    <input
                      id="first_name"
                      type="text"
                      className="text-base pl-3 w-full outline-none bg-transparent text-gray-700"
                      value={user?.first_name}
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label
                    className="block text-textColor font-medium text-base"
                    htmlFor="last_name"
                  >
                    Last Name *
                  </label>
                  <div className="flex items-center p-3 rounded-md border border-gray-300 bg-gray-50 focus-within:border-blue-500 transition">
                    <User className="w-5 h-5 text-gray-500" />
                    <input
                      id="last_name"
                      type="text"
                      className="text-base pl-3 w-full outline-none bg-transparent text-gray-700"
                      value={user?.last_name}
                    />
                  </div>
                </div>
                {/* Buttons */}
                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    onClick={() => setIsAboutPopUp(false)}
                    className="px-4 py-2 rounded-md bg-gray-200 text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-blue-600 text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* left  side right info  */}

          <div className="bg-white shadow-md rounded-md py-5 my-10">
            {/* tabls  */}
            <div className="flex items-center justify-start gap-5 border-b border-gray-300 px-3">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-sm md:text-base text-textColor font-medium pb-3 hover:text-textBannerColor ${
                    activeTab === tab.id
                      ? "text-gray-900 border-b-2 border-borderFocusColor"
                      : "text-textColor"
                  }`}
                >
                  {tab?.label}
                </button>
              ))}
            </div>

            {/* tabs details  */}
            <div>
              {/* overview  */}
              {activeTab === "overview" && (
                <div className="p-2 md:p-5 mt-5">
                  {/* about  */}
                  <div>
                    <h2 className="text-xl font-semibold text-textHeadingColor">
                      About {user?.first_name} {user?.last_name}
                    </h2>
                    <p className="text-base text-textColor my-4">
                      I am a professional electronics technician with over 8
                      years of experience in repairing smartphones, tablets, and
                      other electronic devices. I specialize in screen repairs,
                      battery replacements, and software troubleshooting. My
                      goal is to provide quick, reliable, and affordable repair
                      services to keep your devices running smoothly.
                    </p>
                  </div>

                  {/* Professional Details & certifications  */}
                  <div className="grid md:grid-cols-2 gap-6 md:gap-4 mt-8">
                    {/* professional Details  */}
                    <div>
                      <h2 className="text-lg text-textHeadingColor font-semibold">
                        Professional Details
                      </h2>
                      <div className="space-y-2 mt-2">
                        <span className="flex items-center justify-start gap-2 text-base text-textColor">
                          <Calendar className="w-3 h-3" /> Experience: 8 years
                        </span>
                        <span className="flex items-center justify-start gap-2 text-base text-textColor">
                          <Globe className="w-3 h-3" /> Languages: Bengali,
                          English
                        </span>
                        <span className="flex items-center justify-start gap-2 text-base text-textColor">
                          <UserCheck className="w-3 h-3" /> Member since:
                          January 2020
                        </span>
                      </div>
                    </div>
                    {/* certificatioins  */}
                    <div>
                      <h2 className=" md:text-lg text-textHeadingColor font-semibold">
                        Certifications
                      </h2>
                      <div className="space-y-2 mt-2">
                        <span className="flex items-center justify-start gap-2 text-base text-textColor">
                          <ShieldCheck className="w-3 h-3 text-green-500" />
                          Electronics Repair Certified
                        </span>
                        <span className="flex items-center justify-start gap-2 text-base text-textColor">
                          <ShieldCheck className="w-3 h-3 text-green-500" />
                          Mobile Device Specialist
                        </span>
                        <span className="flex items-center justify-start gap-2 text-base text-textColor">
                          <ShieldCheck className="w-3 h-3 text-green-500" />
                          Customer Service Excellence
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* working hours  */}
                </div>
              )}

              {/* Services  */}
              {activeTab === "services" && (
                <div className="mt-5 p-2 md:p-5">
                  <h2 className="text-xl font-semibold text-textHeadingColor">
                    Services & Pricing
                  </h2>
                  {/* services  */}
                  <div className="mt-5 space-y-5">
                    <div className="p-3 rounded-md shadow-md border border-gray-100 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-lg font-semibold text-textHeadingColor">
                          Screen Repair
                        </h2>
                        <span className="text-sm text-blue-500 font-semibold">
                          ৳500 - ৳800
                        </span>
                      </div>
                      <p className="text-sm md:text-base text-textColor">
                        Professional screen replacement for all smartphone
                        models
                      </p>
                      <span className="text-textColor flex items-center justify-start gap-1 text-sm">
                        {" "}
                        <Clock3 className="w-3 h-3" /> Duration: 1-2 hours{" "}
                      </span>
                    </div>

                    <div className="p-3 rounded-md shadow-md border border-gray-100 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm md:text-lg font-semibold text-textHeadingColor">
                          Screen Repair
                        </h2>
                        <span className="text-sm text-blue-500 font-semibold">
                          ৳500 - ৳800
                        </span>
                      </div>
                      <p className="text-base text-textColor">
                        Professional screen replacement for all smartphone
                        models
                      </p>
                      <span className="text-textColor flex items-center justify-start gap-1 text-sm">
                        {" "}
                        <Clock3 className="w-3 h-3" /> Duration: 1-2 hours{" "}
                      </span>
                    </div>

                    <div className="p-3 rounded-md shadow-md border border-gray-100 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm md:text-lg font-semibold text-textHeadingColor">
                          Screen Repair
                        </h2>
                        <span className="text-sm text-blue-500 font-semibold">
                          ৳500 - ৳800
                        </span>
                      </div>
                      <p className="text-sm md:text-base text-textColor">
                        Professional screen replacement for all smartphone
                        models
                      </p>
                      <span className="text-textColor flex items-center justify-start gap-1 text-sm">
                        {" "}
                        <Clock3 className="w-3 h-3" /> Duration: 1-2 hours{" "}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* reviews  */}
              {activeTab === "reviews" && (
                <div className="p-2 md:p-5 mt-5">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-xl font-semibold text-textHeadingColor">
                      Customer Reviews
                    </h2>
                    <span className="flex items-center justify-start gap-2">
                      {" "}
                      <FaStar className="w-4 h-4 text-yellow-500" />{" "}
                      <span className="font-bold">4.9</span> (3 reviews){" "}
                    </span>
                  </div>
                  {/* reviews  */}
                  <div className="mt-5 space-y-4 bg-white p-3 rounded-md shadow-md border border-borderInputColor">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h2 className="text-base md:text-lg font-semibold text-textHeadingColor">
                          Roben Baskey
                        </h2>
                        <span className="text-yellow-500 flex items-center justify-start gap-2 text-sm">
                          {" "}
                          <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />{" "}
                        </span>
                      </div>
                      <span className="text-sm text-textColor">2 days ago</span>
                    </div>
                    <p className="text-sm md:text-base text-textColor">
                      Roben is very skilled. Replaced my battery and phone works
                      like new. Highly recommended!
                    </p>
                  </div>

                  <div className="mt-5 space-y-4 bg-white p-3 rounded-md shadow-md border border-borderInputColor">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h2 className="text-base md:text-lg font-semibold text-textHeadingColor">
                          Roben Baskey
                        </h2>
                        <span className="text-yellow-500 flex items-center justify-start gap-2 text-sm">
                          {" "}
                          <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />{" "}
                        </span>
                      </div>
                      <span className="text-sm text-textColor">2 days ago</span>
                    </div>
                    <p className="text-sm md:text-base text-textColor">
                      Roben is very skilled. Replaced my battery and phone works
                      like new. Highly recommended!
                    </p>
                  </div>

                  <div className="mt-5 space-y-4 bg-white p-3 rounded-md shadow-md border border-borderInputColor">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h2 className="text-base md:text-lg font-semibold text-textHeadingColor">
                          Roben Baskey
                        </h2>
                        <span className="text-yellow-500 flex items-center justify-start gap-2 text-sm">
                          {" "}
                          <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />{" "}
                        </span>
                      </div>
                      <span className="text-sm text-textColor">2 days ago</span>
                    </div>
                    <p className="text-sm md:text-base text-textColor">
                      Roben is very skilled. Replaced my battery and phone works
                      like new. Highly recommended!
                    </p>
                  </div>
                </div>
              )}

              {/* gallery  */}
              {activeTab === "gallery" && (
                <div className="mt-5 p-2 md:p-5">
                  <h1 className="text-xl font-semibold text-textHeadingColor">
                    Work Gallery
                  </h1>
                  {/* gallery  */}
                  <div className="grid grid-cols-2 gap-4 mt-5">
                    {galleryImage.map((img, index) => (
                      <Image
                        key={index}
                        src={img}
                        className="rounded-md"
                        alt="work-gallery"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* right side info  */}
        <div className="md:col-span-1  h-fit">
          <div className="bg-white shadow-md p-3 rounded-md h-auto">
            <h2 className="text-lg font-semibold md:font-bold">
              Contact Information
            </h2>
            <div className="mt-3 space-y-3">
              <div className="bg-gray-100 p-1 px-3 rounded-md py-3 flex flex-wrap items justify-between gap-1">
                <span className=" flex items-center justify-start gap-2 text-sm text-textColor font-semibold">
                  <Phone className="w-4 h-4" /> +880-1712-345678
                </span>

                {isLoggedin ? (
                  <Link
                    href={`tel:${user?.phone}`}
                    className="flex items-center justify-start gap-1 bg-callButtonColor p-1 rounded-md text-white text-sm px-4"
                  >
                    <Phone className="w-3 h-3" />
                    Call
                  </Link>
                ) : (
                  <Link
                    href={"#"}
                    className="flex items-center justify-start gap-1 bg-callButtonColor p-1 rounded-md text-white text-sm px-4"
                  >
                    <Phone className="w-3 h-3" />
                    Login to Call
                  </Link>
                )}
              </div>
              <span className="bg-gray-100 p-1 px-3 rounded-md py-3 flex items-center justify-start gap-2 text-sm text-textColor font-medium">
                <MapPin className="w-4 h-4" /> Dhanmondi, Dhaka
              </span>
              <span className=" bg-gray-100 p-1 px-3 rounded-md py-3 flex items-center justify-start gap-2 text-sm text-textColor font-medium">
                <Calendar className="w-4 h-4" /> Responds in 30 mins
              </span>
            </div>
          </div>

          {/* Quick Stats  */}
          <div className="bg-white p-2 md:p-5 rounded-md border border-borderInputColor mt-9">
            <h2 className="text-lg text-textHeadingColor font-semibold">
              Quick Stats
            </h2>

            <div className="grid grid-cols-2 gap-10 mt-5 ">
              <div className="flex flex-col items-center justify-center bg-[#EFF6FF] py-5 rounded-md">
                <span className=" text-xl font-bold text-[#2563EB]">4.9</span>
                <span className="text-textColor text-base font-medium">
                  Rating
                </span>
              </div>

              <div className="flex flex-col items-center justify-center bg-[#F0FDF4] py-5 rounded-md">
                <span className=" text-xl font-bold text-[#16A34A]">142</span>
                <span className="text-textColor text-base font-medium">
                  Jobs Done
                </span>
              </div>

              <div className="flex flex-col items-center justify-center bg-[#FFF7ED] py-5 rounded-md">
                <span className=" text-xl font-bold text-[#EA580C]">
                  8 years
                </span>
                <span className="text-textColor text-base font-medium">
                  Experience
                </span>
              </div>

              <div className="flex flex-col items-center justify-center bg-[#FAF5FF] py-5 rounded-md">
                <span className=" text-xl font-bold text-[#9333EA]">3</span>
                <span className="text-textColor text-base font-medium">
                  Reviews
                </span>
              </div>
            </div>
          </div>

          {/* Emergency services  */}
          <div className="border border-red-300 rounded-md shadow p-3 md:p-5 mt-5 bg-[#FAF5FF] space-y-3">
            <h2 className="text-xl font-semibold text-red-700">
              Emergency Service 
            </h2>
            <p className="text-base text-red-500">
              Need urgent repair? Call directly for emergency service.
            </p>
            <Link
              href={`tel:${user?.phone}`}
              className=" w-full py-2 rounded-md font-medium bg-red-700 hover:bg-red-800 transition flex items-center justify-center gap-2 text-red-200"
            >
              <Phone className="w-4 h-4 text-red-200" /> Emergency Call
            </Link>
          </div>
        </div>

        {/* book sevices popup  */}
        {isBooking && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md p-5 rounded-md shadow-md h-auto overflow-y-auto">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-textHeadingColor">
                  Book Service
                </h2>
                <X
                  onClick={() => setIsBooking(!isBooking)}
                  className="w-4 h-4 text-textColor cursor-pointer"
                />
              </div>

              <div className="mt-5 space-y-4">
                {/* service type  */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="type"
                    className="text-textColor font-medium text-sm"
                  >
                    Service Type
                  </label>
                  <select
                    id="type"
                    className="w-full py-2 px-2 outline-none border border-borderInputColor rounded-md text-base text-textHeadingColor"
                    required
                  >
                    <option value="Battery ReplaceMent">
                      Battery Replacement - $500 - $600{" "}
                    </option>
                    <option value="Battery ReplaceMent">
                      Battery Replacement - $500 - $600{" "}
                    </option>
                    <option value="Battery ReplaceMent">
                      Battery Replacement - $500 - $600{" "}
                    </option>
                    <option value="Battery ReplaceMent">
                      Battery Replacement - $500 - $600{" "}
                    </option>
                    <option value="Battery ReplaceMent">
                      Battery Replacement - $500 - $600{" "}
                    </option>
                  </select>
                </div>
                {/* preferred date  */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="date"
                    className="text-textColor font-medium text-sm"
                  >
                    Preferred Date
                  </label>
                  <input
                    id="date"
                    className="w-full py-2 px-2 outline-none border border-borderInputColor rounded-md text-base text-textHeadingColor"
                    type="date"
                  />
                </div>
                {/* Preferred Time  */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="time"
                    className="text-textColor font-medium text-sm"
                  >
                    Preferred Time
                  </label>
                  <select
                    id="time"
                    className="w-full py-2 px-2 outline-none border border-borderInputColor rounded-md text-base text-textHeadingColor"
                  >
                    <option value="#">9:00 AM - 10:00 AM</option>
                    <option value="#">10:00 AM - 11:00 AM</option>
                    <option value="#">11:00 AM - 12:00 AM</option>
                    <option value="#">2:00 PM - 3:00 PM</option>
                    <option value="#">3:00 PM - 4:00 PM</option>
                    <option value="#">4:00 PM - 5:00 PM</option>
                  </select>
                </div>
                {/* Additional Requirements  */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="additional"
                    className="text-textColor font-medium text-sm"
                  >
                    Additional Requirements
                  </label>
                  <textarea
                    name=""
                    rows={5}
                    id="additional"
                    className="w-full py-2 px-2 outline-none border border-borderInputColor rounded-md text-base text-textHeadingColor"
                    placeholder="Describe your issue or any specific requirements..."
                  ></textarea>
                </div>
                {/* acitons buttons  */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => setIsBooking(!isBooking)}
                    className="border border-borderInputColor py-1.5 px-4 w-full rounded-md text-base font-medium text-textHeadingColor"
                  >
                    Cancel
                  </button>
                  <button className="btn w-full">Confirm Booking</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
