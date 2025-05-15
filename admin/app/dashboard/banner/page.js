'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Page = () => {
  const [category, setCategory] = useState([]);
  const [newBanner, setNewBanner] = useState({
    name: "",
    categoryId: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const adminUrl = process.env.ADMIN_URL;


    // Form Inputs
    const handleInputChange = (e) => {
      const { name, value, files } = e.target; 
      if(name === 'image') {
        const file = files[0]
        setNewBanner((prev) => ({...prev, image : file}))
        setPreview(URL.createObjectURL(file))
      } else {
        setNewBanner((prev) => ({...prev, [name] : value}))
      }
    };


  // Drag-and-Drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file) {
      setNewBanner((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };


// submited form 
const handleFormSubmit = async (e) => {
  e.preventDefault()


  const formData = new FormData();
  formData.append("name", newBanner.name);
  formData.append("categoryId", newBanner.categoryId);
  if(newBanner.image) {
    formData.append("image", newBanner.image)
  }

  
  try {
    const authToken = localStorage.getItem('authToken'); 
    if(!authToken) throw new Error('Auth token is missing');

    const res = await fetch(`${adminUrl}/banner/insert-banner`, {
      method : "POST",
      headers : {
        Authorization: `Bearer ${authToken}`,
      },
      body : newBanner,
    })
    if (res.ok) {
      const newCateogory = await response.json();
      setSuccess(true);
      setNewBanner({ name: "", image: null });
      handleUpdateCategories(newCateogory)
      handleAddCategory(false); // Close modal
    } else {
      alert('Banner add failed')
    }
  } catch (error) {
    console.log('error', error)
  }

}

// fetch category 
const fetchCategory = async () => {
  try {
    const res = await fetch(`${adminUrl}/category/categories`);
    if(!res.ok) throw new Error('Failed to fetch Category');
      const data = await res.json();
    setCategory(data?.data)
  } catch (error) {
    console.log('error', error)
  }
}

useEffect(() => {fetchCategory()}, [])

  // File Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Fix: Correct access to file input
    if (file) {
      setNewBanner((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };


  return (
    <div>
      <h2 className="font-semibold text-xl">Banner Management</h2>
      <div className="bg-white rounded p-4">
        <h2 className="text-xl font-semibold">Add New Banner</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="w-full flex items-center gap-10">
            <div className="w-1/2 flex flex-col gap-2">
              <label >Name</label>
              <input
                name="name"
                className="p-2 w-full rounded border outline-none border-gray-200 focus:border-gray-400 text-base"
                type="text"
                value={newBanner.name}
                onChange={handleInputChange}
                placeholder="Banner Name"
                required
              />
            </div>

            {/* Category Dropdown */}
            <div className="w-1/2 flex flex-col gap-2">
              <label htmlFor="category">Select Category</label>
              <select
                id="category"
                name="categoryId"
                value={newBanner.categoryId}
                onChange={handleInputChange}
                className="p-2 w-full border rounded border-gray-200 focus:border-gray-400 outline-none text-base"
              >
                <option value="">Please select</option>
                {category.map((list, index) => (
                  <option key={index} value={list?._id}> {list?.name} </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-2">Image</label>
            <div
              className="w-32 h-32 relative border-dashed border-2 border-gray-400 rounded-lg p-4 flex justify-center items-center cursor-pointer bg-gray-100 hover:bg-gray-200"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >

                <p className="text-gray-600">Drag & Drop or Click to Upload</p>

              <input
                type="file" 
                name="image"
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-4">
              <Image
                src={preview}
                alt="Uploaded Preview"
                width={200}
                height={100}
                className="rounded-md border"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            className="w-fit bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 transition duration-200 text-sm"
            type="submit"
          >
            Add Banner
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
