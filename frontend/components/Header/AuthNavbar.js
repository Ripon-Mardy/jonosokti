"use client";
import { useEffect, useRef, useState } from "react"; // React hooks
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import mobileLogo from "@/public/images/logo.png";
import Link from "next/link";
import defauldProfile from "@/public/images/profile.jpg"; // default profile image
import { HiBars3, HiXMark } from "react-icons/hi2";
import { ChevronDown, UserRound, Settings, LogOut } from "lucide-react";
import useOutsideClick from "@/hooks/useClickOutside";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const pathname = usePathname()
  const menuRef = useRef(null);
  const router = useRouter();

  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setShowProfileDropdown(false));

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleTabClick = (path) => {
    router.push(path)
    if (isMenuOpen) toggleMenu();
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/alljobs", label: "Jobs" },
    { href: "/post-a-jobs", label: "post a job" },
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

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-3"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      ref={dropdownRef}
    >
      <div className="xl:container xl:mx-auto flex justify-between items-center px-2 sm:px-0">

        <Link href="/" className="flex items-center relative z-10">
          <Link href={"/"} className="flex items-center justify-center gap-1">
            <Image src={mobileLogo} width={150} height={50} className="w-10" />
            <span className="hidden md:block font-extrabold text-gray-700 text-xl -tracking-tight">
              Jonosokti
            </span>
          </Link>
        </Link>

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
                      : pathname === href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* desktop mode  */}
          <div className="flex items-center space-x-3">
            <div
              className="relative"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition-colors duration-200">
                <Image
                  src={defauldProfile}
                  width={30}
                  height={30}
                  alt="profile"
                  className="rounded-full"
                />
                <div className="flex items-center gap-1">
                  <span className="text-textColor text-sm"> James Baskey</span>
                  <span>
                    <ChevronDown size={15} />
                  </span>
                </div>
              </div>

              {/* profile dropdown menu  */}
              {showProfileDropdown && (
                <div className="absolute left-0 top-full w-full rounded-md bg-white shadow-lg ring-1 ring-gray-200 z-50">
                  <div className="py-2">
                    {[
                      {
                        label: "Profile",
                        icon: <UserRound size={18} />,
                        href: "/in/profile",
                      },
                      {
                        label: "Settings",
                        icon: <Settings size={18} />,
                        href: "/settings",
                      },
                      {
                        label: "Logout",
                        icon: <LogOut size={18} />,
                        href: "#",
                      },
                    ].map((item, index) => (
                      <Link
                        href={item.href}
                        key={index}
                        onClick={() => {
                          if (item.label === "Logout") {
                            localStorage.removeItem("authToken");
                            window.location.href = "/login";
                            // router.push('/login');
                          }
                          setShowProfileDropdown(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                      >
                        <span className="text-gray-500">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}


            </div>

            {/* <Link
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
            </Link> */}
          </div>
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex items-center xl:hidden gap-2 sm:gap-3">
          {/* profile dropdown button  */}

          <div className="flex items-center space-x-3">
            <div
              className="relative"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <div className="flex items-center gap-2 px-1 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition-colors duration-200">
                <Image
                  src={defauldProfile}
                  width={30}
                  height={30}
                  alt="profile"
                  className="rounded-full"
                />
                <div className="flex items-center gap-1">
                  <span>
                    <ChevronDown size={15} />
                  </span>
                </div>
              </div>

              {/* profile dropdown menu  */}
              {/* {showProfileDropdown && (
                <div className="absolute -left-10 top-full w-32 rounded-md bg-white shadow-lg ring-1 ring-gray-200 z-50">
                  <div className="py-2">
                    {[
                      {
                        label: "Profile",
                        icon: <UserRound size={18} />,
                        href: "/alljobs",
                      },
                      {
                        label: "Setting dfefef",
                        icon: <Settings size={18} />,
                        href: "/set",
                      },
                      {
                        label: "Logout",
                        icon: <LogOut size={18} />,
                        href: "#",
                      },
                    ].map((item, index) => (
                      <Link
                        href={item.href}
                        key={index}
                        onClick={() => {
                          if (item.label === "Logout") {
                            localStorage.removeItem("authToken");
                            // window.location.href = "/login";
                            router.push('/login')
                          }
                          setShowProfileDropdown(false);
                        }}

                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                      >
                        <span className="text-gray-500">{item.icon}</span>
                        <span>Hello</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          </div>

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
                  <Link
                    href={"/"}
                    className="flex items-center justify-center gap-1"
                  >
                    <Image
                      src={mobileLogo}
                      width={150}
                      height={50}
                      className="w-10"
                    />
                    <span className="hidden md:block font-extrabold text-gray-700 text-xl -tracking-tight">
                      Jonosokti
                    </span>
                  </Link>
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
                              : pathname === href
                              ? "text-blue-600 bg-blue-50 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
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
