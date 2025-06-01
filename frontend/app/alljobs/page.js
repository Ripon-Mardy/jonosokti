'use client'
import React, { useEffect, useState, useRef } from 'react'
import Loading from '@/components/Loading';
import Image from 'next/image';
import Link from 'next/link';
import { Clock8, MapPin, Banknote, Bookmark, Award, BriefcaseBusiness   } from 'lucide-react';
import jobsImage from '@/public/images/jobsimage.jpg';

const page = () => {
  const [formData, setFormData] = useState({
    category: '',
    location: '',
    jobType: [],
  }) // Form data state
  const [jobs, setJobs] = useState([]); // Fetch jobs from API
  const [category, setCategory] = useState([]); // Fetch category from API
  const [location, setLocation] = useState([]); // fetch location from api
  const [filteredLocation, setFilteredLocation] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]); // Track saved jobs
  const [loading, setLoading] = useState(false); // Loading state for fetching data
  const [error, setError] = useState(null); // Error state for fetching data
  const dropdownRef = useRef(null)

  //api key
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Fetch data from API 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const [jobRes, categoryRes, locationRes] = await Promise.all([
          fetch(`${apiKey}/job/active-jobs`),
          fetch(`${apiKey}/category/categories`),
          fetch('https://bdapi.vercel.app/api/v.1/district')
        ]);

        if (!jobRes.ok) throw new Error('Failed to fetch jobs');
        if (!categoryRes.ok) throw new Error('Failed to fetch categories');
        if (!locationRes.ok) throw new Error('Failed to fetch location');

        const jobData = await jobRes.json();
        const categoryData = await categoryRes.json();
        const locationData = await locationRes.json();

        setJobs(jobData?.data?.jobs || []);
        setCategory(categoryData?.data || []);
        setLocation(locationData?.data)

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Set error state
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData(); // Call fetch data function
  }, []); // Fetch data on component mount

  // handle click outside to close dropdown 
  useEffect(() => {
    const handleCickOutSide = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilteredLocation([])
      }
    }
    document.addEventListener('click', handleCickOutSide);
    return () => {
      document.removeEventListener('click', handleCickOutSide)
    }
  } , [])

  // Handle saving a job
  const handleSaveJob = (job) => {
    if (!savedJobs.some((savedJob) => savedJob.id === job.id)) {
      setSavedJobs([...savedJobs, job]);
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    console.log('name', name)
    if (type === 'checkbox') {
      // Handle checkbox for jobType
      setFormData((prevFormData) => ({
        ...prevFormData,
        jobType: checked
          ? [...prevFormData.jobType, value]
          : prevFormData.jobType.filter((jobType) => jobType !== value),
      }));
    } else if(name === 'location') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name] : value
      }))

      if(value.trim() === '') {
        setFilteredLocation([])
      } else {
        const filtered = location.filter((loc) => loc.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredLocation(filtered)
      }


    } else {
      // Handle text inputs
      setFormData({ ...formData, [name]: value });
    }
  }

  // handle location select 
  const handleLocationSelect = (loc) => {
    setFormData((prev) => ({
      ...prev,
      location : loc
    }))
    setFilteredLocation([])
  }

  return (
    <div className='xl:container xl:mx-auto px-2 sm:px-0 pt-20 pb-10'>
      <div>


        <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-2 rounded-2xl shadow-lg mb-4">
                    <BriefcaseBusiness  className="text-yellow-300" size={28} />
                    <h1 className="text-base md:text-xl font-bold">Find Your Dream Job</h1>
                  </div>
                  <p className="text-paraColor text-sm max-w-2xl mx-auto">
                    Browse through thousands of job opportunities and find the one that suits you best.
                  </p>
                </div>

        {/* job wrapper */}
        <div className='mt-8 grid grid-cols-1 sm:grid-cols-12 gap-6'>

          {/* job search filter */}
          <form action="#" className='sm:col-span-4 border border-borderInputColor bg-white p-6 rounded-lg shadow-lg space-y-10 max-h-max py-10'>
            {/* <div className='flex flex-col'>
              <label htmlFor="category" className='text-base font-medium'>Find a job</label>
              <input
                name="category"
                id="category"
                type="text"
                onChange={handleInputChange}
                value={formData.category}
                className='w-full text-sm py-2 border border-borderInputColor outline-none focus:border-borderFocusColor mt-2 transition-all rounded px-3'
                placeholder='Search by category'
                required
              />
            </div> */}
            <div>
              <label htmlFor="category" className='text-base font-medium'>Find a job</label>
              <select className='w-full text-sm py-2 border border-borderInputColor outline-none focus:border-borderFocusColor mt-2 transition-all rounded px-3' name="" id="">
                <option selected value="">Select Category</option>
                {category.map((cate, index) => (
                  <option key={index} value={cate?.name}> {cate?.name} </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col relative'>
              <label htmlFor="location" className='text-base font-medium'>Location</label>
              <input
                name="location"
                id="location"
                type="text"
                onChange={handleInputChange}
                value={formData.location}
                className='w-full text-sm py-2 border border-borderInputColor outline-none focus:border-borderFocusColor mt-2 transition-all rounded px-3'
                placeholder='Search by city'
                required
              />

              {filteredLocation.length > 0 && (
                <div ref={dropdownRef} className='absolute left-0 top-full bg-white rounded-lg border border-gray-200 w-full mt-1 shadow z-30 max-h-60 overflow-y-auto'>
                {filteredLocation.map((loc, index) => (
                  <div onClick={() => handleLocationSelect(loc?.name)} key={index} className='px-4 py-2 text-textColor hover:bg-blue-50 cursor-pointer transition-colors text-sm border border-gray-50'>
                    {loc?.name}
                  </div>
                ))}
              </div>
              )}
              
            </div>

            <div className='flex flex-col'>
              <label htmlFor="jobType" className='text-base font-medium'>Filter By Job Type</label>
              <div className='space-y-2 mt-3'>
                {['Freelance', 'Full Time', 'Internship', 'Part Time', 'Temporary'].map((type, index) => (
                  <div key={index} className='flex items-center gap-2 text-sm'>
                    <input
                      name="jobType"
                      type="checkbox"
                      id={`jobType-${index}`}
                      value={type}
                      onChange={handleInputChange}
                      checked={formData.jobType.includes(type)}
                    />
                    <label htmlFor={`jobType-${index}`} className='text-textColor'>{type}</label>
                  </div>
                ))}
              </div>
            </div>
          </form>
          {/* end job search filter */}

          {/* ..  */}

          {/* job list */}
          <div className='sm:col-span-8'>
            {loading ? (
              <div className='flex justify-center items-center h-full'><Loading /></div>
            ) : error ? (
              <div className='text-center text-red-500'>{error}</div>
            ) : jobs.length > 0 ? (
              <div className='space-y-4'>
                {jobs.map((job, index) => (
                  <Link href={`/alljobs/${job._id}`} key={index} className='bg-white p-5 rounded-lg shadow-md border border-borderInputColor hover:border-borderFocusColor transition-all flex flex-col sm:flex-row gap-4'>
                    <div className='flex-shrink-0'>
                      <Image alt='company logo' className='rounded-md' width={60} height={60} src={jobsImage} />
                    </div>
                    <div className='flex flex-col justify-between w-full'>
                      <div>
                        <div className='flex items-center justify-between gap-1'>
                          <h3 className='text-textHeadingColor text-lg font-semibold'>{job.title}</h3>
                          <span
                            className='text-textIconColor cursor-pointer'
                            onClick={(e) => {
                              e.preventDefault(); // Prevent navigation
                              handleSaveJob(job);
                            }}
                          >
                            <Bookmark />
                          </span>
                        </div>
                        <p className='text-textColor text-sm mt-1'>{job.company_name}</p>
                      </div>
                      <div className='flex flex-wrap items-center justify-between mt-3'>
                        <div className='flex items-center gap-4 text-sm'>
                          <span className='flex items-center gap-1 text-textColor'><Clock8 size={16} className='text-textIconColor' /> {job.posted || '10 dec'}</span>
                          <span className='flex items-center gap-1 text-textColor'><MapPin size={16} className='text-textIconColor' />
                            {/* {typeof job.location === 'object' && job.location.coordinates
                              ? `Lat: ${job.location.coordinates[0]}, Lng: ${job.location.coordinates[1]}`
                              : job.location || 'Location not available'} */}
                            {job?.address || 'Location not available'}
                          </span>
                          <span className='flex items-center gap-1 text-textColor bg-sky-100 rounded-lg px-2 py-0.5'><Banknote size={16} className='text-textIconColor' /> {job.cost || 0} Tk</span>
                        </div>
                        <span className='text-sm bg-sky-200 rounded-md px-3 py-1 text-textColor'>{job.type || 'Full Time'}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className='text-center text-textColor'>No job found</div>
            )}
          </div>
          {/* end job list */}
        </div>
        {/* end job wrapper */}
      </div>
    </div>
  );
};

export default page;