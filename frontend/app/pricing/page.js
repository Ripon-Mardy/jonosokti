"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RxCheck } from "react-icons/rx";
import { motion } from "framer-motion";
import { Award, CircleDollarSign  } from "lucide-react";
import Loader from "@/components/Loader/Loader";

const Page = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // api key 
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(`${apiKey}/package/packages`);
        if (!res.ok) throw new Error("Failed to fetch packages");
        const data = await res.json();
        setPackages(data.data || []);
      } catch (error) {
        setError("Failed to load packages. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const features = [
    "Booking",
    "Own Cover Image on Provider Page",
    "Gallery with more Images",
    "Multiple Categories",
    "Apply for Job",
    "Job Alerts",
    "More Locations (Branches)",
    "Google Calendar",
    "Crop Profile Image",
  ];

  return (
    <section className=" bg-gray-50 pt-24 pb-12">
      <div className="xl:container xl:mx-auto px-2 sm:px-6 lg:px-8">


        {/* Header */}
        <div className="text-center mb-8 rounded-md p-3 space-y-2 py-5 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            {/* <CircleDollarSign  className="text-yellow-300" size={28} /> */}
            <h1 className="text-base md:text-2xl font-bold text-textHeadingColor">Choose Your Perfect Plan</h1>
          </div>
          <p className=" text-sm md:text-base max-w-2xl mx-auto text-textColor">
            Select the package that best suits your needs. All plans include our core features.
          </p>
        </div>





        {/* Packages Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader/>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        ) : packages.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                  pkg.name === "Premium" ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {pkg.name === "Premium" && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Package Header */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      width={100}
                      height={100}
                      className="w-20 h-20 object-contain"
                    />
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">৳{pkg.price}</span>
                      <span className="ml-2 text-gray-500">/year</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Perfect for growing businesses and professionals
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mt-8">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">
                      What's included:
                    </h4>
                    <ul className="space-y-3">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <RxCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className={`mt-8 w-full py-3 px-6 rounded-lg font-medium transition-all duration-200
                      ${
                        pkg.name === "Premium"
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200"
                      }
                    `}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No packages available at the moment.</p>
          </div>
        )}

        {/* Additional Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            All Plans Include
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {["24/7 Support", "Regular Updates", "Security Features"].map(
              (feature, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                >
                  <p className="text-gray-900 font-medium">{feature}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
