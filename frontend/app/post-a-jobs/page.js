import React from "react";

const page = () => {
  return (
    <div className="xl:container xl:mx-auto px-2 xl:px-0 py-24">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-2xl font-semibold text-textHeadingColor capitalize">
          Post your job
        </h1>

        {/* job posting form will be here */}
        <form action="#" className="mt-10 space-y-5">
          {/* Job Title */}
          <div className="space-y-1">
            <label
              htmlFor="jobTile"
              className="block text-textHeadingColor font-medium text-base capitalize"
            >
              Job Title *
            </label>
            <input
              type="text"
              id="jobTile"
              className="w-full p-2 text-base outline-none border focus:border focus:border-borderFocusColor rounded-md text-textColor transition"
              placeholder="Job Title"
              required
            />
          </div>
          {/* Job type */}
          <div className="space-y-1">
            <label
              htmlFor="jobtype"
              className="block text-textHeadingColor font-medium text-base capitalize"
            >
              Job Type *
            </label>
            <select
              id="jobtype"
              className="w-full p-2 text-base outline-none border focus:border focus:border-borderFocusColor rounded-md text-textColor transition"
            >
              <option value="">Choose job type...</option>
              <option value="">Freelance</option>
              <option value="">Full Time</option>
              <option value="">Intership</option>
              <option value="">Part Time</option>
              <option value="">Temporary</option>
            </select>
          </div>
          {/* Job category */}
           <div className="space-y-1">
            <label
              htmlFor="jobCategory"
              className="block text-textHeadingColor font-medium text-base capitalize"
            >
              Job category *
            </label>
            <select
              id="jobCategory"
              className="w-full p-2 text-base outline-none border focus:border focus:border-borderFocusColor rounded-md text-textColor transition"
            >
              <option value="">Choose a category...</option>
              <option value="">Freelance</option>
              <option value="">Full Time</option>
              <option value="">Intership</option>
              <option value="">Part Time</option>
              <option value="">Temporary</option>
            </select>
          </div>
          {/* Cost($) */}
           <div className="space-y-1">
            <label
              htmlFor="cost"
              className="block text-textHeadingColor font-medium text-base capitalize"
            >
              Cost($) *
            </label>
            <input
              type="number"
              id="cost"
              className="w-full p-2 text-base outline-none border focus:border focus:border-borderFocusColor rounded-md text-textColor transition"
              placeholder="cost in $"
              required
            />
          </div>

          {/* location  */}
           <div className="space-y-1">
            <label
              htmlFor="location"
              className="block text-textHeadingColor font-medium text-base capitalize"
            >
              Location in city *
            </label>
            <select
              id="location"
              className="w-full p-2 text-base outline-none border focus:border focus:border-borderFocusColor rounded-md text-textColor transition"
            >
              <option value="">Choose a City...</option>
              <option value="">Dinajpur</option>
              <option value="">Dhaka</option>
              <option value="">Rangpur</option>
              <option value="">Chattogram</option>
              <option value="">Sylhet</option>
            </select>
          </div>
          {/* Description  */}
           <div className="space-y-1">
            <label
              htmlFor="description"
              className="block text-textHeadingColor font-medium text-base capitalize"
            >
              Description *
            </label>
           <textarea id="description" rows={6} className="w-full p-2 text-base outline-none border focus:border focus:border-borderFocusColor rounded-md text-textColor transition" placeholder="Job descriptions..."></textarea>
          </div>


          {/* Submit Button */}
            <button className="btn w-3/12"> Post </button>



        </form>
      </div>
    </div>
  );
};

export default page;
