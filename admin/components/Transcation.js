"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  Search, 
  Filter, 
  ChevronDown, 
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

// Demo transaction data
const demoTransactions = [
  {
    id: 1,
    number: "+8801723456789",
    date: "2024-01-15T14:30:00",
    amount: "2,500.00",
    status: "completed",
    type: "deposit",
    customer: "John Doe",
  },
  {
    id: 2,
    number: "+8801787654321",
    date: "2024-01-15T12:15:00",
    amount: "1,800.00",
    status: "pending",
    type: "withdrawal",
    customer: "Jane Smith",
  },
  // Add more demo transactions as needed
  {
    id: 3,
    number: "+8801756789012",
    date: "2024-01-14T16:45:00",
    amount: "3,200.00",
    status: "completed",
    type: "deposit",
    customer: "Alice Johnson",
  },
  {
    id: 4,
    number: "+8801789012345",
    date: "2024-01-14T09:20:00",
    amount: "950.00",
    status: "failed",
    type: "withdrawal",
    customer: "Bob Wilson",
  },
  // ... add more transactions for testing pagination
];

const Transaction = () => {
  const [transactions, setTransactions] = useState(demoTransactions);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("all");
  const itemsPerPage = 5;

  // Status styles configuration
  const statusConfig = {
    completed: {
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
    pending: {
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
    },
    failed: {
      color: "bg-red-100 text-red-800",
      icon: AlertCircle,
    },
  };

  // Filter and sort transactions
  const filteredAndSortedTransactions = React.useMemo(() => {
    return [...transactions]
      .filter((transaction) => {
        const matchesSearch = 
          transaction.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.amount.includes(searchTerm);
        
        const matchesStatus = 
          filterStatus === "all" || transaction.status === filterStatus;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const order = sortOrder === "asc" ? 1 : -1;
        if (sortBy === "date") {
          return order * (new Date(b.date) - new Date(a.date));
        }
        if (sortBy === "amount") {
          return order * (parseFloat(b.amount.replace(",", "")) - parseFloat(a.amount.replace(",", "")));
        }
        return 0;
      });
  }, [transactions, searchTerm, sortBy, sortOrder, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTransactions.length / itemsPerPage);
  const currentItems = filteredAndSortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto p-2 sm:p-4 lg:p-6"
    >
      {/* Header and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* <h2 className="text-2xl font-bold text-gray-900">
            Transaction History
          </h2> */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </motion.div>

            {/* Status Filter */}
            <motion.select
              whileHover={{ scale: 1.02 }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </motion.select>

            {/* Sort */}
            <motion.select
              whileHover={{ scale: 1.02 }}
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split("-");
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
              className="px-4 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </motion.select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Date & Time
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Status
                </th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((transaction, index) => {
                  const StatusIcon = statusConfig[transaction.status]?.icon;
                  return (
                    <motion.tr
                      key={transaction.id}
                      variants={tableRowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={index}
                      whileHover={{ backgroundColor: "#F9FAFB" }}
                    >
                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {transaction.customer}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.number}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ${transaction.amount}
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap hidden md:table-cell">
                        <span className={`px-3 py-1 inline-flex items-center gap-1 rounded-full text-xs font-semibold ${statusConfig[transaction.status]?.color}`}>
                          {StatusIcon && <StatusIcon size={14} />}
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </AnimatePresence>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500"
                >
                  Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500"
                >
                  Next
                </motion.button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>
                    {" "}-{" "}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, filteredAndSortedTransactions.length)}
                    </span>
                    {" "}of{" "}
                    <span className="font-medium">{filteredAndSortedTransactions.length}</span>
                    {" "}results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <motion.button
                        key={i + 1}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                          ${currentPage === i + 1
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                      >
                        {i + 1}
                      </motion.button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Transaction;
