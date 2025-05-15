"use client"
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications

const AddCategory = ({ handleAddCategory, handleUpdateCategories }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL; // Using NEXT_PUBLIC prefix for client-side access

  // Handle input change with validation
  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPEG, PNG, or WebP)');
        return;
      }

      if (file.size > maxSize) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setCategoryData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setCategoryData(prev => ({ ...prev, [name]: value.trim() }));
    }
  }, []);

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!categoryData.name) {
      toast.error('Please enter a category name');
      return;
    }

    if (!categoryData.image) {
      toast.error('Please select an image');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", categoryData.name);
      formData.append("image", categoryData.image);

      const authToken = localStorage.getItem("authToken");
      
      if (!authToken) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${adminUrl}/category/insert-category`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add category');
      }

      const newCategory = await response.json();
      handleUpdateCategories(newCategory);
      toast.success('Category added successfully!');
      handleAddCategory(false);
      
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" 
           onClick={() => handleAddCategory(false)} />
      
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl">
        {/* Close Button */}
        <button
          onClick={() => handleAddCategory(false)}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Add Category
          </h2>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Category Name Input */}
            <div>
              <label 
                htmlFor="categoryName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category Name
              </label>
              <input
                id="categoryName"
                type="text"
                name="name"
                value={categoryData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter category name"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label 
                htmlFor="categoryImage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category Image
              </label>
              <input
                id="categoryImage"
                type="file"
                name="image"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              
              {imagePreview && (
                <div className="mt-3">
                  <Image
                    src={imagePreview}
                    alt="Category Preview"
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Save Category'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
