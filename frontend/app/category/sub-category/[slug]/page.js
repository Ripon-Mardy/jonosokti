"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import subCategoryData from "@/lib/subCategory";

const page = ({ params }) => {
  const [subCategories, setSubCategories] = useState(subCategoryData);
  console.log("subCategories", subCategories);

  const slug = params.slug;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const router = useRouter()

  // fetch sub categories

  return (
    <div className="xl:container xl:mx-auto px-2 xl:px-2 mt-20">
      {/* back previous page  */}
      <div>
        <Link
        href={'#'}
        onClick={() => router.back()}
          className="flex items-center justify-startz gap-1 text-blue-500 hover:text-blue-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Categories
        </Link>
        <h2 className="text-textHeadingColor font-bold text-xl md:text-2xl mt-1">
          Electronics Service
        </h2>
        <p className="text-paraColor text-sm">6 subcategories available</p>
      </div>

      {/* sub categories  */}
      <div className="mt-10 ">
        {subCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-3 sm:gap-6">
            {subCategories.map((item, index) => (
              <Link key={index} href={'/category/sub-category/user/12'} className="border border-gray-100 rounded-md overflow-hidden pb-2">
               <div className="w-full">
                 <Image
                  src={item?.image}
                  alt={item?.name}
                  layout="responsive"
                  width={20}
                  height={20}
                />
               </div>
               <h5 className="text-center text-sm text-textHeadingColor font-semibold mt-2"> {item?.name} </h5>
               <span className="text-xs text-textColor text-center block">0 providers available</span>
              </Link>
            ))}
          </div>
        ) : (
          // <NoDataFound text={'Sub Category not found'} subText={'Try agian later'}/>
          <div className="flex items-center justify-center mt-5 text-base text-textColor">
            No sub categories found
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
