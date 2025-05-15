"use client";
import { useEffect, useState } from "react";

const page = () => {
  const [jobTypes, setJobTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const adminUrl = process.env.ADMIN_URL;

  useEffect(() => {
    fetchJobTypes();
  }, []);

  const fetchJobTypes = async () => {
    try {
      const response = await fetch(`${adminUrl}/job/all-job-types`); // Replace with your API URL
      if (!response.ok) {
        throw new Error("Failed to fetch job types.");
      }
      const data = await response.json();
      setJobTypes(data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
        Jobs types
      </h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border border-gray-300 text-left">#</th>
                <th className="p-3 border border-gray-300 text-left">Title</th>
                <th className="p-3 border border-gray-300 text-left">Status</th>
                <th className="p-3 border border-gray-300 text-left">
                  Created At
                </th>
                <th className="p-3 border border-gray-300 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {jobTypes.map((jobType, index) => (
                <tr key={jobType._id} className="hover:bg-gray-100">
                  <td className="p-3 border border-gray-300">{index + 1}</td>
                  <td className="p-3 border border-gray-300">{jobType.title}</td>
                  <td className="p-3 border border-gray-300">
                    {jobType.status ? "Active" : "Inactive"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {new Date(jobType.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 border border-gray-300">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default page;
