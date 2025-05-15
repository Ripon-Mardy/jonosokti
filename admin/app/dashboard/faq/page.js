"use client";
import React, { useEffect, useState } from "react";
import { Filter, Pencil, Trash2, X } from "lucide-react";

const FaqDashboard = () => {
  const [faq, setFaq] = useState([]); // All FAQs
  const [addFaq, setAddFaq] = useState({ question: "", answer: "" }); // Add new FAQ
  const [isDeleteModal, setIsDeleteModal] = useState(false); // Show/hide delete modal
  const [selectedId, setSelectedId] = useState(null); // Selected FAQ id for deletion
  const [loading, setLoading] = useState(false); // Loading state
  const [editFaq, setEditFaq] = useState(null); // FAQ item to edit (null when not editing)
  const [error, setError] = useState(null); // Error state for better UX (string)

  const adminUrl = process.env.ADMIN_URL; // Use NEXT_PUBLIC_ for client-side env vars

  // Get input value for Add FAQ form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddFaq((prev) => ({ ...prev, [name]: value }));
  };

  // Get input value for Edit FAQ form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFaq((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch FAQs from the API
  useEffect(() => {
    const fetchFaq = async () => {
      setLoading(true);
      setError(null);
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) throw new Error("Authentication token is missing");
        if (!adminUrl) throw new Error("Admin URL is not configured");

        const res = await fetch(`${adminUrl}/faq/get-faqs`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData?.message || "Failed to fetch FAQs");
        }

        const faqData = await res.json();
        setFaq(faqData?.data || []);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setError(err.message); // Store error message as string
      } finally {
        setLoading(false);
      }
    };

    fetchFaq();
  }, [adminUrl]);

  // Add new FAQ
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Authentication token is missing");

      const res = await fetch(`${adminUrl}/admin/insert-faq`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(addFaq),
      });

      if (res.ok) {
        const newFaq = await res.json();
        setFaq((prevFaq) => [...prevFaq, newFaq.data]); // Adjust based on your API response structure
        setAddFaq({ question: "", answer: "" });
      } else {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to add FAQ");
      }
    } catch (error) {
      console.error("Error adding FAQ:", error);
      setError(error.message); // Store error message as string
    }
  };

  // Open edit modal for a FAQ
  const handleUpdateClick = (item) => {
    setEditFaq(item);
  };

  // Submit updated FAQ (edit)
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Authentication token is missing");

      const res = await fetch(`${adminUrl}/admin/update-faq?faq_id=${editFaq._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          question: editFaq.question,
          answer: editFaq.answer,
        }),
      });

      if (res.ok) {
        const updatedFaq = await res.json();
        setFaq((prevFaq) =>
          prevFaq.map((item) => (item._id === updatedFaq.data._id ? updatedFaq.data : item))
        ); // Adjust based on API response structure
        setEditFaq(null);
      } else {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to update FAQ");
      }
    } catch (error) {
      console.error("Error updating FAQ:", error);
      setError(error.message); // Store error message as string
    }
  };

  // Handle delete confirmation
  const handleConfirmDelete = async () => {
    setError(null);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Authentication token is missing");

      const res = await fetch(`${adminUrl}/admin/delete-faq?faq_id=${selectedId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.ok) {
        setFaq((prevFaq) => prevFaq.filter((item) => item._id !== selectedId));
        setIsDeleteModal(false);
        setSelectedId(null);
      } else {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to delete FAQ");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      setError(error.message); // Store error message as string
    }
  };

  // Handle delete button click
  const handleDeleteButton = (id) => {
    setSelectedId(id);
    setIsDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModal(false);
    setSelectedId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">FAQ Management</h2>

        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          {/* Add FAQ Form */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New FAQ</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                <input
                  type="text"
                  name="question"
                  value={addFaq.question}
                  onChange={handleInputChange}
                  placeholder="Enter question"
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                <textarea
                  name="answer"
                  value={addFaq.answer}
                  onChange={handleInputChange}
                  placeholder="Enter answer"
                  rows="3"
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
              >
                Add FAQ
              </button>
            </form>
          </div>

          {/* Display FAQs */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Current FAQs</h3>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <p className="text-red-500 text-center text-sm">{error}</p>
            ) : faq.length > 0 ? (
              <div className="space-y-4">
                {faq.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-50 p-4 rounded-md border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <h4 className="text-lg font-semibold text-gray-900">{item.question}</h4>
                      <p className="text-gray-600 text-sm sm:text-base">{item.answer}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleUpdateClick(item)}
                        className="text-blue-600 hover:text-blue-800 transition duration-200"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteButton(item._id)}
                        className="text-red-500 hover:text-red-700 transition duration-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center text-sm">No FAQs added yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this FAQ?</p>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseDeleteModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit FAQ Modal */}
      {editFaq && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Edit FAQ</h3>
              <button
                onClick={() => setEditFaq(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                <input
                  type="text"
                  name="question"
                  value={editFaq.question}
                  onChange={handleEditInputChange}
                  placeholder="Enter question"
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                <textarea
                  name="answer"
                  value={editFaq.answer}
                  onChange={handleEditInputChange}
                  placeholder="Enter answer"
                  rows="3"
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditFaq(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqDashboard;