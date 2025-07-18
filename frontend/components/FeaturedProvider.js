import React from "react";
import UsersCard from "./UsersCard";

const FeaturedProvider = () => {
  return (
    <div className="xl:container xl:mx-auto px-2 xl:px-0 py-20">
        {/* title  */}
      <div>
        <h2 className="text-center text-xl md:text-2xl text-textHeadingColor font-bold">
        Featured Provider
      </h2>
      <p className=" max-w-xl mx-auto text-center text-textColor mt-2 mb-6 text-sm">
        Discover top-rated professionals handpicked for their quality,
        reliability, and excellence in service.
      </p>
      </div>
      
        {/* provider list  */}
       <div>
         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {Array.from({length : 6}).map((_, index) => (
               <UsersCard key={index}/>
            ))}
        </div>
        <div className="text-center mt-4">
        <button className="btn">See all providers</button>
        </div>
       </div>

    </div>
  );
};

export default FeaturedProvider;
