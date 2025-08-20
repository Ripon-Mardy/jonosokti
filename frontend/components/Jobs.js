"use client";
import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  MapPin,
  CircleDollarSign,
  User,
  Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import { BsBriefcase } from "react-icons/bs";
import jobImage from "@/public/images/jobsimage.jpg";
import NoDataFound from "./NoDataFound/NoDataFound";
import Loader from "./Loader/Loader";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // api key
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const initialVisibleCount = 6;
  const displayedJobs = Array.isArray(jobs)
    ? showAll
      ? jobs
      : jobs.slice(0, initialVisibleCount)
    : [];
  const remainingJobCount = jobs.length - initialVisibleCount;

  // Truncate text function
  function shortenText(text, maxWords) {
    let words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // api jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiKey}/job/active-jobs`);
        if (!res.ok) {
          throw new Error("response was not ok");
        }
        const resData = await res.json();
        // setJobs(resData?.data?.jobs);
        setJobs(Array.isArray(resData?.data?.jobs) ? resData.data.jobs : []);
      } catch (error) {
        console.log("error", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="py-3">
      <div className="max-w-7xl mx-auto px-2 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-textHeadingColor">
            Recent Job Posts
          </h2>
          <p className="mt-1 text-gray-600 text-base">
            Latest service requests from clients. Apply now and start earning.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
            <Loader/>
          ) : error ? (
            <div>error</div>
          ) : jobs.length > -1 ? (
            // jobs  
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-50">
                <div className="flex items-center justify-start gap-3 mb-4">
                  <span className="bg-blue-200 p-2 rounded-full">
                    <BriefcaseBusiness className="w-5 h-5 text-blue-500" />
                  </span>
                  <div>
                    <h2 className="text-textHeadingColor font-bold text-base">
                      Emergency Plumbing Repair
                    </h2>
                    <span className="text-xs font-medium text-textColor">
                      2 hours ago
                    </span>
                  </div>
                </div>

                {/* details  */}
                <div>
                  <p className="text-textColor text-sm font-medium">
                   {` Need urgent plumbing repair for kitchen sink. Water leakage
                    issue. Need urgent plumbing repair for kitchen sink. Water leakage
                    issue.`.split(' ').slice(0, 34).join(' ')}...
                  </p>
                  <div className="mt-4 space-y-2">
                    <span className="flex items-center justify-start gap-2 text-xs text-gray-600">
                      <MapPin className="w-3 h-3" /> Dhanmondi, Dhaka
                    </span>
                    <span className="flex items-center justify-start gap-2 text-xs text-gray-600">
                      <CircleDollarSign className="w-3 h-3" /> ৳800/hour
                    </span>
                    <span className="flex items-center justify-start gap-2 text-xs text-gray-600">
                      <User className="w-3 h-3" /> Rashid Ahmed
                    </span>
                  </div>
                </div>
                {/* button  */}
                <div className="flex items-center justify-center mt-4 gap-3">
                  <Link href={'/jobs/1'} className="btn w-full">Apply Now</Link>
                  <button className="w-1/3 flex items-center justify-center border border-gray-200 py-2 rounded-full text-gray-500">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

          ) : (
            <div className="mt-5 ">
              <NoDataFound
                icon={<BriefcaseBusiness />}
                text={" No job post available"}
                subText={
                  "Currently, there are no job listings. Please check back later."
                }
              />
            </div>
          )}
        </motion.div>

        {jobs.length > initialVisibleCount && (
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/alljobs" className="btn text-sm ">
              <span>See All Jobs</span>
              <span className="inline-flex items-center justify-center bg-blue-500 text-xs font-bold rounded-full h-5 min-w-[20px] px-1.5">
                {remainingJobCount}
              </span>
              <HiArrowLongRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Jobs;
