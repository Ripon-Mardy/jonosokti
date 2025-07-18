'use client'
import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Header/Navbar";
import { usePathname } from "next/navigation";
import AuthNavbar from "../Header/AuthNavbar";

const AuthContext = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // true or false
  }, [pathname]);

  return <div>{isLoggedIn ? <AuthNavbar /> : <Navbar />}</div>;
};

export default AuthContext;
