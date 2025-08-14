import React from "react";
import UsersCard from "./UsersCard";

const FeaturedProvider = () => {
  return (
    <div className="xl:container xl:mx-auto px-2 xl:px-0 py-20">
        {/* title  */}
      <div>
        <h2 className="text-center text-xl md:text-3xl text-textHeadingColor font-bold">
        Featured Service Providers
      </h2>
      <p className=" max-w-xl mx-auto text-center text-gray-600 mt-2 mb-6 text-sm sm:text-base">
        Meet our top-rated professionals. Verified, skilled, and ready to serve you.
      </p>
      </div>
      
        {/* provider list  */}
       <div>
         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {Array.from({length : 6}).map((_, index) => (
               <UsersCard key={index}/>
            ))}
        </div>
        <div className="text-center mt-5">
        <button className="btn">See all providers</button>
        </div>
       </div>

    </div>
  );
};

export default FeaturedProvider;
