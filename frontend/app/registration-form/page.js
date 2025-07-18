"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Phone,
  Lock,
  Building,
  PackageSearch,
  LayoutList,
  Eye,
  EyeOff,
  AppleIcon,
} from "lucide-react";

const Page = () => {
  const [providerForm, setProviderForm] = useState({
    user_type: "1",
    first_name: "",
    last_name: "",
    company_name: "",
    password: "",
    phone: "",
    category_id: "",
    package_id: "",
  });

  const [customerForm, setCustomerForm] = useState({
    user_type: "2",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
  });

  const [showProviderPassword, setShowProviderPassword] = useState(false);
  const [showCustomerPassword, setShowCustomerPassword] = useState(false);

  const [category, setCategory] = useState([]);
  const [pricingPlanPackage, setPricingPlanPackage] = useState([]);
  const [selectRegistration, setSelectRegistration] = useState("provider");
  const [loading, setLoading] = useState(false);
  const [providerError, setProviderError] = useState("");
  const [customerError, setCustomerError] = useState('')

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) throw new Error("API key is missing");

  // fetcing data from AppleIcon
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, packagesRes] = await Promise.all([
          fetch(`${apiKey}/category/categories`),
          fetch(`${apiKey}/package/packages`),
        ]);
        const categories = await categoriesRes.json();
        const packages = await packagesRes.json();
        setCategory(categories?.data || []);
        setPricingPlanPackage(packages?.data || []);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, []);

  // provider inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProviderForm((prev) => ({ ...prev, [name]: value }));
  };

  // customer inputs
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm((prev) => ({ ...prev, [name]: value }));
  };

  // select registration users
  const handleSelectUser = (type) => {
    setSelectRegistration(type);
    setProviderForm((prev) => ({
      ...prev,
      user_type: type === "provider" ? "1" : "",
    }));
    setCustomerForm((prev) => ({
      ...prev,
      user_type: type === "customer" ? "2" : "",
    }));
  };

  //  ✅ provider submit form
  const handleProviderSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${apiKey}/user-auth/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(providerForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      console.log("data", data);
      alert("Provider registration successful!");
    } catch (err) {
      alert("Registration failed!");
      if (err.message) setProviderError(err.message);
      console.error(err);
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ customer submit form 
  const handleCustomerSubimtForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${apiKey}/user-auth/registration`, {
        method : "POST",
        headers : 'application/json',
        body : JSON.stringify(customerForm)
      })
      const customerData = await res.json();
      if(!res.ok) throw new Error(customerData.message)
        console.log('customerData', customerData);
      alert('Registration succssfully ✅')
    } catch (error) {
      alert('Registration failed')
      if(error.message) setCustomerError(error.message);
      console.log('error', error)
    }finally {
      setLoading(false)
    }
  }

  return (
    <div className="xl:container xl:mx-auto px-2 xl:px-0 py-10 mt-10">
      <h1 className="text-center text-2xl font-bold mb-6">Registration</h1>

      <div className="flex items-center justify-center max-w-xl mx-auto border rounded overflow-hidden">
        <button
          onClick={() => handleSelectUser("provider")}
          className={`w-1/2 py-2 text-sm md:text-base ${
            selectRegistration === "provider"
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
          } transition-all`}
        >
          As a Provider
        </button>
        <button
          onClick={() => handleSelectUser("customer")}
          className={`w-1/2 py-2 text-sm md:text-base ${
            selectRegistration === "customer"
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
          } transition-all`}
        >
          As a Customer
        </button>
      </div>

      <div className="bg-white mt-6 max-w-xl mx-auto p-5 shadow rounded-md">
        {selectRegistration === "provider" && (
          <form onSubmit={handleProviderSubmitForm} className="space-y-5">
            <InputWithIcon
              icon={<User size={18} />}
              placeholder="First Name"
              name="first_name"
              value={providerForm.first_name}
              onChange={handleChange}
            />
            <InputWithIcon
              icon={<User size={18} />}
              placeholder="Last Name"
              name="last_name"
              value={providerForm.last_name}
              onChange={handleChange}
            />
            <InputWithIcon
              icon={<Building size={18} />}
              placeholder="Company Name"
              name="company_name"
              value={providerForm.company_name}
              onChange={handleChange}
            />
            <div>
              <InputWithIcon
                icon={<Phone size={18} />}
                placeholder="Phone Number"
                name="phone"
                value={providerForm.phone}
                onChange={handleChange}
                error={providerError}
              />
              {providerError && (
                <span className="text-sm text-red-600 font-medium">
                  {providerError}*
                </span>
              )}
            </div>

            {/* Password with toggle */}
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-gray-400">
                <Lock size={18} />
              </span>

              <input
                type={showProviderPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={providerForm.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 rounded border border-gray-300 outline-none text-sm focus:ring-2 focus:ring-blue-500 `}
              />
              <span
                className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
                onClick={() => setShowProviderPassword(!showProviderPassword)}
              >
                {showProviderPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </span>
            </div>

            <SelectWithIcon
              icon={<LayoutList size={18} />}
              name="category_id"
              value={providerForm.category_id}
              onChange={handleChange}
              options={category}
              placeholder="Select Category"
            />
            <SelectWithIcon
              icon={<PackageSearch size={18} />}
              name="package_id"
              value={providerForm.package_id}
              onChange={handleChange}
              options={pricingPlanPackage}
              placeholder="Select Plan"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {loading ? (
                'Loading...'
              ) : (
                "Register as Provider"
              )}
            </button>
          </form>
        )}

        {selectRegistration === "customer" && (
          <form onSubmit={handleCustomerSubimtForm} className="space-y-5">
            <InputWithIcon
              icon={<User size={18} />}
              placeholder="First Name"
              name="first_name"
              value={customerForm.first_name}
              onChange={handleCustomerChange}
            />
            <InputWithIcon
              icon={<User size={18} />}
              placeholder="Last Name"
              name="last_name"
              value={customerForm.last_name}
              onChange={handleCustomerChange}
            />
            <div>
              <InputWithIcon
                icon={<Phone size={18} />}
                placeholder="Phone Number"
                name="phone"
                value={customerForm.phone}
                onChange={handleCustomerChange}
              />
              {customerError && (
                <span className="text-sm text-red-600 font-medium"> {customerError}* </span>
              )}
            </div>

            {/* Password with toggle */}
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type={showCustomerPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={customerForm.password}
                onChange={handleCustomerChange}
                className="w-full pl-10 pr-10 py-3 rounded border border-gray-300 outline-none text-sm focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
                onClick={() => setShowCustomerPassword(!showCustomerPassword)}
              >
                {showCustomerPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {loading ? 'Loading...' : "Register as Customer"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// input component
const InputWithIcon = ({ icon, error, ...props }) => (
  <div className="relative">
    <span className="absolute left-3 top-3.5 text-gray-400">{icon}</span>
    <input
      {...props}
      className={`w-full pl-10 pr-3 py-3 rounded border border-borderInputColor outline-none text-sm focus:ring-1 focus:border-borderFocusColor ${
        error
          ? "border border-red-500 outline-none focus:right-0 focus:border-none"
          : ""
      } `}
      required
    />
  </div>
);

//  select category component
const SelectWithIcon = ({
  icon,
  name,
  value,
  onChange,
  options,
  placeholder,
}) => (
  <div className="relative">
    <span className="absolute left-3 top-3.5 text-gray-400">{icon}</span>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-3 py-3 rounded border border-gray-300 outline-none text-sm bg-white text-gray-700 focus:ring-2 focus:ring-blue-500"
      required
    >
      <option value="">{placeholder}</option>
      {options?.map((opt) => (
        <option key={opt._id} value={opt._id}>
          {opt.name}
        </option>
      ))}
    </select>
  </div>
);

export default Page;
