'use client';

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { RiHome2Line, RiGraduationCapFill } from "react-icons/ri";
import { PiGraduationCapLight } from "react-icons/pi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiLogOut, FiUser, FiSettings, FiShield } from "react-icons/fi";
import { BsSun, BsMoon } from "react-icons/bs";
import Image from "next/image";
import clsx from "clsx";

export default function DashboardNavbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Prevents hydration mismatch

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={clsx(
        "w-full fixed top-0 z-50 px-4 md:px-10 py-3 flex items-center justify-between shadow-md transition-all duration-300",
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      )}
    >
      {/* Logo */}
      <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
        <RiGraduationCapFill size={30} />
        E Study
      </div>

      {/* Nav Icons */}
      <div className="flex gap-8 md:gap-30 text-xl">
        <div className="flex-col items-center cursor-pointer group">
          <RiHome2Line className="group-hover:text-green-600 transition" />
          <span className="text-sm group-hover:text-green-600 transition">Home</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer group">
          <PiGraduationCapLight className="group-hover:text-green-600 transition" />
          <span className="text-sm group-hover:text-green-600 transition">Learn</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer group">
          <MdOutlineShoppingCart className="group-hover:text-green-600 transition" />
          <span className="text-sm group-hover:text-green-600 transition">Buy</span>
        </div>
      </div>

      {/* Profile Dropdown */}
      <div className="relative">
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src="/images/pro.svg"
            alt="Profile"
            width={36}
            height={36}
            className="rounded-full border"
          />
          <span className="hidden md:inline font-semibold">David</span>
        </div>

        {dropdownOpen && (
          <div
            className={clsx(
              "absolute right-0 mt-3 w-56 rounded-md shadow-lg text-sm z-50 border transition",
              theme === "dark"
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black border-gray-200"
            )}
          >
            <div className="px-4 py-3 flex items-center gap-2 hover:bg-green-600 dark:hover:bg-green-800 cursor-pointer transition">
              <FiUser /> Profile
            </div>
            <div className="px-4 py-3 flex items-center gap-2 hover:bg-green-600 dark:hover:bg-green-800 cursor-pointer transition">
              <FiShield /> Privacy & Policy
            </div>
            <div className="px-4 py-3 flex items-center gap-2 hover:bg-green-600 dark:hover:bg-green-800 cursor-pointer transition">
              <FiSettings /> Settings
            </div>
            <div
              onClick={toggleTheme}
              className="px-4 py-3 flex items-center gap-2 hover:bg-green-600 dark:hover:bg-green-800 cursor-pointer transition"
            >
              {theme === "dark" ? <BsSun /> : <BsMoon />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </div>
            <div className="px-4 py-3 flex items-center gap-2 hover:bg-red-100 dark:hover:bg-red-600 text-red-600 dark:text-red-300 md:hidden cursor-pointer transition">
              <FiLogOut /> Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
