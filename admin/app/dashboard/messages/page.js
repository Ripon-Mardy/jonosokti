'use client';
import React, { useState } from 'react';

const Page = () => {
  // Sample message data
  const messageData = [
    { id: 1, name: 'Axel R', email: 'mardyripon10@gmail.com', phone: '01733023234', subject: 'Subject 1', message: 'This is message 1' },
    { id: 2, name: 'John Doe', email: 'johndoe@gmail.com', phone: '01876543210', subject: 'Subject 2', message: 'This is message 2' },
  ];

  // State to hold the selected message
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Function to handle show click
  const handleShowClick = (message) => {
    setSelectedMessage(message); 
  };

  // Function to close the popup
  const closePopup = () => {
    setSelectedMessage(null); 
  };

  return (
    <section className="bg-white rounded p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-5">
        <h2 className="text-lg -tracking-tighter text-textColor font-bold mb-4">Messages</h2>
        <input
          type="text"
          className="p-1 px-3 rounded border border-gray-200 w-1/4 outline-none focus:border focus:border-gray-400 text-textColor bg-transparent text-base"
          placeholder="Search..."
        />
      </div>

      {/* Message Table */}
      <div>
        {messageData.length > 0 ? (
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-base text-headingColor">Name</th>
                <th className="text-left py-3 px-4 text-base text-headingColor">Email</th>
                <th className="text-left py-3 px-4 text-base text-headingColor">Phone</th>
                <th className="text-left py-3 px-4 text-base text-headingColor">Message</th>
              </tr>
            </thead>
            <tbody>
              {messageData.map((item) => (
                <tr key={item.id}>
                  <td className="py-1 px-4 text-textColor text-sm font-medium">{item.name}</td>
                  <td className="py-1 px-4 text-textColor text-sm font-medium">{item.email}</td>
                  <td className="py-1 px-4 text-textColor text-sm font-medium">{item.phone}</td>
                  <td
                    onClick={() => handleShowClick(item)} // Pass the message object
                    className="px-4 py-1 text-sm font-medium bg-successBg text-white w-20 rounded-full text-center cursor-pointer"
                  >
                    Show
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-textColor text-sm">Messages not available</p>
        )}
      </div>

      {/* Popup Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 space-y-2">
            <h3 className="text-lg font-bold mb-2 text-headingColor">Message Details</h3>
            {/* <p className="text-sm text-gray-600"><strong>Name:</strong> {selectedMessage.name}</p>
            <p className="text-sm text-gray-600"><strong>Email:</strong> {selectedMessage.email}</p>
            <p className="text-sm text-gray-600"><strong>Phone:</strong> {selectedMessage.phone}</p> */}
            <p className="text-sm text-gray-600"><strong>Subject:</strong> {selectedMessage.subject}</p>
            <p className="text-sm text-gray-600 flex flex-col"><strong className="text-base">Message:</strong> {selectedMessage.message}</p>
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
