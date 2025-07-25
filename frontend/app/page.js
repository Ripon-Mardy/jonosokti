import React from "react";
import JobCategory from "@/components/JobCategory";
import Jobs from "@/components/Jobs";
import Banner from "@/components/Banner";
import FeaturedProvider from "@/components/FeaturedProvider";
import MainBanner from "@/components/MainBanner";

export default function Home() {
  return (
    <>
      {/* <Banner /> */}
      <MainBanner/>
      <JobCategory />
      <Jobs />
      <FeaturedProvider/>
    </>
  );
}
