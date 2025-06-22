"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Phone,
  Forward,
  Send,
  Star,
  Share2,
  MessageSquareMore,
  X,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import coverImage from "@/public/images/jonosokti_cover.jpeg";
import userImage from "@/public/images/user.png";
import ProfileBanner from "@/public/images/profile-banner.jpg";
import { FaStar } from "react-icons/fa6";
import facebook from "@/public/images/social/facebook.png";
import x from "@/public/images/social/x.png";
import linkedin from "@/public/images/social/linkedin.png";
import telegram from "@/public/images/social/telegram.png";

const Page = ({ params }) => {
  const [singleUser, setSingleUser] = useState({});
  console.log("single user", singleUser);
  const [bannerImage, setBannerImage] = useState(coverImage);
  const [profileImage, setProfileImage] = useState(userImage);
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // get user params id
  const userId = params?.id || ""; // default id for testing

  // api key
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    console.error(
      "API key is not defined. Please set NEXT_PUBLIC_API_KEY in your environment variables."
    );
  }

  // Sample photos data
  const photos = [
    { id: 1, url: userImage, title: "Work Sample 1" },
    { id: 2, url: userImage, title: "Work Sample 2" },
    { id: 3, url: userImage, title: "Work Sample 3" },
    { id: 4, url: userImage, title: "Work Sample 4" },
    { id: 5, url: userImage, title: "Work Sample 5" },
    { id: 6, url: userImage, title: "Work Sample 6" },
    { id: 7, url: userImage, title: "Work Sample 7" },
    { id: 8, url: userImage, title: "Work Sample 8" },
  ];

  // Sample tabs data
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "contact", label: "Contact" },
    { id: "reviews", label: "Reviews" },
    { id: "services", label: "Services" },
  ];

  // Sample reviews data
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "Excellent service! Very professional and timely.",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment: "Great work, would recommend.",
      date: "2024-01-10",
    },
  ]);

  const linkUrl = typeof window !== "undefined" ? window.location.href : "";

  // get single user
  useEffect(() => {
    const fetchSingleUser = async () => {
      try {
        // setLoading(true);
        const res = await fetch(
          `${apiKey}/user/get-user?id=6835582d32384de6c21ec471}`
        );
        if (!res.ok) throw new Error("Failed to fetch user data");
        const userData = await res.json();
        setSingleUser(userData || {});
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchSingleUser();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleAddReview = (reviewData) => {
    const newReview = {
      id: reviews.length + 1,
      ...reviewData,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([...reviews, newReview]);
    setShowReviewModal(false);
  };

  // Photos section scroll functionality
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Function to check scroll position and update button states
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Add event listeners for scroll and resize
  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, [photos]);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200, // Scroll by the approximate width of one photo + gap
        behavior: "smooth",
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // Scroll by the approximate width of one photo + gap
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="pt-20 pb-20">
      <div className="xl:container xl:mx-auto px-2 xl:px-0">
        <div className="flex gap-6">
          {/* Left Section */}
          <div className=" w-full sm:w-[70%]">
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
                </div>
                <div className="absolute left-3 -bottom-12 w-24 h-24 md:w-40 md:h-40 border-4 border-white rounded-full shadow-lg">
                  <Image
                    src={profileImage}
                    alt="profile image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              </div>

              {/* Profile Details */}
              <div className="mt-14 md:mt-16">
                <div className="mt-12 md:mt-16 px-5 space-y-4">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h2 className="text-xl md:text-3xl font-semibold text-[#000000] flex items-center">
                      Ripon Mardy Axel
                    </h2>
                    <span
                      onClick={() => setShowSharePopup(true)}
                      className="cursor-pointer text-paraColor pr-5 hover:text-gray-900 transition "
                      title="Share"
                    >
                      <Share2 className="md:scale-110" />
                    </span>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-start flex-wrap text-sm md:text-base gap-2 text-black90 font-normal mt-1 leading-4 mb-2">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        Cleaning Service
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        Electric Service
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        Electronics Service
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        Electronics Service
                      </span>
                    </div>
                    <div className="flex items-center justify-start gap-3 mt-2">
                      <div className="flex items-center justify-start text-sm md:text-base text-yellow-500 gap-1">
                        <span>
                          <FaStar />
                        </span>
                        <span>
                          <FaStar />
                        </span>
                        <span>
                          <FaStar />
                        </span>
                        <span>
                          <FaStar />
                        </span>
                        <span>
                          <FaStar />
                        </span>
                      </div>
                      <span className="flex items-center justify-start gap-1 text-sm text-textColor font-normal cursor-pointer">
                        <MessageSquareMore size={16} /> Review (12){" "}
                      </span>
                    </div>
                    <span className="text-sm mt-1 block text-paraColor font-normal">
                      Dhaka, Bangladesh
                    </span>
                  </div>
                  {/* call section  */}
                  <div className="mt-5 flex items-center justify-start gap-5">
                    <div className="flex items-center gap-1">
                      <span className="btn">
                        <Phone size={18} /> Call Now{" "}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="btn">
                        <Send size={18} /> Message{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* about me  */}
            <div className="bg-white p-4 rounded border border-borderInputColor mt-4">
              <h1 className="text-xl mb-4 font-semibold text-textHeadingColor ">
                About me
              </h1>
              <p className="text-textColor leading-6 text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non
                atque eos rem consequuntur architecto quos, itaque culpa
                perferendis ex dignissimos voluptatem commodi illum eaque!
                Deserunt dolores, officia et quas quia expedita blanditiis
                suscipit laudantium nobis mollitia repudiandae nostrum minus.
                Unde tempora officiis eos modi ut aspernatur aperiam in id
                quisquam?
              </p>
            </div>

            {/* Tabs Section */}
            <div className="border border-borderInputColor mt-5 rounded bg-white">
              <div className="flex items-center justify-between">
                {tabs.map((tab, index) => (
                  <button
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    key={index}
                    className={`w-full text-center bg-gray-200 py-2 text-sm font-semibold ${
                      activeTab === tab.id ? "bg-white" : ""
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* tab content */}
              <div>
                {activeTab === "overview" && (
                  <div className="p-4 text-sm text-textColor leading-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Recusandae provident cumque omnis pariatur repellendus enim
                    sed accusamus labore quidem in tempore animi dolor quas,
                    itaque reprehenderit inventore quod beatae temporibus.
                  </div>
                )}

                {/* contact  */}

                {activeTab === "contact" && (
                  <div className="bg-white rounded-lg w-full py-3">
                    {/* Contact Information Section */}
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-textHeadingColor mb-4 pl-5">
                        Contact Information
                      </h2>
                      <div className="overflow-x-auto ">
                        <table className="w-full text-left border-collapse">
                          <tbody>
                            <tr className="border-b border-gray-200">
                              <td className="py-2 px-4 text-[#222222] text-sm font-medium sm:w-1/4">
                                Phone
                              </td>
                              <td className="py-2 px-4 text-gray-700 text-sm">
                                <a
                                  href="tel:+1234567890"
                                  className="text-blue-600 hover:text-[#0A5276] transition-colors duration-200"
                                >
                                  +1 234 567 890
                                </a>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="py-2 px-4 text-[#222222] text-sm font-medium sm:w-1/4">
                                Email
                              </td>
                              <td className="py-2 px-4 text-gray-700 text-sm">
                                <a
                                  href="mailto:contact@example.com"
                                  className="text-blue-600 hover:text-[#0A5276] transition-colors duration-200"
                                >
                                  contact@example.com
                                </a>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="py-2 px-4 text-[#222222] text-sm font-medium sm:w-1/4">
                                Website
                              </td>
                              <td className="py-2 px-4 text-gray-700 text-sm">
                                <a
                                  href="https://www.example.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-[#0A5276] transition-colors duration-200"
                                >
                                  www.example.com
                                </a>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="py-2 px-4 text-[#222222] text-sm font-medium sm:w-1/4">
                                Address
                              </td>
                              <td className="py-2 px-4 text-gray-700 text-sm">
                                123 Main St, City, Country
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                {/* review  */}
                {activeTab === "reviews" && (
                  <div className="bg-white rounded border border-gray-200 mt-5 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Reviews</h2>
                      <button
                        onClick={() => setShowReviewModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                      >
                        Write a Review
                      </button>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b pb-4 last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{review.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex text-yellow-400">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="mt-2 text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* servercs  */}
                {activeTab === "services" && (
                  <div className="mt-5">
                    <div className="p-4 border-b border-t border-borderInputColor bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex gap-4 items-center">
                      {/* Service Details */}
                      <div className="flex flex-col gap-3 basis-4/5">
                        <h2 className="text-base font-semibold text-gray-900 leading-tight hover:text-blue-600 transition-colors duration-200">
                          All aspects of Audi, Volkswagen, and MINI service
                          repair and maintenance using the latest in diagnostic
                          technology
                        </h2>
                        <span className="bg-blue-100 text-blue-800 inline-block rounded-full px-4 text-sm font-medium w-fit shadow-sm">
                          ৳ 1200
                        </span>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={"#"}
                        className="bg-buttonBgColor text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                      >
                        Select Service
                      </Link>
                    </div>

                    <div className="p-4 border-b border-borderInputColor bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex gap-4 items-center">
                      {/* Service Details */}
                      <div className="flex flex-col gap-3 basis-4/5">
                        <h2 className="text-base font-semibold text-gray-900 leading-tight hover:text-blue-600 transition-colors duration-200">
                          All aspects of Audi, Volkswagen, and MINI service
                          repair and maintenance using the latest in diagnostic
                          technology
                        </h2>
                        <span className="bg-blue-100 text-blue-800 inline-block rounded-full px-4 text-sm font-medium w-fit shadow-sm">
                          ৳ 1200
                        </span>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={"#"}
                        className="bg-buttonBgColor text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                      >
                        Select Service
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Photos Section */}
            <div className="bg-white rounded border border-borderInputColor mt-5 p-4 w-full">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-textHeadingColor text-xl font-semibold">
                    Photos
                  </h2>
                  <span className="text-gray-500 text-sm">Working Photos</span>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 transition font-medium">
                  View All
                </button>
              </div>

              <div className="relative">
                {photos.length > 0 ? (
                  <>
                    {/* Left Arrow Button */}
                    {canScrollLeft && (
                      <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200 z-10"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                    )}

                    {/* Photos Grid */}
                    <div
                      ref={scrollContainerRef}
                      className="flex flex-nowrap gap-4 overflow-x-auto pb-2 scroll-smooth"
                      style={{
                        scrollBehavior: "smooth",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {photos.map((photo, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 w-36 h-36 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200"
                          onClick={() => setSelectedImage(photo)}
                        >
                          <Image
                            src={photo.url || photo}
                            alt={`Photo ${index + 1}`}
                            width={144}
                            height={144}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Right Arrow Button */}
                    {canScrollRight && (
                      <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200 z-10"
                        aria-label="Scroll right"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <h2>No photos added yet</h2>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full">
            <div className="sticky top-24">
              <Image
                src={ProfileBanner}
                width={80}
                height={50}
                alt="profile banner"
                layout="responsive"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Share content popup */}
      {showSharePopup && (
        <div className="fixed left-0 top-0 flex items-center justify-center inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-50 px-3">
          <div className="w-full md:w-1/2 bg-white rounded border border-gray-200 relative">
            <button
              onClick={() => setShowSharePopup(false)}
              className="absolute right-2 top-2"
            >
              {" "}
              <X size={20} />{" "}
            </button>
            <div className="p-4 mt-3">
              <h2 className="text-center text-base md:text-xl font-semibold">
                Share this profile with others
              </h2>
              <div className="flex items-center justify-center gap-3 mt-4">
                <Image
                  className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition cursor-pointer "
                  src={facebook}
                  width={50}
                  height={50}
                  alt="facebook"
                />
                <Image
                  className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition cursor-pointer "
                  src={linkedin}
                  width={50}
                  height={50}
                  alt="linkedin"
                />
                <Image
                  className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition cursor-pointer "
                  src={x}
                  width={50}
                  height={50}
                  alt="x"
                />
                <Image
                  className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition cursor-pointer "
                  src={telegram}
                  width={50}
                  height={50}
                  alt="telegram"
                />
              </div>
              {/* copy link  */}
              <div className="mt-4">
                <h2 className="text-black90 font-semibold text-sm">
                  Copy Link
                </h2>
                <div className="flex items-center border border-gray-200 rounded mt-2">
                  <input
                    className="outline-none w-full py-2 pl-2"
                    type="text"
                    value={linkUrl}
                  />
                  <button
                    onClick={handleCopy}
                    className="w-24 bg-gray-200 text-sm py-2 h-full cursor-pointer"
                  >
                    {" "}
                    {copied ? "Copied!" : "Copy Link"}{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full md:w-3/4 lg:w-1/2">
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={24} />
            </button>
            <Image
              src={selectedImage.url || selectedImage}
              alt={selectedImage.title || "Photo"}
              width={1200}
              height={800}
              layout="responsive"
              className="rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Write a Review</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleAddReview({
                  name: formData.get("name"),
                  rating: parseInt(formData.get("rating")),
                  comment: formData.get("comment"),
                });
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Rating
                  </label>
                  <select
                    name="rating"
                    required
                    className="w-full border rounded-lg p-2"
                  >
                    {[5, 4, 3, 2, 1].map((num) => (
                      <option key={num} value={num}>
                        {num} Stars
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    required
                    rows={4}
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
