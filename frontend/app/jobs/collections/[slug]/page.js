'use client'
import React from "react";
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import jobImage from '@/public/images/jobsimage.jpg'
import { Share2, Ellipsis, CircleArrowOutUpRight, CircleArrowLeft } from 'lucide-react';

const page = ({params}) => {
    const jobId = params.slug;
    const router = useRouter();
    const singleJob = jobList.find(job => job.id === parseInt(jobId))

    if(!singleJob) {
        return <div>job not found</div>
    }
  return (
    <div className="md:container md:mx-auto pt-20 px-3">
        <span onClick={() => router.back()} className='text-sm cursor-pointer font-normal text-black90 bg-white rounded-xl w-fit flex items-center gap-1 px-4 py-1 mb-4'> <CircleArrowLeft size={16} /> Back </span>
      <div className="bg-white border border-gray-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Image src={jobImage} alt="job image" width={30} height={30} />
                <h2 className="text-base text-gray-900">
                 {singleJob?.companyName}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <span className="cursor-pointer">
                  <Share2 size={20} />
                </span>
                <span className="cursor-pointer">
                  <Ellipsis size={22} />
                </span>
              </div>
            </div>

            <div className="mt-5">
              <Link
                href={"#"}
                className="text-xl font-semibold hover:underline text-textHeadingColor"
              >
            {singleJob?.jobTitle}
              </Link>
              <div className="flex items-center gap-2 text-paraColor text-sm mt-1">
                <span> Dhaka, Dhaka, Bangladesh . </span>
                <span>6 months ago</span>
              </div>

              {/* apply button  */}
              <div className="mt-4 flex items-center gap-4">
                <button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 transition px-6 py-2 rounded-xl text-white font-semibold text-sm">
                  Apply
                  <span className="font-semibold">
                    <CircleArrowOutUpRight size={18} />
                  </span>
                </button>
                <button className="border-2 border-blue-500 hover:border-blue-700 transition rounded-xl text-blue-600 py-1 px-7 text-base font-semibold">
                  Save
                </button>
              </div>

              {/* about the job  */}
              <div className="mt-5">
                <h2 className="text-xl font-semibold text-black90">
                  About the job
                </h2>
                <p className="mt-5 text-sm text-[#000000E6] leading-6 font-normal text-justify">
                  Wing Assistant is seeking an experienced React Native
                  Developer to assist in the technical aspects of an MVP
                  development project. This role includes utilizing key
                  technologies such as Express.js, React, SQL or MongoDB, and
                  others in the necessary tech stack.
                </p>

                <div className="my-6">
                  <span className="text-sm text-black90 leading-6 font-normal text-justify">
                    Job Requirements:
                  </span>
                  <ul className="list-disc pl-8 text-sm text-[#000000E6] space-y-1 font-normal mt-3 text-justify">
                    <li>
                      Develop technical aspects of the MVP using React Native
                      and other required technologies
                    </li>
                    <li>
                      Assist with and manage the META API approval and
                      documentation process
                    </li>
                    <li>
                      Manage the product's deployment ensuring smooth operation
                      using tools such as AWS and MongoDB
                    </li>
                  </ul>
                </div>

                <div className="my-6">
                  <span className="text-sm text-black90 leading-6 font-normal text-justify">
                    Preferred Requirements:
                  </span>
                  <ul className="list-disc pl-8 text-sm text-black90 space-y-1 font-normal mt-3 text-justify">
                    <li>
                      Proof of previous work on Meta API and its associated
                      processes
                    </li>
                    <li>Ability to start the project immediately</li>
                    <li>
                      Exceptional interpersonal skills, a positive attitude, and
                      a self-starter personality
                    </li>
                  </ul>
                </div>

                <div className="my-6">
                  <span className="text-sm text-black90 leading-6 font-normal text-justify">
                    Responsibilities:
                  </span>
                  <ul className="list-disc pl-8 text-sm text-black90 space-y-1 font-normal mt-3 text-justify">
                    <li>
                      Proof of previous work on Meta API and its associated
                      processes
                    </li>
                    <li>Ability to start the project immediately</li>
                    <li>
                      Exceptional interpersonal skills, a positive attitude, and
                      a self-starter personality
                    </li>
                  </ul>
                </div>

                <h2 className="text-sm text-black90 font-normal text-justify">
                  35000 per month
                </h2>
              </div>
            </div>
         
      </div>
    </div>
  );
};

export default page;
