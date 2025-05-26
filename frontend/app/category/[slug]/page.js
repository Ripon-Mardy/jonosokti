"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Loading from "@/components/Loading";
import Users from "@/components/Users";
import jobCategory from "@/public/images/Jobcategory/computer.webp";
import { ChevronRight, Search, MapPin, Filter } from "lucide-react";

const CategoryPage = ({ params }) => {
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedCategories, setRelatedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const categoryId = params.slug;

  // api key
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${apiKey}/category/single-category?id=${categoryId}`
        );
        if (!res.ok) throw new Error("Failed to fetch category");

        const data = await res.json();
        setCategory(data?.data);

        // Fetch related categories (mock data for now)
        // In a real app, you would fetch related categories from your API
        setRelatedCategories([
          { id: "1", name: "Web Development" },
          { id: "2", name: "Mobile App Development" },
          { id: "3", name: "UI/UX Design" },
          { id: "4", name: "Digital Marketing" },
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Category Info */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-20 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loading />
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-7xl mx-auto"
            >
              {/* Breadcrumb Navigation */}
              <motion.div
                variants={fadeIn}
                className="flex items-center text-sm text-gray-500 mb-6"
              >
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
                <ChevronRight size={16} className="mx-2" />
                <Link
                  href="/categories"
                  className="hover:text-blue-600 transition-colors"
                >
                  Categories
                </Link>
                <ChevronRight size={16} className="mx-2" />
                <span className="text-gray-900 font-medium">
                  {category?.name}
                </span>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Category Image */}
                <motion.div variants={fadeIn} className="order-2 lg:order-1">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white p-4">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/10 z-0"></div>
                    <Image
                      src={category?.image || jobCategory}
                      width={600}
                      height={400}
                      quality={90}
                      className="rounded-xl object-cover w-full h-[300px] sm:h-[400px] relative z-10"
                      alt={category?.name || "Category Image"}
                      priority
                    />
                  </div>
                </motion.div>

                {/* Category Info */}
                <motion.div variants={fadeIn} className="order-1 lg:order-2">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    {category?.name}
                  </h1>

                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {category?.description ||
                      "Connect with skilled professionals who specialize in this category. Get your tasks done efficiently and effectively."}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {category?.serviceCount || "100+"} Services
                    </span>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      {category?.expertCount || "50+"} Experts
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                      <MapPin size={14} className="inline mr-1" />
                      Available Nationwide
                    </span>
                  </div>

                  {/* Search Bar */}
                  <div className="relative max-w-md">
                    <input
                      type="text"
                      placeholder={`Search in ${category?.name}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600"
                    >
                      <Filter size={18} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Filter Section - Conditionally Rendered */}
      {showFilters && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white border-t border-b border-gray-200 py-4"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="w-full sm:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                <select className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Any Experience</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <div className="w-full sm:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                </select>
              </div>

              <div className="w-full sm:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Anywhere</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chittagong">Chittagong</option>
                  <option value="khulna">Khulna</option>
                  <option value="rajshahi">Rajshahi</option>
                </select>
              </div>

              <div className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-auto">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Apply Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 ml-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Related Categories Section */}
      {!loading && !error && relatedCategories.length > 0 && (
        <section className="py-6 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Related Categories
              </h2>
              <Link
                href="/categories"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>

            <div className="flex overflow-x-auto pb-2 gap-3 scrollbar-hide">
              {relatedCategories.map((relatedCat) => (
                <Link
                  key={relatedCat.id}
                  href={`/category/${relatedCat.id}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full whitespace-nowrap text-sm transition-colors"
                >
                  {relatedCat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Providers Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Service Providers
            </h2>
            <Link href="/categories" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <ArrowLeft size={16} className="mr-1" />
              Back to Categories
            </Link>
          </div> */}

          {/* Users Component */}
          <Users categoryId={categoryId} searchQuery={searchQuery} />
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
