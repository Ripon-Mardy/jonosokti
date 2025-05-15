"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Pencil, X } from "lucide-react";
import AddCategory from "@/components/AddCatgory";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModel";

const Page = () => {
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const [addCategory, setAddCategory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({ id: selectCategoryId, name: "", image: null });

  const adminUrl = process.env.ADMIN_URL;

  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${adminUrl}/category/categories`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, [adminUrl]);

  const handleEditClick = (category) => {
    setSelectCategoryId(category);
    setFormData({ name: category.name, image: null });
    setImagePreview(category.image || null);
  };

  const handleDeleteClick = (id) => {
    setSelectItem(id);
    setIsDeleteModelOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const res = await fetch(
        `${adminUrl}/category/delete-category?id=${selectItem}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete category");

      setCategories((prev) => prev.filter((item) => item._id !== selectItem));
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsDeleteModelOpen(false);
    }
  };

  const handleAddCategory = () => setAddCategory(!addCategory);

  const handleUpdateCategories = (newCategory) => {
    setCategories((prev) => [newCategory, ...prev]);
  };

  const handleCloseBar = () => {
    setSelectCategoryId(null);
    setImagePreview(null);
    setFormData({ id: null, name: "", image: null });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    const formDataWithId = {
      ...formData,
      id: String(selectCategoryId._id),
    };
    try {
      const res = await fetch(`${adminUrl}/category/update-category`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithId),
      });

      if (!res.ok) {
        const errorDetails = await res.json().catch(() => ({})); 
        const errorMessage = errorDetails.message || `HTTP Error: ${res.status}`;
        throw new Error(errorMessage);
      }

      const updatedCategory = await res.json();

      // Update the state with the edited category
      setCategories((prev) =>
        prev.map((item) => (item._id === selectCategoryId._id ? updatedCategory.data : item))
      );

      handleCloseBar();
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-gray-800">All Categories</h2>
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition"
        >
          Add Category
        </button>
      </div>

      {loading ? (
        <h2 className="text-center text-lg text-gray-500">Loading categories...</h2>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Category Name</th>
                <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Image</th>
                <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b text-gray-800">{category.name}</td>
                    <td className="py-3 px-4 border-b">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={60}
                          height={60}
                          className="object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleDeleteClick(category._id)}
                          className="text-red-500 hover:text-red-600 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => handleEditClick(category)}
                          className="text-blue-500 hover:text-blue-600 transition"
                        >
                          <Pencil size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No Categories Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {addCategory && (
        <AddCategory
          handleAddCategory={handleAddCategory}
          handleUpdateCategories={handleUpdateCategories}
        />
      )}

      <ConfirmDeleteModal
        onClose={() => setIsDeleteModelOpen(false)}
        isOpen={isDeleteModelOpen}
        onConfirm={handleConfirmDelete}
      />

      {selectCategoryId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
          <span
            onClick={handleCloseBar}
            className="absolute right-4 top-4 text-white cursor-pointer font-semibold text-2xl"
          >
            <X size={28} />
          </span>
          <div className="bg-white rounded-lg shadow-lg w-full md:w-1/3 p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Edit Category</h2>
            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div>
                <label className="block font-medium text-sm text-gray-700">Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 border rounded-lg py-2 px-3 mt-1 text-gray-800"
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700">Category Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 text-gray-700"
                />
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover mt-3 rounded-lg shadow"
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
