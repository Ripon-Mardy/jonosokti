'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Search, List  } from "lucide-react";

const MainBanner = () => {
    const [category, setCategory] = useState([]);

    // api key 
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    useEffect(() => {
      const fetchCategories = async () => {
            try {
                const response = await fetch(`${apiKey}/category/categories`);
                const data = await response.json();
                setCategory(data?.data || []);
            } catch (error) {
                console.log('error', error)
            }
        };
        fetchCategories();
    },[])

  return (
    <div className="bg-heroImage relative after:content-[''] after:absolute after:inset-0 after:bg-black after:bg-opacity-50 after:z-10 bg-cover bg-no-repeat bg-fixed bg-top py-10 pb-28">
      <div className="xl:container xl:mx-auto relative px-2 xl:px-0 pt-20 z-20">
        <div className="text-center text-white space-y-3">
          <h2 className="text-white font-bold text-3xl sm:text-5xl mx-auto sm:max-w-3xl">
            Find Trusted
            <b className="text-textBannerColor font-bold"> Service Providers </b>
            Near You
          </h2>
          <p className="text-white text-center max-w-sm mx-auto sm:max-w-xl text-sm sm:text-base">
            Connect with skilled professionals for all your home and personal
            service needs. Quality service, verified providers, instant booking.
          </p>
        </div>

        {/* search bar  */}
        <div className=" bg-white p-3 md:p-5 rounded-md flex items-center justify-center flex-col sm:max-w-4xl mx-auto sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-8">
          <div className="relative w-full max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition text-sm"
              placeholder="Where service you want"
            />
          </div>
          
         <div className="relative w-full">
             <select className="w-full border border-gray-300 rounded-md py-3 outline-none pl-12 pr-4 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition text-sm">
            <option selected>All Services</option>
            {category.map((item) => (
             <div>
               <option key={item._id} className="rounded-md" value={item.name}>
                {item.name}
              </option>
                <Image src={ apiKey + item?.image} alt={item?.name} width={5} height={5} className="text-xs" />
             </div>
            ))}
          </select>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"> <List className="w-5 h-5"/> </span>
         </div>

          <button className="bg-bgColor text-sm hover:bg-hoverBg transition text-white font-medium rounded-md w-full py-2 sm:py-3 sm:w-1/2">Find Services</button>
        </div>


      </div>
    </div>
  );
};

export default MainBanner;
