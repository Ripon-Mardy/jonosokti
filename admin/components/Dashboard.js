"use client";
import React, { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import Transcation from "./Transcation";

const DashboardCard = ({ icon: Icon, title, count, total, activeCount, bgColor }) => {
  // Calculate percentage based on activeCount and total
  const percentage = activeCount > 0 ? Math.round((activeCount / total) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
      <div className="flex items-center space-x-4">
        <div className={`${bgColor} p-4 rounded-lg`}>
          <Icon className="text-white text-2xl" />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-gray-800">{count || 0}</span>
            <span className="ml-2 text-sm text-gray-500">Total</span>
          </div>
        </div>
      </div>

      {/* Dashboard Percentage */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {title === "Category" && `Active Categories (${activeCount})`}
            {title === "Jobs" && `Active Jobs (${activeCount})`}
            {title === "Users" && `Active Users (${activeCount})`}
            {title === "Payments" && `Total Payments (${activeCount})`}
          </span>
          <span className="text-green-500 text-sm font-medium">
            {percentage}% {percentage > 0 ? "↑" : ""}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
          <div
            className={`h-full rounded-full ${bgColor}`}
            style={{ width: `${percentage}%` }} // Dynamic width
          ></div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [activeJob, setActiveJob] = useState([]);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Changed default to null for cleaner UI
  const router = useRouter();
  const adminUrl = process.env.ADMIN_URL; // Fallback URL

  // Redirect if no token on mount
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      router.push("/login");
    }
  }, [router]);

  // Check admin URL (move outside useEffect for immediate throw)
  if (!adminUrl) throw new Error("AdminUrl variable is not defined");

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentication token is missing");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`${adminUrl}/admin/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch dashboard data: ${res.status}`);
        }

        const resData = await res.json();
        setCategory(resData?.data?.category?.total) // set total category
        setActiveCategory(resData?.data?.category?.active) // set active category
        setJobs(resData?.data?.jobs?.total) // set total jobs
        setActiveJob(resData?.data?.jobs?.active) // set active jobs
        setUsers(resData?.data?.users?.total) // set total users
        setPayments(resData?.data?.payment?.total) // set total payments
      } catch (error) {
        console.log("Fetch error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [adminUrl]);

  const dashboardCards = [
    {
      icon: BiSolidCategory,
      title: "Category",
      total : category,
      count: category,
      bgColor: "bg-blue-500",
      activeCount : activeCategory,
    },  
    {
      icon: BsFillHandbagFill,
      title: "Jobs",
      total : jobs,
      count: jobs,
      bgColor: "bg-purple-500",
      activeCount : activeJob,
    },
    {
      icon: FaUserFriends,
      title: "Users",
      count: users,
      total : users,
      activeCount : users,
      bgColor: "bg-green-500",
    },
    {
      icon: MdOutlinePayments,
      title: "Payments",
      count:  payments,
      total : payments,
      activeCount : payments,
      bgColor: "bg-orange-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Error handling */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {dashboardCards.map((card, index) => (
          <DashboardCard
            key={index}
            icon={card.icon}
            title={card.title}
            count={card.count}
            total={card.total}
            activeCount={card.activeCount}
            bgColor={card.bgColor}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <Transcation />
        </div>
        <div className="xl:col-span-4 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          {/* Add additional stats or charts here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;