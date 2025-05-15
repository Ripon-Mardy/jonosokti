'use client'
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const providersData = [
  {
    id: "1",
    name: "Provider A",
    email: "contact@providerA.com",
    serviceType: "Internet",
    isActive: true,
    image: "https://randomuser.me/api/portraits/women/68.jpg" // Replace with actual image URLs
  },
  {
    id: "2",
    name: "Provider B",
    email: "contact@providerB.com",
    serviceType: "Cloud Storage",
    isActive: false,
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: "3",
    name: "Provider C",
    email: "support@providerC.com",
    serviceType: "Web Hosting",
    isActive: true,
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
];

export default function page() {
  const [providers, setProviders] = useState(providersData);

  const handleEdit = (id) => {
    alert(`Editing provider with id: ${id}`);
    // Navigate to edit page or open edit modal
  };

  const handleDelete = (id) => {
    setProviders(providers.filter((provider) => provider.id !== id));
    alert(`Deleted provider with id: ${id}`);
  };

  return (
    <div className="overflow-x-auto px-4">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Provider List</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Provider Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Service Type</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-4 text-gray-700">{provider.id}</td>
              <td className="px-4 py-4">
                <img
                  src={provider.image}
                  alt={`${provider.name} logo`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="px-4 py-4 font-medium text-gray-700">{provider.name}</td>
              <td className="px-4 py-4 text-gray-700">{provider.email}</td>
              <td className="px-4 py-4 text-gray-700">{provider.serviceType}</td>
              <td className="px-4 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    provider.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {provider.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-4 py-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(provider.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(provider.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
