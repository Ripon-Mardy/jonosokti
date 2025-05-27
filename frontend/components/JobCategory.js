"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiArrowUp } from "react-icons/fi";
import CategoryLoader from "./Loader/CategoryLoader";

const JobCategory = () => {
  const [jobCategories, setJobCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [providerCounts, setProviderCounts] = useState({});

  const API_URL = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchCategoriesAndProviders = async () => {
      try {
        const categoryRes = await fetch(`${API_URL}/category/categories`);
        if (!categoryRes.ok) throw new Error("Failed to fetch categories.");
        const categoryData = await categoryRes.json();
        const categories = categoryData.data || [];
        setJobCategories(categories);

        const counts = {};

        await Promise.all(
          categories.map(async (category) => {
            try {
              const res = await fetch(
                `${API_URL}/user/filter-user?category_id=${category._id}`
              );
              const data = await res.json();
              counts[category._id] = data.data?.users?.length || 0;
            } catch (err) {
              console.error("Failed to fetch providers for category:", category._id);
              counts[category._id] = 0;
            }
          })
        );

        setProviderCounts(counts);
      } catch (err) {
        setError("Something went wrong while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoriesAndProviders();
  }, []);

  const initialVisibleCount = 12;
  const displayedCategories = showAll
    ? jobCategories
    : jobCategories.slice(0, initialVisibleCount);
  const remainingCount = jobCategories.length - initialVisibleCount;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section className="py-3">
      <div className="max-w-7xl mx-auto px-2 sm:px-0">
        <div className="text-center mb-6">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-2xl font-bold text-textHeadingColor mb-1"
          >
            Popular Categories
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-textColor max-w-2xl mx-auto"
          >
            What service do you need? Browse our most popular categories
          </motion.p>
        </div>

        {isLoading ? (
          <CategoryLoader />
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md max-w-2xl mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {displayedCategories.map((jobItem, index) => (
                <motion.div 
                  key={jobItem._id || index}
                  variants={itemVariants}
                  layout
                  className="group"
                >
                  <Link
                    href={`/category/${jobItem?._id}`}
                    className="block h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform"
                  >
                    <div className="p-4 flex flex-col items-center justify-between h-full">
                      <div className="relative w-full pt-[100%] rounded-lg overflow-hidden bg-blue-50">
                        <Image
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300 text-xs"
                          src={jobItem?.image}
                          alt={jobItem.name || "Category Image"}
                        />
                      </div>
                      <div className="mt-4 text-center w-full">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 text-xs">
                          {jobItem.name || "Untitled"}
                        </h3>
                        <p className="mt-1 text-xs text-paraColor">
                          {providerCounts[jobItem._id] ?? 0} Provider{providerCounts[jobItem._id] === 1 ? "" : "s"} available
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {jobCategories.length > initialVisibleCount && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn"
            >
              {showAll ? (
                <>
                  See Less
                  <FiArrowUp className="animate-bounce ml-2" />
                </>
              ) : (
                <>
                  See More Categories
                  <span className="inline-flex items-center justify-center bg-blue-500 text-xs font-bold rounded-full h-5 min-w-[20px] px-1 ml-2">
                    {remainingCount}
                  </span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-1 ml-2" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default JobCategory;
