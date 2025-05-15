"use client";
import { useState } from "react";

export default function page() {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Basic Package",
      price: 50,
      features: ["1GB Storage", "10 Users"],
    },
    {
      id: 2,
      name: "Pro Package",
      price: 100,
      features: ["10GB Storage", "50 Users"],
    },
  ]);

  const [newPackage, setNewPackage] = useState({
    name: "",
    price: "",
    features: "",
  });
  const [selectedPackage, setSelectedPackage] = useState(null); // For viewing/editing
  const [editMode, setEditMode] = useState(false);

  // Add a new package
  const addPackage = () => {
    if (!newPackage.name || !newPackage.price || !newPackage.features) {
      alert("Please fill all fields!");
      return;
    }

    const featuresArray = newPackage.features
      .split(",")
      .map((feature) => feature.trim());
    setPackages([
      ...packages,
      {
        id: packages.length + 1,
        name: newPackage.name,
        price: Number(newPackage.price),
        features: featuresArray,
      },
    ]);

    setNewPackage({ name: "", price: "", features: "" });
  };

  // Delete a package
  const deletePackage = (id) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  // Save edited package
  const savePackage = () => {
    if (
      !selectedPackage.name ||
      !selectedPackage.price ||
      selectedPackage.features.length === 0
    ) {
      alert("Please fill all fields!");
      return;
    }

    setPackages(
      packages.map((pkg) =>
        pkg.id === selectedPackage.id ? { ...selectedPackage } : pkg
      )
    );

    setSelectedPackage(null);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <h2 className="text-2xl font-bold mb-3"> Packages</h2>
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Add New Package */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Add New Package</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Package Name"
              value={newPackage.name}
              onChange={(e) =>
                setNewPackage({ ...newPackage, name: e.target.value })
              }
              className="border border-gray-300 p-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={newPackage.price}
              onChange={(e) =>
                setNewPackage({ ...newPackage, price: e.target.value })
              }
              className="border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              placeholder="Features (comma-separated)"
              value={newPackage.features}
              onChange={(e) =>
                setNewPackage({ ...newPackage, features: e.target.value })
              }
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <button
            onClick={addPackage}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Package
          </button>
        </div>

        {/* Package List */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Current Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-800">{pkg.name}</h3>
                <p className="text-gray-600 mb-2">Price: ${pkg.price}</p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {pkg.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setEditMode(false);
                    }}
                    className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                  >
                    View/Edit
                  </button>
                  <button
                    onClick={() => deletePackage(pkg.id)}
                    className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View/Edit Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Package" : "Package Details"}
            </h2>

            {/* Package Details */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Package Name"
                value={selectedPackage.name}
                disabled={!editMode}
                onChange={(e) =>
                  setSelectedPackage({
                    ...selectedPackage,
                    name: e.target.value,
                  })
                }
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={selectedPackage.price}
                disabled={!editMode}
                onChange={(e) =>
                  setSelectedPackage({
                    ...selectedPackage,
                    price: e.target.value,
                  })
                }
                className="w-full border border-gray-300 p-2 rounded"
              />
              <textarea
                placeholder="Features (one per line)"
                value={selectedPackage.features.join("\n")}
                disabled={!editMode}
                onChange={(e) =>
                  setSelectedPackage({
                    ...selectedPackage,
                    features: e.target.value.split("\n"),
                  })
                }
                className="w-full border border-gray-300 p-2 rounded"
                rows="4"
              ></textarea>
            </div>

            <div className="flex justify-between mt-6">
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              )}
              {editMode && (
                <button
                  onClick={savePackage}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
              )}
              <button
                onClick={() => {
                  setSelectedPackage(null);
                  setEditMode(false);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
