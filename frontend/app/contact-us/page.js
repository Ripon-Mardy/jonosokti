import React from "react";
import Link from "next/link";

// import icons
import { HiOutlineMail } from "react-icons/hi";
import { FaPhone } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";

const page = () => {
  return (
    <>
      <section className="pt-24">
        <div className="container mx-auto px-2 py-5 md:px-0">
          <h1 className="text-center my-5 capitalize">
            <Link href="/">home</Link> /Contact us
          </h1>

          <div className="bg-white p-4 rounded-md">
            <h1 className="text-4xl md:text-5xl mb-6 capitalize md:mb-9 text-center">
              Contact us
            </h1>
            <div className="md:flex md:gap-10 md:items-center md:justify-center">
              <div className="w-full">
                <form action="#" className="flex flex-col gap-6">
                  <div className="md:flex md:gap-7">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                      <input
                        type="text"
                        placeholder="Name"
                        className="bg-inputBackgroundcolor w-full p-2 border-b outline-none rounded-md border-b-orange-400"
                        required
                      />
                    </div>
                    <div className="md:w-1/2">
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="bg-inputBackgroundcolor p-2 border-b w-full outline-none rounded-md border-b-orange-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:flex md:gap-7">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                      <input
                        type="number"
                        placeholder="Phone"
                        className="bg-inputBackgroundcolor w-full p-2 border-b outline-none rounded-md border-b-orange-400"
                        required
                      />
                    </div>
                    <div className="md:w-1/2">
                      <input
                        type="text"
                        placeholder="Subject"
                        className="bg-inputBackgroundcolor w-full p-2 border-b outline-none rounded-md border-b-orange-400"
                      />
                    </div>
                  </div>

                  <textarea
                    cols="10"
                    rows="8"
                    className="bg-inputBackgroundcolor p-2 border-b outline-none rounded-md border-b-orange-400"
                    placeholder="Message Us"
                  ></textarea>
                  <button
                    type="button"
                    className="w-full md:w-36 text-white md:text-white bg-bgColor p-2 rounded-sm text-[15px] capitalize font-semibold hover:bg-hoverBg hover:duration-300 hover:ease-in-out"
                  >
                    submit
                  </button>
                </form>
              </div>

              <div className="flex flex-col gap-4 mt-5 md:mt-0 md:w-[40%]">
                <div className="bg-inputBackgroundcolor flex items-center justify-center p-3 rounded-md gap-2 text-[16px] border-b-2 border-yellow-600">
                  <HiOutlineMail className="text-xl text-textColor font-extrabold" />
                  <span>info@jonosokti.com</span>
                </div>
                <div className="bg-inputBackgroundcolor flex items-center justify-center p-3 rounded-md gap-2 text-[16px] border-b-2 border-yellow-600">
                  <FaPhone className="text-xl text-textColor font-extrabold" />
                  <span>+88 01551188955</span>
                </div>
                <div className="bg-inputBackgroundcolor flex items-center justify-center p-3 rounded-md gap-2 text-[16px] border-b-2 border-yellow-600">
                  <MdLocationOn className="text-xl text-textColor font-extrabold" />
                  <div className="flex flex-col">
                    <span>House # 582, Road # 7,</span>
                    <span>Chandgaon, Chattogram.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
