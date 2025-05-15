import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <>
      <section className="py-5 pt-24">
       <div className="container mx-auto px-2 md:px-0">
        <h1 className="text-center my-5 capitalize"> <Link href='/'>home</Link> /about us</h1>
        <div className="p-5 bg-white rounded-md">
        <h1 className="text-4xl md:text-5xl mb-4 capitalize md:mb-5 text-bottom-textColor font-bold md:font-semibold">About us</h1>
        <p className="text-textprimaryColor text-sm md:text-base leading-8">World is growing fast with economic and technical improvements. Everyone is getting engaged with economic activities to lead life. Most of the people in the family spend time out of the house to earn. Thus there are so many services in the house that need to be fulfilled are not monitored. There are so many household items and instruments we use in the house. After a long time it needs to be repaired. Also sudden disturbance of instruments makes life difficult. It needs to be repaired as soon as possible. For the fulfillment services, people search for acquainted, most secured, best experienced and organized people. We are concern every problems that arise and value everyone who are solving the difficulties. Our mission is to support them through websites or mobile apps to find the best people for service. We will integrate service among user and service provider through online platform apps and website. We connect people to live smarter and better.</p>
        </div>
       </div>
      </section>
    </>
  );
};

export default page;
