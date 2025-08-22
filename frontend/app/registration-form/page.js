"use client";
import React, { useState } from "react";
import Link from "next/link";

const RegistrationForm = () => {
    
  const [activeForm, setActiveForm] = useState("provider");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    // email: "",
    companyName: "",
    category: "",
    package: "",
    password: "",
    // confirmPassword: ""
  });

  const categories = [
    "Technology Services",
    "Healthcare & Medical",
    "Construction & Engineering",
    "Food & Beverage",
    "Retail & E-commerce",
    "Education & Training",
    "Transportation & Logistics",
    "Financial Services",
    "Marketing & Advertising",
    "Other"
  ];

  const packages = [
    "Basic Package - $29/month",
    "Professional Package - $79/month",
    "Enterprise Package - $199/month",
    "Premium Package - $299/month"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="xl:container xl:mx-auto px-2 lg:px-8 py-24">
      <div className="max-w-4xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Join Our Platform
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create your account and start connecting with opportunities. Choose your registration type below.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Type Toggle */}
          <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setActiveForm("provider")}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base ${
                  activeForm === "provider"
                    ? "bg-bgColor text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Service Provider
                </span>
              </button>
              <button
                onClick={() => setActiveForm("customer")}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base ${
                  activeForm === "customer"
                    ? "bg-bgColor text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Customer
                </span>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Title */}
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {activeForm === "provider" ? "Provider Registration" : "Customer Registration"}
                </h2>
                <p className="text-gray-600">
                  {activeForm === "provider" 
                    ? "Join as a service provider and showcase your expertise"
                    : "Sign up as a customer to access our services"
                  }
                </p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700"
                    placeholder="Enter your first name"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 outline-none focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                    placeholder="Enter your last name"
                    required
                  />
                </div>

                {/* Email */}
                {/* <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                    placeholder="Enter your email address"
                    required
                  />
                </div> */}

               

                {/* Provider-specific fields */}
                {activeForm === "provider" && (
                  <>
                    {/* Company Name */}
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700"
                        placeholder="Enter your company name"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                        Business Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 outline-none focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                        required
                      >
                        <option value="">Select your business category</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Package */}
                    <div className="space-y-2">
                      <label htmlFor="package" className="block text-sm font-semibold text-gray-700">
                        Subscription Package *
                      </label>
                      <select
                        id="package"
                        name="package"
                        value={formData.package}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 bg-white"
                        required
                      >
                        <option value="">Choose your package</option>
                        {packages.map((pkg, index) => (
                          <option key={index} value={pkg}>
                            {pkg}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}


                 {/* Phone Number */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 outline-none focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                    placeholder="+8801XXXXXXXXX"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 outline-none focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                    placeholder="Create a strong password"
                    required
                  />
                </div>

                {/* Confirm Password */}
                {/* <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                    placeholder="Confirm your password"
                    required
                  />
                </div> */}

              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                  I agree to the
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium underline">
                    Terms of Service
                  </a>
                  and
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-bgColor hover:bg-hoverBg text-white font-semibold py-4 px-8 rounded-xl hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center gap-2">
                    Create Account
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600">
                  Already have an account?
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold underline text-base">
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;