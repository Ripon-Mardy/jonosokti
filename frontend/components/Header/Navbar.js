"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import jsLogo from '@/public/images/jslogo2.png'
import { HiBars3, HiXMark } from "react-icons/hi2";
import { IoLogInOutline } from "react-icons/io5";
import { FiUser, FiChevronDown } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";
import mobileLogo from '@/public/images/logo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  // is loggedIn State 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token); // true or false
    }, [])


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleTabClick = (path) => {
    setActiveTab(path);
    localStorage.setItem("activePath", path);
    router.push(path);
    if (isMenuOpen) toggleMenu();
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/alljobs", label: "Jobs" },
    // {href : "/post-a-jobs", label : "post a job"},
    { href: "/pricing", label: "Pricing" },
    { href: "/how-it-work", label: "How it works" },
    { href: "/Bn", label: "বাংলা", isSpecial: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const savedActivePath = localStorage.getItem("activePath");
    if (savedActivePath) {
      setActiveTab(savedActivePath);
    } else {
      setActiveTab(router.pathname);
    }
  }, [router.pathname]);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-transparent py-3"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="xl:container xl:mx-auto flex justify-between items-center px-2 sm:px-0">
        <div>
        <Link href={'/'} className="flex items-center justify-center gap-1">
        <Image src={mobileLogo} width={150} height={50} className="w-10" />
          <span className="hidden md:block font-extrabold text-gray-700 text-xl -tracking-tight">Jonosokti</span>

        </Link>

        </div>



        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-1">
          <ul className="flex items-center space-x-1 mr-6">
            {navLinks.map(({ href, label, isSpecial }) => (
              <li key={href}>
                <button
                  onClick={() => handleTabClick(href)}
                  className={`px-4 py-2 rounded-md transition-all duration-200 font-medium text-sm ${
                    isSpecial
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : activeTab === href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-4 py-2 font-medium text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <IoLogInOutline className="text-lg" />
              <span>Login</span>
            </Link>
            <Link 
              href="/mobile-signup" 
              className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 font-medium text-sm shadow-sm"
            >
              <FiUser className="text-sm" />
              <span>Sign Up</span>
              <GoArrowUpRight className="text-sm" />
            </Link>
          </div>
        </div>




        {/* Mobile Navigation Buttons */}
        <div className="flex items-center xl:hidden gap-2 sm:gap-3">
          <Link 
            href="/login"
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            <IoLogInOutline className="text-lg" />
            <span className="text-sm ">Login</span>
          </Link>
          <Link
            href="/mobile-signup"
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 text-sm shadow-sm font-medium"
          >
            <span className="text-sm">Sign Up</span>
            <FiUser className="text-sm" />
          </Link>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
            aria-label="Toggle menu"
          >
            <HiBars3 className="text-2xl" />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Mobile Menu Panel */}
              <motion.div
                ref={menuRef}
                className="fixed top-0 right-0 bottom-0 w-72 bg-white shadow-xl z-50 flex flex-col"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <Image
                    width={120}
                    height={40}
                    src={jsLogo}
                    alt="jonosokti"
                    className="h-8 w-auto"
                  />
                  <button 
                    onClick={toggleMenu} 
                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                    aria-label="Close menu"
                  >
                    <HiXMark className="text-2xl" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto py-4">
                  <ul className="space-y-1 px-3">
                    {navLinks.map(({ href, label, isSpecial }) => (
                      <li key={href}>
                        <button
                          onClick={() => handleTabClick(href)}
                          className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 ${
                            isSpecial
                              ? "bg-blue-600 text-white"
                              : activeTab === href
                              ? "text-blue-600 bg-blue-50 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {label}
                        </button> 
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 px-7 space-y-4">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</h3>
                    <Link
                      href="/login"
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                      onClick={toggleMenu}
                    >
                      <IoLogInOutline className="text-xl" />
                      <span>Login to your account</span>
                    </Link>
                    <Link
                      href="/mobile-signup"
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                      onClick={toggleMenu}
                    >
                      <FiUser className="text-lg" />
                      <span>Create an account</span>
                    </Link>
                  </div>
                </div>
                
                <div className="p-4 border-t text-center text-sm text-gray-500">
                  <p>© {new Date().getFullYear()} Jonosokti</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
