import React from "react";

const Loading = () => {
  return (
    <div className='flex gap-5'>
      <div className="flex flex-col bg-gray-200 w-56 h-64 animate-pulse rounded-xl p-4 gap-3">
        {/* Image Placeholder */}
        <div className="bg-gray-300 w-full h-32 rounded-md"></div>

        {/* Text Placeholder */}
        <div className="flex flex-col gap-2">
          <div className="bg-gray-300 w-4/5 h-4 rounded-md"></div>
          <div className="bg-gray-300 w-3/5 h-4 rounded-md"></div>
          <div className="bg-gray-300 w-2/5 h-4 rounded-md"></div>
        </div>
      </div>

      <div className="flex flex-col bg-gray-200 w-56 h-64 animate-pulse rounded-xl p-4 gap-3">
        {/* Image Placeholder */}
        <div className="bg-gray-300 w-full h-32 rounded-md"></div>

        {/* Text Placeholder */}
        <div className="flex flex-col gap-2">
          <div className="bg-gray-300 w-4/5 h-4 rounded-md"></div>
          <div className="bg-gray-300 w-3/5 h-4 rounded-md"></div>
          <div className="bg-gray-300 w-2/5 h-4 rounded-md"></div>
        </div>
      </div>


    </div>
  );
};

export default Loading;
