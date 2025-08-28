"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const Registration = ({ phone }) => {
  const [activeForm, setActiveForm] = useState("provider");
  const [providerFormData, setProviderFormData] = useState({
    user_type: (1).toString(),
    first_name: "",
    last_name: "",
    company_name: "",
    phone: phone || "",
    password: "",
    category_id: "",
    package_id: "",
  });
  const [customerFormData, setCustomerFormData] = useState({
    user_type: (2).toString(),
    first_name: "",
    last_name: "",
    phone: phone || "",
    password: "",
  })
  console.log('customerFormData', customerFormData);
  const [category, setCategory] = useState([]);
  const [packageData, setPackageData] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState(false);
  const [showRegistrationMessage, setShowRegistrationMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const router = useRouter();

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
    "Other",
  ];

  const packages = [
    "Basic Package - $29/month",
    "Professional Package - $79/month",
    "Enterprise Package - $199/month",
    "Premium Package - $299/month",
  ];

  const handleProviderInputChange = (e) => {
    const { name, value } = e.target;
    setProviderFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // all category list fetch
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const [categoryRes, packageRes] = await Promise.all([
          fetch(`${apiKey}/category/categories`),
          fetch(`${apiKey}/package/packages`),
        ]);

        if (!categoryRes.ok || !packageRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoryData = await categoryRes.json();
        const packageData = await packageRes.json();

        setCategory(categoryData?.data || []);
        setPackageData(packageData?.data || []);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchCategory();
  }, []);

  // handle provider submit
  const handleProviderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${apiKey}/user-auth/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(providerFormData),
      });

      const data = await res.json();
      console.log("data", data);
      if (data?.status == true) {
        setShowRegistrationMessage(data?.message);
        setRegistrationMessage(true);
        
        setTimeout(() => {
          setRegistrationMessage(false);
        }, 5000);

        router.push('/login');

        setProviderFormData({
          user_type: (1).toString(),
          first_name: "",
          last_name: "",
          company_name: "",
          phone: "",
          password: "",
          category_id: "",
          package_id: "",
        });
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  // handle Customer Input Change 
  const handleCustomerInputChange = (e) => {
    const {name, value} = e.target;

    setCustomerFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // handle customer submit 
  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${apiKey}/user-auth/registration`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(customerFormData)
      })

      if(!res.ok) {
        throw new Error("Failed to register")
      }
      const data = await res.json();

      if(data?.status == true) {
        setShowRegistrationMessage(data?.message);
        setRegistrationMessage(true);
        
        setTimeout(() => {
          setRegistrationMessage(false);
        }, 5000);

        router.push('/login');

        setCustomerFormData({
          user_type: (2).toString(),
          first_name: "",
          last_name: "",
          phone: "",
          password: "",
        })
      }
    } catch (error) {
      console.log('error', error);
      console.error("error", error);
    }finally {
      setLoading(false)
    }

  };

  return (
    <div className="xl:container xl:mx-auto px-2">

      {registrationMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2">
          <h2 className="bg-bgColor text-white px-10 py-2 rounded-xl font-semibold w-fit text-sm">
            {showRegistrationMessage} 🎉
          </h2>
        </div>
      )}
      


      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Join Our Platform
          </h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Create your account and start connecting with opportunities. Choose
            your registration type below.
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
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
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
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Customer
                </span>
              </button>
            </div>
          </div>

          {/* provider form  */}
          {activeForm === "provider" && (
            <div className="p-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Provider Registration
                </h2>
                <p className="text-gray-600">
                  Join as a service provider and showcase your expertise
                </p>
              </div>
              {/* form section  */}
              <form onSubmit={handleProviderSubmit} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={providerFormData.first_name}
                      onChange={handleProviderInputChange}
                      id="firstName"
                      name="first_name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="last_name"
                      value={providerFormData.last_name}
                      onChange={handleProviderInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 outline-none focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2 md:col-span-2">
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="company_name"
                      value={providerFormData.company_name}
                      onChange={handleProviderInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700"
                      placeholder="Enter your company name"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label
                      htmlFor="category"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Business Category *
                    </label>
                    <select
                      id="category"
                      name="category_id"
                      value={providerFormData.category_id}
                      onChange={handleProviderInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 outline-none focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                      required
                    >
                      <option value="">Select your business category</option>
                      {category.map((category, index) => (
                        <option key={index} value={category?._id}>
                          {category?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Package */}
                  <div className="space-y-2">
                    <label
                      htmlFor="package"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Subscription Package *
                    </label>
                    <select
                      id="package"
                      name="package_id"
                      value={providerFormData.package_id}
                      onChange={handleProviderInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 bg-white"
                      required
                    >
                      <option value="">Choose your package</option>
                      {packageData.map((pkg, index) => (
                        <option key={index} value={pkg?._id}>
                          {pkg?.name} {pkg?.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={handleProviderInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 outline-none focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                      placeholder="+8801XXXXXXXXX"
                      required
                      disabled
                    />
                  </div>
                  {/* Password */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        value={providerFormData.password}
                        onChange={handleProviderInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 outline-none focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                        placeholder="Create a strong password"
                        required
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                        <span>
                          {passwordVisible ? (
                            <EyeOff
                              onClick={() => setPasswordVisible(false)}
                              className="w-5 h-5 text-textColor"
                            />
                          ) : (
                            <Eye
                              onClick={() => setPasswordVisible(true)}
                              className="w-5 h-5 text-textColor"
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    I agree to the
                    <Link
                      href={"/terms-of-service"}
                      className="text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      Terms of Service
                    </Link>
                    and
                    <Link
                      href={"/privacy-policy"}
                      className="text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-bgColor hover:bg-hoverBg text-white font-semibold py-4 px-8 rounded-xl hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg text-base hover:shadow-xl"
                  >
                    <span className="flex items-center justify-center gap-2 text-base">
                      {loading ? "Submitting..." : "Create Account"}
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-100 mt-4">
                <p className="text-gray-600">
                  Already have an account?
                  <Link
                    href={"/login"}
                    className="text-blue-600 hover:text-blue-800 font-semibold underline text-base"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* customer form  */}
          {activeForm === "customer" && (
            <div className="p-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Customer Registration
                </h2>
                <p className="text-gray-600">
                  Sign up as a customer to access our services
                </p>
              </div>
              {/* form section  */}
              <form action="#" onSubmit={handleCustomerSubmit} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="first_name"
                      onChange={handleCustomerInputChange}
                      value={customerFormData.first_name}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="last_name"
                      value={customerFormData.last_name}
                      onChange={handleCustomerInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 outline-none focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={customerFormData.phone}
                      onChange={handleCustomerInputChange}
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 outline-none focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                      placeholder="+8801XXXXXXXXX"
                      required
                    />
                  </div>
                  {/* Password */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        value={customerFormData.password}
                        onChange={handleCustomerInputChange}
                        name="password"
                        id="password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 outline-none focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                        placeholder="Create a strong password"
                        required
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                        <span>
                          {passwordVisible ? (
                            <EyeOff
                              onClick={() => setPasswordVisible(false)}
                              className="w-5 h-5 text-textColor"
                            />
                          ) : (
                            <Eye
                              onClick={() => setPasswordVisible(true)}
                              className="w-5 h-5 text-textColor"
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    I agree to the
                    <Link
                      href={"/terms-of-service"}
                      className="text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      Terms of Service
                    </Link>
                    and
                    <Link
                      href={"/privacy-policy"}
                      className="text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-bgColor hover:bg-hoverBg text-white font-semibold py-4 px-8 rounded-xl hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg text-base hover:shadow-xl"
                  >
                    <span className="flex items-center justify-center gap-2 text-base">
                     {loading ? "Submitting..." : "Create Account"}
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-100 mt-4">
                <p className="text-gray-600">
                  Already have an account?
                  <Link
                    href={"/login"}
                    className="text-blue-600 hover:text-blue-800 font-semibold underline text-base"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
