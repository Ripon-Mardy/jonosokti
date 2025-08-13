'use client'
import UsersCard from "@/components/UsersCard";
import React from "react";
import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

const page = ({params}) => {
    const userId = params.user;
    const router = useRouter();

  return (
    <div className="xl:container xl:mx-auto px-2 xl:px-0 mt-24 mb-10">


      {/* Back Button & Breadcrumb */}
      <div className="flex items-center gap-2">
        {/* Back Button */}
        <button
        onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-textBannerColor hover:underline"
        >
          <MoveLeft className="w-4 h-4" />
          Back
        </button>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-gray-600">
          <button className="hover:underline">Category</button>
          <span>/</span>
          <button className="hover:underline">Electronics Service</button>
          <span>/</span>
          <span className="text-gray-900">Phone Repair</span>
        </nav>
      </div>

        {/* Title & Info */}
      <div className="mt-4">
        <h2 className="text-xl sm:text-3xl font-bold">Phone Repair Providers</h2>
        <p className="text-sm text-textColor">
          4 providers available in your area
        </p>
      </div>

      {/* users  */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-8">
        {Array.from({length : 6}).map((_, index) => (
        <UsersCard />
        ))}
      </div>


    </div>
  );
};

export default page;
