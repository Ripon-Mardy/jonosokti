import React from "react";
import JobCategory from "@/components/JobCategory";
import Jobs from "@/components/Jobs";
import Banner from "@/components/Banner";
import FeaturedProvider from "@/components/FeaturedProvider";

export default function Home() {
  return (
    <>
      <Banner />
      <JobCategory />
      <Jobs />
      <FeaturedProvider/>
    </>
  );
}
