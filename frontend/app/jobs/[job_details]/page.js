'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { 
  Clock3, 
  TimerOff, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Tag, 
  Clock, 
  User, 
  Facebook, 
  X, 
  Linkedin, 
  Instagram,
  Share2,
  CheckCircle,
  Building
} from 'lucide-react';
import Link from 'next/link';
import jobImage from '@/public/images/jobsimage.jpg';

const JobDetails = ({ params }) => {
  const jobId = params.job_details; // Get job id from params
  const [error, setError] = useState(null);
  const [singleJob, setSingleJob] = useState([]);
  const [loading, setLoading] = useState(true);

  // api key 
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // get single job 
  useEffect(() => {
    const getSingleJob = async () => {
      try {
        const res = await fetch(`${apiKey}/job/single-job?job_id=${jobId}`)
        if(!res.ok) {
          setError('Job not found')
          setLoading(false)
          return
        }
        const data = await res.json();
        setSingleJob(data?.data);
        setLoading(false);
      } catch (error) {
        console.log('error', error);
        setError('Something went wrong. Please try again later.');
        setLoading(false);
      }
    }
    getSingleJob();
  }, [jobId]);


  return (
    <div className='max-w-7xl mx-auto px-2 pt-32 pb-16'>
      {/* Header Section with Company Logo */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Company Logo */}
          <div className="relative h-24 w-24 rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center p-2">
            <Image 
              src={singleJob?.company_logo || jobImage} 
              alt={`${singleJob?.title || 'Job'} logo`} 
              width={80} 
              height={80} 
              className="object-contain"
            />
          </div>
          
          {/* Job Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mb-3">
              Featured Job
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {singleJob?.title || 'Emergency Plumbing Repair'} 
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Building size={16} className="text-gray-500" />
                <span>{singleJob?.company_name || 'Company Name'}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-gray-500" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock3 size={16} className="text-gray-500" />
                <span>Posted: 2 months ago</span>
              </div>
              <div className="flex items-center gap-1">
                <TimerOff size={16} className="text-gray-500" />
                <span>Expires: June 20, 2025</span>
              </div>
            </div>
          </div>
          
          {/* Apply Button (Desktop) */}
          <div className="hidden md:block">
            <Link href={`/jobs/apply/${jobId}`} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm">
              Apply Now
            </Link>
          </div>
        </div>
        
        {/* Apply Button (Mobile) */}
        <div className="md:hidden mt-6">
          <Link href={`/jobs/apply/${jobId}`} className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm">
            Apply Now
          </Link>
        </div>
      </div>

      {/* Job Details Grid */}
      <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {/* Location */}
          <div className="flex flex-col items-start justify-start gap-2 p-6 border-r border-b border-gray-100">
            <div className='flex items-center justify-center gap-1'>
              <MapPin className="text-blue-500 w-4 h-4" />
            <p className="text-xs text-textColor uppercase font-medium">Location</p>
            </div>
            <p className="text-sm font-medium text-gray-900">Dhaka, Bangladesh</p>
          </div>

          {/* Salary */}
          <div className="flex items-start justify-start flex-col gap-2 p-6 border-r border-b border-gray-100">
            <div className='flex items-center justify-start gap-1'>
              <DollarSign className="text-green-500 w-4 h-4" />
            <p className="text-xs text-textColor uppercase font-medium">Salary</p>
            </div>
            <p className="text-sm font-medium text-gray-900">৳ 12,121 TK</p>
          </div>

          {/* Job Type */}
          <div className="flex flex-col justify-start items-start gap-2 p-6 border-r border-b border-gray-100">
           <div className='flex items-center justify-start gap-1'>
             <Briefcase className="text-purple-500 w-4 h-4" / >
            <p className="text-xs text-textColor uppercase font-medium">Job Type</p>
           </div>
            <p className="text-sm font-medium text-gray-900">Full-Time</p>
          </div>

          {/* Category */}
          <div className="flex flex-col justify-start items-start gap-2 p-6 border-r border-b border-gray-100">
            <div className='flex items-center justify-start gap-1'>
              <Tag className="text-orange-500  w-4 h-4" />
            <p className="text-xs text-textColor uppercase font-medium">Category</p>
            </div>
            <p className="text-sm font-medium text-gray-900">Cleaning</p>
          </div>

          {/* Hours */}
          <div className="flex flex-col justify-start items-start gap-2 p-6 border-r border-b border-gray-100">
           <div className='flex items-center justify-start gap-1'>
             <Clock className="text-red-500 w-4 h-4" />
            <p className="text-xs text-textColor uppercase font-medium">Hours</p>
           </div>
            <p className="text-sm font-medium text-gray-900">12 hrs/day</p>
          </div>

          {/* Posted On */}
          <div className="flex flex-col justify-start items-start gap-2 p-6 border-b border-gray-100">
            <div className='flex items-center justify-start gap-1'>
              <User className="text-indigo-500 h-4 w-4" />
            <p className="text-xs text-textColor uppercase font-medium">Posted On</p>
            </div>
            <p className="text-sm font-medium text-gray-900">12 April 2024</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            {/* Job Description */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 p-1 rounded mr-2">
                  <Briefcase size={18} />
                </span>
                Job Description
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex harum hic, ullam maxime provident asperiores excepturi totam nihil voluptates sapiente itaque inventore dolor repudiandae. Itaque sapiente a error dolor deserunt praesentium corrupti natus amet quos assumenda nam facilis in, molestiae perferendis architecto ipsum reiciendis asperiores. Velit voluptatem maiores veniam natus?</p>
              </div>
            </div>

            {/* Requirements Sections */}
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded mr-2">
                    <CheckCircle size={18} />
                  </span>
                  Required Skills & Experience
                </h2>
                <ul className="space-y-3">
                  {[
                    "Research and analyze valuable data sources and automate processes",
                    "Review large amounts of information to discover trends and patterns",
                    "Create predictive models and machine-learning algorithms",
                    "Modify and combine different models through ensemble modeling",
                    "Organize and present information using data visualization techniques",
                    "Develop and suggest solutions and strategies to business challenges"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">
                        <CheckCircle size={16} />
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          {/* Action Card */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6  top-32">
            <div className="mb-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center">
                <Share2 size={18} className="mr-2 text-blue-500" />
                Share this Job
              </h3>
              <p className="text-sm text-gray-600">Help your friends and network find this opportunity</p>
            </div>
            
            <div className="space-y-3">
              <Link href="#" className="flex items-center justify-center py-2.5 rounded-lg text-white font-medium text-sm w-full bg-[#1877F2] hover:bg-[#1563cf] transition-all">
                <Facebook size={16} className="mr-2" />
                Share on Facebook
              </Link>
              
              <Link href="#" className="flex items-center justify-center py-2.5 rounded-lg text-white font-medium text-sm w-full bg-[#1DA1F2] hover:bg-[#0c85d0] transition-all">
                <X size={16} className="mr-2" />
                Share on X
              </Link>
              
              <Link href="#" className="flex items-center justify-center py-2.5 rounded-lg text-white font-medium text-sm w-full bg-[#0A66C2] hover:bg-[#004182] transition-all">
                <Linkedin size={16} className="mr-2" />
                Share on LinkedIn
              </Link>
              
              <Link href="#" className="flex items-center justify-center py-2.5 rounded-lg text-white font-medium text-sm w-full bg-gradient-to-r from-[#fd5949] to-[#d6249f] hover:from-[#fd4c3b] hover:to-[#c21a8e] transition-all">
                <Instagram size={16} className="mr-2" />
                Share on Instagram
              </Link>
            </div>
            
            {/* Apply Now (Sticky) */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link href={`/jobs/apply/${jobId}`} className="block w-full text-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm">
                Apply Now
              </Link>
            </div>
          </div>
          
          {/* Similar Jobs Suggestion */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Similar Jobs</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <Link href="#" key={item} className="block p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
                  <h4 className="font-medium text-gray-900">Senior Cleaning Staff</h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin size={14} className="mr-1" />
                    <span>Dhaka</span>
                    <span className="mx-2">•</span>
                    <DollarSign size={14} className="mr-1" />
                    <span>৳10,000</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetails