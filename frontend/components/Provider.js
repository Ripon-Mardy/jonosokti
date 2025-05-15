"use client";
import React, {useState } from "react";
import { motion } from "framer-motion";


const Provider = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <>
      <div className=" bg-gray-900 bg-opacity-50">
        <div className="container mx-auto">
          <div className="rounded shadow-2xl bg-white md:w-3/4 relative">
            <div className="flex items-center justify-between bg-heroBgcolor p-3 text-white">
              <h1 className="text-xl capitalize font-semibold -tracking-tighter">
                sign up s
              </h1>
            </div>

            <div className="flex justify-center border-yellow-600 mt-3 mx-4">
              <button
                onClick={() => handleTabClick(1)}
                className={`flex-1 px-4 border uppercase text-textmedium ${
                  activeTab === 1 ? "bg-bgColor text-white" : "bg-transparent"
                }`}
              >
                Provider
              </button>
              <button
                onClick={() => handleTabClick(2)}
                className={`flex-1 px-4 py-2 border uppercase text-textmedium ${
                  activeTab == 2 ? "bg-bgColor text-white" : "bg-transparent"
                } `}
              >
                Customer
              </button>
            </div>
            {activeTab == 1 && (
              <form action="#">
                <div className="p-3 mt-2">
                  <div>
                    <input
                      className="p-2 w-full border border-gray-400 rounded-md outline-none text-textmedium"
                      type="text"
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="md:flex md:gap-4 mt-4">
                    <input
                      className="p-2 w-full border outline-none text-textmedium border-gray-400 rounded-md"
                      type="text"
                      placeholder="First Name"
                    />
                    <input
                      className="p-2 w-full border outline-none mt-4 border-gray-400 rounded-md md:mt-0 text-textmedium"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="md:flex md:gap-4 mt-4">
                    <input
                      className="p-2 w-full border outline-none border-gray-400 rounded-md text-textmedium"
                      type="text"
                      placeholder="Username"
                    />
                    <input
                      className="p-2 w-full border outline-none mt-4 md:mt-0 border-gray-400 rounded-md text-textmedium"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="md:flex md:gap-4 mt-4">
                    <input
                      className="p-2 w-full border outline-none border-gray-400 rounded-md text-textmedium"
                      type="password"
                      placeholder="Password"
                    />
                    <input
                      className="p-2 w-full border outline-none mt-4 md:mt-0 border-gray-400 rounded-md text-textmedium"
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="md:flex md:gap-4 mt-4">
                    <input
                      className="p-2 w-full border outline-none border-gray-400 rounded-md text-textmedium"
                      type="number"
                      placeholder="Mobile"
                    />
                  </div>
                  <div className="md:flex md:gap-4 mt-4">
                    <select
                      className="p-2 w-full border outline-none border-gray-400 bg-white rounded-md"
                      name=""
                      id=""
                    >
                      <option value="car">car</option>
                      <option value="car">car</option>
                    </select>
                    <select
                      className="p-2 w-full border outline-none mt-4 md:mt-0 border-gray-400 rounded-md bg-white text-textmedium"
                      name=""
                      id=""
                    >
                      <option>Select a Package</option>
                      <option value="Trial">Trial</option>
                      <option value="Bronze">Bronze</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                  <a
                    className="block -tracking-tighter bg-bgColor hover:bg-hoverBg hover:duration-300 hover:ease-in-out text-white border p-2 mt-7 text-center rounded-lg uppercase font-bold cursor-pointer text-sm hover:bg-hover_background "
                    href="#"
                  >
                    sign up
                  </a>
                  <a
                    className="text-sm text-textprimaryColor cursor-pointer mt-2 block text-center hover:underline"
                    href="#"
                  >
                    Already Registered?
                  </a>
                </div>
              </form>
            )}
            {activeTab == 2 && (
              <div className="p-4 border border-gray-300 rounded shadow-md py-10">
                <form action="#" className="rounded">
                  <div className="md:flex md:gap-4">
                    <input
                      className="p-2 w-full border border-gray-400 rounded-md outline-none text-textmedium"
                      type="text"
                      placeholder="First Name"
                    />
                    <input
                      className="p-2 w-full border border-gray-400 rounded-md outline-none mt-4 md:mt-0 text-textmedium"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="md:flex md:gap-4 mt-4">
                    <input
                      className="p-2 w-full border border-gray-400 rounded-md outline-none text-textmedium"
                      type="text"
                      placeholder="Username"
                    />
                    <input
                      className="p-2 w-full mt-4 md:mt-0 border border-gray-400 rounded-md outline-none text-textmedium"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="md:flex md:gap-4 mt-4">
                    <input
                      className="p-2 w-full border border-gray-400 rounded-md outline-none text-textmedium"
                      type="password"
                      placeholder="Password"
                    />
                    <input
                      className="p-2 w-full border mt-4 md:mt-0 border-gray-400 rounded-md outline-none text-textmedium"
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <a
                    className="block -tracking-tighter bg-main_background border bg-bgColor text-white p-2 mt-7 text-center rounded-lg uppercase font-bold cursor-pointer text-sm hover:bg-hover_background "
                    href="#"
                  >
                    sign up
                  </a>
                  <a
                    className="text-sm text-textprimaryColor cursor-pointer mt-2 block text-center hover:underline"
                    href="#"
                  >
                    Already Registered?
                  </a>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Provider;
