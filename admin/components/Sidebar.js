"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import menus from "@/api/menus.json";
import jonosokti from "../public/Image/jslogo2.png";
import { FaImage } from "react-icons/fa";
import {
  FaHome,
  FaBriefcase,
  FaCog,
  FaQuestion,
  FaUserFriends,
} from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { BsFillHandbagFill, BsServer } from "react-icons/bs";
import { FiPackage } from "react-icons/fi";
import Header from "./Header";

const Sidebar = () => {
  const iconMap = {
    FaHome: FaHome,
    FaBriefcase: FaBriefcase,
    BiSolidCategory: BiSolidCategory,
    FaCog: FaCog,
    FaUserFriends: FaUserFriends,
    BsServer: BsServer,
    BsFillHandbagFill: BsFillHandbagFill,
    FaQuestion: FaQuestion,
    FiPackage: FiPackage,
    FaImage : FaImage
  };


  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null); // Active menu tracking
  const sidebarRef = useRef(null);

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle Desktop Menu
  const toggleDesktopMenu = () => {
    setExpanded(!expanded);
  };

  // Close Mobile Sidebar on Outside Click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Toggle Submenu
  const handleSubMenuToggle = (id) => {
    setOpenSubMenu((prev) => (prev === id ? null : id));
  };

  // Set Active Menu
  const handleMenuClick = (id) => {
    setActiveMenu(id);
  };

  return (
    <>
      <div className="fixed flex justify-between h-6 w-full">
        {/* Desktop Sidebar */}
        <div
          className={`bg-slate-800 text-white min-h-screen hidden md:block w-0 transition-all duration-300 overflow-y-auto ${
            expanded ? "w-0 hidden overflow-hidden" : "w-60 p-2"
          } `}
        >
          <Image src={jonosokti} width={150} height={150} alt="jonosokti" />
          <ul className="flex flex-col space-y-5 mt-8 overflow-y-auto">
            {menus.map((menu) => {
              const IconComponent = iconMap[menu.icon];
              const hasSubMenu = menu.subMenu && menu.subMenu.length > 0;
              return (
                <div key={menu.id}>
                  <div
                    className={`flex items-center gap-2 p-2 rounded-md transition-all duration-100 w-full cursor-pointer ${
                      activeMenu === menu.id ? "bg-slate-600" : "hover:bg-slate-700"
                    }`}
                    onClick={() => {
                      handleSubMenuToggle(menu.id);
                      handleMenuClick(menu.id); // Set active menu
                    }}
                  >
                    {IconComponent && <IconComponent className="text-xl" />}
                    <Link
                      href={menu.component || "#"}
                      className="inline-block w-full"
                    >
                      {menu.name}
                    </Link>
                    {hasSubMenu && (
                      <span className="text-lg ml-auto">
                        {openSubMenu === menu.id ? " − " : "+"}
                      </span>
                    )}
                  </div>

                  {/* Submenu with Animation */}
                  {hasSubMenu && (
                    <AnimatePresence>
                      {openSubMenu === menu.id && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pl-2 space-y-2 overflow-hidden"
                        >
                          {menu.subMenu.map((subItem) => (
                            <li
                              key={subItem.id}
                              className="p-2 hover:bg-slate-700 rounded-md transition-all duration-100"
                            >
                              <Link href={subItem.component}>
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </ul>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              ></motion.div>

              {/* Mobile Sidebar */}
              <motion.div
                ref={sidebarRef}
                className="fixed left-0 top-0 w-64 bg-slate-900 text-white min-h-screen p-4 z-50"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={jonosokti}
                  width={150}
                  height={150}
                  alt="jonosokti"
                />
                <ul className="flex flex-col space-y-5 mt-8">
                  {menus.map((menu) => {
                    const IconComponent = iconMap[menu.icon];
                    const hasSubMenu = menu.subMenu && menu.subMenu.length > 0;
                    return (
                      <div key={menu.id}>
                        <div
                          className={`flex items-center gap-2 p-2 rounded-md transition-all duration-100 w-full cursor-pointer ${
                            activeMenu === menu.id
                              ? "bg-slate-600"
                              : "hover:bg-slate-700"
                          }`}
                          onClick={() => {
                            handleSubMenuToggle(menu.id);
                            handleMenuClick(menu.id); // Set active menu
                          }}
                        >
                          {IconComponent && (
                            <IconComponent className="text-xl" />
                          )}
                          <Link
                            href={menu.component || "#"}
                            className="inline-block w-full"
                          >
                            {menu.name}
                          </Link>
                          {hasSubMenu && (
                            <span className="text-lg ml-auto">
                              {openSubMenu === menu.id ? "−" : "+"}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="w-full flex-1 z-10">
          <Header
            toggleMobileMenu={toggleMobileMenu}
            toggleDesktopMenu={toggleDesktopMenu}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
