"use client";
import React, { useState } from "react";

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "",
    jobCategory: "",
    cost: "",
    costType: "fixed",
    location: "",
    description: "",
    requirements: "",
    skills: "",
    deadline: "",
    experience: "",
    urgency: "normal"
  });

  const jobTypes = [
    "Full Time",
    "Part Time", 
    "Freelance",
    "Contract",
    "Internship",
    "Temporary"
  ];

  const jobCategories = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Digital Marketing",
    "Content Writing",
    "Data Entry",
    "Graphic Design",
    "SEO & SEM",
    "Video Editing",
    "Photography",
    "Translation",
    "Virtual Assistant",
    "Accounting & Finance",
    "Legal Services",
    "Consulting",
    "Other"
  ];

  const cities = [
    "Dhaka",
    "Chattogram", 
    "Sylhet",
    "Rangpur",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Mymensingh",
    "Dinajpur",
    "Cumilla",
    "Remote Work"
  ];

  const experienceLevels = [
    "Entry Level (0-1 years)",
    "Mid Level (2-5 years)", 
    "Senior Level (5+ years)",
    "Expert Level (10+ years)",
    "No Experience Required"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job posting data:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="xl:container xl:mx-auto px-2 xl:px-0 py-24">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Post Your Job
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find the perfect freelancer or employee for your project. Fill out the details below to get started.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Job Basic Information Section */}
              <div className=" rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Job Information
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Job Title */}
                  <div className="lg:col-span-2 space-y-2">
                    <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                      placeholder="e.g. Senior React Developer, Logo Designer, Content Writer"
                      required
                    />
                  </div>

                  {/* Job Type */}
                  <div className="space-y-2">
                    <label htmlFor="jobType" className="block text-sm font-semibold text-gray-700">
                      Job Type *
                    </label>
                    <select
                      id="jobType"
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-gray-700 bg-white"
                      required
                    >
                      <option value="">Choose job type...</option>
                      {jobTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Job Category */}
                  <div className="space-y-2">
                    <label htmlFor="jobCategory" className="block text-sm font-semibold text-gray-700">
                      Job Category *
                    </label>
                    <select
                      id="jobCategory"
                      name="jobCategory"
                      value={formData.jobCategory}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-gray-700 bg-white"
                      required
                    >
                      <option value="">Choose a category...</option>
                      {jobCategories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Experience Level */}
                  <div className="space-y-2">
                    <label htmlFor="experience" className="block text-sm font-semibold text-gray-700">
                      Experience Level *
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-gray-700 bg-white"
                      required
                    >
                      <option value="">Select experience level...</option>
                      {experienceLevels.map((level, index) => (
                        <option key={index} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700">
                      Location *
                    </label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-gray-700 bg-white"
                      required
                    >
                      <option value="">Choose location...</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Budget & Timeline Section */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Budget & Timeline
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Cost Type */}
                  <div className="space-y-2">
                    <label htmlFor="costType" className="block text-sm font-semibold text-gray-700">
                      Budget Type *
                    </label>
                    <select
                      id="costType"
                      name="costType"
                      value={formData.costType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 bg-white"
                    >
                      <option value="fixed">Fixed Price</option>
                      <option value="hourly">Hourly Rate</option>
                      <option value="monthly">Monthly Salary</option>
                    </select>
                  </div>

                  {/* Cost */}
                  <div className="space-y-2">
                    <label htmlFor="cost" className="block text-sm font-semibold text-gray-700">
                      Budget Amount ($) *
                    </label>
                    <input
                      type="number"
                      id="cost"
                      name="cost"
                      value={formData.cost}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                      placeholder={formData.costType === 'hourly' ? '25' : formData.costType === 'monthly' ? '3000' : '500'}
                      min="0"
                      step="0.01"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      {formData.costType === 'hourly' && 'Per hour rate'}
                      {formData.costType === 'monthly' && 'Monthly salary'}
                      {formData.costType === 'fixed' && 'Total project budget'}
                    </p>
                  </div>

                  {/* Project Deadline */}
                  <div className="space-y-2">
                    <label htmlFor="deadline" className="block text-sm font-semibold text-gray-700">
                      Project Deadline
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Urgency */}
                  <div className="space-y-2 lg:col-span-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      Project Urgency
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: 'low', label: 'Low Priority', color: 'bg-green-100 text-green-800' },
                        { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800' },
                        { value: 'high', label: 'High Priority', color: 'bg-orange-100 text-orange-800' },
                        { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, urgency: option.value }))}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                            formData.urgency === option.value
                              ? option.color + ' ring-2 ring-offset-2 ring-blue-500'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Details Section */}
              <div className="bg-purple-50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Job Details
                </h2>

                <div className="space-y-6">
                  {/* Job Description */}
                  <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                      Job Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400 resize-none"
                      placeholder="Describe the job requirements, responsibilities, and what you're looking for in detail..."
                      required
                    />
                    <p className="text-xs text-gray-500">
                      {formData.description.length}/1000 characters
                    </p>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2">
                    <label htmlFor="requirements" className="block text-sm font-semibold text-gray-700">
                      Requirements & Qualifications
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400 resize-none"
                      placeholder="List specific requirements, qualifications, or certifications needed..."
                    />
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <label htmlFor="skills" className="block text-sm font-semibold text-gray-700">
                      Required Skills
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                      placeholder="e.g. React, Node.js, MongoDB, Adobe Photoshop (separate with commas)"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="button"
                  className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Post Job
                  </span>
                </button>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600">
                  Your job posting will be reviewed and published within 24 hours. 
                  <br className="hidden sm:inline" />
                  <a href="#" className="text-emerald-600 hover:text-emerald-800 font-medium underline">
                    Learn more about our posting guidelines
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingForm;