"use client";
import React, { useEffect, useState } from "react";
import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import { BsBriefcase } from "react-icons/bs";
import jobImage from "@/public/images/jobsimage.jpg";
import JobLoader from "./Loader/JobLoader";
import NoDataFound from "./NoDataFound/NoDataFound";


// hello developrs

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

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
        const res = await fetch(
          "https://jono-db.onrender.com/v1/job/active-jobs"
        );
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
          <h2 className="text-2xl sm:text-2xl font-bold text-textHeadingColor">
            Recently Posted Jobs
          </h2>
          <p className="mt-1 text-textColor text-sm">
            Job picks tailored for you
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
            <JobLoader />
          ) : error ? (
            <div>error</div>
          ) : jobs.length > 0 ? (
            displayedJobs.map((job, index) => (
              <motion.div
                key={job.id || index}
                variants={itemVariants}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={`/alljobs/${job._id || ""}`}
                  className="flex items-start gap-4 p-3 rounded-lg border border-borderInputColor hover:border-borderFocusColor hover:bg-blue-50/30 transition-all duration-200 group bg-white"
                >
                  <div className="relative flex-shrink-0 w-14 h-14 rounded-md overflow-hidden bg-blue-50 border border-gray-100">
                    <Image
                      src={jobImage}
                      alt={job.companyName || "Company logo"}
                      fill
                      sizes="56px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start flex-wrap">
                      <h3 className="text-gray-900 font-semibold text-base group-hover:text-blue-600 transition-colors">
                        {shortenText(job.title, 6)}
                      </h3>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 gap-x-3 w-full">
                      <span className="inline-flex items-center text-xs">
                        <BsBriefcase className="mr-1 text-textIconColor" />
                        {job.company_name || "Wing Assistant"}
                      </span>
                      <span className="inline-flex items-center text-xs">
                        <FaLocationDot className="mr-1 text-textIconColor" />
                        {job.address || "Dhaka, Bangladesh"}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium flex gap-1">
                        {/* <FaMoneyBillWave className="mr-1 text-gray-500" /> */}
                        ৳ {job.cost || "35000"}/month
                      </span>
                      <span className="inline-flex items-center text-xs text-gray-500">
                        <FaRegClock className="mr-1 text-textIconColor" />
                        {job.posted || "6 months ago"}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="mt-5">
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
