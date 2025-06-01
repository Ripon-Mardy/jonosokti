"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import jsLogo from "../../public/images/jslogo2.png";
import android from "../../public/images/android.png";
import appleStore from "../../public/images/appstore.webp";
import footer_logo from "@/public/images/Footer-Logo.png";

import { FaFacebook, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-0">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4 animate-fadeIn">
            <Image
              className="h-12 w-auto"
              width={180}
              height={60}
              src={jsLogo}
              alt="Jonosokti"
            />
            <p className="text-textColor text-sm leading-relaxed">
              Jonosokti - A Handy Service Solution Website In Bangladesh. Hire
              Experts & Get Your Job Done with our trusted platform connecting skilled professionals with customers.
            </p>
            
            <div className="flex items-center space-x-4 pt-2">
              <a 
                href="#" 
                className="text-textColor hover:text-blue-600 transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-textColor hover:text-blue-700 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-textColor hover:text-gray-900 transition-colors duration-200"
                aria-label="Twitter"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-textColor hover:text-pink-600 transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:ml-8 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Jonosokti</h3>
            <ul className="space-y-3 text-sm md:text-base">
              <li>
                <Link
                  href="/about-us"
                  className="text-textColor hover:text-blue-600 transition-colors duration-200 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-blue-600">About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-textColor hover:text-blue-600 transition-colors duration-200 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-blue-600">Contact Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-textColor hover:text-blue-600 transition-colors duration-200 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-blue-600">Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-textColor hover:text-blue-600 transition-colors duration-200 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-blue-600">Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Other Pages</h3>
            <ul className="space-y-3 text-sm md:text-base">
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-textColor hover:text-blue-600 transition-colors duration-200 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-blue-600">Career</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-textColor hover:text-blue-600 transition-colors duration-200 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-blue-600">Skill Trainning</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/payment-policy"
                  className="text-textColor hover:text-blue-600 transition-colors duration-200 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-blue-600">Payment Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-textColor hover:text-blue-600 transition-colors duration-200 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-blue-600">Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">E-commerce services</h3>
            <ul className="space-y-3 text-sm md:text-base">
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-textColor hover:text-blue-600 transition-colors duration-200 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-blue-600">E-commerce</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-textColor hover:text-blue-600 transition-colors duration-200 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-blue-600">Online Store</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/payment-policy"
                  className="text-textColor hover:text-blue-600 transition-colors duration-200 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-blue-600">Sell Online</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* App Download & Logo */}
        <div className="border-t border-gray-200 pt-8 pb-4 animate-fadeIn" style={{ animationDelay: "0.5s" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* App Download */}
            <div className="w-full md:w-auto">
              <p className="text-gray-800 font-medium mb-3 text-center md:text-left">Download Our App</p>
              <div className="w-full flex-wrap flex items-center justify-center md:justify-start gap-4">
               <div className="flex items-center gap-4">
               <a href="#" className="transition-transform hover:scale-105 duration-200">
                  <Image
                    width={130}
                    height={40}
                    className="h-10 w-auto"
                    src={android}
                    quality={90}
                    alt="Google Play Store"
                  />
                </a>
                <a href="#" className="transition-transform hover:scale-105 duration-200">
                  <Image
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                    src={appleStore}
                    quality={90}
                    alt="Apple App Store"
                  />
                </a>
               </div>
               <div className="w-full md:w-2/3">
              <Image
                src={footer_logo}
                className="w-full h-auto"
                quality={90}
                alt="Jonosokti Footer Logo"
              />
            </div>
              </div>
            </div>
            
            {/* Footer Logo */}
            
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-gray-200 mt-6 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
          <p className="text-textColor text-sm">
            Copyright © {currentYear} Jonosokti. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
