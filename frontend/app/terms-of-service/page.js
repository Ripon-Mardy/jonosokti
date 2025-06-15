import React from "react";
import Link from "next/link";

const page = () => {
    return (
        <>
            <section className="pt-20 pb-10 animate-fadeIn">
                <div className="container mx-auto max-w-6xl px-2 md:px-0">
                    <h1 className="text-center my-5 capitalize text-xs md:text-sm
                    ">
                        <Link href="/">home</Link> / terms Of Service
                    </h1>
                    <div className="p-5 bg-white rounded-md">
                        <h1 className="text-base md:text-lg mb-2 text-textHeadingColor font-bold md:font-semibold capitalize md:mb-5">
                            Terms of service
                        </h1>
                        <p className="text-textColor text-sm md:text-textmedium mb-5 leading-6">
                            Jonosokti Private Limited is a medium where the provider and the
                            service recipient will be coordinated. Terms of Service; this is
                            an abbreviated form of the company's policy "Terms and Conditions"
                            will be operated on the public website and app.
                        </p>
                        <p className="text-textColor text-sm leading-6 md:text-textmedium">
                            Client - The person, organization or organization receiving the
                            service. Provider - A person, organization or organization
                            providing services.
                        </p>

                        <div>
                            <h1 className="text-textHeadingColor text-base md:text-lg font-bold mt-4 mb-2 ">Terms:</h1>
                            <div>
                                <ul className="list-disc flex flex-col gap-3 text-sm md:text-base leading-6 pl-4 text-textColor ">
                                    <li>Jonosokti user or provider must be after 18 years;</li>
                                    <li>
                                        The service provider must have relevant service knowledge;
                                    </li>
                                    <li>
                                        Must be professional when providing services, no misconduct;
                                    </li>
                                    <li>
                                        You should be use website or apps all applications for
                                        proper documentation to provide service;
                                    </li>
                                    <li>
                                        You should contact and be sure to conduct service at the
                                        location;
                                    </li>
                                    <li>
                                        You should fix service fees after checking what to fix;
                                    </li>
                                    <li>
                                        You should ask user if any personal risk arise during the
                                        service;
                                    </li>
                                    <li>
                                        You should ask ensuring personal safety and security during
                                        the service;
                                    </li>
                                    <li>
                                        You should not provide service at or possible conflict
                                        situations
                                    </li>
                                    <li>
                                        You should follow the all sorts of safety and security
                                        guidelines
                                    </li>
                                    <li>Service delivery time must be confirmed;</li>
                                    <li>
                                        The service recipients will be contacted by accepting the
                                        service request;
                                    </li>
                                    <li>
                                        Service fees shall decide before providing the service;
                                    </li>
                                    <li>
                                        There can be MoU between before providing the service;
                                    </li>
                                    <li>
                                        Service provider will received service fees according to
                                        provided services. For the service and payment security both
                                        can use Jonosokti payment polices.
                                    </li>
                                    <li>
                                        Follow products warranty and guarantee before service;
                                    </li>
                                    <li>
                                        Service will be provided according to the given conditions
                                        by the user and provider;
                                    </li>
                                    <li>
                                        No work can be left before fully completed and handed over
                                        to the user;
                                    </li>
                                    <li>
                                        During service, user and provider will ensure safety and
                                        security;
                                    </li>
                                    <li>
                                        Represent in compliance with company policy rules during
                                        work;
                                    </li>
                                    <li>To take legal action if any illegal situations arise;</li>
                                    <li>
                                        The contract with you will be terminated if any
                                        irregularities are reported or noticed;
                                    </li>
                                    <li>
                                        There will be an opportunity to update the situation from
                                        time to time;
                                    </li>
                                </ul>
                            </div>
                            <p className=" mt-5 my-5 md:my-7 text-sm leading-6 text-center text-textColor">The "Terms and Conditions" are understood and consciously committed to accept and follow.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default page;
