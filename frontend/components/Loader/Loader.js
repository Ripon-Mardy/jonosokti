import React from "react";

const Loader = () => {
  return (
    <div className="max-w-lg">
      <div className={`animate-pulse space-y-4`}>
        <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded-md w-full"></div>
          <div className="h-6 bg-gray-200 rounded-md w-full"></div>
          <div className="h-6 bg-gray-200 rounded-md w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
