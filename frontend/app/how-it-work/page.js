"use client";
import React from "react";
import { ArrowRight, CheckCircle, HelpCircle, Award, Briefcase   } from "lucide-react";

const Section = ({ title, content }) => (
  <div className="mb-8 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
      <CheckCircle className="h-5 w-5 text-blue-500" />
      {title}
    </h2>
    <p className="text-gray-600 leading-relaxed">{content}</p>
  </div>
);

const Page = () => {
  const sections = [
    {
      title: "Service Provider",
      content:
        "Service providers are those who are skilled in different categories to solve the problem you face.",
    },
    {
      title: "Service User",
      content:
        "Service users are those who will hire service providers to solve problems they face.",
    },
    {
      title: "Get your job done",
      content:
        "Hire an expert from near your living according to the skill categories. Service anytime, anywhere by the service provider.",
    },
    {
      title: "Fix your wage",
      content:
        "Get details information about the job. Fix your wage by visiting the actual tasks. After fixing wages you can choose spot payment or payment through the platform (condition applied).",
    },
    {
      title: "Spot payment",
      content:
        "After completing your task, get payment from the service user immediately",
    },
    {
      title: "Payment through platform",
      content:
        "After fixing your wage you can choose the platform for your payment. Payment will be made to the platform before the service. After completing the service successfully platform will pay the service provider as per the service user mark done.",
    },
    {
      title: "Jobs",
      content:
        "Service providers can find jobs posted by the service user. Apply for the job and provide service accordingly.",
    },
    {
      title: "Post a job",
      content:
        "The service user can post any job according to their need providing details information.",
    },
    {
      title: "Get reviews",
      content:
        "The service user will review the service provider for quality and successful service. It will help to get more jobs in the future.",
    },
    {
      title: "Packages",
      content:
        "Platform has packages consisting of better features and opportunities. The service providers can choose a package or update to any package.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">



        {/* Header */}
        <div className="text-center mb-8 p-3 rounded-md space-y-2 py-5">
          <div className="flex items-center justify-center gap-2">
            {/* <Briefcase className="text-yellow-300" size={26} /> */}
            <h1 className="text-base md:text-2xl font-bold text-textHeadingColor">How It Works</h1>
          </div>
          <p className="text-textColor text-sm md:text-base max-w-2xl mx-auto">
             Jonosokti is an online electronic platform that connects Clients and
            Workers to perform work or job assignments efficiently.
          </p>
        </div>






        {/* Introduction */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <p className="text-gray-600 leading-relaxed">
            The Jonosokti Platform is a venue that creates efficiencies in
            managing and delivering labor and services by allowing Users to
            match their respective needs. Here is how it works –
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Section key={index} {...section} />
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <HelpCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Need Help?
              </h3>
              <p className="text-gray-600">
                Whether you've got any questions or are confused about anything,
                use our round-the-clock online help center any time and we will
                help you immediately.
              </p>
              <button className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                Contact Support <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
