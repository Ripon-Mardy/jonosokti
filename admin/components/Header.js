"use client";
import React from "react";
import Link from "next/link";
import { Menu, Bell, Mail, LogOut, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = ({ toggleMobileMenu }) => {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    router.push('/login')
  }
  return (
    <>
      <div className="bg-gray-100 px-3 p-2 flex items-center justify-between w-full border-b border-gray-300 z-50">
        <div className="flex items-center justify-center gap-4">
          <span onClick={toggleMobileMenu} className="cursor-pointer md:hidden">
            <Menu size={20} />
          </span>
          <Link href={'/dashboard/messages'} className="cursor-pointer" title="Messages">
            <Mail size={20} />
          </Link>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Link href={'https://jonosokti.vercel.app'} target="_blank" className="flex items-center justify-center gap-1 text-sm"> <Globe size={16} /> Website </Link>
          <span onClick={handleLogout} className="cursor-pointer text-red-600" title="Log Out">
            <LogOut size={20} />
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
